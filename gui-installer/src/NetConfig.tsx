import { createEffect, createSignal, For, Show } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import { NetworkInterface } from "./types";
import { createResource } from "solid-js";

const getNetworkInterfaces = async (): Promise<NetworkInterface[]> =>
  await invoke("get_network_interfaces");

const setNetworkInterface = async (
  netInterface: NetworkInterface,
): Promise<NetworkInterface> =>
  await invoke("set_network_interface", { interface: netInterface });

const pingServer = async (): Promise<boolean> => await invoke("ping_difuse_io");

function NetConfig() {
  const [networkInterfaces] = createResource(getNetworkInterfaces);
  const [selectedNetworkInterface, setSelectNetworkInterface] =
    createSignal<NetworkInterface>();
  const [checkConnection] = createResource(pingServer);
  const [networkInterface] = createResource(
    selectedNetworkInterface,
    setNetworkInterface,
  );

  return (
    <>
      <Show when={checkConnection.loading}>Checking network config......</Show>
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
            when={checkConnection()}
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
