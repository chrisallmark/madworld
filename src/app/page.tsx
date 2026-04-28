import { MadWorld } from "@/components";
import { getSamples, getTracks, getVideoUrl } from "@/services/audio";

export default async function Page() {
  const samples = await getSamples();
  const tracks = await getTracks();
  const videoUrl = getVideoUrl();
  return <MadWorld samples={samples} tracks={tracks} videoUrl={videoUrl} />;
}
