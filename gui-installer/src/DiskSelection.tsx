import { invoke } from "@tauri-apps/api/core";
import { createResource, For } from "solid-js";
import { DiskData } from "./types";
import { Show } from "solid-js";
import { createSignal } from "solid-js";

const getDisks = async (): Promise<DiskData[]> => await invoke("get_disks");
function DiskSelection() {
  const [currentDisk, setCurrentDisk] = createSignal<DiskData>();
  const [checkDisks] = createResource(getDisks);
  console.log(!checkDisks.loading ? checkDisks() : "loading...");

  return (
    <div>
      <div class="flex flex-col items-center justify-center text-2xl mt-10">
        <Show when={checkDisks.loading}>Checking disks...</Show>
        <div class="flex flex-col items-center justify-center">
          <label for="disks">Select Disk: </label>
          <select
            name="disks"
            id="disks"
            class="text-black p-3 font-bold"
            onchange={(e) => {
              setCurrentDisk(
                checkDisks()?.find((disk) => disk.name === e.target.value),
              );
            }}
          >
            <For each={checkDisks()}>
              {(disk) => (
                <option
                  class="text-black font-bold p-3"
                  value={disk.name}
                  id={disk.name}
                >
                  {disk.name}
                  {/* {disk.available_space} */}
                  {/* {disk.total_space} */}
                  {/* {disk.mount_point} */}
                </option>
              )}
            </For>
          </select>
        </div>
        <div>Selected: {currentDisk()?.name}</div>
      </div>
    </div>
  );
}
export default DiskSelection;
