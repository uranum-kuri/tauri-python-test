// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{thread, time};

#[tauri::command]
async fn simple_command(message: String) -> String {
  let ten_millis = time::Duration::from_millis(1000);
  thread::sleep(ten_millis);
  format!("hello {}", message)
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      simple_command,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
