import type { Component } from 'vue';
import { defineAsyncComponent, h } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import type { MenuDataItem } from './typing';
import Layout from '@/layouts/index.vue';
// import UserLayout from '@/layouts/user-layout.vue';
import UserLayout2 from '@/layouts/user-layout2.vue';
import RouteView from '@/layouts/route-view.vue';

const AsyncWorkplace = defineAsyncComponent(
  () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/workplace/index.vue'),
);
export const routes: MenuDataItem[] = [
  {
    name: 'index',
    path: '/',
    redirect: '/workplace',
    component: Layout,
    children: [
      {
        path: '/workplace',
        name: 'Workplace',
        meta: { icon: 'TableOutlined', title: 'pages.dashboard.workplace.title', lock: true },
        component: h(RouteView, null, () => h(AsyncWorkplace)),
      },
      // dashboard
      {
        path: '/dashboard/welcome',
        name: 'welcome',
        meta: { icon: 'TableOutlined', title: 'pages.dashboard.welcome.title' },
        component: (): Component =>
          import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/workplace2/index.vue'),
      },

      // form
      {
        path: '/form/step-form',
        name: 'step-form',
        meta: { title: 'form.stepform.basic.title', icon: 'TableOutlined' },
        component: (): Component =>
          import(/* webpackChunkName: "form" */ '@/views/form/step-form/index.vue'),
      },


      // list
      {
        path: '/list/table-list',
        name: 'table-list',
        meta: { title: 'pages.list.tablelist.title', icon: 'TableOutlined'  },
        component: (): Component =>
          import(/* webpackChunkName: "list" */ '@/views/list/table-list/index.vue'),
      },


      // exception
      {
        name: 'exception403',
        path: '/exception/403',
        meta: { title: 'pages.exception.403.title', icon: 'TableOutlined' },
        component: () =>
          import(/* webpackChunkName: "exception" */ '@/views/exception/403.vue'),
      },


      // result
      {
        name: 'result-success',
        path: '/result/success',
        meta: { title: 'pages.result.success.title', icon: 'TableOutlined'  },
        component: () => import(/* webpackChunkName: "result" */ '@/views/result/success.vue'),
      },

      // system
      {
        path: '/system/role-list',
        name: 'role-list',
        meta: { title: 'pages.system.role-list.title', icon: 'TableOutlined' },
        component: (): Component =>
          import(/* webpackChunkName: "system" */ '@/views/system/role-list.vue'),
      },
    

      // jump url
      {
        path: '/jump-url/router',
        name: 'jumpUrlExamples',
        meta: { title: 'pages.jumpUrl.router.title', icon: 'TableOutlined' },
        component: (): Component =>
          import(/* webpackChunkName: "jumpUrl" */ '@/views/examples/jump-url/index.vue'),
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
