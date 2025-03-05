import { A, RouteSectionProps, useLocation, useParams } from "@solidjs/router";
import NetConfig from "./NetConfig";
import LicenseValidation from "./LicenseValidation";
import DiskSelection from "./DiskSelection";
import SelectImageDownload from "./SelectImageDownload";
import ImageNetConfig from "./ImageNetConfig";
import ChrootConfig from "./ChrootConfig";
import Home from "./Home";
import { createEffect, createMemo, For } from "solid-js";
import { getCurrentWindow } from "@tauri-apps/api/window";

export const TabList = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Network Config",
    path: "/network-config",
    component: NetConfig,
  },
  {
    name: "Licence Validation",
    path: "/license-valid",
    component: LicenseValidation,
  },
  {
    name: "Disk Selection",
    path: "/select-disk",
    component: DiskSelection,
  },
  {
    name: "Select Image",
    path: "/select-image",
    component: SelectImageDownload,
  },
  {
    name: "Image Network Config",
    path: "/image-net-config",
    component: ImageNetConfig,
  },
  {
    name: "Chroot configuration",
    path: "/chroot-config",
    component: ChrootConfig,
  },
];
function Layout(props: RouteSectionProps<unknown>) {
  const appWindow = getCurrentWindow();
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  createEffect(async () => await appWindow.maximize());
  return (
    <>
      <header class="mt-8 flex items-center justify-center text-4xl font-extrabold">
        Difuse Linux Installer v0.1
      </header>

      <main class="flex items-center justify-center">{props.children}</main>
      <footer class="fixed bottom-0 left-0 w-full bg-[#0D111C]">
        <nav class="flex items-center justify-center gap-2 text-lg   font-bold sm:text-xl md:text-2xl ">
          <For each={TabList}>
            {(list) => (
              <>
                <A
                  href={list.path}
                  class={`${pathname() === list.path ? "bg-gray-500" : ""} rounded-lg px-3 py-3 duration-300 hover:bg-gray-500`}
                >
                  {" "}
                  {list.name}
                  <span class="mx-2 text-2xl">&#x2192;</span>
                </A>
              </>
            )}
          </For>
        </nav>
      </footer>
    </>
  );
}
export default Layout;
