use std::fs;

use pnet::datalink::{self, NetworkInterface};

pub fn filter_virtual_interfaces() -> Vec<NetworkInterface> {
    let virtual_devices_dir = fs::read_dir("/sys/devices/virtual/net/")
        .map_err(|err| eprintln!("ERROR: unable to read directory: {err}"))
        .unwrap();

    let interfaces = datalink::interfaces();
    let virutal_interfaces = virtual_devices_dir
        .map(|path| path_to_interface(&path.unwrap().path().display().to_string()))
        .collect::<Vec<String>>();

    let physical_interfaces: Vec<_> = interfaces
        .iter()
        .filter(|interface| !virutal_interfaces.contains(&interface.name))
        .cloned()
        .collect();

    physical_interfaces
}

fn path_to_interface(path: &str) -> String {
    path.split("/").last().unwrap_or("").into()
}
