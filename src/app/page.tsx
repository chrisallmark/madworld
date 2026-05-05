import { MadWorld } from "@/components";
import {
  getExtras,
  getSamples,
  getTracks,
  getVideoUrl,
} from "@/services/audio";

export default async function Page() {
  const [extras, samples, tracks] = await Promise.all([
    getExtras(),
    getSamples(),
    getTracks(),
  ]);
  const videoUrl = getVideoUrl();
  return (
    <MadWorld
      extras={extras}
      samples={samples}
      tracks={tracks}
      videoUrl={videoUrl}
    />
  );
}
