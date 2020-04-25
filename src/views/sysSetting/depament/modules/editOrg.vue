<template>
  <a-modal
    :title="controlmsg"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    :maskClosable="false"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="原名称"
        >
          <a-input v-decorator="['orgName', {rules: [{ required: true, message: '请输入名称' }], validateTrigger: 'blur'}]" read-only />
        </a-form-item>
      </a-form>
       <a-form :form="form">
        <a-form-item
          label="改后名称"
        >
          <a-input v-decorator="['org_name', {rules: [{ required: true, message: '请输入名称' }], validateTrigger: 'blur'}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { editOrg } from '@/api/manage'
export default {
  name: 'editOrgModal',
 
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
      org_id:'',
      controlmsg:'修改名称'
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () {
    
  },
  methods: {
    add (item) {
      this.org_id= item.org_id
      this.edit({ orgName:item.org_name, org_name:item.org_name})
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
         
          _this.confirmLoading = true

          editOrg({org_name:values.org_name},this.org_id).then(res => {
            _this.$message.success('保存成功')
            _this.$emit('ok')
          }).catch((err) => {
            
            _this.$error({
              title: '修改失败',
              content: err.response.data.msg,
            });
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
