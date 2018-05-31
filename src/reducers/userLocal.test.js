import "jest-localstorage-mock";
import userLocaleReducer, {
  setNavigatorLanguage,
  setLocaleLanguage
} from "./userLocale";

describe("userLocale reducer", () => {
  it("should return the initial state", () => {
    expect(userLocaleReducer(undefined, {})).toEqual({
      locale: "fi"
    });
  });

  it("should handle SET_LOCALE", () => {
    expect(
      userLocaleReducer(undefined, {
        type: "SET_LOCALE",
        payload: "en"
      })
    ).toEqual({
      locale: "en"
    });
  });

  it("setNavigatorLanguage returns action", () => {
    expect(setNavigatorLanguage()).toEqual(expect.any(Object));
  });

  it("setLocaleLanguage returns action", () => {
    expect(setLocaleLanguage("en")).toEqual({
      type: "SET_LOCALE",
      payload: "en"
    });
  });
});
