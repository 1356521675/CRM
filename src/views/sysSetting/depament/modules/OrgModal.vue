<template>
  <a-modal :title="controlmsg"
           :width="600"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           :maskClosable="false"
           @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="上级部门">
          <a-input v-decorator="['parentName', {}]"
                   disabled />
        </a-form-item>

        <a-form-item label="新增部门">
          <a-input v-decorator="['orgName', {rules: [{ required: true, message: '请输入您要添加的部门名称' }], validateTrigger: 'blur'}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { addDepartment } from '@/api/manage'
export default {
  name: 'OrgModal',
  props: {
    treedata: {
      type: Array,
    },
  },
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
      org_id: '',
      controlmsg: '新增部门'
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () {

  },
  methods: {
    add (item) {
      this.parent_id = item.department_id
      this.org_id = item.org_id
      this.edit({ parentName: item.department_name, orgName: '' })
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
            accessToken: _this.$store.getters.token,
            department_name: values.orgName,
            parent_id: _this.parent_id,
            org_id: _this.org_id
          }
          _this.confirmLoading = true

          addDepartment(parameter).then(res => {
            _this.$message.success('保存成功')
            _this.$emit('ok')
          }).catch((err) => {
            
            _this.$error({
              title: '添加失败',
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
