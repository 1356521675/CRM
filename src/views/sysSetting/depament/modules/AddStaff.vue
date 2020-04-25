<template>
  <a-modal :title="title"
           :visible="visible"
           :width="700"
           :confirmLoading="confirmLoading"
           :maskClosable="false"
           @ok="handleOk"
           @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form"
              autocomplete="off">
        <a-row :gutter="18">
          <a-col :xs="24"
                 :sm="24"
                 :lg="12">
            <a-form-item label="账号/手机号">
              <a-input v-decorator="['phone', {rules: [{ required: true, message: '请输入手机号' }], validateTrigger: 'blur'}]"
                       placeholder="请输入手机号" />
            </a-form-item>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="12">
            <a-form-item label="姓名">
              <a-input v-decorator="['nick_name', {rules: [{ required: true, message: '请输入姓名' }], validateTrigger: 'blur'}]"
                       placeholder="请输入姓名" />
            </a-form-item>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="12"
                 class="mylabel"
                 v-if="!addOperate">
            <a-form-item label="性别"
                         :colon="false">
              <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                        v-decorator="['gender',{rules: [{ required: true, message: '请选择性别' }]}]"
                        placeholder="请选择性别">
                <a-select-option :value="1">男</a-select-option>
                <a-select-option :value="2">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="12">
            <a-form-item label="企业QQ">
              <a-input v-decorator="['firm_qq', {rules: [{ required: true, message: '请输入QQ号码' }], validateTrigger: 'blur'}]" />
            </a-form-item>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="12">
            <a-form-item label="微信">
              <a-input v-decorator="['user_wx', {rules: [{ required: true, message: '请输入微信号' }], validateTrigger: 'blur'}]" />
            </a-form-item>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="12">
            <a-form-item label="邮箱">
              <a-input v-decorator="['email', {rules: [{ required: !addOperate, message: '请填写邮箱' }], validateTrigger: 'blur'}]" />
            </a-form-item>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="12"
                 v-if="addOperate">
            <a-form-item label="登陆密码">
              <a-input autocomplete="false"
                       placeholder="至少8位密码，区分大小写"
                       v-decorator="[
            'user_password',
            {rules: [{ required: addOperate, min:8, message: '至少8位密码，区分大小写' },{ validator: this.handlePasswordLevel }],validateTrigger: ['change', 'blur']}
          ]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="12"
                 v-if="!addOperate">
            <a-form-item label="部门">
              <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                        placeholder="请选择部门"
                        style="width: 100%"
                        @change="dpSltChange"
                        :disabled="dpDisabled"
                        v-decorator="['dpId',{rules: [{ required: true, message: '请选择部门!' }]}]">
                <a-select-opt-group  v-for="item in dpdata" :key="item.department_id" :label="item.department_name">
                  <a-select-option v-for="list in item.children"
                                 :key="list.department_id">{{list.department_name}}</a-select-option>
                </a-select-opt-group>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="12"
                 v-if="!addOperate">
            <a-form-item label="账号状态">
              <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                        placeholder="账号状态"
                        style="width: 100%"
                        v-decorator="['status',{rules: [{ required: true, message: '账号状态!' }]}]">
                  <a-select-option :key="1">开启</a-select-option>
                  <a-select-option :key="2">关闭</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="12"></a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="12"></a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mapActions } from "vuex";
