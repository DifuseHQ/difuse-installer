import { createSignal } from "solid-js";
import { For } from "solid-js";

export interface OSIMage {
  versionName: string;
  url: string;
  versionNumber: string;
}
function SelectImageDownload() {
  const imageDownload: OSIMage[] = [
    {
      versionName: "Box v1",
      url: "https://example.org/api/v1",
      versionNumber: "0.1",
    },

    {
      versionName: "Box v2",
      url: "https://example.org/api/v2",
      versionNumber: "0.2",
    },

    {
      versionName: "Box v3",
      url: "https://example.org/api/v3",
      versionNumber: "0.3",
    },
  ];

  const [currentImage, setCurrentImage] = createSignal<OSIMage>(
    imageDownload[0],
  );
  return (
    <div class="flex flex-col">
      <select
        name="image-version"
        id="image-version"
        class="text-black text-2xl font-bold mt-8 py-3 px-6"
        onchange={(e) => {
          setCurrentImage(
            imageDownload.find((image) => image.url === e.target.value)!,
          );
        }}
      >
        <For each={imageDownload}>
          {(item) => {
            return <option value={item.url}>{item.versionName}</option>;
          }}
        </For>
      </select>
      <button class="font-bold text-xl mt-10 rounded-xl py-3 px-6 shadow-2xl bg-blue-500 hover:shadow-lg hover:bg-blue-600 duration-300 hover:scale-110  ">
        Download {currentImage()?.versionNumber} Image
      </button>
    </div>
  );
}
export default SelectImageDownload;
