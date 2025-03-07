import {
  A,
  RouteSectionProps,
  useLocation,
  useNavigate,
} from "@solidjs/router";
import NetConfig from "./NetConfig";
import LicenseValidation from "./LicenseValidation";
import DiskSelection from "./DiskSelection";
import SelectImageDownload from "./SelectImageDownload";
import ImageNetConfig from "./ImageNetConfig";
import ChrootConfig from "./ChrootConfig";
import Home from "./Home";
import { createEffect, createMemo, For } from "solid-js";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { AppStateContext } from "./context";
import { createStore } from "solid-js/store";
import { AppState } from "./types";

export function getTabList(isLicenseVerified: boolean = false) {
  return [
    {
      name: "Home",
      path: "/",
      component: Home,
      isEnabled: true,
    },
    {
      name: "Network Config",
      path: "/network-config",
      component: NetConfig,
      isEnabled: true,
    },
    {
      name: "Licence Validation",
      path: "/license-valid",
      component: LicenseValidation,
      isEnabled: true,
    },
    {
      name: "Disk Selection",
      path: "/select-disk",
      component: DiskSelection,
      isEnabled: isLicenseVerified,
    },
    {
      name: "Select Image",
      path: "/select-image",
      component: SelectImageDownload,
      isEnabled: isLicenseVerified,
    },
    {
      name: "Image Network Config",
      path: "/image-net-config",
      component: ImageNetConfig,
      isEnabled: isLicenseVerified,
    },
    {
      name: "Chroot configuration",
      path: "/chroot-config",
      component: ChrootConfig,
      isEnabled: isLicenseVerified,
    },
  ];
}

function Layout(props: RouteSectionProps<unknown>) {
  const appWindow = getCurrentWindow();
  const location = useLocation();
  const navigate = useNavigate();
  const [appState, setAppState] = createStore<AppState>({
    isLicenceVerified: false,
    selectedImage: null,
    selectedDisk: null,
    selectedNetworkInteface: null,
  });

  let tabList = getTabList(appState.isLicenceVerified);
  const pathname = createMemo(() => location.pathname);
  const currentLocationIndex = createMemo(() =>
    tabList.findIndex((item) => item.path === pathname()),
  );

  createEffect(() => {
    tabList = getTabList(appState.isLicenceVerified);
  });

  createEffect(async () => await appWindow.maximize());
  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      <header class="mt-8 grid grid-cols-3 place-items-center text-4xl font-extrabold">
        <div></div>
        <h1>Difuse Linux Installer v0.1</h1>
        <div class="flex  gap-2 items-center">
          <button
            disabled={pathname() === "/" || currentLocationIndex() === 0}
            class="text-2xl not-disabled:hover:bg-gray-500 font-bold disabled:cursor-not-allowed disabled:font-normal duration-300 py-2 px-4 rounded-lg flex items-center justify-center disabled:opacity-75"
            onclick={() => navigate(tabList[currentLocationIndex() - 1].path)}
          >
            <span class="mx-2 text-2xl ">&#x2190;</span>
            Previous
          </button>
          <button
            disabled={
              currentLocationIndex() === tabList.length - 1 ||
              (!appState.isLicenceVerified && currentLocationIndex() >= 2)
            }
            class="text-2xl not-disabled:hover:bg-gray-500 disabled:cursor-not-allowed font-bold disabled:font-normal duration-300 py-2 px-4 rounded-lg flex items-center justify-center disabled:opacity-75"
            onclick={() => navigate(tabList[currentLocationIndex() + 1].path)}
          >
            Next
            <span class="mx-2 text-2xl">&#x2192;</span>
          </button>
        </div>
      </header>

      <main class="flex items-center justify-center">{props.children}</main>
      <footer class="fixed bottom-0 left-0 w-full flex flex-col items-center justify-center">
        <nav class="flex items-center justify-center gap-2 text-lg w-fit bg-[#0D111C]  font-bold sm:text-xl md:text-2xl rounded-lg ">
          {" "}
          <For each={tabList}>
            {(list) => (
              <div
                class={`${list.isEnabled || appState.isLicenceVerified ? "" : "cursor-not-allowed"} py-3`}
              >
                <A
                  href={list.path}
                  class={`${pathname() === list.path ? "bg-gray-500" : ""} rounded-lg px-3 py-5 duration-300 hover:bg-gray-500 ${list.isEnabled || appState.isLicenceVerified ? "" : "pointer-events-none"}`}
                >
                  {" "}
                  {list.name}
                  <span class="mx-2 text-2xl">&#x2192;</span>
                </A>
              </div>
            )}
          </For>
        </nav>
      </footer>
    </AppStateContext.Provider>
  );
}
export default Layout;
