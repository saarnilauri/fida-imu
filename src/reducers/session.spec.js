import sessionReducer from "./session";

describe("session reducer", () => {
  it("should return the initial state", () => {
    expect(sessionReducer(undefined, {})).toEqual({
      authUser: null
    });
  });

  it("should handle AUTH_USER_SET", () => {
    expect(
      sessionReducer(undefined, {
        type: "AUTH_USER_SET",
        authUser: {
          name: "Tester",
          email: "test@test.com"
        }
      })
    ).toEqual({
      authUser: {
        name: "Tester",
        email: "test@test.com"
      }
    });
  });

  it("should handle SET_USER_PROFILE", () => {
    const value = {
      descriptionHtml: "<p>Test </p>",
      email: "lauri.saarni@gmail.com",
      roles: { admin: true, missionary: true },
      username: "Lauri Saarnio Gmail"
    };

    expect(
      sessionReducer(undefined, {
        type: "SET_USER_PROFILE",
        userProfile: value
      })
    ).toEqual({
      authUser: null,
      userProfile: {
        descriptionHtml: "<p>Test </p>",
        email: "lauri.saarni@gmail.com",
        roles: { admin: true, missionary: true },
        username: "Lauri Saarnio Gmail"
      }
    });
  });
});
