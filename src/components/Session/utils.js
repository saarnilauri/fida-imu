import has from 'lodash/has'

export const authCondition = authUser => !!authUser
export const activeProfileCondition = profile =>
  has(profile, 'isActive') && profile.isActive
export const adminRoleCondition = profile =>
  has(profile.roles, 'admin') && activeProfileCondition(profile)
