<template>
  <a-layout class="layout" :class="[device]">

    <template v-if="isSideMenu()">
      <a-drawer
        v-if="isMobile()"
        :wrapClassName="'drawer-sider ' + navTheme"
        :closable="false"
        :visible="collapsed"
        placement="left"
        @close="() => this.collapsed = false"
      >
        <userside-menu
          :menus="menus"
          :theme="navTheme"
          :collapsed="false"
          :collapsible="true"
          mode="inline"
          @menuSelect="menuSelect"></userside-menu>
      </a-drawer>

      <userside-menu
        v-else
        @toggle="toggle"
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :collapsible="true"></userside-menu>
    </template>
    <!-- 下次优化这些代码 -->
    <template v-else>
      <a-drawer
        v-if="isMobile()"
        :wrapClassName="'drawer-sider ' + navTheme"
        placement="left"
        @close="() => this.collapsed = false"
        :closable="false"
        :visible="collapsed"
      >
        <userside-menu
          :menus="menus"
          :theme="navTheme"
          :collapsed="false"
          :collapsible="true"
          mode="inline"
          @menuSelect="menuSelect"></userside-menu>
      </a-drawer>
    </template>

    <a-layout :class="[layoutMode, `content-width-${contentWidth}`]" :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">
      <!-- layout header -->
      <!-- <user-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      /> -->
      <page-view :device="device" @toggle="toggle" :collapsed="collapsed" style="background-color:#ebeff2;"/>
      <!-- layout content -->
      <!-- <a-layout-content :style="{ margin: $store.getters.multiTab ? '24px 24px 0' : '24px 24px 0', height: '100%', paddingTop: fixedHeader ? '64px' : '0' }">
        <slot></slot>
        
      </a-layout-content> -->

      <!-- layout footer -->
      <a-layout-footer style="padding: 0">
        <global-footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import UsersideMenu from '@/components/menu/UserSideMenu'
import UserHeader from '@/components/page/UserHeader'
import GlobalFooter from '@/components/page/GlobalFooter'
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin.js'
import { PageView } from '@/components/layouts'

export default {
  props:['target'],
  name: 'UserLayout',
  components: {
    UsersideMenu,
    UserHeader,
    GlobalFooter,
    PageView
  },
  mixins: [mixin, mixinDevice],
  data () {
    return {
      collapsed: false,
      menus: []
    }
  },
  computed: {
    ...mapState({
      // 主路由
      mainMenu: state => state.permission.addRouters
    }),
    contentPaddingLeft () {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      if (this.sidebarOpened) {
        return '256px'
      }
      return '80px'
    }
  },
  watch: {
    sidebarOpened (val) {
      this.collapsed = !val
    }
  },
  created () {
    this.menus = this.mainMenu.find((item) => item.path === this.target).children
    this.collapsed = !this.sidebarOpened
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggle () {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    paddingCalc () {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '256px' : '80px'
      } else {
        left = this.isMobile() && '0' || (this.fixSidebar && '80px' || '0')
      }
      return left
    },
    menuSelect () {
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    }
  }
}
</script>
