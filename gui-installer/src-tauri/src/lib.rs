pub mod screens;
pub mod utils;

use std::path::Path;
use std::process::{Command, Stdio};

use pnet::datalink::{self, NetworkInterface};
use serde::Serialize;
use std::sync::Mutex;
use sysinfo::Disks;
use tauri::Manager;
use tauri::State;

#[derive(Serialize)]
struct AppData {
    interfaces: Vec<NetworkInterface>,
    disks: Vec<DiskData>,
}

#[derive(Serialize, Clone)]
struct DiskData {
    name: String,
    file_system: String,
    available_space: u64,
    total_space: u64,
    mount_point: String,
}

#[tauri::command]
fn get_disks(state: State<'_, Mutex<AppData>>) -> Vec<DiskData> {
    let mut state = state.lock().unwrap();
    let disks = Disks::new_with_refreshed_list();

    let mut disks_vec = Vec::new();
    for disk in &disks {
        disks_vec.push(DiskData {
            name: disk.name().to_str().unwrap().to_string(),
            available_space: disk.available_space(),
            total_space: disk.total_space(),
            mount_point: disk.mount_point().to_str().unwrap().to_string(),
            file_system: disk.file_system().to_str().unwrap().to_string(),
        });
    }
    state.disks = disks_vec;
    state.disks.clone()
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn get_network_interfaces(state: State<'_, Mutex<AppData>>) -> Vec<NetworkInterface> {
    let mut state = state.lock().unwrap();
    state.interfaces = datalink::interfaces();
    state.interfaces.clone()
}

#[tauri::command]
fn ping_difuse_io() -> bool {
    let exit_status = Command::new("ping")
        .arg("difuse.io")
        .arg("-4")
        .arg("-c")
        .arg("1")
        .stdout(Stdio::null())
        .status();
    match exit_status {
        Ok(code) => code.success(),
        Err(_err) => false,
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppData {
                interfaces: Vec::new(),
                disks: Vec::new(),
            }));
            Ok(())
        })
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_network_interfaces,
            ping_difuse_io,
            get_disks
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
