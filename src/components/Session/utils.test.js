import {
  authCondition,
  activeProfileCondition,
  adminRoleCondition
} from "./utils";

const mockProfile = {
  churches: [
    {
      city: "Helsinki",
      key: "-LDoeCQHlfUIHhJ1NQY-",
      label: "Metrokappeli",
      name: "Metrokappeli",
      value: "-LDoeCQHlfUIHhJ1NQY-"
    }
  ],
  countries: [
    {
      area: "Aasia",
      code: "kh",
      key: "-LDNPz5ojQQEoVfGHuIv",
      label: "Kambodzha",
      name: "Kambodzha",
      value: "-LDNPz5ojQQEoVfGHuIv"
    }
  ],
  isActive: true,
  descriptionHtml: "<p>Test</p>",
  email: "name@someplace.com",
  roles: { admin: true, missionary: true },
  username: "John Doe"
};

describe("session coditioning functions", () => {
  it("authCondition should return false if auth is not set", () => {
    expect(authCondition(undefined)).toBe(false);
    expect(authCondition(null)).toBe(false);
  });

  it("authCondition should return true if auth is set", () => {
    expect(activeProfileCondition(mockProfile)).toBe(true);
  });

  it("activeProfileCondition should return true user is active", () => {
    mockProfile.isActive = false;
    expect(activeProfileCondition(mockProfile)).toBe(false);
  });

  it("adminRoleCondition should return true user is active and has admin role", () => {
    mockProfile.isActive = true;
    expect(adminRoleCondition(mockProfile)).toBe(true);
  });

  it("adminRoleCondition should return false if user does not have admin role", () => {
    mockProfile.roles = { missionary: true };
    expect(adminRoleCondition(mockProfile)).toBe(false);
  });

  it("adminRoleCondition should return false if user does have admin role, but is not activated", () => {
    mockProfile.roles = { admin: true };
    mockProfile.isActive = false;
    expect(adminRoleCondition(mockProfile)).toBe(false);
  });
});
