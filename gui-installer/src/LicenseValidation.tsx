function LicenseValidation() {
  return (
    <div>
      <form class="mt-10 flex flex-col items-center justify-center border rounded-xl py-4 px-8">
        <label for="license-id" class="text-2xl font-bold mb-5">
          Difuse License Key
        </label>
        <input
          type="text"
          name="license-id"
          placeholder="Enter Key"
          class="rounded-xl border bg-white px-4 py-2 text-2xl text-black"
        />
        <button class="mt-5  bg-blue-200 text-black font-bold rounded-xl hover:bg-blue-400 hover:scale-105  duration-300 px-4 py-2">
          Validate Key
        </button>
      </form>
    </div>
  );
}
export default LicenseValidation;
