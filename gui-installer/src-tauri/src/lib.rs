pub mod screens;
pub mod utils;

use std::process::{Command, Stdio};

use pnet::datalink::{self, NetworkInterface};
use serde::Deserialize;
use serde::Serialize;
use std::sync::Mutex;
use tauri::Manager;
use tauri::State;

#[derive(Serialize, Deserialize)]
struct AppData {
    interfaces: Vec<NetworkInterface>,
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
            }));
            Ok(())
        })
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_network_interfaces,
            ping_difuse_io
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
