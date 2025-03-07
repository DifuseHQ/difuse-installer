import { invoke } from "@tauri-apps/api/core";
import { createResource, For } from "solid-js";
import { DiskData } from "./types";
import { Show } from "solid-js";
import { createSignal } from "solid-js";
import { createEffect } from "solid-js";

const getDisks = async (): Promise<DiskData[]> => await invoke("get_disks");
function DiskSelection() {
  const [checkDisks] = createResource(getDisks);
  const [currentDisk, setCurrentDisk] = createSignal<DiskData>();
  createEffect(() => {
    if (!checkDisks.loading) setCurrentDisk(checkDisks()![0]);
  });

  return (
    <div>
      <div class="flex flex-col items-center justify-center mt-10">
        <Show when={checkDisks.loading}>Checking disks...</Show>
        <div class="flex flex-col items-center justify-center text-2xl ">
          <label for="disks">Select Disk: </label>
          <select
            name="disks"
            id="disks"
            class="text-black p-3 font-bold"
            onchange={(e) => {
              setCurrentDisk(
                checkDisks()!.find((disk) => disk.name === e.target.value),
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
                </option>
              )}
            </For>
          </select>
          <button class="bg-gray-400  py-2 px-4 rounded-lg hover:bg-gray-500 duration-300 mt-5">
            Select
          </button>
        </div>
        <div>
          <Show when={currentDisk()}>
            <hr class="my-10" />
            <div class="flex flex-col items-start justify-center">
              <div class="underline text-2xl font-bold">
                Would you like to know more about my Disk? :P
              </div>

              <div class="text-xl font-semibold">
                <div>Name: {currentDisk()!.name}</div>
                <div>
                  Available Space:{" "}
                  {(
                    currentDisk()!.available_space /
                    (1024 * 1024 * 1024)
                  ).toFixed(2)}
                  GB
                </div>
                <div>
                  Total Space:{" "}
                  {(currentDisk()!.total_space / (1024 * 1024 * 1024)).toFixed(
                    2,
                  )}
                  GB
                </div>
                <div>File System: {currentDisk()!.file_system}</div>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}
export default DiskSelection;
