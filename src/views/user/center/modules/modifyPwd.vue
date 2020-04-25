<template>
  <div class="myedit"
       v-if="visible">
    <a-spin :spinning="confirmLoading">
      <a-form class="add-form"
              :form="form"
              autocomplete="off">
        <a-row :gutter="16">
          <a-col :xs="24"
                 :sm="24"
                 :lg="{span:8,offset:8}"
                 :xl="{span:7,offset:8}"
                 :xxl="{span:6,offset:8}">
            <a-row :gutter="48">
              <a-col :xs="24"
                     :sm="24"
                     :lg="24"
                     class="mylabel">
                <a-form-item label="原密码"
                             :colon="false">
                  <a-input placeholder="请输入原密码"
                            type="password"
                           v-decorator="['user_password',{rules: [{ required: false,  message: '请输入原密码' },{ validator: this.handlePassword }]}]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="24"
                     class="mylabel">
                <a-form-item label="新密码"
                             :colon="false">
                  <a-input placeholder="新密码"
                  type="password"
                           v-decorator="['new_password',{rules: [{ required: false,  message: '至少8位密码，包含大小写字母及数字' },{ validator: this.handlePasswordLevel }]}]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="24"
                     class="mylabel">
                <a-form-item label="确认新密码"
                             :colon="false">
                  <a-input placeholder="确认新密码"
                  type="password"
                           v-decorator="['reform_password',{rules: [{ required: false, message: '密码不一致,请修改' },{ validator: this.testPassword }],validateTrigger: ['blur']}]" />
                </a-form-item>
              </a-col>
            </a-row>

          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="{span:23,offset:0}"
                 style="margin-top:50px;line-height:39px;text-align:center">
            <a-form-item style="padding-left:0;">
              <a-button type="primary"
                        class="waves-effect waves-light"
                        style="margin-right:16px"
                        @click="handleOk">保存</a-button>
              <a-button class="waves-effect waves-light"
                        @click="close">取消</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

    </a-spin>
  </div>
</template>

<script>
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { mapActions, mapGetters } from "vuex";
import { editUser, getDepartment } from '@/api/manage'
import { getUserEdit, putUser, putModifyPassword } from '@/api/common'
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
  data () {
    return {
      visible: true,
      confirmLoading: false,
      mdl: {},
      sourceClassList: [],
      item: {},
      reData: {},
      state: {
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      dpList: [],
      dpDisabled: true
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  mounted () {
    // this.loadPage()
    // this.getDep()

  },
  methods: {
    ...mapActions(["Logout",]),
    ...mapGetters(["msgNum"]),

    loadPage () {
      let uid = this.$store.state.user.roles.id
      this.setForm()
    },
    setForm () {
      const item = {
        user_password: undefined,
        new_password: undefined,
        reform_password: undefined,
      };
      this.mdl = Object.assign({}, item);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...item });
      });
    },
    handlePassword (rule, value, callback) {
      // 判断这个字符串中有没有数字字母
      if (value) {
        callback()
      } else {
        callback(new Error('请输入原密码'))
      }
    },
    handlePasswordLevel (rule, value, callback) {
      // 判断这个字符串中有没有数字字母
      let values = this.form.getFieldsValue()
      if (value) {
        // if (values.user_password == value) {
        //   callback(new Error('新密码不能和原密码相同'))
        //   return
        // }
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(value)) {
          callback()
        } else {
          callback(new Error('密码强度不够,至少8位密码,包含大小写字母及数字'))
        }
      } else {
        callback(new Error('请输入新密码'))
      }
    },
    testPassword (rule, value, callback) {
      let values = this.form.getFieldsValue()
      if (value) {
        if (values.new_password != value) {
          callback(new Error('密码不一致,请修改'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入确认密码'))
      }
    },
    handleOk () {
      const _this = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          const _this = this
          const parameter = {
            user_password: values.user_password,
            new_password: values.new_password,
            reform_password: values.reform_password,
          }
          let uid = this.$store.state.user.roles.id
          putModifyPassword(uid, parameter)
            .then(res => {
              _this.confirmLoading = false
              if (res.code == 200) {
                _this.$notification['success']({
                  message: '提示',
                  description: '密码修改成功，请重新登陆',
                  duration: 8
                })
                _this.$ls.remove(ACCESS_TOKEN)
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
              } else if (res.code == 400) {
                _this.$message.warning(res.msg)
              }else if (res.code == 401) {
                _this.$message.warning(res.msg)
              }
            })
            .catch(err => {
              // Do something
              _this.$error({
                title: '修改失败',
                content: '密码修改失败,请稍后重试'
              })
              _this.confirmLoading = false
            })
            .finally(() => { })
        }
      })
    },
    close () {
      this.setForm(this.reData)
    },
  }
};
</script>

<style lang="less" scoped>
.myedit {
  padding: 100px 20px 60px;
  .ant-form-item {
    display: flex;
  }
}
</style>
<style scoped>
.ant-form-item {
  padding-left: 106px;
}
.ant-form-item >>> .ant-form-item-control-wrapper {
  flex: 1;
}
.ant-form-item >>> .ant-form-item-label {
  width: 106px;
  position: absolute;
  left: 0;
  top: 0;
  text-align: right;
}
</style>

