<template>
  <div class="main user-layout-register">
    <h3 @click="countDown">
      <span>注册</span>
    </h3>
    <a-form ref="formRegister"
            :form="form"
            id="formRegister"
            @submit="handleSubmit"
            autocomplete="off">
      <a-form-item>
        <a-input size="large"
                 type="text"
                 v-decorator="[
          'user_name',
          {rules: [{ required: true, message: '请输入您的姓名' }],validateTrigger: ['change', 'blur']}
        ]"
                 placeholder="请输入您的姓名" />
      </a-form-item>
      <a-popover placement="rightTop"
                 trigger="click"
                 :visible="state.passwordLevelChecked">
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              强度：
              <span>{{ passwordLevelName }}</span>
            </div>
            <a-progress :percent="state.percent"
                        :showInfo="false"
                        :strokeColor=" passwordLevelColor " />
            <!-- <div style="margin-top: 10px;">
              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
            </div> -->
          </div>
        </template>
        <a-form-item>
          <a-input size="large"
                   type="password"
                   @click="handlePasswordInputClick"
                   autocomplete="false"
                   placeholder="至少8位密码，区分大小写"
                   v-decorator="[
            'password',
            {rules: [{ required: true, min:8, message: '至少8位密码，区分大小写' },{ validator: this.handlePasswordLevel }],validateTrigger: ['change', 'blur']}
          ]"></a-input>
        </a-form-item>
      </a-popover>

      <a-form-item>
        <a-input size="large"
                 type="password"
                 autocomplete="false"
                 placeholder="确认密码"
                 v-decorator="[
          'password2',
          {rules: [{ required: true, message: '至少8位密码，区分大小写' }, { validator: this.handlePasswordCheck }],}
        ]"></a-input>
      </a-form-item>

      <a-form-item>
        <a-input size="large"
                 placeholder="11 位手机号"
                 v-decorator="[
        'phone',
        {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }
        ]">
          <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                    slot="addonBefore"
                    size="large"
                    defaultValue="+86">
            <a-select-option value="+86">+86</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <!--<a-input-group size="large" compact>
            <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                            style="width: 20%" size="large" defaultValue="+86">
              <a-select-option value="+86">+86</a-select-option>
              <a-select-option value="+87">+87</a-select-option>
            </a-select>
            <a-input style="width: 80%" size="large" placeholder="11 位手机号"></a-input>
      </a-input-group>-->

      <a-row :gutter="16">
        <a-col class="gutter-row"
               :span="14">
          <a-form-item>
            <a-input size="large"
                     type="text"
                     placeholder="验证码"
                     v-decorator="[
            'captcha',
            {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}
            ]">
              <a-icon slot="prefix"
                      type="mail"
                      :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row"
               :span="10">
          <a-button class="getCaptcha btn-custom waves-effect waves-light"
                    size="large"
                    :disabled="state.smsSendBtn"
                    @click.stop.prevent="getCaptcha"
                    v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"></a-button>
        </a-col>
      </a-row>

      <a-form-item style="text-align:left;">
        <a-button size="large"
                  type="primary"
                  htmlType="submit"
                  class="register-button btn-primary waves-effect waves-light"
                  :loading="registerBtn"
                  :disabled="registerBtn">注册</a-button>
        <router-link class="login"
                     :to="{ name: 'login' }">使用已有账户登录</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin.js'
import { getSmsCode, register } from '@/api/login'

const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default {
  name: 'Register',
  components: {
  },
  mixins: [mixinDevice],
  data () {
    return {
      form: this.$form.createForm(this),

      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false
    }
  },
  computed: {
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  methods: {

    handlePasswordLevel (rule, value, callback) {
      let level = 0
      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('密码强度不够'))
      }
    },

    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      // 
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    handlePhoneCheck (rule, value, callback) {
      // 
      // 
      // 

      callback()
    },

    handlePasswordInputClick () {
      if (!this.isMobile()) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = true
    },

    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let reform = {
            code: values.captcha,
            phone: values.phone,
            user_password: values.password,
            user_name: values.user_name,
          }
          register(reform).then(res => {
            if (res.code == 200) {
              this.countDown()
              // this.$notification['success']({
              //   message: '提示',
              //   description: res.msg + ',请返回登录页登录',
              //   duration: 12
              // })
              // this.$router.push({ name: 'login' })
            } else {
              this.$notification['error']({
                message: '提示',
                description: res.msg,
                duration: 8
              })
            }
          }).catch(err => {
            
            this.$notification['error']({
              message: '提示',
              description: err.response.data.msg,
              duration: 8
            })
          })
        }
      });
    },

    countDown() {
      let _this= this
      let secondsToGo = 10;
      const modal = this.$success({
        title: '注册成功',
        content: `请返回登录页登录， ${secondsToGo}s后自动跳转登录页.`,
        okText: '立即登录',
        zIndex: 10001,
        center: true,
        onOk () {
          _this.$router.push({ name: 'login' })
        }
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `请返回登录页登录， ${secondsToGo}s后自动跳转登录页.`,
        });
      }, 1000);
      setTimeout(() => {
        _this.$router.push({ name: 'login' })
        clearInterval(interval)
        modal.destroy()
      }, secondsToGo * 1000);
    },
    getCaptcha (e) {
      e.preventDefault()
      const that = this

      this.form.validateFields(['phone'], { force: true },
        (err, values) => {
          if (!err) {
            this.state.smsSendBtn = true

            const interval = window.setInterval(() => {
              if (that.state.time-- <= 0) {
                that.state.time = 60
                that.state.smsSendBtn = false
                window.clearInterval(interval)
              }
            }, 1000)

            const hide = this.$message.loading('验证码发送中..', 0)

            // setTimeout(hide, 2500)

            // setTimeout(function () {
            //   that.$notification['success']({
            //     message: '提示',
            //     description: '验证码获取成功，您的验证码为：2345',
            //     duration: 8
            //   })
            // }, 2800)

            getSmsCode(values.phone).then(res => {
              if (res.code == 200) {
                setTimeout(hide, 10)
                this.$notification['success']({
                  message: '提示',
                  description: '短信激活码已发送,请您在10分钟内填写。',
                  duration: 8
                })
              } else {
                setTimeout(hide, 1)
                clearInterval(interval)
                that.state.time = 60
                that.state.smsSendBtn = false
                this.requestFailed(res)
              }
            }).catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              that.state.time = 60
              that.state.smsSendBtn = false
              this.requestFailed(err)
            })
          }
        }
      )
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || err.msg ||'请求出现错误，请稍后再试',
        duration: 4
      })
      this.registerBtn = false
    }
  },
  watch: {
    'state.passwordLevel' (val) {
      
    }
  }
}
</script>
<style lang="less" scoped>
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  text-align: left;
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
