<template>
  <template v-if="computedMenus.length">
    <div style="position:relative">
      <div
      v-if="fixed"
      class="ant-pro-fixed-stuff"
      :style="{
        overflow: 'hidden',
        paddingTop: '70px'
        
      }"
    />
    <a-layout-sider
      v-bind="$attrs"
      :class="{
        [prefixCls]: true,
        [`${prefixCls}-${runtimeTheme}`]: true,
        [`${prefixCls}-${layout}`]: true,
        [`${prefixCls}-fixed`]: fixed,
      }"
      :breakpoint="breakpoint"
      :width="100"
      
      :collapsed="collapsed"
      :collapsible="false"
      :collapsed-width="collapsedWidth"
      :theme="runtimeTheme"
      :style="{

        overflow: 'hidden',
        paddingTop: '70px'
      }"
    >
      <!-- <div v-if="!isMix" class="ant-pro-sider-logo">
        <router-link :to="{ name: 'index' }">
          <img src="@/assets/logo.png" alt="logo" />
          <h1 v-if="!collapsed">一张图</h1>
        </router-link>
      </div> -->
      <div style="flex: 1; overflow: hidden auto">
        <slot name="header" />
        <base-menu
          :theme="runtimeTheme"
          :menus="computedMenus"
          :collapsed="collapsed"
          :selected-keys="selectedKeys"
          :open-keys="openKeys"
          @update:openKeys="handleOpenKeys"
          @update:selectedKeys="handleSelectedKeys"
          @mouseenter="$emit('mouseenter', $event)"
          @mouseleave="$emit('mouseleave', $event)"
          @itemHover="$emit('itemHover', $event)"
          :customItem="customItem"
          under-sider
        />
      </div>
      <div></div>
      <!-- <div :class="`${prefixCls}-links`">
        <a-menu
          v-if="collapsedButton"
          :class="`${prefixCls}-link-menu`"
          :inline-indent="16"
          :theme="runtimeTheme"
          :selected-keys="[]"
          :open-keys="[]"
          mode="inline"
        >
          <a-menu-item
            key="collapsed-button"
            :class="`${prefixCls}-collapsed-button`"
            :title="null"
            @click="handleCollapse"
          >
            <template #icon>
              <slot name="collapsedButton">
                <menu-unfold-outlined v-if="collapsed" />
                <menu-fold-outlined v-else />
              </slot>
            </template>
          </a-menu-item>
        </a-menu>
      </div> -->
    </a-layout-sider>
    <div class="showDiv" :style="{display:searcFlag == true?'none':'block'}" @click="showSearch">展开</div>
    <div class="hideDiv" :style="{display:searcFlag == true?'block':'none'}" @click="hideSearch">收起</div>
    <div class="searchDiv" :style="{display:searcFlag == true?'block':'none'}">searchDiv</div>
    <!-- <div class="searchInput">
       <a-cascader
        v-model:value="value"
        :options="options"
        :show-search="{ filter }"
        placeholder="Please select"
      />
    </div> -->
    </div>
    
    
  </template>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { ref , defineComponent, computed, toRefs } from 'vue';
import { useProProvider } from '../pro-provider/index';
import BaseMenu, { BaseMenuProps } from '../base-menu/index.vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { findMenuChildren } from '@/utils/menu-util';
import { useRoute } from 'vue-router';
import type { LayoutType } from '../typing';
import type { MenuTheme , CascaderProps } from 'ant-design-vue';
import type { Breakpoint } from '@/typing';
import type { ShowSearchType } from 'ant-design-vue/es/cascader';
const SiderMenuProps = Object.assign({}, BaseMenuProps, {
  prefixCls: {
    type: String,
    default: () => undefined,
  },
  breakpoint: {
    type: String as PropType<Breakpoint>,
    default: 'lg',
  },
  siderWidth: {
    type: Number,
    default: 208,
  },
  splitMenus: {
    type: Boolean,
    default: false,
  },
  collapsedButton: {
    type: Boolean,
    default: () => true,
  },
  collapsedWidth: {
    type: Number,
    default: 48,
  },
  headerHeight: {
    type: Number,
    default: 48,
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: () => undefined,
  },
  layout: {
    type: String as PropType<LayoutType>,
    default: 'side',
  },
  fixed: {
    type: Boolean,
    default: () => false,
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  customItem: {
    type: Function,
    default: undefined,
  },
});

export default defineComponent({
  name: 'SiderMenu',
  props: SiderMenuProps,
  inheritAttrs: false,
  emits: [
    'update:openKeys',
    'update:selectedKeys',
    'update:collapsed',
    'mouseenter',
    'mouseleave',
    'itemHover',
  ],
  setup(props, { emit }) {
    const searcFlag = ref(false);
    const showSearch = ()=>{
      searcFlag.value = true;
    };
     const hideSearch = ()=>{
      searcFlag.value = false;
    };

    const options: CascaderProps['options'] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
          {
            value: 'xiasha',
            label: 'Xia Sha',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
          },
        ],
      },
    ],
  },
];

