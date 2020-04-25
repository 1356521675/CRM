<template>
  <div class="sider-menu">
    <a-layout-sider :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
                    width="256px"
                    :collapsible="collapsible"
                    v-model="collapsed"
                    :trigger="null">
      <logo v-show="device==='mobile'" />
      <s-menu :collapsed="collapsed"
              :menu="menus"
              theme="light"
              :mode="mode"
              @click="onClick"
              @select="onSelect"
              style="padding: 16px 0px;"></s-menu>
      <a-icon v-show="device!=='mobile'"
              class="trigger mytrigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="toggle"></a-icon>
    </a-layout-sider>

  </div>

</template>

<script>
import ALayoutSider from 'ant-design-vue/es/layout/Sider'
import Logo from '../tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin.js'

export default {
  name: 'SideMenu',
  components: { ALayoutSider, Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect (obj) {
      // this.$emit('menuSelect', obj)
    },
    onClick (obj) {
      this.$emit('menuSelect', obj)
    },
    toggle () {
      // this.collapsed= !this.collapsed
      this.$emit('toggle');
    }
  }
}
</script>

<style lang="less">
.sider-menu {
  position: relative;
  display: inline-block;
}
.mytrigger {
  position: absolute;
  bottom: 0;
  right: 4px;
}
</style>
