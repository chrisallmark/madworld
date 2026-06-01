import { displayNameFromUrl } from "./format";

describe("displayNameFromUrl", () => {
  it("returns the filename without an mp3 extension", () => {
    expect(displayNameFromUrl("/tracks/Mad World by Optimus.mp3")).toBe(
      "Mad World by Optimus",
    );
  });

  it("handles full URLs and preserves non-mp3 extensions", () => {
    expect(
      displayNameFromUrl(
        "https://bucket.s3.eu-west-2.amazonaws.com/extras/Game%20Over.wav",
      ),
    ).toBe("Game%20Over.wav");
  });

  it("only removes a lowercase trailing mp3 extension", () => {
    expect(displayNameFromUrl("/samples/Ouch.MP3")).toBe("Ouch.MP3");
    expect(displayNameFromUrl("/samples/mp3-demo.mp3")).toBe("mp3-demo");
  });
});
