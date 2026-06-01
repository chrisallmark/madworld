import { getAudioElement } from "./audioElement";

describe("getAudioElement", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it("returns the matching audio element", () => {
    const audio = document.createElement("audio");
    audio.id = "track";
    document.body.append(audio);

    expect(getAudioElement("track")).toBe(audio);
  });

  it("returns null when the id is missing", () => {
    expect(getAudioElement("missing")).toBeNull();
  });

  it("returns null when the id belongs to a non-audio element", () => {
    const div = document.createElement("div");
    div.id = "track";
    document.body.append(div);

    expect(getAudioElement("track")).toBeNull();
  });
});
