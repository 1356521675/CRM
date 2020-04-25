<template>
  <div id="components-form">
    <div class="search-result-list">
      <s-table ref="table"
               size="default"
               rowKey="user_id"
               :columns="columns"
               :data="loadData"
               :alert="options.alert"
               :rowSelection="options.rowSelection">
        <span slot="serial"
              slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="action"
              slot-scope="text, record">
          <template>
            <a-input-number :min="0"
                            :value="text"
                            @change="e => handleChange(e, record)" />
          </template>
        </span>
        <span slot="steam"
              slot-scope="text">
          <template>
            <span>{{text}}</span>
          </template>
        </span>
      </s-table>
      <div class="total">
        <a-row style="text-align: left;padding: 10px 10px 0;">
          <a-col :span="4"><span style="display:inline-block;">可分总量：</span><span>{{totalNum}}</span></a-col>
          <a-col :sm="{span:4,offset:5}"><span style="display:inline-block;padding-left:24px">已分总量：</span><span v-if="setTotalNum > totalNum" style="color:#e51c23;display:inline-block;padding-left:0">{{setTotalNum}}</span><span  v-else style="color:#19a15f;display:inline-block;padding-left:0">{{setTotalNum}}</span></a-col>
        </a-row>
      </div>
      <div class="bottom-btn">
        <a-button type="primary"
                  class="waves-effect waves-light"
                  @click="handleSubmit">保存</a-button>
        <a-button 
                  style="margin-left:18px;"
                  class="btn-secondary waves-effect waves-light"
                  @click="reSubmit">取消</a-button>          
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import STable from "@/components/table/";
import { getSaleCusNum, postSaleCusNum } from "@/api/cusNumberSet";
export default {
  components: {
    STable
  },
  props:['sysInfo'],
  data () {
    return {
      totalNum: 0,
      setTotalNum: 0,
      // 查询参数
      queryParam: {},
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
          width: "15%"
        },
        {
          title: "人员",
          dataIndex: "nick_name",
          width: "15%"
        },
        {
          title: "最大分配数",
          dataIndex: "customer_num",
          scopedSlots: { customRender: "action" },
          width: "55%"
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getSaleCusNum(this.sysInfo)
          .then(res => {
            if(res.code==200){
              let reslist = []
              this.setTotalNum= 0
              for (var key in res.data) {
                if (typeof (res.data[key]) == 'object') {
                  reslist.push(res.data[key])
                  this.setTotalNum += Number(res.data[key].customer_num)
                }
              }
              this.editModel= false
              this.totalNum = res.data.total
              this.reDataList.num= this.setTotalNum
              this.reDataList.data= JSON.parse(JSON.stringify(reslist))
              return { data: reslist }
            }else{
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
      reDataList :{
        data: [],
        num: 0
      },
      editModel: false
    };
  },
  created () {
  },
  filters: {
    countTotal (value) {
      let num = 0
      if (value.children) {
        value.children.forEach(item => {
          num += item.customer_num
        })
      } else {
        num = value.total
      }
      return num
    }
  },
  methods: {
    reload() {
      this.changeForm= [];
      this.$refs.table.refresh(true)
    },
    reSubmit() {
      this.$emit('cancel')
      this.changeForm= []
      if(this.editModel){
        this.$refs.table.refresh(true)
      }
    },
    handleSubmit () {
      if(this.totalNum<this.setTotalNum){
        this.$message.warning("设置总量超过可分总量,请重新修改");
        return false
      }
      const _this = this
      if (this.changeForm.length == 0) {
        _this.$message.warning("未做任何改动", 1);
        return
      }
      postSaleCusNum(this.changeForm,this.sysInfo)
        .then(res => {
          if (res.code == 200) {
            _this.$refs.table.refresh(true);
            _this.$message.success("修改成功", 1);
            this.changeForm = []
          } else if (res.code == 400) {
            // record.customer_num = real
            _this.$message.warning(res.msg, 1);
          }
          if (false) {
            _this.$refs.table.refresh(true);
          }
        })
        .catch(err => {
          _this.$message.warning("未修改成功", 0.5);
          // Do something
        })
        .finally(() => { });
    },
    handleChange (value, record) {
      this.editModel= true
      value = value ? value : 0
      let _this = this
      const real = record.customer_num
      let addNum = value - record.customer_num
      let reSetTotalNum= this.setTotalNum
      this.setTotalNum += addNum
      if (this.setTotalNum <= this.totalNum) {
        record.customer_num = value;
        const parameter = {
          user_id: record.user_id,
          customer_num: value,
        }
        let onOff = true
        if (this.changeForm.length > 0) {
          this.changeForm.forEach((item, index) => {
            if (item.user_id == record.user_id) {
              item.customer_num = value
              onOff = false
            }
          })
          if (onOff) {
            this.changeForm.push(parameter);
          }
        } else {
          this.changeForm.push(parameter);
        }
      }else{
        record.customer_num = value;
        const parameters = {
          user_id: record.user_id,
          customer_num: value,
        }
        let onOffs = true
        if (this.changeForm.length > 0) {
          this.changeForm.forEach((item, index) => {
            if (item.user_id == record.user_id) {
              item.customer_num = value
              onOffs = false
            }
          })
          if (onOffs) {
            this.changeForm.push(parameters);
          }
        } else {
          this.changeForm.push(parameters);
        }
        // this.setTotalNum = this.totalNum
        // record.customer_num += this.totalNum - reSetTotalNum;
      }
    },
  }
};
</script>
<style lang="less" scoped>
#components-form {
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
    .ant-table-body {
      width: 100%;
      min-width: 400px;
    }
    
  }
}
.bottom-btn {
  padding-top: 40px;
  padding-bottom: 20px;
  .abtn {
    width: 140px;
  }
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
  padding: 6px 18px;
}
</style>