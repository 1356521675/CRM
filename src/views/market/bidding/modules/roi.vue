<template>
  <div class="center-box">
    <div class="show" v-show="visible">
      <div class="exportBox">
        <a-button @click="exportDatas" class="btn-info">导出</a-button>
      </div>
      <a-form
        class="ant-advanced-search-form"
        autocomplete="off"
        :form="form"
        style="margin:20px 20px"
        @submit="handleSearch"
      >
        <a-row :gutter="18">
          <a-col
            :xs="24"
            :sm="24"
            :lg="{span:16,offset:0}"
            :xl="{span:12,offset:0}"
            :xxl="{span:9,offset:0}"
            class="mylabel">
            <a-form-item :colon="false" label="分配时间">
              <a-range-picker
                style="width:100%"
                :placeholder="['开始时间', '结束时间']"
                v-decorator="['my_timer']"
                :format="dateFormat"
                :showTime="{
                  hideDisabledOptions: true, 
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                }"
                :disabledDate="cusdisabledDate"
              />
            </a-form-item>
          </a-col>
          <a-col
            :xs="24"
            :sm="24"
            :lg="{span:8,offset:0}"
            :xl="{span:6,offset:0}"
            :xxl="{span:4,offset:0}"
            class="mylabel"
          >
            <a-form-item :colon="false" label="来源分类">
              <a-select
                :getPopupContainer="triggerNode => triggerNode.parentNode"
                v-decorator="['source_class']"
                @change="sourceClassChange"
                placeholder="请选择分类"
              >
                <a-select-option
                  v-for="(item, index) in classList"
                  :key="index"
                  :value="item.class_id"
                >{{item.class_name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :xs="24"
            :sm="24"
            :lg="{span:8,offset:0}"
            :xl="{span:6,offset:0}"
            :xxl="{span:4,offset:0}"
            class="mylabel"
          >
            <a-form-item :colon="false" label="来源名称">
              <a-select
                :getPopupContainer="triggerNode => triggerNode.parentNode"
                v-decorator="['source']"
                placeholder="请选择来源名称"
              >
                <a-select-option
                  v-for="(item, index) in sourceList"
                  :key="index"
                  :value="item.source_id"
                >{{item.source_name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :xs="24"
            :sm="24"
            :lg="{span:16,offset:0}"
            :xl="{span:12,offset:0}"
            :xxl="{span:0,offset:0}"
            class="mylabel">
            <a-form-item :colon="false" label="成交时间">
              <a-range-picker
                style="width:100%"
                :placeholder="['开始时间', '结束时间']"
                v-decorator="['deal_timer']"
                :format="dateFormat"
                :showTime="{
                  hideDisabledOptions: true, 
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                }"
                :disabledDate="cusdisabledDate"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :lg="24" :xl="12" :xxl="4" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit" :loading="!searchDone">查询</a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset" :disabled="!searchDone">清除</a-button>
          </a-col>
          <a-col
            :xs="0"
            :sm="0"
            :lg="0"
            :xl="0"
            :xxl="9"
            class="mylabel">
            <a-form-item :colon="false" label="成交时间">
              <a-range-picker
                style="width:100%"
                :placeholder="['开始时间', '结束时间']"
                v-decorator="['deal_timer']"
                :format="dateFormat"
                :showTime="{
                  hideDisabledOptions: true, 
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                }"
                :disabledDate="cusdisabledDate"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div class="data-list">
        <h4 class="title">
          <span></span>列表
        </h4>
        <div class="result-list">
          <s-table ref="table" size="default" rowKey="keyIndex" :columns="columns" :data="loadData">
            <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
            <span slot="action" slot-scope="text, record">
              <template>
                <a-button
                  class="btn-primary"
                  size="small"
                  style="margin-right:14px"
                  @click="edit(record)"
                >查看</a-button>
              </template>
            </span>
            <span slot="desStatus" slot-scope="service_status">
              <template>{{service_status.text}}</template>
            </span>
            <span slot="dealRate" slot-scope="text">
              <template>{{text}}%</template>
            </span>
            <span slot="signRate" slot-scope="text">
              <template>{{text}}%</template>
            </span>
            <span slot="footer" v-if="downDatas && totalData">
              <template>
                <table class="ant-table-content">
                  <colgroup>
                    <col style="width: 80px; min-width: 80px;" />
                    <col style="width: 100px; min-width: 100px;" />
                    <col style="width: 100px; min-width: 100px;" />
                    <col style="width: 100px; min-width: 100px;" />
                    <col style="width: 100px; min-width: 100px;" />
                    <col style="width: 100px; min-width: 100px;" />
                    <col style="width: 100px; min-width: 100px;" />
                    <col style="width: 100px; min-width: 100px;" />
                    <col style="width: 100px; min-width: 100px;" />
                    <col style="width: 100px; min-width: 100px;" />
                  </colgroup>
                  <thead class="ant-table-thead" style="border:0;">
                    <tr>
                      <th style="border:0;">
                        <div>汇总</div>
                      </th>
                      <th style="border:0;">
                        <div></div>
                      </th>
                      <th style="border:0;">
                        <div></div>
                      </th>
                      <th style="border:0;">
                        <div>{{totalData.customer_count_total}}</div>
                      </th>
                      <th style="border:0;">
                        <div>{{totalData.contracts_count_total}}</div>
                      </th>
                      <th style="border:0;">
                        <div>{{totalData.achievements_sum_total}}</div>
                      </th>
                      <th style="border:0;">
                        <div>{{totalData.contracts_rate_average}}%</div>
                      </th>
                      <th style="border:0;">
                        <div>{{totalData.once_contracts_count_total}}</div>
                      </th>
                      <th style="border:0;">
                        <div>{{totalData.once_achievements_sum_total}}</div>
                      </th>
                      <th style="border:0;">
                        <div>{{totalData.once_contracts_rate_average}}%</div>
                      </th>
                    </tr>
                  </thead>
                </table>
              </template>
            </span>
          </s-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import moment from "moment";
import { getSourceList, getSourceClassList } from "@/api/market";
import {
  getBiddingRoiList,
  getBiddingRoiSummarize,
  getBiddingRoiDownload
} from "@/api/bidding";
import STable from "@/components/table/";
export default {
  components: {
    STable
  },
  props:['sysInfo'],
  data() {
    return {
      my_timer: [],
      searchDone: true,
      downDatas: false,
      mdl: {},
      endOpen: false,
      dateFormat: "YYYY-MM-DD HH:mm:ss",
      searchTimer: {
        start: null,
        end: null
      },
      searchStatus: false,
      // 查询参数
      reviewStatus: 0,
      queryParam: {},
      rawData: {},
      searchNum: 0,
      isToSearch: false,
      visible: true,
      columns: [
        {
          title: "序号",
          scopedSlots: { customRender: "serial" },
          width: "80px"
        },
        {
          title: "来源分类",
          dataIndex: "source_class_name",
          width: "100px"
        },
        {
          title: "来源名称",
          dataIndex: "source_name",
          width: "100px"
        },
        {
          title: "客户量",
          dataIndex: "customer_count",
          width: "100px"
        },
        {
          title: "签单量",
          dataIndex: "contracts_count",
          width: "100px"
        },
        {
          title: "签单金额",
          dataIndex: "achievements_sum",
          width: "100px"
        },
        {
          title: "签单率",
          dataIndex: "contracts_rate",
          scopedSlots: { customRender: "signRate" },
          width: "100px"
        },
        {
          title: "成单量",
          dataIndex: "once_contracts_count",
          width: "100px"
        },
        {
          title: "成单金额",
          dataIndex: "once_achievements_sum",
          width: "100px"
        },
        {
          title: "成单率",
          dataIndex: "once_contracts_rate",
          scopedSlots: { customRender: "dealRate" },
          width: "100px"
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        if (this.searchStatus) {
          return getBiddingRoiList(Object.assign(parameter, this.queryParam),this.sysInfo)
            .then(res => {
              this.searchDone = true;
              this.downDatas = false;
              if (res.code == 400) {
                this.$message.warning(res.msg, 1.5);
              }
              if (res.code == 200) {
                this.downDatas = true;
              }
              res.data.data.forEach((item, i) => {
                item.keyIndex = i;
              });
              return res.data;
            })
            .catch(err => {
              this.searchDone = true;
              this.downDatas = false;
              err.response&&this.$message.error(err.response.data.msg)
              return { data: [] };
            });
        } else {
          return { data: [] };
        }
      },
      totalData: "",
      classList: [],
      sourceList: [],
      downSrc: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    // this.setForm();
    this.getClassList();
  },
  methods: {
    moment,
    cusdisabledDate(current) {
      // Can not select days before today and today
      return current && current > moment().endOf("day");
    },
    getTotal(param) {
      getBiddingRoiSummarize(param,this.sysInfo).then(res => {
        if (res.code == 200) {
          this.totalData = res.data;
        } else {
          this.totalData = "";
        }
      }).catch(err => {
        err.response&&console.log(err.response.data.msg);
      });;
    },
    exportDatas() {
      let values = this.form.getFieldsValue();
      let onOffstart = false
      let onOffend = false
      this.downSrc = "";
      if (values.my_timer&&values.my_timer.length>0) {
        onOffstart = true
        this.downSrc +=
          "&begin_time=" +
          moment(values.my_timer[0])
            .utcOffset(480)
            .format(this.dateFormat);
        this.downSrc +=
          "&end_time=" +
          moment(values.my_timer[1])
            .utcOffset(480)
            .format(this.dateFormat);
      };
      if(values.deal_timer&&values.deal_timer.length>0) {
        onOffend = true
        this.downSrc +=
          "&deal_time_begin=" +
          moment(values.deal_timer[0])
            .utcOffset(480)
            .format(this.dateFormat);
        this.downSrc +=
          "&deal_time_end=" +
          moment(values.deal_timer[1])
            .utcOffset(480)
            .format(this.dateFormat);
      };
      if(!onOffstart || !onOffend){
          this.$message.warning("请选择分配时间和成交时间！", 1);
          return false;
        }
      if (values.source_class || values.source_class == 0) {
        this.downSrc += "&source_class=" + values.source_class;
      }
      if (values.source || values.source == 0) {
        this.downSrc += "&source=" + values.source;
      }
      const token = this.$store.getters.token;
      let urls =
        api.abaseUrl +
        "/bidding/roi-download?accessToken=" +
        token +
        this.downSrc;
      window.open(urls);
    },
    getClassList() {
      getSourceClassList()
        .then(res => {
          this.classList = res.data.data;
        })
        .catch(err => {});
    },
    sourceClassChange(value) {
      const record = {
        source: undefined
      };
      this.mdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
      this.obSourceList({ class_id: value });
    },
    obSourceList(parameter) {
      getSourceList(parameter)
        .then(res => {
          this.sourceList = res.data.data;
        })
        .catch(err => {});
    },
    disabledStartDate(startValue) {
      const endValue = this.searchTimer.end;
      if (!startValue || !endValue) {
        return startValue && startValue > moment().endOf("day");
      }
      return startValue.valueOf() > endValue;
    },
    disabledEndDate(endValue) {
      const startValue = this.searchTimer.start;
      if (!endValue || !startValue) {
        return endValue && endValue > moment().endOf("day");
      }
      return startValue >= endValue.valueOf();
    },
    handleStartChange(date) {
      date && (this.searchTimer.start = date.valueOf());
    },
    handleEndChange(date) {
      date && (this.searchTimer.end = date.valueOf());
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    setForm() {
      const record = {
        begin_time: undefined,
        end_time: undefined,
        source_class: undefined,
        source: undefined
      };
      this.mdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
    },
    handleSearch(e) {
      this.searchDone = false;
      this.downSrc = "";
      this.searchStatus = true;
      e.preventDefault();
      this.queryParam = {};
      this.form.validateFields((error, values) => {
        if (!error) {
          let onOffstart = false
          let onOffend = false
          if (values.my_timer && values.my_timer.length>0) {
            onOffstart = true
            this.queryParam.begin_time = moment(values.my_timer[0])
              .utcOffset(480)
              .format(this.dateFormat);
            this.queryParam.end_time = moment(values.my_timer[1])
              .utcOffset(480)
              .format(this.dateFormat);
          };
          if(values.deal_timer && values.deal_timer.length>0) {
            onOffend = true
           this.queryParam.deal_time_begin = moment(values.deal_timer[0])
              .utcOffset(480)
              .format(this.dateFormat);
            this.queryParam.deal_time_end = moment(values.deal_timer[1])
              .utcOffset(480)
              .format(this.dateFormat);
          };
          if(!onOffstart || !onOffend){
            this.$message.warning("请选择分配时间和成交时间！", 1);
            this.searchDone = true;
            return false;
          }
          if (values.source_class || values.source_class == 0) {
            this.queryParam.source_class = values.source_class;
          };
          if (values.source || values.source == 0) {
            this.queryParam.source = values.source;
          };
          this.getTotal(this.queryParam);
          this.$refs.table.refresh(true);
        }
      });
    },
    handleReset() {
      this.form.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.center-box {
  box-sizing: border-box;
  padding: 0;
  min-height: 356px;
  padding-bottom: 18px;
  .exportBox {
    margin: 20px;
    height: 32px;
    button {
      float: right;
    }
  }
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
    .totalbox {
      padding: 8px 20px 8px 180px;
      position: relative;
      .left {
        position: absolute;
        left: 20px;
        top: 8px;
      }
      .right {
        span {
          display: inline-block;
          margin-right: 40px;
        }
      }
    }
  }
}
.myfixcon {
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  padding: 40px 0;
  .top {
    text-align: center;
    border: 0 none;
    h4 {
      font-size: 22px;
      font-weight: 600;
      line-height: 30px;
    }
  }
  .middle {
    height: 100px;
    position: relative;
    padding-left: 70px;
    line-height: 100px;
    label {
      position: absolute;
      left: 0;
      right: 0;
    }
    .tipmsg {
      line-height: 22px;
      position: absolute;
      left: 70px;
      bottom: 14px;
      font-size: 12px;
      color: red;
    }
  }
  .bottom {
    text-align: center;
  }
}
</style>
<style scoped>
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
  min-width: 1000px;
}
.result-list >>> .ant-table {
  overflow-y: scroll;
}
</style>


