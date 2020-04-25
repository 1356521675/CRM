
<template>
  <div class="center-chart">
    <!-- <div class="top-title">
      <h2>实时数据&nbsp;&nbsp;{{nowTimer}}&nbsp;&nbsp;
        <a-icon class="info"
                type="question-circle"
                @click="showModal" />
      </h2>
    </div>-->
    <div :class="['key-indicators', {'phstyle': isMobile()}]">
      <h4 class="title">基础数据</h4>
      <a-spin :spinning="basicLoading">
        <div class="key-box">
          <a-row>
            <a-col
              :xs="12"
              :sm="12"
              :lg="6"
              v-for="(item, index) in keyList"
              :key="index"
              class="key-box-list"
            >
              <p class="title">{{item.one}}</p>
              <p class="number">{{item.two}}</p>
              <p class="text">
                {{item.text}}
                <span class="red" v-if="item.three.up">↑</span>
                <span class="grey" v-show="item.three.value>0" v-else>↓</span>
                {{item.three.value}}%
              </p>
            </a-col>
          </a-row>
        </div>
      </a-spin>
    </div>
    <div :class="['center-box', {'phstyle': isMobile()}]">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="24" :lg="24">
          <div class="trend-box">
            <h4 class="toptitle">
              <a-row>
                <a-col :xs="24" :sm="24" :lg="6">
                  <div class="tab-content">
                    <a-tabs :animated="false">
                      <a-tab-pane key="0" disabled>
                        <span slot="tab">来源分布</span>
                      </a-tab-pane>
                    </a-tabs>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :lg="10" class="mytime">
                  <span class="text">自定义时间</span>
                  <a-range-picker
                    :placeholder="['开始时间', '结束时间']"
                    v-model="turnDefaultTime"
                    :format="dateFormat"
                    :disabledDate="cusdisabledDate"
                    @change="turndateChange"
                  />
                </a-col>
              </a-row>
            </h4>
            <a-spin :spinning="comChartLoading">
              <div class="trend-chart keyword" style="text-align:center">
                <p style="text-align:left;line-height:20px">总量：{{sourceAllCount}}</p>
                <div class="keyword-title">
                  <a-row>
                    <a-col span="4">排序</a-col>
                    <a-col span="14">来源名称</a-col>
                    <a-col span="6">数量</a-col>
                  </a-row>
                </div>
                <div class="keyword-body">
                  <a-row class="keyword-list" v-for="(item, index) in sourceList" :key="index">
                    <a-col span="4">
                      <a-input
                        :value="item.promotion_sort"
                        style="text-align:center;line-height:34px;height:26px;width:66px"
                        type="number"
                        :min="0"
                        @pressEnter="e =>sortChangeSave(e,item)"
                        @change="e => sortChange(e, item)"
                        @blur="resortChange(item)"
                      />
                    </a-col>
                    <a-col span="14">{{item.name}}</a-col>
                    <a-col span="6">{{item.count}}</a-col>
                  </a-row>
                </div>
                <div ref="comChart" style="width: 100%;height: 260px"></div>
                <div
                  v-show="!showChart.comChart"
                  class="hidechatbg"
                  style="width: 100%;height: 292px;text-align:center;line-height:292px"
                >
                  <span v-show="!comChartLoading">暂无数据</span>
                </div>
              </div>
            </a-spin>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :lg="24">
          <div class="trend-box">
            <h4 class="toptitle">
              <a-row>
                <a-col :xs="24" :sm="24" :lg="6">
                  <div class="tab-content">
                    <a-tabs :animated="false">
                      <a-tab-pane key="0" disabled>
                        <span slot="tab">关键词排行</span>
                      </a-tab-pane>
                    </a-tabs>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :lg="10" class="mytime">
                  <span class="text">自定义时间</span>
                  <a-range-picker
                    :placeholder="['开始时间', '结束时间']"
                    v-model="turnDefaultTime"
                    :format="dateFormat"
                    :disabledDate="cusdisabledDate"
                    @change="turndateChanges"
                  />
                </a-col>
              </a-row>
            </h4>
            <a-spin :spinning="keywordLoading">
              <div class="trend-chart keyword" style="text-align:center">
                <div class="keyword-title">
                  <a-row>
                    <a-col span="4">排名</a-col>
                    <a-col span="14">关键词</a-col>
                    <a-col span="6">热度</a-col>
                  </a-row>
                </div>
                <div class="keyword-body">
                  <a-row class="keyword-list" v-for="(item, index) in keywordList" :key="index">
                    <a-col span="4">{{index+1}}</a-col>
                    <a-col span="14">{{item.keyword}}</a-col>
                    <a-col span="6">{{item.count}}</a-col>
                  </a-row>
                </div>
                <div
                  v-show="!showChart.keyword"
                  class="hidechatbg"
                  style="width: 100%;height: 300px;text-align:center;line-height:300px"
                >
                  <span v-show="!keywordLoading">暂无数据</span>
                </div>
              </div>
            </a-spin>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { mixinDevice } from "@/utils/mixin.js";
