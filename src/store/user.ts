import { acceptHMRUpdate, defineStore } from 'pinia';
import ls from '@/utils/local-storage';
import { STORAGE_TOKEN_KEY } from './app';
import type { LoginParams, Role, UserInfo } from '@/api/user/login';
import { postLogout, getCurrentUser, postAccountLogin } from '@/api/user/login';
import type { RouteRecordRaw } from 'vue-router';
import { filterChildRoute, hasAuthority } from '@/utils/authority';
import { filterMenu } from '@/utils/menu-util';
import { default as router, routes } from '@/router';
import type { MenuDataItem } from '@/router/typing';
import { generatorDynamicRouter } from '@/router/generator-routers';

export interface UserState {
  token?: string;
  username: string;
  nickname: string;
  avatar: string;
  role?: Role;
  allowRouters: RouteRecordRaw[];
  extra: {
    [key: string]: any;
  };
  [key: string]: any;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_INFO = 'GET_INFO';
export const GENERATE_ROUTES = 'GENERATE_ROUTES';
export const GENERATE_ROUTES_DYNAMIC = 'GENERATE_ROUTES_DYNAMIC';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_AVATAR = 'SET_AVATAR';
export const SET_ROLE = 'SET_ROLE';
export const SET_INFO = 'SET_INFO';
export const SET_ROUTERS = 'SET_ROUTERS';
export const RESET_CURRENT_USER = 'RESET_CURRENT_USER';

export const initState = (): UserState => ({
  token: '',
  username: '',
  nickname: '',
  avatar: '',
  extra: {},
  role: undefined,
  allowRouters: [],
});

export const useUserStore = defineStore('user', {
  state: initState,
  getters: {
    info: state => state.extra,
    currentUser: state => state,
  },
  actions: {
    [SET_TOKEN](token: string) {
      this.token = token;
      ls.set(STORAGE_TOKEN_KEY, token);
    },
    [SET_INFO](info: Partial<UserInfo> & { userid?: string }) {
      if (info.role) {
        this.role = info.role;
      }
      if (info.userid) {
        this.username = info.userid;
        this.nickname = info.userid;
      }
      if (info.name) {
        this.nickname = info.name;
      }
      if (info.avatar) {
        this.avatar = info.avatar;
      }
      this.extra = { ...info };
    },
    [SET_ROLE](role: UserState['role']) {
      this.role = role;
    },
    [SET_AVATAR](avatar: UserState['avatar']) {
      this.avatar = avatar;
    },
    [SET_ROUTERS](allowRoutes: UserState['allowRouters']) {
      this.allowRouters = allowRoutes;
    },
    [RESET_CURRENT_USER]() {
      this.$reset();
    },

    async [LOGIN](info: LoginParams) {
      return new Promise((resolve, reject) => {
        // call ajax
        postAccountLogin(info)
          .then(res => {
            this.SET_TOKEN(res.token);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async [GET_INFO](): Promise<UserInfo> {
      return new Promise((resolve, reject) => {
        getCurrentUser()
          .then((res: UserInfo) => {
            this.SET_INFO(res);
            resolve(res);
          })
          .catch(err => {
            // 获取登录用户信息后，直接清理掉当前 token 并强制让流程走到登录页
            this.SET_TOKEN(null);
            reject(err);
          });
      });
    },
    // 从路由表构建路由（前端对比后端权限字段过滤静态路由表）
    async [GENERATE_ROUTES](info: UserInfo) {
      return new Promise<RouteRecordRaw[]>(resolve => {
        // 修改这里可以进行接口返回的对象结构进行改变
        // 亦或是去掉 info.role 使用别的属性替代
        // 任何方案都可以，只需要将最后拼接构建好的路由数组使用
        // router.addRoute() 添加到当前运行时的路由中即可
        const { permissions } = (info.role || {}) as Role;
        const allRoutes = filterMenu(routes);
        const permissionsKey = permissions?.map(permission => permission.name);
        const allowRoutes = !permissionsKey
          ? allRoutes
          : allRoutes.filter(route => {
              // parnent route filter
              const hasAllow = hasAuthority(route as MenuDataItem, permissionsKey!);
              if (hasAllow && route.children && route.children.length > 0) {
                // current route children filter
                route.children = filterChildRoute(route as MenuDataItem, permissionsKey!);
              }
              return hasAllow;
            });
        console.log('allowRoutes', allowRoutes);
        // 添加到路由表
        const {
          // eslint-disable-next-line
          children: _,
          ...mainRoute
        } = routes[0];
        const route = {
          ...mainRoute,
          children: allowRoutes,
        };
        router.addRoute(route as RouteRecordRaw);
        this.SET_ROUTERS(allowRoutes as RouteRecordRaw[]);
        resolve(allowRoutes as RouteRecordRaw[]);
      });
    },
    // 从后端获取路由表结构体，并构建前端路由
    async [GENERATE_ROUTES_DYNAMIC]() {
      return new Promise(resolve => {
        generatorDynamicRouter()
          .then(routes => {
            const allowRoutes = routes.children || [];
            // 添加到路由表
            router.addRoute(routes as RouteRecordRaw);
            this.SET_ROUTERS(allowRoutes);
            resolve(routes);
          })
          .catch(err => {
            console.error('generatorDynamicRouter', err);
          });
      });
    },
    async [LOGOUT]() {
      return new Promise<void>(resolve => {
        postLogout().finally(() => {
          this.SET_TOKEN(null);
          this.RESET_CURRENT_USER();
          resolve();
        });
      });
    },
  },
});

const hot = import.meta.webpackHot || (import.meta as any).hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot));
}
