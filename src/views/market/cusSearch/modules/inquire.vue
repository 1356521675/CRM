<template>
  <div class="center-box">
    <div class="show"
         v-show="visible">
      <h4 class="title">客户查询</h4>
      <a-form class="ant-advanced-search-form"
              autocomplete="off"
              :form="form"
              @submit="handleSearch">
        <a-row :gutter="18">
          <a-col
            :xs="24"
            :sm="24"
            :lg="{span:7,offset:0}"
            :xl="{span:6,offset:0}"
            :xxl="{span:4,offset:0}"
            class="mylabel">
            <a-form-item :colon="false" label="选择系统">
              <a-select
                :getPopupContainer="triggerNode => triggerNode.parentNode"
                v-decorator="['status']"
                placeholder="请选择系统"
                @change="sysChange"
              >
                <a-select-option
                  v-for="(item, index) in systemList"
                  :key="index"
                  :value="item.id"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :xs="24"
            :sm="24"
            :lg="{span:7,offset:0}"
            :xl="{span:6,offset:0}"
            :xxl="{span:4,offset:0}"
            class="mylabel">
            <a-form-item :colon="false" label="添加状态">
              <a-select
                :getPopupContainer="triggerNode => triggerNode.parentNode"
                v-decorator="['status']"
                placeholder="请选择添加状态"
              >
                <a-select-option
                  v-for="(item, index) in systemList"
                  :key="index"
                  :value="item.id"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="{span:10,offset:0}"
                 :xl="{span:8,offset:0}">
            <a-form-item :colon="false">
                <a-input v-decorator="[
                'phone',{rules: [{ required: false,  message: '请输入搜索内容' }]}]"
                         placeholder="请输入查询内容" />
            </a-form-item>
          </a-col>
          <a-col :xs="24"
                 :sm="24"
                 :lg="24"
                 :xl="4"
                 :xxl="4"
                 :style="{ textAlign: 'right' }">
            <a-button type="primary"
                      html-type="submit">搜索</a-button>
            <a-button :style="{ marginLeft: '8px' }"
                      @click="handleReset">清除</a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="data-list"
           v-show="isToSearch">
        <h4 class="title">
          <span></span>查询结果 <a-button @click="openMoveCus" style="margin-left:20px;" class="btn-info" v-show="showOperate">客户转移</a-button>
        </h4>
        <div class="result-list">
          <s-table ref="table"
                   size="default"
                   rowKey="keyIndex"
                   :columns="columns"
                   :data="loadData"
                   :customRow="tableDbClick"
                   :scroll="{ x: 1100}">
            <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>       
            <span slot="action"
                  slot-scope="text, record">
              <template>
                <a-button class="btn-primary"
                          size="small"
                          @click="edit(record)">修改</a-button>
              </template>
            </span>
            <span slot="cameraname"
                  slot-scope="text, record, index">
              <template v-if="text">
                <copy-info :user1="record.service_info.camera" :num="index+1" :name="'camera'"/>
              </template>
              <template v-else>
                <span></span>
              </template>
            </span>
            <span slot="username"
                  slot-scope="text, record, index">
              <template v-if="text">
                <copy-infos :user1="record.user_id" :num="index+1" :name="'user'"/>
              </template>
              <template v-else>
                <span></span>
              </template>
            </span>
            <span slot="operaname"
                  slot-scope="text, record,index">
              <template v-if="record.service_info.taobao || record.service_info.pdd">
                <copy-info :user1="record.service_info.taobao" :user2="record.service_info.pdd" :num="index+1" :name="'taobao'"/>
              </template>
              <template v-else>
                <span></span>
              </template>
            </span>
            <span slot="designname"
                  slot-scope="text, record,index">
              <template v-if="record.service_info.retail || record.service_info.decoration">
                <copy-info :user1="record.service_info.retail" :user2="record.service_info.decoration" :num="index+1" :name="'retail'"/>
              </template>
              <template v-else>
                <span></span>
              </template>
            </span>
          </s-table>
        </div>
      </div>
    </div>
    <edit-customer v-show="!visible"
                   ref="editCusForm"
                   :systemList="systemList"
                   :swtList="swtList"
                   @ok="handleSaveOk"
                   @cancel="cancelEdit" />
  </div>
</template>

