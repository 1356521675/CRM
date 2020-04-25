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
                 :lg="{span:16,offset:4}">
            <a-row :gutter="48">
              <a-col :xs="24"
                     :sm="24"
                     :lg="12"
                     class="mylabel">
                <a-form-item label="账号/手机号"
                             :colon="false">
                  <a-input placeholder="请输入账号/手机号"
                           v-decorator="['phone']" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12"
                     class="mylabel">
                <a-form-item label="姓名"
                             :colon="false">
                  <a-input placeholder="姓名"
                           v-decorator="['user_name', {rules: [{ required: true, message: '请输入姓名' }], validateTrigger: 'blur'}]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12"
                     class="mylabel">
                <a-form-item label="性别"
                             :colon="false">
                  <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                            v-decorator="['gender']"
                            placeholder="请选择性别">
                    <a-select-option :value="1">男</a-select-option>
                    <a-select-option :value="2">女</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12"
                     class="mylabel">
                <a-form-item label="企业QQ"
                             :colon="false">
                  <a-input placeholder="企业QQ"
                           v-decorator="['firm_qq', {rules: [{ required: true, message: '请输入QQ号码' }], validateTrigger: 'blur'}]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12"
                     class="mylabel">
                <a-form-item label="微信"
                             :colon="false">
                  <a-input placeholder="微信"
                           v-decorator="['user_wx', {rules: [{ required: true, message: '请输入微信号' }], validateTrigger: 'blur'}]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12"
                     class="mylabel">
                <a-form-item label="邮箱"
                             :colon="false">
                  <a-input placeholder="邮箱"
                           v-decorator="['email',{rules: [{ required: true, message: '请输入邮箱' }], validateTrigger: 'blur'}]"/>
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12"
                     class="mylabel">
                <a-form-item label="所在部门"
                             :colon="false">
                  <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                            placeholder="请选择部门"
                            style="width: 100%"
                            :disabled="dpDisabled"
                            v-decorator="['department_id',{rules: [{ required: false, message: '请选择部门!' }]}]">
                    <a-select-option v-for="item in dpList"
                                     :key="item.department_id">{{item.department_name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12"
                     class="mylabel">
                <a-form-item label="注册时间"
                             :colon="false">
                  <a-input placeholder="注册时间"
                           v-decorator="['create_time']" />
                  <div class="disable-box"></div>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="{span:24,offset:0}"
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
import { mapActions, mapGetters } from "vuex";
import { editUser, getDepartment } from '@/api/manage'
import { getUserEdit, putUser } from '@/api/common'
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
      visible: false,
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
    this.getDep()
  },
  methods: {
    ...mapActions(["setMsgNum","setCusName"]),
    ...mapGetters(["msgNum"]),
    getDep () {
      getDepartment().then(res => {
        
        let copyList = []
        function one (item) {
          if (item.children.length == 0) {
            copyList.push({ department_id: item.department_id, department_name: item.department_name })
          } else {
            copyList.push({ department_id: item.department_id, department_name: item.department_name })
            item.children.forEach(function (list) {
              one(list)
            })
          }
        }
        res.data.forEach(function (item) {
          one(item)
        })
        this.dpList = copyList
      })
    },
    loadPage (record) {
      this.visible= true
      this.form.resetFields()
      let uid = record.user_id
      this.confirmLoading= true
      getUserEdit(uid).then(res => {
        this.confirmLoading= false
        this.reData = res
        this.setForm(this.reData)
      }).catch(err=>{
        this.confirmLoading= false
      })
    },
    setForm (res) {
      this.confirmLoading= false
      if(res.data.department_user&&res.data.department_user.department_id){
        this.dpDisabled= true
      }else{
        this.dpDisabled= false
      }
      const item = {
        user_name: res.data.user_name,
        create_time: res.data.create_time,
        gender: res.data.gender.value,
        phone: res.data.phone,
        firm_qq: res.data.firm_qq,
        user_wx: res.data.user_wx,
        department_id: res.data.department_user?res.data.department_user.department_id:'',
        email:res.data.email,
      };
      this.mdl = Object.assign({}, item);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...item });
      });
    },
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
    handleOk () {
      const _this = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          const _this = this
          const parameter = {
            nick_name: values.user_name,
            phone: values.phone,
            firm_qq: values.firm_qq,
            user_wx: values.user_wx,
            gender: values.gender,
            email: values.email,
            department_id: values.department_id,
          }
          let uid = this.reData.data.user_id
          putUser( uid,parameter)
            .then(res => {
              _this.confirmLoading = false
              if (res.code == 200) {
                _this.$message.success('保存成功')
                // _this.setCusName(parameter.nick_name)
                _this.reData.data.user_name= parameter.nick_name
                _this.reData.data.gender.value= parameter.gender
                _this.reData.data.phone= parameter.phone
                _this.reData.data.firm_qq= parameter.firm_qq
                _this.reData.data.user_wx= parameter.user_wx
                _this.reData.data.email= parameter.email
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
      })
    },
    close () {
      this.visible= false
      // this.setForm(this.reData)
      this.$emit("cancel");
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

