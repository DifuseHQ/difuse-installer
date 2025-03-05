import { useNavigate } from "@solidjs/router";

function Home() {
  const navigate = useNavigate();
  return (
    <div class="items-center flex justify-center mt-5">
      <button
        class="font-bold text-2xl bg-gray-500 rounded-lg py-2 px-4"
        onclick={() => navigate("/network-config", { replace: true })}
      >
        Start Installation
      </button>
    </div>
  );
}
export default Home;
