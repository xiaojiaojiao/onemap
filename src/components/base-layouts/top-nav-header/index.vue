<template>
  <div :class="classNames" style="position:relative">
    <div ref="headRef" :class="headerClassName">
      <div :class="`${prefixedClassName}-main-left`" @click="handleMenuHeaderClick">
        <div :class="`${prefixedClassName}-logo`" key="logo" id="logo">
          <slot v-if="hasLogoSlot" name="logo" />
          <div v-else>
            <a @click="toGuanwang">
              <img src="@/assets/logo.png" alt="logo" />
              
              <!-- <img src="@/assets/logoonemap.png"  style="height:80px"/> -->
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style="height:80px;font-size: 25px;color: white;">山东水文公众服务一张图</span>
          </div>
        </div>
      </div>
      <div :style="{ flex: 1 }" :class="`${prefixedClassName}-menu`">
        <base-menu
          v-if="menus && menus.length > 0"
          mode="horizontal"
          :theme="theme"
          :menus="menus"
          :open-keys="openKeys"
          :selected-keys="selectedKeys"
          @update:openKeys="handleOpenKeys"
          @update:selectedKeys="handleSelectedKeys"
        />
      </div>
      <!-- <div class="toggle">
        <div :style="{display:searcFlag == true?'none':'block'}" @click="showSearch"><caret-down-outlined /></div>
        <div :style="{display:searcFlag == true?'block':'none'}" @click="hideSearch"><caret-up-outlined /></div>
      </div> -->
      <!-- <right-content>
        <slot name="rightContent" />
      </right-content> -->
    </div>
    <div class="detail" :style="{display:searcFlag == true?'block':'none'}"></div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { ref , defineComponent, computed, toRefs } from 'vue';

import { useProProvider } from '../pro-provider/index';
import BaseMenu from '@/components/base-layouts/base-menu/index.vue';
import RightContent from '../top-nav-header/right-content.vue';
import type { RouteProps } from '../typing';
import type { MenuTheme } from 'ant-design-vue';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  props: {
    prefixCls: {
      type: String,
      default: undefined,
    },
    layout: {
      type: String,
      default: 'side',
    },
    theme: {
      type: String as PropType<MenuTheme>,
      default: 'dark',
    },
    contentWidth: {
      type: String,
      default: 'Fluid',
    },

    // menu
    menus: {
      type: Array as PropType<RouteProps[]>,
      default: () => [],
    },
    openKeys: {
      type: Array as PropType<string[]>,
      required: true,
    },
    selectedKeys: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  emits: ['update:openKeys', 'update:selectedKeys'],
  setup(props, { slots, emit }) {

    const searcFlag = ref(false);
    const showSearch = ()=>{
      searcFlag.value = true;
    };
     const hideSearch = ()=>{
      searcFlag.value = false;
    };


    const { theme, contentWidth, prefixCls: customizePrefixCls } = toRefs(props);
    const { getPrefixCls } = useProProvider();
    const prefixedClassName = customizePrefixCls.value || getPrefixCls('top-nav-header');

    const hasMix = computed(() => props.layout === 'mix');
    const classNames = computed(() => {
      return {
        [prefixedClassName]: true,
        ['light']: theme.value === 'light',
        height:'60px',
        lineHeight:'60px',
      };
    });
    const headerClassName = computed(() => {
      return {
        [`${prefixedClassName}-main`]: true,
        ['wide']: contentWidth.value === 'Fixed',
         height:'60px',
        lineHeight:'60px',
      };
    });
    const { logo: hasLogoSlot } = slots;

    /** events */
    const handleSelectedKeys = (selectedKeys: string[]): void => {
      emit('update:selectedKeys', selectedKeys);
    };
    const handleOpenKeys = (openKeys: string[]): void => {
      emit('update:openKeys', openKeys);
    };
    const handleMenuHeaderClick = (): void => {};

    const toGuanwang = ()=>{
      window.open('http://sdswj.sdwr.org.cn/');
    };

    return {
      classNames,
      headerClassName,
      prefixedClassName,
      hasMix,
      hasLogoSlot,

      handleSelectedKeys,
      handleOpenKeys,
      handleMenuHeaderClick,

      searcFlag,
      showSearch,
      hideSearch,
      toGuanwang,
    };
  },
  components: {
    BaseMenu,
    RightContent,
    CaretUpOutlined,
    CaretDownOutlined,
  },
});
</script>

<style lang="less">
body {
  @import url('./index.less');
  .ant-pro-basicLayout {
    height: 100%;
    // .ant-layout-header.ant-pro-fixed-header{
    //    height: 73px !important;
    // line-height: 73px !important;
    // }
  }
  
}

.ant-layout-header{
  background-color: #1890ff;
  background-image: url('../../../assets/bodybj.png');
  background-size: 100%;
}
body .ant-pro-top-nav-header-logo img{
  height: 40px;
}
.toggle{
      width: 40px;
    flex-direction: row;
    display: flex;
}
.detail{
  position: absolute;
  height: 500px;
  width: 250px;
  background:hsla(0,0%,100%,.8);
  right: 0;
}


</style>
