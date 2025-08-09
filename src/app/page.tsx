
import { Metadata } from "next";
import PlayerSetupPage from "./assignment_1/page";

export const metadata: Metadata = {
  title: 'Iframe Assignment',
  description: 'Description of your app',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function Home() {
  return (
    <div className="animate-bg-move animate-ball">

      <PlayerSetupPage />
    </div>
  );
}
