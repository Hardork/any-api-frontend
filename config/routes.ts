export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' }
    ],
  },
  { path: '/', name: '主页', icon: 'smile', component: './Index' },
  { path: '/interface_info/:id', name: '查看接口', icon: 'smile', component: './InterfaceInfo' , hideInMenu: true},
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: '接口管理', icon: 'table', path: '/admin/interface', component: './Admin/InterfaceInfo' },
      { name: '接口分析', path: '/admin/sub-page', component: './Admin/Analysis' },
    ],
  },
  { path: '/user_center', name: '个人中心', icon: 'user', component: './Index' },
  { path: '*', layout: false, component: './404' },
];
