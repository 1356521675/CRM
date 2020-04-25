<template>
  <a-modal :title="title"
           :visible="visible"
           :width="700"
           :confirmLoading="confirmLoading"
           :maskClosable="false"
           @ok="handleOk"
           @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <p v-if="showInfo" style="text-align:center;color:red">该员工暂未分配部门，请先为其分配部门</p>
      <a-form :form="form"
              autocomplete="off">
        <a-row :gutter="18">
          <a-col :xs="24"
                 :sm="24"
                 :lg="12">
            <a-form-item label="姓名">
              <a-input read-only
                       v-decorator="['nick_name', {rules: [{ required: true, message: '请输入姓名' }], validateTrigger: 'blur'}]"
                       placeholder="请输入姓名" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="18">
          <a-col :xs="24"
                 :sm="24"
                 :lg="12"
                 v-if="!addOperate">
            <a-form-item label="当前部门">
              <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                        placeholder="请选择部门"
                        style="width: 100%"
                        @change="dpSltChange"
                        disabled
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
            <a-form-item label="转后部门">
              <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                        placeholder="请选择部门"
                        style="width: 100%"
                        v-decorator="['department_id',{rules: [{ required: true, message: '请选择部门!' }]}]">
                <!-- <a-select-option v-for="item in dpdata"
                                 :key="item.department_id">{{item.department_name}}</a-select-option> -->
                <a-select-opt-group  v-for="item in dpdata" :key="item.department_id" :label="item.department_name">
                  <a-select-option v-for="list in item.children"
                                 :key="list.department_id">{{list.department_name}}</a-select-option>
                </a-select-opt-group>                 
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { putServiceMove } from '@/api/common'
import { addNewUser, editUser, addDpUser, getEditUser } from '@/api/manage'
import { getSaleMyDepartments } from "@/api/sales";
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
      title: '部门转移',
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
      dpDisabled: false,
      showInfo: false,
      myDepsList: []
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () {
  },
  methods: {
    getMyDeps () {
      getSaleMyDepartments().then(res => {
        this.myDepsList = res.data
      }).catch(err => {

      })
    },
    add () {
      this.addOperate = true
      let record = {}
      this.form.resetFields()
      this.visible = true
    },
    edit (row, id) {
      this.showInfo = false
      this.form.resetFields()
      let record = {}
      this.title = '部门转移--' + row[0].user_name
      this.visible = true
      this.addOperate = false
      this.id = row[0].user_id
      getEditUser(this.id).then(res => {
        this.userInfo = res.data
        if (res.data.department_user&&res.data.department_user.department_id) {
          this.dpDisabled = true
        } else {
          this.showInfo = true
        }
        record = {
          dpId: res.data.department_user ? res.data.department_user.department_id : undefined,
          nick_name: res.data.user_name,
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
          _this.editStaff(values)
        }
      })
    },
    handleCancel () {
      this.close()
    },
    editStaff (values) {
      const _this = this
      const parameter = {
        department_id: values.department_id,
      }
      let uid = this.userInfo.user_id
      putServiceMove(uid, parameter)
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
    },
    dpSltChange (value) {
      this.dpId = value
    }
  }
}
</script>
