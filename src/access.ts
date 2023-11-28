/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    canUser: loginUser,
    // canAdmin: currentUser && currentUser.access === 'admin',
    canAdmin: loginUser?.userRole === 'Admin',
  };
}
