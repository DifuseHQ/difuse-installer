import { createEffect, createSignal, For, Show } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import { NetworkInterface } from "./types";
import { createResource } from "solid-js";

const getNetworkInterfaces = async (): Promise<NetworkInterface[]> =>
  await invoke("get_network_interfaces");

function NetConfig() {
  const [networkInterfaces, setNetworkInterfaces] =
    createSignal<NetworkInterface[]>();
  const [isConnected, setIsConnected] = createSignal(false);
  const [interfaces] = createResource(networkInterfaces, getNetworkInterfaces);

  async function pingServer() {
    const result: boolean = await invoke("ping_difuse_io");
    setIsConnected(result);
  }

  createEffect(async () => {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

    setNetworkInterfaces(await invoke("get_network_interfaces"));
    setIsConnected(await invoke("ping_difuse_io"));
  });

  return (
    <>
      <Show when={interfaces.loading}>Checking network config</Show>
      <div class="flex flex-col items-center justify-center mt-8">
        <div class="text-2xl font-bold">
          <ul>
            <For each={networkInterfaces()}>
              {(netInterface) => <li>{netInterface.name}</li>}
            </For>
          </ul>
        </div>
        <button
          onclick={pingServer}
          class="border-2 cursor-pointer py-3 px-4 rounded-full mt-5 text-xl"
        >
          Check connection
        </button>
        <div class="mt-5 flex flex-col gap-3 items-center">
          <Show
            when={isConnected()}
            fallback={
              <span class="flex items-center justify-center gap-3">
                Not Connected
                <span class="mx-2 rounded-full w-4 h-4 bg-red-500 ring-2 ring-red-400 animate-ping "></span>
              </span>
            }
          >
            <span class="flex items-center justify-center gap-3">
              Connected{" "}
              <span class="h-4 w-4 ring-2 ring-green-400 animate-ping rounded-full bg-green-500  "></span>
            </span>
          </Show>
        </div>
      </div>
    </>
  );
}

export default NetConfig;
