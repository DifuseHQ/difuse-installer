import { action, json, useSubmission } from "@solidjs/router";
import { createEffect, useContext } from "solid-js";
import { AppStateContext } from "./context";

const verifyKeyAction = action(async (formData: FormData) => {
  const key = formData.get("license-key");
  // TODO: add actual key verification
  await new Promise((resolve, reject) => setInterval(resolve, 2000));
  return json({ validated: true });
});

function LicenseValidation() {
  const keySubmission = useSubmission(verifyKeyAction);
  const appStateContext = useContext(AppStateContext);
  if (!appStateContext) throw new Error("Can't find appstate context");
  let { setAppState } = appStateContext;

  createEffect(() => {
    if (!keySubmission.pending)
      setAppState("isLicenceVerified", keySubmission.result!.validated);
  });

  return (
    <div>
      <form
        action={verifyKeyAction}
        method="post"
        class="mt-10 flex flex-col items-center justify-center border rounded-xl py-4 px-8"
      >
        <label for="license-key" class="text-2xl font-bold mb-5">
          Difuse License Key
        </label>
        <input
          type="text"
          name="license-key"
          placeholder="Enter Key"
          class="rounded-xl border bg-white px-4 py-2 text-2xl text-black"
        />
        <button
          type="submit"
          class="mt-5 cursor-pointer bg-blue-200 text-black font-bold rounded-xl hover:bg-blue-400 hover:scale-105  duration-300 px-4 py-2"
        >
          Validate Key
        </button>
      </form>

      <div class="text-xl flex items-center justify-center flex-col">
        Verified:{" "}
        <span>
          {keySubmission.pending ? "validating..." : ""}
          {keySubmission.result?.validated.toString()}
        </span>
      </div>
    </div>
  );
}
export default LicenseValidation;
