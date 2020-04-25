<template>
  <div class="center-box">
    <div class="show"
         v-show="visible">
      <h4 class="title">已关闭</h4>
      <a-form class="ant-advanced-search-form"
              autocomplete="off"
              :form="form"
              @submit="handleSearch">
        <a-row :gutter="18">
          <a-col :xs="24"
                 :sm="24"
                 :lg="{span:10,offset:4}"
                 :xl="{span:10,offset:4}">
            <a-form-item :colon="false">
              <a-input v-decorator="[
                'keywords',{rules: [{ required: false,  message: '请输入搜索内容' }]}
              ]"
                       placeholder="请输入姓名/账号/手机号..." />
            </a-form-item>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="24"
                 :xl="4"
                 :xxl="3"
                 :style="{ textAlign: 'right' }">
            <a-button type="primary"
                      html-type="submit">搜索</a-button>
            <a-button :style="{ marginLeft: '8px' }"
                      @click="handleReset">清除</a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="data-list">
        <h4 class="title">
          <span></span>人员列表
        </h4>
        <div class="result-list">
          <s-table ref="table"
                   size="default"
                   rowKey="keyIndex"
                   :columns="columns"
                   :data="loadData"
                   :scroll="{ x: 1200}">
            <span slot="myindex"
                  slot-scope="text, record, index">
              <template>
                <span>{{index+1}}</span>
              </template>
            </span>
            <span slot="action"
                  slot-scope="text, record">
              <template>
                <a-button class="btn-custom"
                          size="small"
                          style="margin-right:8px"
                          @click="edit(record)">查看</a-button>
              </template>
            </span>
          </s-table>
        </div>
      </div>
    </div>
    <edit-customer ref="editCusForm"
                   @ok="handleSaveOk"
                   @cancel="cancelEdit" />
    <tips-box ref="tipsbox"
              :tipsText="tipsText"
              :on-success="handleSubmit" />
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { getServiceSubordinate,putUserClose } from "@/api/common"
import { getEditUser } from "@/api/manage"
import { getMarketIndex, getCsdAgainAllowUpdata } from "@/api/market";
import STable from "@/components/table/";
import editCustomer from "./userCenterClose";
import TipsBox from "../tipsBox";
export default {
  components: {
    STable,
    editCustomer,
    TipsBox,
  },
  data () {
    return {
       tipsText: {
        saveTitle: '',
        agreenYes: '确定',
        agreenNo: '取消',
      },
      persolInfo: {},
      form: this.$form.createForm(this),
      // 查询参数
      queryParam: {},
      visible: true,
      isToSearch: false,
      searchNum: 0,
      columns: [
        {
          title: "序号",
          width: '80px',
          dataIndex: "myindex",
          scopedSlots: { customRender: "myindex" },
        },
        {
          title: "姓名",
          // dataIndex: "service_info.sale.user.nick_name",
          dataIndex: "nick_name",
          width: '100px',
        },
        {
          title: "性别",
          dataIndex: "gender.text",
          width: '80px',
        },
        {
          title: "账号/手机号",
          dataIndex: "phone",
          width: '200px',
        },
        {
          title: "企业QQ",
          dataIndex: "firm_qq",
          width: '150px',
        },
        {
          title: "所在部门",
          dataIndex: "department_user.department.department_name",
          width: '150px',
        },
        {
          title: "注册时间",
          dataIndex: "create_time",
          width: '200px',
        },
        {
          title: "操作",
          width: '100px',
          scopedSlots: { customRender: "action" },
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        if (true) {
          this.queryParam.status = 2
          return getServiceSubordinate(Object.assign(parameter, this.queryParam))
            .then(res => {
              res.data.data.forEach((item, i) => {
                item.keyIndex = i
              })
              return res.data;
            })
            .catch(err => {
              return { data: [] };
            });
        } else {
          return { data: [] };
        }
      },
      closeData:{}
    }
  },
  created () {

  },
  methods: {
    loadPage(){
      this.visible= true
      this.queryParam = {}
      this.$refs.editCusForm.close()
    },
    openTips (record) {
      this.closeData= record
      this.$refs.tipsbox.isAgreen(record)
    },
    handleSearch (e) {
      e.preventDefault();
      let searchName = undefined
      this.queryParam = {}
      switch (this.searchNum) {
        case 0:
          searchName = 'con_telephone'
          break;
        case 1:
          searchName = 'con_qq'
          break;
        case 2:
          searchName = 'con_wx'
          break;
        default:
          break;
      }
      this.form.validateFields((error, values) => {
        if (!error) {
          if (values.keywords) {
            this.isToSearch = true
            this.queryParam.keywords = values.keywords
            this.$refs.table.refresh(true)
          } else {
            this.queryParam = {}
            this.$refs.table.refresh(true)
          }
        }
      });
    },
    handleReset () {
      this.form.resetFields();
    },
    edit (record) {
      this.visible = false
      this.$refs.editCusForm.loadPage(record)
    },
    move (record) {
      this.visible = false
      this.$refs.movedep.loadPage(record)
    },
    cancelEdit () {
      this.$refs.table.refresh(true)
      this.visible = true
    },
    handleOk () { },
    handleSaveOk () {
      this.visible = true
      this.$refs.table.refresh(true)
    },
    handleSubmit(){
      let uid= this.closeData.user_id
      putUserClose(uid).then(res=>{
        if(res.code==200){
          this.$message.success('账户已关闭')
          this.$refs.table.refresh(true)
        }
      }).catch(err=>{

      })
    }
  }
};
</script>

<style lang="less" scoped>
.center-box {
  box-sizing: border-box;
  padding: 0;
  .title {
    text-align: left;
    font-size: 14px;
    color: #333;
    margin: 0;
    padding-left: 20px;
    line-height: 36px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #f2f2f2;
  }
  .ant-advanced-search-form {
    padding: 90px 24px;
    background: #fff;
    // border-bottom: 1px solid #d9d9d9;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    button {
      margin-top: 4px;
    }
    .ant-form-item {
      margin-bottom: 0;
    }
    .ant-form-item-control-wrapper {
      flex: 1;
    }
  }

  .data-list {
    .title {
      line-height: 50px;
      padding-left: 20px;
      background-color: #fff;
      border: 0;
      span {
        display: inline-block;
        vertical-align: middle;
        height: 24px;
        width: 5px;
        background-color: #555;
        margin: 6px;
      }
    }
    .result-list {
      margin: 0 20px;
    }
  }
}
</style>


