import { useNavigate } from "@solidjs/router";

function Home() {
  const navigate = useNavigate();
  return (
    <div class="items-center flex justify-center mt-5">
      <button
        class="font-bold text-2xl bg-gray-500 duration-300 hover:shadow-lg shadow-2xl rounded-lg hover:scale-110 py-2 px-4"
        onclick={() => navigate("/network-config", { replace: true })}
      >
        Start Installation
      </button>
    </div>
  );
}
export default Home;
