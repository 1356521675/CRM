<template>
  <div class="user-wrapper" :class="{'collapsed': myclass}">
    <div class="userimg">
      <img :src="avatar()" alt>
    </div>
    <p class="name">{{ nickname() }}</p>

    <div class="saction">
      <!-- <header-notice class="action"/> -->
      <router-link :to="{ name: 'settings' }">
        <a-icon type="setting" style="color:#9ba6ad;"/>
      </router-link>
      <a href="javascript:;" @click="handleLogout">
        <a-icon type="logout"/>
      </a>
    </div>
  </div>
</template>

<script>
import HeaderNotice from './HeaderNotice'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  props: ['myclass'],
  components: {
    HeaderNotice
  },
  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar']),
    handleLogout() {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk() {
          return that
            .Logout({})
            .then(() => {
              window.location.reload()
            })
            .catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    }
  },
  mounted() {
    
  }
}
</script>

<style lang="less" scoped>
.user-wrapper {
  padding: 40px 20px 20px;
  .userimg {
    margin: 0 auto;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: 1px solid #eaedf0;
    box-sizing: border-box;
    padding: 2px;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .name {
    line-height: 38px;
    font-size: 16px;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 0;
  }
  .saction {
    text-align: center;
    a {
      margin: 4px;
    }
  }
}

.collapsed {
  padding: 20px 0 0;
  .userimg {
    margin: 0 auto;
    width: 38px;
    height: 38px;
    border-radius: 50px;
    border: 1px solid #eaedf0;
    box-sizing: border-box;
    padding: 1px;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
   .name {
    line-height: 38px;
    font-size: 12px;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 0;
  }
}
</style>

