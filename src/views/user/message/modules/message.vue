<template>
  <div class="center-box">
    <div class="show"
         v-show="visible">
      <div class="data-list">
        <h4 class="title">
          <span></span>消息列表
        </h4>
        <div class="opa"
             style="margin:20px">
          <a-button class="btn-custom"
                    @click="getMsgListread">设为已读</a-button>
          <a-button class="btn-econdary btn-trans"
                    style="margin-left:20px"
                    @click="msgListDelete">批量删除</a-button>
          <!-- <a-button class="btn-danger btn-trans"
                    style="margin-left:20px"
                    @click="getMsgListUnread">设为未读</a-button> -->
        </div>
        <div class="result-list"
             style="min-height:200px">
          <s-table ref="table"
                   size="default"
                   rowKey="keyIndex"
                   :columns="columns"
                   :data="loadData"
                   :alert="options.alert"
                   :rowSelection="options.rowSelection">
            <span slot="serial"
                  slot-scope="text, record, index">{{ index + 1 }}</span>
            <span slot="action"
                  slot-scope="text, record">
              <template>
                <a-button class="btn-primary"
                          size="small"
                          style="margin-right:14px"
                          @click="edit(record)">修改</a-button>
                <a-button class="btn-secondary"
                          size="small">删除</a-button>
              </template>
            </span>
            <span slot="scheck"
                  slot-scope="text">
              <template>
                <a-button v-if="text == 1"
                          class="btn-success btn-trans"
                          size="small">已读</a-button>
                <a-button v-else
                          class="btn-danger btn-trans"
                          size="small">未读</a-button>
              </template>
            </span>
            <span slot="depName"
                  slot-scope="text">
              <template>
                <span v-for="(item, index) in myDepsList"
                      :key="index"
                      v-show="text== item.department_id">{{item.department_name}}</span>
              </template>
            </span>
            <span slot="fcheck"
                  slot-scope="text,record">
              <template>
                <span style="color:red"
                      v-if="record.status.value == 0">{{text}}</span>
                <span v-else>{{text}}</span>
              </template>
            </span>
            <span slot="recTime"
                  slot-scope="text">
              <template>{{moment(text*1000).format('YYYY-MM-DD HH:mm:ss')}}</template>
            </span>
          </s-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions} from "vuex";
import moment from "moment";
import { getMsgNewsNum, getMsgIndex, getMsgSetread, getMsgDelete, getMsgSetUnread } from '@/api/common'
import STable from "@/components/table/";
export default {
  components: {
    STable,
  },
  data () {
    return {
      mdl: {},
      // 查询参数
      queryParam: {
      },
      titleNum: 1,
      isToSearch: false,
      visible: true,
      columns: [
        {
          title: "序号",
          scopedSlots: { customRender: "serial" },
          width: '8%',
        },
        {
          title: "内容",
          width: '32%',
          scopedSlots: { customRender: "fcheck" },
          dataIndex: "content",
        },
        {
          title: "状态",
          dataIndex: "status.value",
          scopedSlots: { customRender: "scheck" },
          width: '10%',
        },
        {
          title: "发件人",
          dataIndex: "from_user.name",
          width: '15%',
        },
        {
          title: "阅读时间",
          dataIndex: "read_time",
          width: '20%',
        },
        {
          title: "发送时间",
          dataIndex: "create_time",
          width: '20%',
        },
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
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getMsgIndex(Object.assign(parameter, this.queryParam))
          .then(res => {
            res.data.data.forEach((item, i) => {
              item.keyIndex = i
            })
            return res.data;
          })
          .catch(err => {
            return { data: [] };
          });
      },
      mycount: 0
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () {
  },
  methods: {
    ...mapActions(["setMsgNum", ]),
    moment,
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      if (this.selectedRowKeys.length > 0) {
        this.showOperate = true
      } else {
        this.showOperate = false
      }
    },
    getMsgNewsNum () {
      getMsgNewsNum().then(res => {
        if (res.code == 200) {
          this.setMsgNum(res.data.count)
        }
      })
    },
    getMsgListread () {
      let sCusArr = []
      this.selectedRows.forEach(item => {
        sCusArr.push(item.id)
      })
      let putParameter = {
        id: sCusArr.join(',')
      }
      getMsgSetread(putParameter).then(res => {
        if (res.code == 200) {
          this.getMsgNewsNum()
          this.$refs.table.refresh(true)
          this.$refs.table.clearSelected()
        }else if (res.code == 400) {
          this.$message.warning(res.msg);
        }
      })
    },
    getMsgListUnread () {
      let sCusArr = []
      this.selectedRows.forEach(item => {
        sCusArr.push(item.id)
      })
      let putParameter = {
        id: sCusArr.join(',')
      }
      getMsgSetUnread(putParameter).then(res => {
        if (res.code == 200) {
          this.getMsgNewsNum()
          this.$refs.table.refresh(true)
          this.$refs.table.clearSelected()
        }else if (res.code == 400) {
          this.$message.warning(res.msg);
        }
      })
    },
    msgListDelete () {
      let sCusArr = []
      this.selectedRows.forEach(item => {
        sCusArr.push(item.id)
      })
      let putParameter = {
        ids: sCusArr.join(',')
      }
      getMsgDelete('0', putParameter).then(res => {
        if (res.code == 200) {
          this.getMsgNewsNum()
          this.$refs.table.refresh(true)
          this.$refs.table.clearSelected()
        }else if (res.code == 400) {
          this.$message.warning(res.msg);
        }
      })
    },
    titleClick (num) {
      this.titleNum = num
      this.$refs.table.refresh(true)
    }
  }
};
</script>

<style lang="less" scoped>
.center-box {
  box-sizing: border-box;
  padding: 0 0 20px;
  .title {
    text-align: left;
    font-size: 14px;
    color: #333;
    margin: 0;
    line-height: 36px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #f2f2f2;
    a {
      display: inline-block;
      width: 123px;
      text-align: center;
      border-right: 1px solid #f2f2f2;
      color: #333;
    }
    .active {
      background-color: #1890ff;
      color: #fff;
    }
  }
  .ant-advanced-search-form {
    // padding: 90px 24px;
    background: #fff;
    // border-bottom: 1px solid #d9d9d9;
    // -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    button {
      margin-top: 4px;
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