const filter: ShowSearchType['filter'] = (inputValue, path) => {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    };
    const {
      prefixCls: propPrefixCls,
      theme,
      layout,
      collapsed,
      collapsedWidth,
      siderWidth,
      splitMenus,
    } = toRefs(props);
    const route = useRoute();
    const { getPrefixCls } = useProProvider();
    const prefixCls = propPrefixCls.value || getPrefixCls('sider');

    const isMix = computed(() => layout.value === 'mix');
    const runtimeTheme = computed<MenuTheme>(() =>
      layout.value === 'mix' ? 'light' : theme.value,
    );
    const runtimeSideWidth = computed(() =>
      collapsed.value ? collapsedWidth.value : siderWidth.value,
      
    );
    const computedMenus = computed(() =>
      splitMenus.value ? findMenuChildren(props.menus, route.matched[1].name) : props.menus,
    );

    const handleSelectedKeys = (selectedKeys: string[]): void => {
      emit('update:selectedKeys', selectedKeys);
    };
    const handleOpenKeys = (openKeys: string[]): void => {
      emit('update:openKeys', openKeys);
    };
    const handleCollapse = () => {
      emit('update:collapsed', !collapsed.value);
    };

    return {
      prefixCls,
      isMix,
      runtimeTheme,
      runtimeSideWidth,
      computedMenus,

      handleSelectedKeys,
      handleOpenKeys,
      handleCollapse,
      searcFlag,
      showSearch,
      hideSearch,
      options,
      filter,
      value: ref<string[]>([]),
    };
  },
  components: {
    BaseMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    // [Menu.name]: Menu,
    // [Menu.Item.name]: Menu.Item,
  },
});
</script>

<style lang="less">
body {
  @import url('./index.less');
}
body .ant-pro-sider-light .ant-menu-light{
  background: rgba(0,82,185,0.6);
}
body .ant-pro-sider-light .ant-layout-sider-children{
   background: rgba(0,82,185,0.6);
   
}
.ant-menu-vertical > .ant-menu-item, .ant-menu-vertical-left > .ant-menu-item, .ant-menu-vertical-right > .ant-menu-item, .ant-menu-inline > .ant-menu-item, .ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title, .ant-menu-vertical-left > .ant-menu-submenu > .ant-menu-submenu-title, .ant-menu-vertical-right > .ant-menu-submenu > .ant-menu-submenu-title, .ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title{
  height: 60px !important;
  margin: 10 0;
  background-image: rgba(0,82,185,.6) !important;  //左侧背景色
  color: white;
  
  // line-height: 40px;
}
.ant-menu-vertical > .ant-menu-item, .ant-menu-vertical-left > .ant-menu-item .ant-menu-item-selected {
    color: #1890ff;
  }


body .ant-pro-sider .ant-menu-inline .ant-menu-item, body .ant-pro-sider .ant-menu-inline .ant-menu-submenu-title{
  width: 100%;
    padding-left: 10px !important;
    flex-direction: column;
    padding-top: 10px;
    
}

 
.showDiv{
  position: absolute;
    top: 73px;
    left: 100px;
    z-index: 99999;
    width: 25px;
    height: 60px;
    color: white;
    background: #1890ff;
    border-radius: 0 10px 10px 0;
}
.hideDiv{
  position: absolute;
    top: 73px;
    left: 400px;
    z-index: 99999;
    width: 25px;
    height: 60px;
    color: white;
    background: #1890ff;;
    border-radius: 0 10px 10px 0;
}
.searchDiv{
  position: absolute;
    top: 73px;
    left: 100px;
    z-index: 99999;
    width: 300px;
    height: 75%;
    background: #eeeeee;
    // border-radius: 0 10px 10px 0;
}
// .searchInput{
//   position: absolute;
//     top: 50px;
//     left: 100px;
//     z-index: 99999;
//     width: 300px;
//     height: 75%;
//     background: #eeeeee;
// }
</style>