<script>
import { tableDbClick } from "@/components/_util/util.js";
import Clipboard from "clipboard";
import { getEditUser } from "@/api/manage"
import { getMarketIndex, getCsdAgainAllowUpdata } from "@/api/market";
import STable from "@/components/table/";
import editCustomer from "./editCustomer";
import copyInfo from "./copyInfo";
import copyInfos from "./copyInfos";
export default {
  components: {
    STable,
    editCustomer,
    copyInfo,
    copyInfos,
  },
  props: ['systemList','swtList'],
  data () {
    return {
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
          scopedSlots: { customRender: "serial" },
          width: "80px"
        },
        {
          title: "客户姓名",
          dataIndex: "con_name",
        },
        {
          title: "录入人员",
          // dataIndex: "service_info.sale.user.nick_name",
          dataIndex: "allot_user_id.name",
          // scopedSlots: { customRender: "username" },
        },
        {
          title: "销售人员",
          // dataIndex: "service_info.sale.user.nick_name",
          dataIndex: "user_id.name",
          scopedSlots: { customRender: "username" },
        },
        {
          title: "添加时间",
          dataIndex: "create_time",
        },
        {
          title: "状态",
          dataIndex: "customer_status",
        },
        {
          title: "合作级别",
          dataIndex: "m_contract.n_rank.rank_name",
        },
        {
          title: "设计人员",
          dataIndex: "service_info.retail.user.nick_name",
          scopedSlots: { customRender: "designname" },
        },
        {
          title: "运营人员",
          dataIndex: "service_info",
          scopedSlots: { customRender: "operaname" },
        },
        {
          title: "摄影人员",
          scopedSlots: { customRender: "cameraname" },
          dataIndex: "service_info.camera.user.nick_name",
        },
        {
          title: "操作",
          width: '100px',
          scopedSlots: { customRender: "action" },
        }
      ],
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      putData: {
        department_id:'',
        user_id:''
      },
      showOperate: false,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        if (this.isToSearch) {
          return getMarketIndex(Object.assign(parameter, this.queryParam),this.sysInfo)
            .then(res => {
              res.data.data.forEach((item, i) => {
                item.keyIndex = i
              })
              return res.data;
            })
            .catch(err => {
              err.response&&this.$message.error(err.response.data.msg);
              return { data: [] };
            });
        } else {
          return { data: [] };
        }
      },
      sysInfo:undefined
    }
  },
  created () {

  },
  methods: {
    tableDbClick,
    cusdblclick(record) {
      this.edit(record);
    },
    sysChange(val){
      this.systemList.forEach((item)=>{
        if(item.id == val){
          this.sysInfo= item;
          return false;
        }
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      if (this.selectedRowKeys.length > 0) {
        this.showOperate = true
      } else {
        this.showOperate = false
      }
    },
    openMoveCus () {
      this.$refs.moveCus.edit(this.selectedRows)
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
        case 3:
          searchName = 'con_wx'
          break; 
        case 4:
          searchName = 'con_wx'
          break;    
        default:
          break;
      }
      this.form.validateFields((error, values) => {
        if (!error) {
          if (values.phone) {
            this.isToSearch = true
            this.queryParam[searchName] = values.phone
            this.$refs.table.refresh(true)
          }else{
            this.$message.warning('请输入要查询的信息');
          }
        }
      });
    },
    handleReset () {
      this.sysInfo= undefined;
      this.form.resetFields();
    },
    edit (record) {
      this.visible = !this.visible
      this.$refs.editCusForm.editCus(record)
    },
    cancelEdit () {
      this.visible = !this.visible
    },
    handleOk () { },
    handleSaveOk () {
      this.visible = true;
      this.$refs.table.refresh(true)
    },
    copy () {
      
      let clipboard = new Clipboard(".copyBtn"); //注意要使用let或者const，不能使用var，否则会出现复制次数叠加的问题，即复制不止一次。
      //因为var是全局变量，let和const是局部
      clipboard.on("success", e => {
        this.$message.success("复制成功");
        clipboard.destroy(); //使用destroy可以清楚缓存
      });
      clipboard.on("error", e => {
        this.$message.info("复制失败");
        clipboard.destroy();
      });
    },
    nameHover (user) {
      getEditUser(user.user.user_id).then(res => {
        this.persolInfo = res.data
      })
    }
  }
};
</script>

<style lang="less" scoped>
.center-box {
  box-sizing: border-box;
  padding: 0;
  min-height: 334px;
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
    padding: 40px 24px;
    background: #fff;
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
<style  scoped>
.mylabel >>> .ant-form-item {
  display: flex;
  margin-bottom: 0;
  padding-left: 62px;
}
.mylabel .ant-form-item >>> .ant-form-item-control-wrapper {
  flex: 1;
}
.mylabel .ant-form-item >>> .ant-form-item-label {
  width: 62px;
  position: absolute;
  left: 0;
  top: 0;
  text-align: left;
}
.result-list >>> .ant-table-wrapper .ant-table-footer {
  margin: 0;
  padding: 0;
}
.result-list >>> .ant-table-content {
  min-width: 600px;
}
.result-list >>> .ant-table {
  overflow-y: scroll;
}

</style>


