<template>
  <a-modal :title="controlmsg"
           :width="600"
           :visible="visible"
           :maskClosable="false"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="角色名称">
          <a-input v-decorator="['roleName', {rules: [{ required: true, message: '请输入您要添加的角色名称' }], validateTrigger: 'blur'}]" />
        </a-form-item>

        <a-form-item label="角色描述">
          <a-input v-decorator="['roleDesc', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { addRoleList } from '@/api/manage'
export default {
  name: 'AddRole',
  data () {
    return {
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
      parent_id: '',
      controlmsg: '新增角色'
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () {

  },
  methods: {
    add (item) {
      this.edit({ roleName: '', roleDesc: '' })
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record })
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
          let parameter = {
            role_name: values.roleName,
            role_desc: values.roleDesc
          }
          _this.confirmLoading = true

          addRoleList(parameter).then(res => {
            if (res.code == 200) {
              _this.$message.success('保存成功')
              _this.$emit('ok')
            } else if (res.msg) {
              let errMsg = res.data[0] ? res.data[0] : res.msg
              _this.$message.warning(errMsg)
            }

          }).catch((err) => {
            // Do something

          }).finally(() => {
            _this.confirmLoading = false
            _this.close()
          })
        }
      })
    },
    handleCancel () {
      this.close()
    }
  }
}
</script>
