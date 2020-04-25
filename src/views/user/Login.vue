<template>
  <div class="main">
    <h3>
      <span>登录</span>
    </h3>
    <a-form id="formLogin"
            class="user-layout-login"
            ref="formLogin"
            :form="form"
            @submit="handleSubmit"
            autocomplete="off">
      <a-form-item>
        <a-input size="large"
                 type="text"
                 placeholder="手机号"
                 v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入手机号' }]}
              ]">
          <a-icon slot="prefix"
                  type="user"
                  :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input size="large"
                 type="password"
                 autocomplete="false"
                 placeholder="密码"
                 v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }]}
              ]">
          <a-icon slot="prefix"
                  type="lock"
                  :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <a-form-item v-if="false">
        <a-input size="large"
                 type="text"
                 placeholder="手机号"
                 v-decorator="['mobile', {rules: [{ required: false, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }]}]">
          <a-icon slot="prefix"
                  type="mobile"
                  :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-row :gutter="16" v-if="false">
        <a-col class="gutter-row"
               :span="16">
          <a-form-item>
            <a-input size="large"
                     type="text"
                     placeholder="验证码"
                     v-decorator="['captcha', {rules: [{ required: false, message: '请输入验证码' }]}]">
              <a-icon slot="prefix"
                      type="mail"
                      :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row"
               :span="8">
          <a-button class="getCaptcha btn-custom waves-effect waves-light"
                    tabindex="-1"
                    :disabled="state.smsSendBtn"
                    @click.stop.prevent="getCaptcha"
                    v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"></a-button>
        </a-col>
      </a-row>

      <a-form-item>
        <!-- <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >忘记密码</router-link>-->
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button size="large"
                  type="primary"
                  htmlType="submit"
                  class="login-button btn-primary"
                  :loading="state.loginBtn"
                  :disabled="state.loginBtn">确定</a-button>
      </a-form-item>

      <div class="user-login-other">
        <router-link class="register"
                     :to="{ name: 'register' }">注册账户</router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getSmsCode } from '@/api/login'

export default {
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      loginType: 0,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () { },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true
      validateFields((err, values) => {
        // if (!err) { // 输入框验证
        if (!err) { // 输入框未验证
          const loginParams = {
            code: '2345',
            user_name: values.username,
            user_password: values.password
          }
          const restatus = values.rememberMe
          Login(loginParams)
            .then(res => {
              // 延迟 1 秒显示欢迎信息
              if (res.code == 200) {
                // this.$router.push({ name: 'userCenter' })
                this.$router.push('/')
                setTimeout(() => {
                  this.$notification.success({
                    message: '欢迎',
                    description: `${timeFix()}，欢迎回来`
                  })
                }, 1000)
              } else if (res.code == 400) {
                this.$notification.warning({
                  message: '提示',
                  description: res.msg
                })
              }else if (res.code == 401) {
                this.$notification.warning({
                  message: '提示',
                  description: '你无权登陆该系统,请联系管理员解决'
                })
              }
            })
            .catch(err => {
              this.$notification['error']({
                message: '提示',
                description: err.response.data.msg,
                duration: 8
              })
            })
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          state.loginBtn = false
          return false
        }
      })
    },
    getCaptcha (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = this.$message.loading('验证码发送中..', 0)
          getSmsCode({ mobile: values.mobile })
            .then(res => {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            })
            .catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
        }
      })
    },
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess (res) {
      
      // this.$router.push({ name: 'index' })
      // // 延迟 1 秒显示欢迎信息
      // setTimeout(() => {
      //   this.$notification.success({
      //     message: '欢迎',
      //     description: `${timeFix()}，欢迎回来`
      //   })
      // }, 1000)
    },

  }
}
</script>

<style lang="less" scoped>
.main {
  h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }
}
.user-layout-login {
  text-align: left;
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 44px;
    line-height: 0;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
