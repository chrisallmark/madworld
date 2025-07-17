import { MadWorld } from "@/components";
import { getSamples, getTracks } from "@/services/audio";

export default async function Page() {
  const samples = await getSamples();
  const tracks = await getTracks();
  return <MadWorld samples={samples} tracks={tracks} />;
}