import { addNewUser, editUser, addDpUser, getEditUser } from '@/api/manage'
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
  name: 'AddStaff',
  props: {
    dpdata: {
      type: Array,
      default: [{}]
    }
  },
  data () {
    return {
      title: '新建员工',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {},
      state: {
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      addOperate: true,
      id: '',
      dpId: '',
      userInfo: {},
      dpDisabled:false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () {
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
    ...mapActions(["setCusName"]),
    handlePasswordLevel (rule, value, callback) {
      let level = 0
      if (!this.addOperate && !value) {
        callback()
        return
      }
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
    add () {
      this.title = '新建员工'
      this.addOperate = true
      let record = {}
      this.form.resetFields()
      this.visible = true
    },
    edit (row, id) {
      this.form.resetFields()
      let record = {}
      this.title = '编辑员工--' + row[0].user_name
      this.visible = true
      this.addOperate = false
      this.id = row[0].user_id
      getEditUser(this.id).then(res => {
        this.userInfo = res.data
        if (res.data.department_user&&res.data.department_user.department_id) {
          this.dpDisabled = true
        } else {
          this.dpDisabled = false
        }
        record = {
          dpId: res.data.department_user ? res.data.department_user.department_id : undefined,
          nick_name: res.data.user_name,
          firm_qq: res.data.firm_qq,
          phone: res.data.phone,
          user_wx: res.data.user_wx,
          email: res.data.email,
          gender: res.data.gender.value,
          status: res.data.status
        }
        this.mdl = Object.assign({}, record)
        this.$nextTick(() => {
          this.form.setFieldsValue({ ...record })
        })
      })

    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleOk () {
      const _this = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          if (_this.addOperate) {
            _this.addNewStaff(values)
          } else {
            _this.editStaff(values)
          }
        }
      })
    },
    handleCancel () {
      this.close()
    },
    addNewStaff (values) {
      const _this = this
      const parameter = {
        user_name: values.nick_name,
        user_password: values.user_password,
        nick_name: values.nick_name,
        phone: values.phone,
        firm_qq: values.firm_qq,
        user_wx: values.user_wx,
        email: values.email
      }
      addNewUser(parameter)
        .then(res => {
          if (res.code == 200) {
            _this.$message.success('保存成功')
            _this.$emit('ok')
            _this.confirmLoading = false
            _this.close()
          } else if (res.code == 400) {
            let errmsg = ''
            if (res.data) {
              errmsg = res.data[0]
            } else {
              errmsg = res.msg
            }
            _this.$error({
              title: '未成功',
              content: errmsg
            })
            _this.confirmLoading = false
          }
        })
        .catch(err => {
          // Do something
          _this.$error({
            title: '未成功',
            content: err.response.data.msg
          })
          _this.confirmLoading = false
        })
        .finally(() => { })
    },
    editStaff (values) {
      
      const _this = this
      const parameter = {
        user_name: values.user_name,
        phone: values.phone,
        firm_qq: values.firm_qq,
        user_wx: values.user_wx,
        department_id: values.dpId,
        email: values.email,
        status: values.status
      }
      if (values.user_password) {
        editUser(parameter, _this.id)
          .then(res => {
            _this.confirmLoading = false
            if (res.code == 200) {
              _this.close()
              _this.$message.success('保存成功')
              // _this.setCusName(parameter.user_name)
              _this.$emit('ok')
            } else if (res.code == 400) {
              _this.$message.warning(res.msg)
            }
          })
          .catch(err => {
            // Do something
            _this.$error({
              title: '修改失败',
              content: err.response.data.msg
            })
            _this.confirmLoading = false
          })
          .finally(() => { })
      } else {
        let parameters = {
          nick_name: values.nick_name,
          phone: values.phone,
          firm_qq: values.firm_qq,
          user_wx: values.user_wx,
          department_id: values.dpId,
          email: values.email,
          gender: values.gender,
          status: values.status
        }
        editUser(parameters, _this.id)
          .then(res => {
            _this.confirmLoading = false
            if (res.code == 200) {
              _this.close()
              _this.$message.success('保存成功')
              _this.$emit('ok')
            } else if (res.code == 400) {
              _this.$message.warning(res.msg)
            }
          })
          .catch(err => {
            // Do something
            _this.$error({
              title: '修改失败',
              content: err.response.data.msg
            })
            _this.confirmLoading = false
          })
          .finally(() => { })
      }
    },
    dpSltChange (value) {
      this.dpId = value
    }
  }
}
</script>
