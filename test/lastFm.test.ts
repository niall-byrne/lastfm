/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Album } from "../src/modules/album/album.service";
import LastFm from "../src/lastfm";
import { Tag } from "../src/modules/tag/tag.service";
import { User } from "../src/modules/user/user.service";

describe("Last.fm tests", () => {
  let instance: LastFm;
  const mockApiKey = "SOME_NICE_API_KEY";

  describe("With an API key", () => {
    beforeEach(() => (instance = new LastFm(mockApiKey)));

    describe("Constructor tests", () => {
      it("Should set the API key", () => {
        expect((instance as any).API_KEY).toEqual(mockApiKey);
      });

      it("Should have a Album instance", () => {
        expect(instance.album).toBeInstanceOf(Album);
      });

      it("Should have a Tag instance", () => {
        expect(instance.tag).toBeInstanceOf(Tag);
      });

      it("Should have a User instance", () => {
        expect(instance.user).toBeInstanceOf(User);
      });
    });
  });

  describe("Without an API key", () => {
    describe("Constructor tests", () => {
      it("Should throw an error", () => {
        // @ts-ignore
        expect(() => new LastFm()).toThrowError(
          new Error("API key has not set"),
        );
      });
    });
  });
});
