<template>
  <a-modal title="编辑部门信息"
           :width="600"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           :maskClosable="false"
           @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- <a-form-item label="上级部门">
          <a-input v-decorator="['parentId', {}]"
                   disabled />
        </a-form-item> -->
        <a-form-item label="上级部门">
          <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                    placeholder="请选择部门"
                    style="width: 100%"
                    :disabled="true"
                    v-decorator="['parentId',{rules: [{ required: true, message: '请选择部门!' }]}]">
            <a-select-opt-group  v-for="item in dpdata" :key="item.department_id" :label="item.department_name">
                  <a-select-option v-for="list in item.children"
                                 :key="list.department_id">{{list.department_name}}</a-select-option>
                </a-select-opt-group>
          </a-select>
        </a-form-item>
        <a-form-item label="部门名称">
          <a-input v-decorator="['orgName',  {rules: [{ required: true, message: '请输入部门名称' }], validateTrigger: 'blur'}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { editDepartment } from '@/api/manage'
export default {
  name: 'OrgModal',
  props: {
    dpdata: {
      type: Array,
      default: [{}]
    }
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
      id: '',
      depInfo:{}
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () { },
  methods: {
    edit (item) {
      this.depInfo= item
      this.id = item.department_id
      let record = {
        parentId: item.parent_id == 0 ? '某某公司' : item.parent_id,
        orgName: item.department_name
      }
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
          editDepartment({ department_name: values.orgName ,parent_id:values.parentId}, this.id)
            .then(res => {
              if (res.code == 200) {
                _this.$message.success('保存成功')
                _this.$emit('ok')
                _this.close()
              } else {
                _this.$message.warning(res.msg)
              }
            })
            .catch(err => {
              // Do something
            })
            .finally(() => {
              _this.confirmLoading = false
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
