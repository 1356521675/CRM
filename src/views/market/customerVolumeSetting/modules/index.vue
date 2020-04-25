<template>
  <div :class="['components-form', {'phstyle': isMobile()}]">
    <h4 class="title">客户量设置</h4>
    <div class="search-result-list" v-show="visible">
      <s-table
        ref="table"
        size="default"
        rowKey="department_id"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
      >
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a-input-number
              :min="0"
              :value="text"
              v-if="text || text == 0"
              @change="e => handleChange(e, record)"
            />
            <template v-else>
              <span style="display:inline-block;padding-left:12px;">{{record | countTotal}}</span>
            </template>
          </template>
        </span>
        <span slot="steam" slot-scope="text, record">
          <template>
            <span v-if="record.total>=0" style="display:inline-block">{{text}}</span>
            <span v-else style="display:inline-block;padding-left:24px;">{{text}}</span>
          </template>
        </span>
        <span slot="allot" slot-scope="text, record">
          <template>
            <a-button class="btn-primary"
                      v-if="record.customer_num"
                      size="small"
                      @click="edit(record)">销售分配</a-button>
            <a-button class="btn-secondary btn-trans"
                      v-else
                      size="small"
                      disabled>销售分配</a-button>          
          </template>
        </span>
      </s-table>
      <div class="total">
        <a-row style="text-align: left;padding: 10px 10px 0;">
          <a-col :span="4">
            <span>总量</span>
          </a-col>
          <a-col :sm="{span:3,offset:7}">
            <span style="color:#e51c23;display:inline-block;padding-left:24px">{{totalNum}}</span>
          </a-col>
        </a-row>
      </div>
      <div class="bottom-btn">
        <a-button
          type="primary"
          size="large"
          class="abtn waves-effect waves-light"
          @click="handleSubmit"
        >保存</a-button>
      </div>
    </div>
    <sale-number  v-show="!visible"
                  :sysInfo="sysInfo"
                  ref="saleNumber"
                  @cancel="cancelEdit"/>
  </div>
</template>
<script>
import { mixinDevice } from "@/utils/mixin.js";
import moment from "moment";
import STable from "@/components/table/";
import { getCsdSetnum, getCsdSetnumEdit } from "@/api/cusNumberSet";
import SaleNumber from "./saleNumber";
export default {
  components: {
    STable,
    SaleNumber
  },
  mixins: [mixinDevice],
  props:['sysInfo'],
  data() {
    return {
      totalNum: "",
      // 表头
      columns: [
        {
          title: "序号",
          scopedSlots: { customRender: "serial" },
          width: "15%"
        },
        {
          title: "分组",
          dataIndex: "department_name",
          scopedSlots: { customRender: "steam" },
          width: "30%"
        },
        {
          title: "最大分配数",
          dataIndex: "customer_num",
          scopedSlots: { customRender: "action" },
          width: "45%"
        },
        {
          title: "操作",
          scopedSlots: { customRender: "allot" },
          width: "10%"
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getCsdSetnum(this.sysInfo)
          .then(res => {
            if(res.code==200){
              this.totalNum = res.data.total;
              return { data: res.data.data };
            }else{
              res.msg && this.$message.warning(res.msg);
              return { data: [] };
            }
          })
          .catch(err => {
            return { data: [] };
          });
      },
      options: {
        alert: false,
        rowSelection: null
      },
      changeForm: [],
      visible: true
    };
  },
  created() {
    console.log(this.sysInfo)
  },
  filters: {
    countTotal(value) {
      let num = 0;
      if (value.children) {
        value.children.forEach(item => {
          num += item.customer_num;
        });
      } else {
        num = value.total;
      }
      return num;
    }
  },
  methods: {
    reload() {
      this.$refs.table.refresh(true);
    },
    handleSubmit() {
      const _this = this;
      if (this.changeForm.length == 0) {
        _this.$message.warning("未做任何改动", 1);
        return;
      }
      getCsdSetnumEdit({ data: this.changeForm },this.sysInfo)
        .then(res => {
          if (res.code == 200) {
            _this.$refs.table.refresh(true);
            _this.$message.success("修改成功", 0.5);
            this.changeForm = [];
          } else if (res.code == 400) {
            _this.$message.warning(res.msg, 1);
          }
          if (false) {
            _this.$refs.table.refresh(true);
          }
        })
        .catch(err => {
          _this.$message.warning("未修改成功", 1);
        })
        .finally(() => {});
    },
    edit() {
      this.visible= false;
      this.$refs.saleNumber&&this.$refs.saleNumber.reload();
    },
    cancelEdit(){
      this.visible= true;
    },
    handleChange(value, record) {
      value = value ? value : 0;
      let _this = this;
      const real = record.customer_num;
      let addNum = value - record.customer_num;
      record.customer_num = value;
      const parameter = {
        department_id: record.department_id,
        customer_num: value,
        parent_id: record.parent_id
      };
      let onOff = true;
      if (this.changeForm.length > 0) {
        this.changeForm.forEach((item, index) => {
          if (item.department_id == record.department_id) {
            item.customer_num = value;
            onOff = false;
          }
        });
        if (onOff) {
          this.changeForm.push(parameter);
        }
      } else {
        this.changeForm.push(parameter);
      }
      this.totalNum += addNum;
    }
  }
};
</script>
<style lang="less" scoped>
.components-form {
  box-sizing: border-box;
  padding: 0;
  background-color: #fff;
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
  .search-result-list {
    background-color: #fff;
    min-height: 200px;
    text-align: center;
    margin: 20px;
  }
}
.bottom-btn {
  padding-top: 40px;
  padding-bottom: 20px;
  .abtn {
    width: 140px;
  }
}
.phstyle {
  margin: 20px 0;
}
</style>
<style scoped>
.search-result-list >>> .ant-table-wrapper {
  background-color: #fff;
}

.search-result-list >>> .ant-table-wrapper .ant-table-thead th {
  padding: 12px 18px;
}

.search-result-list >>> .ant-table-wrapper .ant-table-tbody {
  width: 100%;
  min-width: 400px;
}

.search-result-list >>> .ant-table-wrapper .ant-table-tbody td {
  padding: 10px 18px;
}
</style>