import moment from "moment";
import { getUserLogin } from "@/api/manage";
import {
  getCsdUnassigned,
  getMarketGetSource,
  getMarketGetKeyword,
  getMarketGetPlatform,
  getMarketGetHasProduct,
  getMarketGetArea,
  getMarketGetAreaCity,
  getMarketGetBasicDataView,
  postSourceUpdataSort
} from "@/api/market";
import echarts from "echarts";
import "echarts/map/js/china.js"; // 引入中国地图数据
import STable from "@/components/table/";
export default {
  components: {
    STable
  },
  mixins: [mixinDevice],
  data() {
    return {
      keyList: [
        {
          one: "今日客户量",
          two: 0,
          text: "日",
          three: {
            up: false,
            value: 0
          }
        },
        {
          one: "本月客户量",
          two: 0,
          text: "月",
          three: {
            up: false,
            value: 0
          }
        },
        {
          one: "今日添加率",
          two: "0%",
          text: "日",
          three: {
            up: false,
            value: 0
          }
        },
        {
          one: "今日成交率",
          two: "0%",
          text: "日",
          three: {
            up: false,
            value: 0
          }
        }
      ],
      activeNum: 0,
      keywordNum: 0,
      copNum: 0,
      cusNum: 0,
      areaNum: 0,
      arealineNum: 0,
      columns: [
        {
          title: "时间",
          width: "150px",
          dataIndex: "con_time"
        },
        {
          title: "浏览量PV",
          dataIndex: "con_qq",
          width: "150px"
        },
        {
          title: "独立用户UV",
          dataIndex: "con_wx",
          width: "150px"
        },
        {
          title: "访问次数VV",
          dataIndex: "con_telephone",
          width: "150px"
        },
        {
          title: "独立IP",
          dataIndex: "keyword",
          width: "100px"
        },
        {
          title: "跳出率",
          dataIndex: "con_area",
          width: "150px"
        },
        {
          title: "平均在线时长",
          dataIndex: "create_time",
          width: "200px"
        }
      ],
      nowTimer: moment(new Date()).format("HH:mm:ss"),
      visible: false,
      keywordList: [
        { keyword: "淘宝开店", count: "1000" },
        { keyword: "pdd开店", count: "1000" },
        { keyword: "我要开店", count: "1000" },
        { keyword: "直播卖货", count: "1000" },
        { keyword: "开店赚钱", count: "1000" },
        { keyword: "店铺运营", count: "1000" }
      ],
      chartList: {},
      basicLoading: true,
      comChartLoading: false,
      keywordLoading: false,
      showChart: {
        comChart: true,
        keyword: true
      },
      basicData: [],
      sourceList: [
        { promotion_sort: 1, name: "百度", count: "1000" },
        { promotion_sort: 3, name: "百度移动", count: "1000" },
        { promotion_sort: 2, name: "神马", count: "1000" },
        { promotion_sort: 4, name: "搜狐", count: "1000" },
        { promotion_sort: 6, name: "搜狗", count: "1000" },
        { promotion_sort: 9, name: "信息流", count: "1000" }
      ],
      sourceAllCount: 0,
      turnDefaultTime: [],
      dateFormat: "YYYY/MM/DD HH:mm:ss"
    };
  },
  created() {
    // this.getComData();
    // this.getKeywordData();
    this.getBasicData();
  },
  mounted() {},
  methods: {
    cusdisabledDate(current) {
      return current && current > moment().endOf("day");
    },
    turndateChange(date, dateString) {
      // let diffDays = 0;
      // if (date.length > 0) {
      //   diffDays =
      //     (moment(date[1]).valueOf() - moment(date[0]).valueOf()) /
      //     (24 * 3600 * 1000);
      //   if (diffDays > 180) {
      //     this.$warning({
      //       title: "日期范围有误",
      //       content: "自定义时间不能超过180天"
      //     });
      //     return;
      //   }
      // }
      // this.turnActiveKey = 0;
      // return;
      // if (date.length > 0) {
      //   this.comChartLoading = true;
      //   if (this.earlieNum < 2) {
      //     getMarketEarlieLateNumber({
      //       start_time: dateString[0],
      //       end_time: dateString[1]
      //     })
      //       .then(res => {
      //         if (res.code == 200) {
      //           this.showChart.comChart = true;
      //           this.drawTurnChart(res.data);
      //         } else if (res.code == 400) {
      //           this.comChartLoading = false;
      //           this.showChart.comChart = false;
      //         }
      //       })
      //       .catch(err => {
      //         this.comChartLoading = false;
      //       });
      //   } else {
      //     getMarketGroupNumber({
      //       start_time: dateString[0],
      //       end_time: dateString[1]
      //     })
      //       .then(res => {
      //         if (res.code == 200) {
      //           this.showChart.comChart = true;
      //           this.sourceAllCount = res.data.total;
      //           this.sourceList = res.data.current;
      //         } else if (res.code == 400) {
      //           // this.showChart.hbChart = false
      //           this.comChartLoading = false;
      //           this.showChart.comChart = false;
      //         }
      //       })
      //       .catch(err => {
      //         this.comChartLoading = false;
      //       });
      //   }
      // } else {
      //   this.turnActiveKey = (this.turnNum + 1).toString();
      //   this.getTurnData();
      // }
    },
    turndateChanges(date, dateString) {},
    getPageDates() {
      // this.getComData();
      // this.getKeywordData();
      this.getBasicData();
    },
    showModal() {
      this.visible = !this.visible;
    },
    drawComChat(data) {
      const mydata = data;
      let chartdata = [];
      let maxlength = mydata.length > 20 ? 20 : mydata.length;
      for (var i = 0; i < maxlength; i++) {
        chartdata.push({
          value: mydata[i].count,
          name: mydata[i].m_source ? mydata[i].m_source.source_name : "未知"
        });
      }
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      _this.chartList.comChart = echarts.init(this.$refs.comChart);
      _this.chartList.comChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: chartdata
          }
        ],
        color: [
          "#edb00d",
          "#4fa8f9",
          "#6ec71e",
          "#f56e6a",
          "#fc8b40",
          "#818af8",
          "#31c9d7",
          "#f35e7a",
          "#ab7aee",
          "#14d68b"
        ]
      });
      _this.comChartLoading = false;
    },
    getBasicData() {
      this.basicLoading = true;
      getMarketGetBasicDataView()
        .then(res => {
          if (res.code == 200) {
            for (var key in res.data) {
              this.basicData.push({
                old: res.data[key].old,
                new: res.data[key].new,
                addpersent: res.data[key].add_percentage
                  ? res.data[key].add_percentage
                  : "",
                dealpersent: res.data[key].deal_percentage
                  ? res.data[key].deal_percentage
                  : ""
              });
            }
            this.keyList.forEach((item, index) => {
              if (index <= 1) {
                item.two = this.basicData[index].new;
              } else if (index == 2) {
                item.two = this.basicData[index].addpersent + "%";
              } else if (index == 3) {
                item.two = this.basicData[index].dealpersent + "%";
              }
              item.three.up =
                this.basicData[index].new > this.basicData[index].old
                  ? true
                  : false;
              item.three.value =
                this.basicData[index].old != 0
                  ? (item.three.value = (
                      (Math.abs(
                        this.basicData[index].new - this.basicData[index].old
                      ) /
                        this.basicData[index].old) *
                      100
                    ).toFixed(2))
                  : this.basicData[index].new * 100;
            });
            this.basicLoading = false;
          }
        })
        .catch(err => {
          this.basicLoading = false;
        });
    },
    // getComData() {
    //   this.sourceList = [];
    //   this.sourceAllCount = 0;
    //   this.comChartLoading = true;
    //   let bydate = "";
    //   switch (this.activeNum) {
    //     case 0:
    //       bydate = "today";
    //       break;
    //     case 1:
    //       bydate = "week";
    //       break;
    //     case 2:
    //       bydate = "month";
    //       break;
    //     case 3:
    //       bydate = "year";
    //       break;
    //     default:
    //       break;
    //   }
    //   getMarketGetSource({ by: bydate })
    //     .then(res => {
    //       if (res.code == 200) {
    //         this.comChartLoading = false;
    //         this.showChart.comChart = true;
    //         this.sourceAllCount = res.data.total;
    //         this.sourceList = res.data.current;
    //         // this.drawComChat(res.data)
    //       } else if (res.code == 400) {
    //         this.showChart.comChart = false;
    //         this.comChartLoading = false;
    //       }
    //     })
    //     .catch(err => {
    //       this.comChartLoading = false;
    //     });
    // },
    // getKeywordData() {
    //   this.keywordLoading = true;
    //   let bydate = "";
    //   switch (this.keywordNum) {
    //     case 0:
    //       bydate = "today";
    //       break;
    //     case 1:
    //       bydate = "week";
    //       break;
    //     case 2:
    //       bydate = "month";
    //       break;
    //     case 3:
    //       bydate = "year";
    //       break;
    //     default:
    //       break;
    //   }
    //   getMarketGetKeyword({ by: bydate })
    //     .then(res => {
    //       if (res.code == 200) {
    //         this.keywordLoading = false;
    //         this.showChart.keyword = true;
    //         let new_arr = JSON.parse(JSON.stringify(res.data.data));
    //         let delcount = 0;
    //         if (new_arr) {
    //           new_arr.forEach((item, index) => {
    //             if (!item.keyword) {
    //               new_arr.splice(index, 1);
    //               delcount += item.count;
    //             }
    //           });
    //           new_arr.forEach((item, index) => {
    //             if (item.keyword == " ") {
    //               new_arr.splice(index, 1);
    //               delcount += item.count;
    //             }
    //           });
    //         }
    //         this.keywordList = new_arr;
    //       } else if (res.code == 400) {
    //         this.keywordLoading = false;
    //         this.showChart.keyword = false;
    //       }
    //     })
    //     .catch(err => {
    //       this.keywordLoading = false;
    //     });
    // },
    copShow(num) {
      this.copNum = num - 1;
      this.getCopData();
    },
    cusShow(num) {
      this.cusNum = num - 1;
      this.getCusData();
    },
    getNow() {
      const _this = this;
      window.setInterval(function() {
        _this.nowTimer = moment(new Date()).format("HH:mm:ss");
      }, 1000);
    },
    sortChangeSave(e, record) {
      const _this = this;
      record.saveModel = true;
      if (record.promotion_sort != record.renumber) {
        let parameter = {
          source_id: record.id,
          promotion_sort: Number(record.promotion_sort)
        };
        _this.$confirm({
          title: "提示",
          content: "确认修改排序数值？",
          okText: "确认",
          cancelText: "取消",
          onOk() {
            postSourceUpdataSort(parameter)
              .then(res => {
                if (res.code == 200) {
                  e.target.blur();
                  _this.$message.success("保存成功");
                  _this.sourceList.sort(function(a, b) {
                    return b.promotion_sort - a.promotion_sort;
                  });
                } else if (res.code == 400) {
                  _this.$message.warning(res.msg);
                } else {
                }
              })
              .catch(err => {
                // Do something
              });
          },
          onCancel() {
            record.source_sort = record.renumber;
          }
        });
      } else {
        this.$message.warning("当前排序值未做任何变化", 1);
      }
    },
    sortChange(e, record) {
      if (!record.setNum) {
        record.renumber = record.promotion_sort;
      }
      record.promotion_sort = e.target.value;
      record.setNum = true;
      record.saveModel = false;
    },
    resortChange(record) {
      !record.saveModel &&
        record.setNum &&
        (record.promotion_sort = record.renumber);
    }
  }
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
.center-chart {
  box-sizing: border-box;
  .top-title {
    background-color: #fff;
    box-sizing: border-box;
    padding-left: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    line-height: 58px;
    h2 {
      font-size: 16px;
    }
    .info {
      font-size: 12px;
      color: #bbbbbb;
      vertical-align: middle;
      transform: translateY(-2px);
      cursor: pointer;
      position: relative;
    }
  }

  .key-indicators {
    margin: 20px;
    border: 1px solid #f2f2f2;
    background-color: #fff;
    > .title {
      text-align: left;
      font-size: 14px;
      color: #333;
      margin: 0;
      padding-left: 20px;
      line-height: 36px;
      background-color: #f9f9f9;
      border-bottom: 1px solid #f2f2f2;
    }
    .key-box {
      width: 100%;
      overflow: hidden;
      .key-box-list {
        box-sizing: border-box;
        padding: 2% 4%;
        font-size: 12px;
        border-right: 1px solid #f2f2f2;
        .title {
          line-height: 12px;
        }
        .number {
          font-weight: 700;
          font-size: 24px;
          line-height: 48px;
          color: #000;
          text-indent: 6px;
        }
        .text {
          .red {
            display: inline-block;
            color: #ff4500;
            transform: translateY(2px) scale(0.9);
          }
          .grey {
            display: inline-block;
            color: #686564;
            transform: translateY(2px) scale(0.9);
          }
        }
        &:nth-last-of-type(1) {
          border: 0 none;
        }
      }
    }
  }
  .center-box {
    margin: 0 20px 20px;
  }
  .trend-box {
    border: 1px solid #f2f2f2;
    background-color: #fff;
    .toptitle {
      text-align: left;
      font-size: 14px;
      color: #333;
      margin: 0;
      line-height: 36px;
      height: 36px;
      overflow: hidden;
      background-color: #f9f9f9;
      border-bottom: 1px solid #f2f2f2;
      ul {
        li {
          display: inline-block;
          width: 70px;
          border-right: 1px solid #f2f2f2;
          text-align: center;
          cursor: pointer;
          &:nth-of-type(1) {
            width: auto;
            padding: 0 16px;
            cursor: default;
          }
        }
        .active {
          background-color: #447ed9;
          color: #fff;
        }
      }
      .mytime {
        padding-left: 76px;
        position: relative;
        height: 35px;
        .text {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
    .trend-chart {
      padding-bottom: 20px;
      position: relative;
      .title {
        line-height: 40px;
        padding-left: 20px;
        span {
          display: inline-block;
          vertical-align: middle;
          height: 24px;
          width: 5px;
          background-color: #555555;
          margin: 6px;
        }
      }
      .areabox {
        position: relative;
        .left {
          height: 500px;
          box-sizing: border-box;
          padding-top: 10px;
          text-align: center;
          .rankingbody {
            height: 448px;
            overflow-y: scroll;
          }
        }
      }
      .hidechatbg {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 260px;
        background-color: #fff;
      }
    }
    .keyword {
      height: 320px;
      font-size: 14px;
      line-height: 34px;
      box-sizing: border-box;
      padding: 10px 16px 0;
      .keyword-title {
        color: #999;
        border-bottom: 1px solid #f2f2f2;
      }
      .keyword-body {
        height: 245px;
        overflow-x: scroll;
      }
      .keyword-list {
        color: #686564;
        border-bottom: 1px solid #f2f2f2;
      }
    }
    .data-list {
      border-top: 1px solid #f2f2f2;
      .title {
        line-height: 50px;
        padding-left: 20px;
        span {
          display: inline-block;
          vertical-align: middle;
          height: 24px;
          width: 5px;
          background-color: #555555;
          margin: 6px;
        }
      }
      .result-list {
        margin: 0 20px;
      }
    }
  }
  .phstyle {
    margin: 0 0 20px;
  }
  .top-tips {
    left: 0;
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    .tipsbg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .tipscon {
      position: absolute;
      width: 400px;
      top: 20%;
      left: 50%;
      margin-left: -200px;
      z-index: 1000;
      background-color: #fff;
      .top {
        height: 50px;
        background-color: #447ed9;
        h5 {
          line-height: 50px;
          display: inline-block;
          padding-left: 20px;
          color: #fff;
          font-size: 16px;
        }
      }
      .bottom {
        margin: 20px 20px 4px;
        .line {
          padding-bottom: 6px;
          p {
            font-size: 14px;
            font-weight: 700;
            color: #000;
            line-height: 18px;
          }
          span {
            display: inline-block;
            font-size: 12px;
            color: #999;
            line-height: 18px;
            text-indent: 1em;
          }
          &:nth-last-of-type(1) {
            border-top: 1px solid #f9f9f9;
          }
        }
      }
      .button {
        height: 48px;
        box-sizing: border-box;
        text-align: right;
        line-height: 48px;
        background-color: #fafafa;
      }
    }
  }
}
</style>

<style  scoped>
.toptitle >>> .ant-row {
  background-color: #f9f9f9;
}
.toptitle >>> .tab-content .ant-tabs-top {
  border: 0;
}
.toptitle >>> .tab-content .ant-tabs-bar {
  margin: 0;
}
.toptitle >>> .tab-content .ant-tabs-bar .ant-tabs-nav-container {
  border: 0;
  background: #f9f9f9;
}
.toptitle
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-tab-disabled,
.ant-tabs-nav .ant-tabs-tab-disabled:hover {
  cursor: default;
  color: #000;
}
.toptitle
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-nav-wrap
  .ant-tabs-nav
  .ant-tabs-tab {
  margin: 0;
  padding: 7px 26px;
  border-right: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
}
.toptitle
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-tab-active {
  background-color: #447ed9;
  color: #fff;
}
.toptitle
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-ink-bar {
  height: 0;
  display: none;
}

.toptitle >>> .tab-content .ant-tabs-content {
  display: none;
  height: 0px;
  overflow: hidden;
}
.mytime >>> .ant-calendar-picker .ant-calendar-picker-input {
  height: 24px;
  padding: 0;
}
</style>