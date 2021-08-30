/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */

import axios, { AxiosError } from "axios";
import RequestError from "../../src/modules/error/error.request";
import { User } from "../../src/modules/user/user.service";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockAxiosError: AxiosError = {
  isAxiosError: true,
  toJSON: jest.fn(),
  config: null,
  name: null,
  message: "Test Error Message",
};

describe("User tests", () => {
  describe("Constructor tests", () => {
    it("Should set API_KEY", () => {
      const userService = new User("SOME_NICE_API_KEY");

      expect((userService as any).API_KEY).toEqual("SOME_NICE_API_KEY");
    });

    it("Should throws error if API_KEY is not set", () => {
      // @ts-ignore
      expect(() => new User()).toThrowError(new Error("API key has not set"));
    });
  });

  describe("Methods tests", () => {
    let userService: User;

    beforeAll(() => {
      userService = new User("SOME_NICE_API_KEY");
    });

    describe("Error tests", () => {
      beforeEach(() => {
        mockedAxios.get.mockImplementationOnce(() => {
          throw mockAxiosError;
        });
      });

      afterEach(() => {
        mockedAxios.get.mockReset();
      });

      it("Should raise a request error when the status fails", async () => {
        const expectedError = new RequestError(mockAxiosError);

        expect(
          userService.getFriends({
            user: "castilh0s",
            limit: 5,
            page: 1,
            recenttracks: false,
          }),
        ).rejects.toMatchObject(expectedError);
      });
    });

    describe("Params tests", () => {
      const defaultParams = { api_key: "SOME_NICE_API_KEY", format: "json" };

      beforeEach(() => {
        mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
      });

      it("Should call getFriends with the right params", async () => {
        await userService.getFriends({ user: "castilh0s", limit: 5, page: 1, recenttracks: false });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getFriends",
            user: "castilh0s",
            limit: 5,
            page: 1,
            recenttracks: false,
            ...defaultParams
          }
        });
      });

      it("Should call getInfo with the right params", async () => {
        await userService.getInfo({ user: "castilh0s" });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getInfo",
            user: "castilh0s",
            ...defaultParams
          }
        });
      });

      it("Should call getLovedTracks with the right params", async () => {
        await userService.getLovedTracks({ user: "castilh0s", limit: 5, page: 1 });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getLovedTracks",
            user: "castilh0s",
            limit: 5,
            page: 1,
            ...defaultParams
          }
        });
      });

      it("Should call getPersonalTags with the right params", async () => {
        await userService.getPersonalTags({ user: "castilh0s", tag: "disco", taggingtype: "album", limit: 5, page: 1 });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getPersonalTags",
            user: "castilh0s",
            tag: "disco",
            taggingtype: "album",
            limit: 5,
            page: 1,
            ...defaultParams
          }
        });
      });

      it("Should call getRecentTracks with the right params", async () => {
        await userService.getRecentTracks({
          limit: 5,
          user: "castilh0s",
          page: 1,
          from: Math.floor(new Date("Wed, 01 Jan 2020 00:00:00 GMT").getTime() / 1000),
          extended: 1,
          to: Math.floor(new Date("Thu, 31 Dec 2020 00:00:00 GMT").getTime() / 1000)
        });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getRecentTracks",
            limit: 5,
            user: "castilh0s",
            page: 1,
            from: 1577836800,
            extended: 1,
            to: 1609372800,
            ...defaultParams
          }
        });
      });

      it("Should call getTopAlbums with the right params", async () => {
        await userService.getTopAlbums({ user: "castilh0s", limit: 5, page: 1, period: "7day" });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getTopAlbums",
            user: "castilh0s",
            limit: 5,
            page: 1,
            period: "7day",
            ...defaultParams
          }
        });
      });

      it("Should call getTopArtists with the right params", async () => {
        await userService.getTopArtists({ user: "castilh0s", limit: 5, page: 1, period: "7day" });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getTopArtists",
            user: "castilh0s",
            limit: 5,
            page: 1,
            period: "7day",
            ...defaultParams
          }
        });
      });

      it("Should call getTopTags with the right params", async () => {
        await userService.getTopTags({ user: "castilh0s", limit: 5 });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getTopTags",
            user: "castilh0s",
            limit: 5,
            ...defaultParams
          }
        });
      });

      it("Should call getTopTracks with the right params", async () => {
        await userService.getTopTracks({ user: "castilh0s", limit: 5, page: 1, period: "7day" });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getTopTracks",
            user: "castilh0s",
            limit: 5,
            page: 1,
            period: "7day",
            ...defaultParams
          }
        });
      });

      it("Should call getWeeklyAlbumChart with the right params", async () => {
        await userService.getWeeklyAlbumChart({ user: "castilh0s", from: "1108296000", to: "1108900800" });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getWeeklyAlbumChart",
            user: "castilh0s",
            from: "1108296000",
            to: "1108900800",
            ...defaultParams
          }
        });
      });

      it("Should call getWeeklyArtistChart with the right params", async () => {
        await userService.getWeeklyArtistChart({ user: "castilh0s", from: "1108296000", to: "1108900800" });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getWeeklyArtistChart",
            user: "castilh0s",
            from: "1108296000",
            to: "1108900800",
            ...defaultParams
          }
        });
      });

      it("Should call getWeeklyChartList with the right params", async () => {
        await userService.getWeeklyChartList({ user: "castilh0s" });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getWeeklyChartList",
            user: "castilh0s",
            ...defaultParams
          }
        });
      });

      it("Should call getWeeklyTrackChart with the right params", async () => {
        await userService.getWeeklyTrackChart({ user: "castilh0s", from: "1108296000", to: "1108900800" });

        expect(mockedAxios.get).toHaveBeenLastCalledWith("/2.0", {
          params: {
            method: "user.getWeeklyTrackChart",
            user: "castilh0s",
            from: "1108296000",
            to: "1108900800",
            ...defaultParams
          }
        });
      });
    });
  });
});
