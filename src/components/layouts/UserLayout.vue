<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <!-- <img src="~@/assets/images/logo21.png" class="logo" alt="logo"> -->
            <span class="title"></span>
          </a>
        </div>
        <div class="desc" style="font-size:22px;">
          欢迎登录CRM客户管理
        </div>
        <route-view></route-view>
      </div>
      <div class="footer">
        <div class="links">
          <a href="javascript:;">帮助</a>
          <a href="javascript:;">隐私</a>
          <a href="javascript:;">条款</a>
        </div>
        <div class="copyright">
          Copyright &copy; 2019 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RouteView from '@/components/layouts/RouteView'
import { mixinDevice } from '@/utils/mixin.js'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {}
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 96%;
          box-sizing: border-box;
          padding: 10px;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(~@/assets/images/bg1.jpg) no-repeat center center;
      background-size: cover;
      // padding: 110px 0 144px;
      position: relative;

      a {
        text-decoration: none;
      }

      .top {
        text-align: center;
        position: absolute;
        width: 100%;
        left: 0;
        top: 44%;
        transform: translateY(-50%);
        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 60px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.8);
          margin-top: 18px;
          margin-bottom: 24px;
        }
      }

      .main {
        min-width: 260px;
        width: 408px;
        margin: 0 auto;
        background-color: rgba(255,255,255,.6);
        padding: 22px;
        border-radius: 8px;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>
