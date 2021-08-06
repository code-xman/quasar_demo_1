
const routes = [
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/myLayout.vue'),
    children: [
      { path: 'test1', component: () => import('pages/demo/test.vue') },
      { path: 'demo1', component: () => import('pages/demo/demo1.vue') },
      { path: 'demo2', component: () => import('pages/demo/demo2.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
