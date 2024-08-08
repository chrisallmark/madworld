import { getSamples, getTracks } from "@/services/audio";
import MadWorld from "./MadWorld";

export default async function () {
  const samples = await getSamples();
  const tracks = await getTracks();
  return <MadWorld samples={samples} tracks={tracks} />;
}
