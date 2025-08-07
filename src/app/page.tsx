import Image from "next/image";
import Navbar from "./components/Navbar";
import PlayerSetupPage from "./assignment_1/page";

export default function Home() {
  return (
    <div className="animate-bg-move animate-ball">

      <PlayerSetupPage />
    </div>
  );
}
