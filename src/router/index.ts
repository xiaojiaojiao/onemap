import type { Component } from 'vue';
import { defineAsyncComponent, h } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import type { MenuDataItem } from './typing';
import Layout from '@/layouts/index.vue';
// import UserLayout from '@/layouts/user-layout.vue';
import UserLayout2 from '@/layouts/user-layout2.vue';
// import RouteView from '@/layouts/route-view.vue';

// const AsyncWorkplace = defineAsyncComponent(
//   () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/workplace/index.vue'),
// );
export const routes: MenuDataItem[] = [
  {
    name: 'index',
    path: '/',
    redirect: '/oneMap',
    component: Layout,
    children: [
      {
        path: '/oneMap',
        name: 'oneMap',
        meta: { icon: 'TableOutlined', title: '预警', lock: true },
        component: (): Component =>
        import(/* webpackChunkName: "dashboard" */ '@/views/oneMap/oneMap.vue'),
        // component: h(RouteView, null, () => h(AsyncWorkplace)),
      },
      {
        path: '/warning',
        name: 'Warning',
        meta: { icon: 'TableOutlined', title: '预警', lock: true },
        component: (): Component =>
        import(/* webpackChunkName: "dashboard" */ '@/views/warning/warning.vue'),
        // component: h(RouteView, null, () => h(AsyncWorkplace)),
      },
      // dashboard
      {
        path: '/weather',
        name: 'weather',
        meta: { icon: 'TableOutlined', title: '气象' },
        component: (): Component =>
          import(/* webpackChunkName: "dashboard" */ '@/views/weather/weather.vue'),
      },

      // form
      {
        path: '/rain',
        name: 'rain',
        meta: { title: '降水', icon: 'TableOutlined' },
        component: (): Component =>
          import(/* webpackChunkName: "form" */ '@/views/rain/rain.vue'),
      },


      // list
      {
        path: '/river',
        name: 'river',
        meta: { title: '河道', icon: 'TableOutlined'  },
        component: (): Component =>
          import(/* webpackChunkName: "list" */ '@/views/river/river.vue'),
      },


      // exception
      {
        name: 'reservoir',
        path: '/reservoir',
        meta: { title: '水库', icon: 'TableOutlined' },
        component: () =>
          import(/* webpackChunkName: "exception" */ '@/views/reservoir/reservoir.vue'),
      },


      // result
      {
        name: 'drought',
        path: '/drought',
        meta: { title: '旱情', icon: 'TableOutlined'  },
        component: () => import(/* webpackChunkName: "result" */ '@/views/drought/drought.vue'),
      },

      // system
      {
        path: '/website',
        name: 'website',
        meta: { title: '网站', icon: 'TableOutlined' },
        component: (): Component =>
          import(/* webpackChunkName: "system" */ '@/views/website/website.vue'),
      },
    

      // jump url
      {
        path: '/stationInfo',
        name: 'stationInfo',
        meta: { title: '测站信息', icon: 'TableOutlined' },
        component: (): Component =>
          import(/* webpackChunkName: "jumpUrl" */ '@/views/stationInfo/stationInfo.vue'),
      },
     
    ],
  },
];

export const staticRoutes: MenuDataItem[] = [
  {
    path: '/test',
    name: 'test',
    meta: { title: 'form.basicform.basic.title' },
    component: (): Component =>
      import(/* webpackChunkName: "other" */ '@/views/form/basic-form/index.vue'),
  },
  {
    path: '/user',
    name: 'user',
    meta: { hideInMenu: true, title: 'pages.layouts.userLayout.title' },
    component: UserLayout2,
    children: [
      {
        path: '/user/login',
        name: 'login',
        meta: { title: 'pages.login.accountLogin.tab' },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/login.vue'),
      },
      {
        path: '/user/register',
        name: 'register',
        meta: { title: 'pages.login.registerAccount' },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/register.vue'),
      },
      {
        path: '/user/register-result',
        name: 'register-result',
        meta: { title: 'pages.login.registerAccount' },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/register-result.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import(/* webpackChunkName: "exception" */ '@/views/exception/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes: staticRoutes as RouteRecordRaw[],
  scrollBehavior: (to, from) => {
    if (to.path !== from.path) {
      setTimeout(() => {
        document.getElementById('app').scrollTop = 0;
      });
    }
    return { top: 0 };
  },
});

export default router;
