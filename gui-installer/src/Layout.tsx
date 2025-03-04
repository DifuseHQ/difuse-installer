import { A, RouteSectionProps } from "@solidjs/router";
import NetConfig from "./NetConfig";
import LicenseValidation from "./LicenseValidation";
import DiskSelection from "./DiskSelection";
import SelectImageDownload from "./SelectImageDownload";
import ImageNetConfig from "./ImageNetConfig";
import ChrootConfig from "./ChrootConfig";
import Home from "./Home";
import { For } from "solid-js";

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
  return (
    <>
      <header class="text-2xl font-bold flex items-center justify-center mt-4">
        Difuse Linux Installer v0.1
      </header>

      <main class="items-center flex justify-center">{props.children}</main>
      <footer class="fixed bottom-0 left-0 w-full bg-[#0D111C]">
        <nav class="flex font-bold text-lg sm:text-xl md:text-2xl   gap-2 justify-center items-center ">
          <For each={TabList}>
            {(list) => (
              <>
                <A
                  href={list.path}
                  class="py-3 hover:bg-gray-400 px-3 duration-300"
                >
                  {" "}
                  {list.name}
                  <span class="text-2xl mx-2">&#x2192;</span>
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
