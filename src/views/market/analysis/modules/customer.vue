<template>
  <div class="center-chart">
    <div :class="['key-indicators', {'phstyle': isMobile()}]">
      <h4 class="title">基础数据</h4>
      <a-spin :spinning="loadingSet.basicLoading">
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
      <a-row :gutter="0">
        <a-col :xs="24" :sm="24" :lg="24">
          <div class="trend-box">
            <h4 class="toptitle">
              <a-row>
                <a-col
                  :xs="24"
                  :sm="24"
                  :lg="8"
                  :class="{'myborderBottom': isTablet() ||　isMobile()}"
                >
                  <div class="tab-content">
                    <a-tabs v-model="turnActiveKey" :animated="false">
                      <a-tab-pane key="0" disabled>
                        <span slot="tab">早晚班</span>
                      </a-tab-pane>
                    </a-tabs>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :lg="8" class="mytime">
                  <span class="text">自定义时间</span>
                  <a-range-picker
                    :placeholder="['开始时间', '结束时间']"
                    v-model="turnDefaultTime"
                    :format="dateFormat"
                    :disabledDate="cusdisabledDate"
                    @change="turndateChange"
                  />
                </a-col>
                <a-col :xs="24" :sm="24" :lg="8" :class="{'myborderTop': isTablet() ||　isMobile()}">
                  <ul style="line-height:35px">
                    <li :class="{active: earlieNum== 0}" @click="chooseEarlieChart(0)">早班</li>
                    <li :class="{active: earlieNum== 1}" @click="chooseEarlieChart(1)">晚班</li>
                    <li :class="{active: earlieNum== 2}" @click="chooseEarlieChart(2)">清除</li>
                  </ul>
                </a-col>
              </a-row>
            </h4>
            <div class="trend-chart">
              <h4 class="title" v-if="earlieNum <2 ">
                <span></span>
                客户量&nbsp;&nbsp;&nbsp;&nbsp;已录入:{{totalNum.createNum}}&nbsp;&nbsp; 已分配:{{totalNum.allotNum}}
              </h4>
              <h4 class="title" v-else>
                <span></span>
                已分配总量:&nbsp;&nbsp;{{totalNum.allotNum}}
              </h4>
              <a-row :gutter="16" style="padding: 0 20px">
                <a-col :xs="24" :sm="24" :lg="24" class="chartcon">
                  <a-spin :spinning="loadingSet.turnChartLoading">
                    <div ref="turnChart" style="height: 400px;padding-top:10px;"></div>
                    <div
                      v-show="!showChart.turnChart"
                      class="hidechatbg"
                      style="width: 100%;height: 400px;text-align:center;line-height:400px"
                    >
                      <span v-show="!loadingSet.turnChartLoading">暂无数据</span>
                    </div>
                  </a-spin>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div :class="['center-box', {'phstyle': isMobile()}]">
      <a-row :gutter="0">
        <a-col :xs="24" :sm="24" :lg="24">
          <div class="trend-box">
            <h4 class="toptitle">
              <a-row>
                <a-col
                  :xs="24"
                  :sm="24"
                  :lg="8"
                  :class="{'myborderBottom': isTablet() ||　isMobile()}"
                >
                  <div class="tab-content">
                    <a-tabs v-model="turnActiveKey" :animated="false">
                      <a-tab-pane key="0" disabled>
                        <span slot="tab">RIO</span>
                      </a-tab-pane>
                    </a-tabs>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :lg="8" class="mytime">
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
            <div class="trend-chart">
              <h4 class="title" v-if="earlieNum <2 ">
                <span></span>
                客户量&nbsp;&nbsp;&nbsp;&nbsp;已录入:{{totalNum.createNum}}&nbsp;&nbsp; 已分配:{{totalNum.allotNum}}
              </h4>
              <h4 class="title" v-else>
                <span></span>
                已分配总量:&nbsp;&nbsp;{{totalNum.allotNum}}
              </h4>
              <a-row :gutter="16" style="padding: 0 20px">
                <a-col :xs="24" :sm="24" :lg="24" class="chartcon">
                  <a-spin :spinning="loadingSet.turnChartLoading">
                    <div ref="turnCharts" style="height: 400px;padding-top:10px;"></div>
                    <div
                  
                      class="hidechatbg"
                      style="width: 100%;height: 400px;text-align:center;line-height:400px"
                    >
                        <!-- v-show="!showChart.turnChart"
                      <span v-show="!loadingSet.turnChartLoading">暂无数据</span> -->
                    </div>
                  </a-spin>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div :class="['center-box', {'phstyle': isMobile()}]">
      <a-row :gutter="0">
        <a-col :xs="24" :sm="24" :lg="24">
          <div class="trend-box">
            <h4 class="toptitle">
              <a-row>
                <a-col
                  :xs="24"
                  :sm="24"
                  :lg="8"
                  :class="{'myborderBottom': isTablet() ||　isMobile()}"
                >
                  <div class="tab-content">
                    <a-tabs
                      :class="{hideTabActive: hidetabActive.hbChat}"
                      v-model="cusActiveKey"
                      :animated="false"
                    >
                      <a-tab-pane key="0" disabled>
                        <span slot="tab">客户量</span>
                      </a-tab-pane>
                    </a-tabs>
                  </div>
                </a-col>
                <a-col :xs="24" :sm="24" :lg="8" class="mytime">
                  <span class="text">自定义时间</span>
                  <a-range-picker
                    :placeholder="['开始时间', '结束时间']"
                    v-model="cusdefaultTime"
                    :format="dateFormat"
                    :disabledDate="cusdisabledDate"
                    @change="cusdateChange"
                  />
                </a-col>
              </a-row>
            </h4>
            <div class="trend-chart">
              <h4 class="title">
                <span></span>
                数量：{{totalNum.cus}}
              </h4>
              <a-row :gutter="16" style="padding: 0 20px">
                <a-col :xs="24" :sm="24" :lg="24" class="chartcon">
                  <a-spin :spinning="loadingSet.hbChartLoading">
                    <div
                      ref="hbChart"
                      style="height: 400px;border:1px solid #999;padding-top:10px;"
                    ></div>
                    <div
                      v-show="!showChart.hbChart"
                      class="hidechatbg"
                      style="width: 100%;height: 400px;border:1px solid #999;text-align:center;line-height:400px"
                    >
                      <span v-show="!loadingSet.hbChartLoading">暂无数据</span>
                    </div>
                  </a-spin>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <div v-if="visible" class="top-tips">
      <div class="tipscon">
        <div class="top">
          <h5>参数说明</h5>
        </div>
        <div class="bottom">
          <div class="line">
            <p>浏览量(PV)</p>
            <span>页面被打开的次数</span>
          </div>
          <div class="line">
            <p>独立用户(UV)</p>
            <span>用户1天内去除重复访问次数</span>
          </div>
          <div class="line">
            <p>访问次数(VV)</p>
            <span>用户1天内访问次数</span>
          </div>
          <div class="line">
            <p>独立IP</p>
            <span>1天内访问的IP数</span>
          </div>
          <div class="line">
            <p>跳出率</p>
            <span>用户从指定页面离开应用或者不再进行下一步操作的概率</span>
          </div>
          <div class="line">
            <p>平均在线时长</p>
            <span>按天为维度，每个应用页面的人平均访问时长</span>
          </div>
          <div class="line">
            <span>网站每10分钟的动态变化，通常用于检测新上线活动的效果</span>
          </div>
        </div>
        <div class="button">
          <a-button
            type="primary"
            class="waves-effect waves-light"
            @click="showModal"
            style="margin-right:20px;width:80px"
          >确定</a-button>
        </div>
      </div>
      <div class="tipsbg" @click="showModal"></div>
    </div>
  </div>
</template>
<script>
import api from "@/api/index";
import { mixinDevice } from "@/utils/mixin.js";
import moment from "moment";
import { getUserLogin } from "@/api/manage";
import {
  getCsdUnassigned,
  getMarketGetBasicCustomerNum,
  getMarketCustomerNumber,
  getMarketSourceAll,
  getMarketEarlieLateNumber,
  getMarketGroupNumber
} from "@/api/market";
import echarts from "echarts";
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
          one: "今日销售添加量",
          two: 0,
          text: "日",
          three: {
            up: false,
            value: 0
          }
        },
        {
          one: "今日销售成交量",
          two: 0,
          text: "日",
          three: {
            up: false,
            value: 0
          }
        }
      ],
      cusActiveKey: "1",
      // distActiveKey: '1',
      turnActiveKey: "1",
      activeNum: 0,
      sourceNum: 0,
      turnNum: 0,
      hbNum: 0,
      distNum: 0,
      earlieNum: 0,
      nowTimer: moment(new Date()).format("HH:mm:ss"),
      visible: false,
      chartList: {},
      beginDay: "",
      endDay: "",
      dateFormat: "YYYY/MM/DD",
      defaultTime: [],
      cusdefaultTime: [],
      cusSearchTime: [],
      turnDefaultTime: [],
      basicData: [],
      chatRawData: {
        hbChat: [],
        distChat: {},
        distAddChat: {},
        distTurnChart: {}
      },
      loadingSet: {
        basicLoading: true,
        hbChartLoading: true,
        distChartLoading: true,
        distAddChartLoading: true,
        distTurnChartLoading: true,
        turnChartLoading: true
      },
      showChart: {
        hbChart: true,
        distChart: true,
        distAddChart: true,
        distTurnChart: true,
        turnChart: true,
        turnCharts: true
      },

      hidetabActive: {
        hbChat: false,
        sourceChart: false,
        turnChat: false
      },
      totalNum: {
        cus: "",
        dist: "",
        createNum: 0,
        allotNum: 0,
        addNumber: 0,
        addNumber: 0
      }
    };
  },
  created() {},
  mounted() {
    this.getBasicData();
    this.getCusData();
    this.getDistData();
    this.getTurnData();
  },
  methods: {
    moment,
    getPageDates() {
      this.getBasicData();
      this.getCusData();
      this.getDistData();
      // this.getTurnData()
    },
    getnowTime() {
      const endDay = new Date();
      const beginDay = moment(
        new Date(endDay - 1000 * 60 * 60 * 24 * 30),
        this.dateFormat
      );
      this.beginDay = beginDay;
      this.endDay = moment(beginDay, this.dateFormat);
      this.defaultTime.push(this.beginDay);
      this.defaultTime.push(this.endDay);
    },

    cusdateChange(date, dateString) {
      let diffDays = 0;
      if (date.length > 0) {
        diffDays =
          (moment(date[1]).valueOf() - moment(date[0]).valueOf()) /
          (24 * 3600 * 1000);
        if (diffDays > 180) {
          this.$warning({
            title: "日期范围有误",
            content: "自定义时间不能超过180天"
          });
          return;
        }
      }
      this.cusActiveKey = 0;
      this.hidetabActive.hbChat = true;
      if (date.length > 0) {
        this.loadingSet.hbChartLoading = true;
        getMarketCustomerNumber({
          start_time: dateString[0],
          end_time: dateString[1]
        })
          .then(res => {
            if (res.code == 200) {
              this.showChart.hbChart = true;
              this.drawCusChart(res.data);
            } else if (res.code == 400) {
              this.showChart.hbChart = false;
              this.loadingSet.hbChartLoading = false;
            }
          })
          .catch(err => {
            this.loadingSet.hbChartLoading = false;
          });
      } else {
        this.hidetabActive.hbChat = false;
        this.cusActiveKey = (this.activeNum + 1).toString();
        this.getCusData();
      }
    },
    turndateChange(date, dateString) {
      let diffDays = 0;
      if (date.length > 0) {
        diffDays =
          (moment(date[1]).valueOf() - moment(date[0]).valueOf()) /
          (24 * 3600 * 1000);
        if (diffDays > 180) {
          this.$warning({
            title: "日期范围有误",
            content: "自定义时间不能超过180天"
          });
          return;
        }
      }
      this.turnActiveKey = 0;
      if (date.length > 0) {
        this.loadingSet.turnChartLoading = true;
        if (this.earlieNum < 2) {
          getMarketEarlieLateNumber({
            start_time: dateString[0],
            end_time: dateString[1]
          })
            .then(res => {
              if (res.code == 200) {
                this.showChart.turnChart = true;
                this.drawTurnChart(res.data);
              } else if (res.code == 400) {
                // this.showChart.hbChart = false
                this.loadingSet.turnChartLoading = false;
                this.showChart.turnChart = false;
              }
            })
            .catch(err => {
              this.loadingSet.turnChartLoading = false;
            });
        } else {
          getMarketGroupNumber({
            start_time: dateString[0],
            end_time: dateString[1]
          })
            .then(res => {
              if (res.code == 200) {
                this.showChart.turnChart = true;
                this.drawGroupNumber(res.data);
              } else if (res.code == 400) {
                // this.showChart.hbChart = false
                this.loadingSet.turnChartLoading = false;
                this.showChart.turnChart = false;
              }
            })
            .catch(err => {
              this.loadingSet.turnChartLoading = false;
            });
        }
      } else {
        this.turnActiveKey = (this.turnNum + 1).toString();
        this.getTurnData();
      }
    },
    turndateChanges(date, dateString) {
      let diffDays = 0;
      if (date.length > 0) {
        diffDays =
          (moment(date[1]).valueOf() - moment(date[0]).valueOf()) /
          (24 * 3600 * 1000);
        if (diffDays > 180) {
          this.$warning({
            title: "日期范围有误",
            content: "自定义时间不能超过180天"
          });
          return;
        }
      }
      this.turnActiveKey = 0;
      if (date.length > 0) {
        this.loadingSet.turnChartLoading = true;
        if (this.earlieNum < 2) {
          getMarketEarlieLateNumber({
            start_time: dateString[0],
            end_time: dateString[1]
          })
            .then(res => {
              if (res.code == 200) {
                this.showChart.turnChart = true;
                this.drawTurnChart(res.data);
              } else if (res.code == 400) {
                // this.showChart.hbChart = false
                this.loadingSet.turnChartLoading = false;
                this.showChart.turnChart = false;
              }
            })
            .catch(err => {
              this.loadingSet.turnChartLoading = false;
            });
        } else {
          getMarketGroupNumber({
            start_time: dateString[0],
            end_time: dateString[1]
          })
            .then(res => {
              if (res.code == 200) {
                this.showChart.turnChart = true;
                this.drawGroupNumber(res.data);
              } else if (res.code == 400) {
                // this.showChart.hbChart = false
                this.loadingSet.turnChartLoading = false;
                this.showChart.turnChart = false;
              }
            })
            .catch(err => {
              this.loadingSet.turnChartLoading = false;
            });
        }
      } else {
        this.turnActiveKey = (this.turnNum + 1).toString();
        this.getTurnData();
      }
    },
    cusdisabledDate(current) {
      // Can not select days before today and today
      return current && current > moment().endOf("day");
    },
    showModal() {
      this.visible = !this.visible;
    },
    getBasicData() {
      this.loadingSet.basicLoading = true;
      getMarketGetBasicCustomerNum()
        .then(res => {
          if (res.code == 200) {
            for (var key in res.data) {
              this.basicData.push({
                old: res.data[key].old,
                new: res.data[key].new
              });
            }
            this.keyList.forEach((item, index) => {
              if (index <= 1) {
                item.two = this.basicData[index].new;
              } else if (index == 2) {
                // item.two = this.basicData[index].old != 0 ? (this.basicData[index].new / this.basicData[index].old * 100).toFixed(2) : this.basicData[index].new * 100 + '%'
                item.two = this.basicData[index].new;
              } else if (index == 3) {
                // item.two = this.basicData[index].old != 0 ? (this.basicData[index].new / this.basicData[index].old * 100).toFixed(2) : this.basicData[index].new * 100 + '%'
                item.two = this.basicData[index].new;
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
            this.loadingSet.basicLoading = false;
          }
        })
        .catch(err => {
          this.loadingSet.basicLoading = false;
        });
    },
    getCusData() {
      this.loadingSet.hbChartLoading = true;
      let bydate = "";
      switch (this.activeNum) {
        case 0:
          bydate = "today";
          break;
        case 1:
          bydate = "week";
          break;
        case 2:
          bydate = "month";
          break;
        case 3:
          bydate = "year";
          break;
        default:
          break;
      }
      getMarketCustomerNumber({ by: bydate })
        .then(res => {
          if (res.code == 200) {
            this.showChart.hbChart = true;
            this.drawCusChart(res.data);
          } else if (res.code == 400) {
            this.showChart.hbChart = false;
            this.loadingSet.hbChartLoading = false;
          }
        })
        .catch(err => {
          this.loadingSet.hbChartLoading = false;
        });
    },
    getDistData() {
      this.loadingSet.distChartLoading = true;
      this.loadingSet.distAddChartLoading = true;
      this.loadingSet.distTurnChartLoading = true;
      let bydate = "";
      switch (this.sourceNum) {
        case 0:
          bydate = "today";
          break;
        case 1:
          bydate = "week";
          break;
        case 2:
          bydate = "month";
          break;
        case 3:
          bydate = "year";
          break;
        default:
          break;
      }
      let errdata = {};
      getMarketSourceAll({ by: bydate })
        .then(res => {
          if (res.code == 200) {
            this.showChart.distChart = true;
            this.drawDistChart(res.data);
            this.showChart.distAddChart = true;
            this.drawDistAddChart(res.data);
            this.showChart.distTurnChart = true;
            this.drawDistTurnChart(res.data);
          } else if (res.code == 400) {
            this.showChart.distChart = false;
            this.loadingSet.distChartLoading = false;
            this.showChart.distAddChart = false;
            this.loadingSet.distAddChartLoading = false;
            this.showChart.distTurnChart = false;
            this.loadingSet.distTurnChartLoading = false;
          }
        })
        .catch(err => {
          this.loadingSet.distChartLoading = false;
          this.drawDistChart(errdata);
          this.loadingSet.distAddChartLoading = false;
          this.drawDistAddChart(errdata);
          this.loadingSet.distTurnChartLoading = false;
          this.drawDistTurnChart(errdata);
        });
    },
    getTurnData() {
      this.loadingSet.turnChartLoading = true;
      let bydate = "";
      switch (this.turnNum) {
        case 0:
          bydate = "today";
          break;
        case 1:
          bydate = "week";
          break;
        case 2:
          bydate = "month";
          break;
        case 3:
          bydate = "year";
          break;
        default:
          break;
      }
      let errdata = {
        current: {
          " data": [],
          start_time: "",
          end_time: ""
        }
      };
      getMarketEarlieLateNumber({ by: bydate })
        .then(res => {
          if (res.code == 200) {
            this.showChart.turnChart = true;
            this.drawTurnChart(res.data);
          } else if (res.code == 400) {
            this.showChart.turnChart = false;
            this.loadingSet.turnChartLoading = false;
          }
        })
        .catch(err => {
          this.loadingSet.turnChartLoading = false;
        });
    },
    getGroupNumber() {
      this.loadingSet.turnChartLoading = true;
      let bydate = "";
      switch (this.turnNum) {
        case 0:
          bydate = "today";
          break;
        case 1:
          bydate = "week";
          break;
        case 2:
          bydate = "month";
          break;
        case 3:
          bydate = "year";
          break;
        default:
          break;
      }
      let errdata = {
        current: {
          " data": [],
          start_time: "",
          end_time: ""
        }
      };
      getMarketGroupNumber({ by: bydate })
        .then(res => {
          if (res.code == 200) {
            this.showChart.turnChart = true;
            this.drawGroupNumber(res.data);
          } else {
            this.showChart.turnChart = false;
            this.drawGroupNumber({});
            this.loadingSet.turnChartLoading = false;
          }
        })
        .catch(err => {
          this.loadingSet.turnChartLoading = false;
        });
    },

    chooseEarlieChart(num) {
      this.earlieNum = num;
      if (this.turnActiveKey == 0) {
        this.loadingSet.turnChartLoading = true;
        if (this.earlieNum < 2) {
          getMarketEarlieLateNumber({
            start_time: this.cusSearchTime[0],
            end_time: this.cusSearchTime[1]
          })
            .then(res => {
              if (res.code == 200) {
                this.showChart.turnChart = true;
                this.drawTurnChart(res.data);
              } else if (res.code == 400) {
                // this.showChart.hbChart = false
                this.loadingSet.turnChartLoading = false;
                this.showChart.turnChart = false;
              }
            })
            .catch(err => {
              this.loadingSet.turnChartLoading = false;
            });
        } else {
          getMarketGroupNumber({
            start_time: this.cusSearchTime[0],
            end_time: this.cusSearchTime[1]
          })
            .then(res => {
              if (res.code == 200) {
                this.showChart.turnChart = true;
                this.drawGroupNumber(res.data);
              } else if (res.code == 400) {
                // this.showChart.hbChart = false
                this.loadingSet.turnChartLoading = false;
                this.showChart.turnChart = false;
              }
            })
            .catch(err => {
              this.loadingSet.turnChartLoading = false;
            });
        }
        return false;
      }
      if (num < 2) {
        this.getTurnData();
      } else {
        this.getGroupNumber();
      }
    },
    transTimer(t) {
      let mm = t.split("/");
      let result = "";
      result = mm[0] + "/" + mm[1] + "/" + mm[2];
      return result;
    },
    drawCusChart(data) {
      const _this = this;
      data && (_this.chatRawData.hbChat = data);
      let cstartTimer = _this.chatRawData.hbChat.current.start_time;
      let cendTimer = _this.chatRawData.hbChat.current.end_time;
      let qstartTimer = _this.chatRawData.hbChat.qoq.start_time;
      let qendTimer = _this.chatRawData.hbChat.qoq.end_time;
      let ystartTimer = _this.chatRawData.hbChat.yoy.start_time;
      let yendTimer = _this.chatRawData.hbChat.yoy.end_time;
      let xAxisData = { current: [], yoy: [], qoq: [] },
        currentNum = 0,
        qoqNum = 0;
      let seriesData = { current: [], qoq: [], yoy: [] };
      let totalNum = 0;
      for (var key in _this.chatRawData.hbChat.current.data) {
        if (this.activeNum == 0 && !this.hidetabActive.hbChat) {
          xAxisData.current.push(-(-key) + 1);
        } else {
          xAxisData.current.push(key);
        }
        _this.chatRawData.hbChat.current.data[key] != 0 && (currentNum += 1);
        seriesData.current.push(_this.chatRawData.hbChat.current.data[key]);
        totalNum += _this.chatRawData.hbChat.current.data[key];
      }
      _this.totalNum.cus = totalNum;
      for (var key in _this.chatRawData.hbChat.qoq.data) {
        if (this.activeNum == 0 && !this.hidetabActive.hbChat) {
          xAxisData.qoq.push(-(-key) + 1);
        } else {
          xAxisData.qoq.push(key);
        }
        _this.chatRawData.hbChat.qoq.data[key] != 0 && (currentNum += 1);
        seriesData.qoq.push(_this.chatRawData.hbChat.qoq.data[key]);
      }
      for (var key in _this.chatRawData.hbChat.yoy.data) {
        if (this.activeNum == 0 && !this.hidetabActive.hbChat) {
          xAxisData.yoy.push(-(-key) + 1);
        } else {
          xAxisData.yoy.push(key);
        }
        _this.chatRawData.hbChat.yoy.data[key] != 0 && (currentNum += 1);
        seriesData.yoy.push(_this.chatRawData.hbChat.yoy.data[key]);
      }
      let seriesType = "bar";
      let seriesLabelShow = true;
      if (xAxisData.current.length > 31) {
        seriesType = "line";
        seriesLabelShow = false;
      }
      // 基于准备好的dom，初始化echarts实例
      const titleArr = ["客户量", "客户量同比", "客户量环比"];
      let cusNames = [];
      if (!this.hidetabActive.hbChat) {
        if (_this.activeNum == 0) {
          cusNames = [
            cstartTimer + " 客户量",
            ystartTimer + " 客户量",
            qstartTimer + " 客户量"
          ];
        } else if (_this.activeNum == 1) {
          cusNames = [
            cstartTimer + "--" + cendTimer + " 客户量",
            ystartTimer + "--" + yendTimer + " 客户量",
            qstartTimer + "--" + qendTimer + " 客户量"
          ];
        } else if (_this.activeNum == 2) {
          cusNames = [
            cstartTimer + "--" + cendTimer + " 客户量",
            ystartTimer + "--" + yendTimer + " 客户量",
            qstartTimer + "--" + qendTimer + " 客户量"
          ];
        } else if (_this.activeNum == 3) {
          cusNames = [
            cstartTimer.slice(0, 7) + "--" + cendTimer.slice(0, 7) + " 客户量",
            ystartTimer.slice(0, 7) + "--" + yendTimer.slice(0, 7) + " 客户量",
            qstartTimer.slice(0, 7) + "--" + qendTimer.slice(0, 7) + " 客户量"
          ];
        }
      } else {
        cusNames = [
          cstartTimer + "--" + cendTimer + " 客户量",
          ystartTimer + "--" + yendTimer + " 客户量",
          qstartTimer + "--" + qendTimer + " 客户量"
        ];
      }
      let colorlist = {
        current: "#5793f3",
        yoy: "#d14a61",
        qoq: "#d14a61"
      };
      let xAxisSetDatas = [];
      let cusseries = [];
      let tooltipSet = {};
      const barWidthArr = ["50%", "20%", "50%", "30%"];
      if (_this.activeNum == 0 && !this.hidetabActive.hbChat) {
        xAxisSetDatas = [
          [
            {
              type: "category",
              data: xAxisData.current,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          [
            {
              type: "category",
              data: xAxisData.current,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          [
            {
              type: "category",
              data: xAxisData.current,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ]
        ];
        cusseries = [
          [
            {
              name: cusNames[0],
              type: seriesType,
              barWidth: "50%",
              data: seriesData.current,
              color: colorlist.current
            }
          ],
          [
            {
              name: cusNames[1],
              type: "bar",
              data: seriesData.yoy,
              color: colorlist.yoy
            },
            {
              name: cusNames[0],
              type: "bar",
              data: seriesData.current,
              color: colorlist.current
            }
          ],
          [
            {
              name: cusNames[0],
              type: "bar",
              data: seriesData.current,
              color: colorlist.current
            },
            {
              name: cusNames[2],
              type: "bar",
              data: seriesData.qoq,
              color: colorlist.qoq
            }
          ]
        ];
        tooltipSet = {
          trigger: ["axis", "axis", "axis"],
          type: ["shadow", "shadow", "shadow"]
        };
      } else {
        xAxisSetDatas = [
          [
            {
              type: "category",
              data: xAxisData.current,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisPointer: {
                label: {
                  formatter: function(params) {
                    return (
                      "客户量  " +
                      params.value +
                      (params.seriesData.length
                        ? "：" + params.seriesData[0].data
                        : "")
                    );
                  }
                }
              }
            }
          ],
          [
            {
              type: "category",
              data: xAxisData.current,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colorlist.current
                }
              },
              axisTick: {
                show: false
              },
              axisPointer: {
                label: {
                  formatter: function(params) {
                    return (
                      "客户量  " +
                      params.value +
                      (params.seriesData.length
                        ? "：" + params.seriesData[0].data
                        : "")
                    );
                  }
                }
              }
            },
            {
              type: "category",
              data: xAxisData.yoy,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colorlist.yoy
                }
              },
              axisTick: {
                show: false
              },
              axisPointer: {
                label: {
                  formatter: function(params) {
                    return (
                      "客户量  " +
                      params.value +
                      (params.seriesData.length
                        ? "：" + params.seriesData[0].data
                        : "")
                    );
                  }
                }
              }
            }
          ],
          [
            {
              type: "category",
              data: xAxisData.current,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colorlist.current
                }
              },
              axisTick: {
                show: false
              },
              axisPointer: {
                label: {
                  formatter: function(params) {
                    return (
                      "客户量  " +
                      params.value +
                      (params.seriesData.length
                        ? "：" + params.seriesData[0].data
                        : "")
                    );
                  }
                }
              }
            },
            {
              type: "category",
              data: xAxisData.qoq,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colorlist.qoq
                }
              },
              axisTick: {
                show: false
              },
              axisPointer: {
                label: {
                  formatter: function(params) {
                    return (
                      "客户量  " +
                      params.value +
                      (params.seriesData.length
                        ? "：" + params.seriesData[0].data
                        : "")
                    );
                  }
                }
              }
            }
          ]
        ];
        cusseries = [
          [
            {
              name: cusNames[0],
              type: seriesType,
              barWidth: barWidthArr[_this.activeNum],
              data: seriesData.current,
              color: colorlist.current
            }
          ],
          [
            {
              name: cusNames[1],
              type: "line",
              data: seriesData.yoy,
              color: colorlist.yoy,
              xAxisIndex: 1
            },
            {
              name: cusNames[0],
              type: "line",
              data: seriesData.current,
              color: colorlist.current
            }
          ],
          [
            {
              name: cusNames[0],
              type: "line",
              data: seriesData.current,
              color: colorlist.current
            },
            {
              name: cusNames[2],
              type: "line",
              data: seriesData.qoq,
              color: colorlist.qoq,
              xAxisIndex: 1
            }
          ]
        ];
        tooltipSet = {
          trigger: ["axis", "none", "none"],
          type: ["shadow", "cross", "cross"]
        };
      }
      let tooltipData = {};
      if (_this.hbNum == 0) {
        tooltipData = {
          formatter: function(params) {
            return (
              params[0].marker +
              params[0].seriesName +
              "<br/>" +
              params[0].name +
              "：" +
              params[0].value
            );
          },
          trigger: tooltipSet.trigger[_this.hbNum],
          axisPointer: {
            type: tooltipSet.type[_this.hbNum]
          }
        };
      } else {
        tooltipData = {
          formatter: function(params) {
            return (
              params[0].marker +
              params[0].seriesName +
              "<br/>" +
              params[0].name +
              "：" +
              params[0].value +
              "<br/>" +
              params[1].marker +
              params[1].seriesName +
              "<br/>" +
              params[1].name +
              "：" +
              params[1].value
            );
          },
          trigger: tooltipSet.trigger[_this.hbNum],
          axisPointer: {
            type: tooltipSet.type[_this.hbNum]
          }
        };
      }
      _this.chartList.hbChart = echarts.init(this.$refs.hbChart);
      _this.chartList.hbChart.setOption(
        {
          title: {
            text: titleArr[_this.hbNum],
            left: "center",
            top: "2%"
          },
          tooltip: tooltipData,
          legend: {
            left: "center",
            bottom: 4
          },
          grid: {
            left: "4%",
            right: "4%",
            bottom: "14%",
            containLabel: true
          },
          xAxis: xAxisSetDatas[_this.hbNum],
          yAxis: [
            {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: "#999"
                }
              }
            }
          ],
          series: cusseries[_this.hbNum]
        },
        true
      );
      _this.loadingSet.hbChartLoading = false;
    },
    drawDistChart(data) {
      let _this = this;
      if (data && data.distributing.length == 0) {
        this.showChart.distChart = false;
        this.loadingSet.distChartLoading = false;
      }
      data && (_this.chatRawData.distChat = data);
      let cstartTimer = _this.chatRawData.distChat.timestamp.current[0];
      let cendTimer = _this.chatRawData.distChat.timestamp.current[1];
      let qstartTimer = _this.chatRawData.distChat.timestamp.qoq[0];
      let qendTimer = _this.chatRawData.distChat.timestamp.qoq[1];
      let ystartTimer = _this.chatRawData.distChat.timestamp.yoy[0];
      let yendTimer = _this.chatRawData.distChat.timestamp.yoy[1];
      let xAxisData = [];
      let seriesData = { current: [], qoq: [], yoy: [] };
      let totalNum = 0;
      _this.chatRawData.distChat.distributing.forEach(item => {
        xAxisData.push(item.source_name.name);
        seriesData.current.push(item.count);
        seriesData.qoq.push(item.count_qoq);
        seriesData.yoy.push(item.count_yoy);
        totalNum += item.count;
      });
      let seriesType = "bar";
      let seriesLabelShow = true;
      if (xAxisData.length > 14) {
        seriesType = "bar";
        seriesLabelShow = false;
      }
      _this.totalNum.dist = totalNum;
      let titleText = [];
      if (!this.hidetabActive.sourceChart) {
        if (_this.sourceNum == 0) {
          titleText = [
            cstartTimer + "来源分布",
            qstartTimer + "来源分布",
            ystartTimer + "来源分布"
          ];
        } else if (_this.sourceNum == 1) {
          titleText = [
            cstartTimer + "--" + cendTimer + "来源分布",
            qstartTimer + "--" + qendTimer + "来源分布",
            ystartTimer + "--" + yendTimer + "来源分布"
          ];
        } else if (_this.sourceNum == 2) {
          titleText = [
            cstartTimer + "--" + cendTimer + "来源分布",
            qstartTimer + "--" + qendTimer + "来源分布",
            ystartTimer + "--" + yendTimer + "来源分布"
          ];
        } else if (_this.sourceNum == 3) {
          titleText = [
            cstartTimer.slice(0, 7) + "--" + cendTimer.slice(0, 7) + "来源分布",
            qstartTimer.slice(0, 7) + "--" + qendTimer.slice(0, 7) + "来源分布",
            ystartTimer.slice(0, 7) + "--" + yendTimer.slice(0, 7) + "来源分布"
          ];
        }
      } else {
        titleText = [
          cstartTimer + "--" + cendTimer + "来源分布",
          qstartTimer + "--" + qendTimer + "来源分布",
          ystartTimer + "--" + yendTimer + "来源分布"
        ];
      }
      _this.chatRawData.distChat.distributing.length == 0 && (titleText = []);
      let cusseries = [
        [
          {
            name: titleText[0],
            type: seriesType,
            barWidth: "30%",
            data: seriesData.current,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#447ed9"
          }
        ],
        [
          {
            name: titleText[1],
            type: seriesType,
            barWidth: "30%",
            data: seriesData.qoq,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#fc8b40"
          },
          {
            name: titleText[0],
            type: seriesType,
            barWidth: "30%",
            data: seriesData.current,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#447ed9"
          }
        ],
        [
          {
            name: titleText[0],
            type: seriesType,
            barWidth: "30%",
            data: seriesData.yoy,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#fc8b40"
          },
          {
            name: titleText[2],
            type: seriesType,
            barWidth: "30%",
            data: seriesData.current,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#447ed9"
          }
        ]
      ];
      const titleArr = ["来源分布", "来源分布同比", "来源分布环比"];
      _this.chartList.distChart = echarts.init(this.$refs.distChart);
      _this.chartList.distChart.setOption(
        {
          color: ["#5b9bd5"],
          title: {
            text: titleArr[_this.distNum],
            left: "center",
            top: "2%"
          },
          legend: {
            left: "center",
            bottom: 4
            // data: [nameTimer[1] + '客户量', nameTimer[1] + '客户量']
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "4%",
            right: "4%",
            bottom: "14%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: xAxisData,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: "#999"
                }
              }
            }
          ],
          series: cusseries[_this.distNum]
        },
        true
      );
      _this.loadingSet.distChartLoading = false;
    },
    drawDistAddChart(data) {
      let _this = this;
      if (data && data.add.length == 0) {
        this.showChart.distAddChart = false;
        this.loadingSet.distAddChartLoading = false;
      }
      data && (_this.chatRawData.distAddChat = data);
      let cstartTimer = _this.chatRawData.distAddChat.timestamp.current[0];
      let cendTimer = _this.chatRawData.distAddChat.timestamp.current[1];
      let qstartTimer = _this.chatRawData.distAddChat.timestamp.qoq[0];
      let qendTimer = _this.chatRawData.distAddChat.timestamp.qoq[1];
      let ystartTimer = _this.chatRawData.distAddChat.timestamp.yoy[0];
      let yendTimer = _this.chatRawData.distAddChat.timestamp.yoy[1];
      let xAxisData = [];
      let seriesData = { current: [], qoq: [], yoy: [] };
      let totalNum = 0;
      _this.chatRawData.distAddChat.add.forEach(item => {
        xAxisData.push(item.source_name.name);
        seriesData.current.push(item.count);
        seriesData.qoq.push(item.count_qoq);
        seriesData.yoy.push(item.count_yoy);
        totalNum += item.count;
      });
      _this.totalNum.addNumber = totalNum;
      let seriesType = "bar";
      let seriesLabelShow = true;
      if (xAxisData.length > 14) {
        seriesType = "bar";
        seriesLabelShow = false;
      }
      let titleText = [];
      if (!this.hidetabActive.sourceChart) {
        if (_this.sourceNum == 0) {
          titleText = [
            cstartTimer + "来源添加",
            qstartTimer + "来源添加",
            ystartTimer + "来源添加"
          ];
        } else if (_this.sourceNum == 1) {
          titleText = [
            cstartTimer + "--" + cendTimer + "来源添加",
            qstartTimer + "--" + qendTimer + "来源添加",
            ystartTimer + "--" + yendTimer + "来源添加"
          ];
        } else if (_this.sourceNum == 2) {
          titleText = [
            cstartTimer + "--" + cendTimer + "来源添加",
            qstartTimer + "--" + qendTimer + "来源添加",
            ystartTimer + "--" + yendTimer + "来源添加"
          ];
        } else if (_this.sourceNum == 3) {
          titleText = [
            cstartTimer.slice(0, 7) + "--" + cendTimer.slice(0, 7) + "来源添加",
            qstartTimer.slice(0, 7) + "--" + qendTimer.slice(0, 7) + "来源添加",
            ystartTimer.slice(0, 7) + "--" + yendTimer.slice(0, 7) + "来源添加"
          ];
        }
      } else {
        titleText = [
          cstartTimer + "--" + cendTimer + "来源添加",
          qstartTimer + "--" + qendTimer + "来源添加",
          ystartTimer + "--" + yendTimer + "来源添加"
        ];
      }
      _this.chatRawData.distAddChat.add.length == 0 && (titleText = []);
      let cusseries = [
        [
          {
            name: titleText[0],
            type: seriesType,
            barWidth: "30%",
            data: seriesData.current,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#447ed9"
          }
        ],
        [
          {
            name: titleText[1],
            type: seriesType,
            barWidth: "30%",
            data: seriesData.qoq,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#fc8b40"
          },
          {
            name: titleText[0],
            type: seriesType,
            barWidth: "30%",
            data: seriesData.current,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#447ed9"
          }
        ],
        [
          {
            name: titleText[0],
            type: seriesType,
            data: seriesData.yoy,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#fc8b40"
          },
          {
            name: titleText[2],
            type: seriesType,
            data: seriesData.current,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#447ed9"
          }
        ]
      ];
      const titleArr = ["来源添加", "来源添加同比", "来源添加环比"];
      _this.chartList.distAddChart = echarts.init(this.$refs.distAddChart);
      _this.chartList.distAddChart.setOption(
        {
          color: ["#5b9bd5"],
          title: {
            text: titleArr[_this.distNum],
            left: "center",
            top: "2%"
          },
          legend: {
            left: "center",
            bottom: 4
            // data: [nameTimer[1] + '客户量', nameTimer[1] + '客户量']
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "4%",
            right: "4%",
            bottom: "14%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: xAxisData,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: "#999"
                }
              }
            }
          ],
          series: cusseries[_this.distNum]
        },
        true
      );
      _this.loadingSet.distAddChartLoading = false;
    },
    drawDistTurnChart(data) {
      let _this = this;
      if (data && data.conversion.length == 0) {
        this.showChart.distTurnChart = false;
        this.loadingSet.distTurnChartLoading = false;
      }
      data && (_this.chatRawData.distTurnChart = data);
      let cstartTimer = _this.chatRawData.distTurnChart.timestamp.current[0];
      let cendTimer = _this.chatRawData.distTurnChart.timestamp.current[1];
      let qstartTimer = _this.chatRawData.distTurnChart.timestamp.qoq[0];
      let qendTimer = _this.chatRawData.distTurnChart.timestamp.qoq[1];
      let ystartTimer = _this.chatRawData.distTurnChart.timestamp.yoy[0];
      let yendTimer = _this.chatRawData.distTurnChart.timestamp.yoy[1];
      let xAxisData = [];
      let seriesData = { current: [], qoq: [], yoy: [] };
      let totalNum = 0;
      _this.chatRawData.distTurnChart.conversion.forEach(item => {
        xAxisData.push(item.source_name.name);
        seriesData.current.push(item.count);
        seriesData.qoq.push(item.count_qoq);
        seriesData.yoy.push(item.count_yoy);
        totalNum += item.count;
      });
      _this.totalNum.turnNumber = totalNum;
      let seriesType = "bar";
      let seriesLabelShow = true;
      if (xAxisData.length > 14) {
        seriesType = "bar";
        seriesLabelShow = false;
      }
      let titleText = [];
      if (!this.hidetabActive.sourceChart) {
        if (_this.sourceNum == 0) {
          titleText = [
            cstartTimer + "来源转化",
            qstartTimer + "来源转化",
            ystartTimer + "来源转化"
          ];
        } else if (_this.sourceNum == 1) {
          titleText = [
            cstartTimer + "--" + cendTimer + "来源转化",
            qstartTimer + "--" + qendTimer + "来源转化",
            ystartTimer + "--" + yendTimer + "来源转化"
          ];
        } else if (_this.sourceNum == 2) {
          titleText = [
            cstartTimer + "--" + cendTimer + "来源转化",
            qstartTimer + "--" + qendTimer + "来源转化",
            ystartTimer + "--" + yendTimer + "来源转化"
          ];
        } else if (_this.sourceNum == 3) {
          titleText = [
            cstartTimer.slice(0, 7) + "--" + cendTimer.slice(0, 7) + "来源转化",
            qstartTimer.slice(0, 7) + "--" + qendTimer.slice(0, 7) + "来源转化",
            ystartTimer.slice(0, 7) + "--" + yendTimer.slice(0, 7) + "来源转化"
          ];
        }
      } else {
        titleText = [
          cstartTimer + "--" + cendTimer + "来源转化",
          qstartTimer + "--" + qendTimer + "来源转化",
          ystartTimer + "--" + yendTimer + "来源转化"
        ];
      }
      _this.chatRawData.distTurnChart.conversion.length == 0 &&
        (titleText = []);
      let cusseries = [
        [
          {
            name: titleText[0],
            type: seriesType,
            barWidth: "30%",
            data: seriesData.current,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#447ed9"
          }
        ],
        [
          {
            name: titleText[1],
            type: seriesType,
            barWidth: "30%",
            data: seriesData.qoq,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#fc8b40"
          },
          {
            name: titleText[0],
            type: seriesType,
            barWidth: "30%",
            data: seriesData.current,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#447ed9"
          }
        ],
        [
          {
            name: titleText[0],
            type: seriesType,
            data: seriesData.yoy,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#fc8b40"
          },
          {
            name: titleText[2],
            type: seriesType,
            data: seriesData.current,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top"
              }
            },
            color: "#447ed9"
          }
        ]
      ];
      const titleArr = ["来源转化", "来源转化同比", "来源转化环比"];
      _this.chartList.distTurnChart = echarts.init(this.$refs.distTurnChart);
      _this.chartList.distTurnChart.setOption(
        {
          color: ["#5b9bd5"],
          title: {
            text: titleArr[_this.distNum],
            left: "center",
            top: "2%"
          },
          legend: {
            left: "center",
            bottom: 4
            // data: [nameTimer[1] + '客户量', nameTimer[1] + '客户量']
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "4%",
            right: "4%",
            bottom: "14%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: xAxisData,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: "#999"
                }
              }
            }
          ],
          series: cusseries[_this.distNum]
        },
        true
      );
      _this.loadingSet.distTurnChartLoading = false;
      window.onresize = () => {
        _this.chartList.distChart && _this.chartList.distChart.resize();
        _this.chartList.distAddChart && _this.chartList.distAddChart.resize();
        _this.chartList.distTurnChart && _this.chartList.distTurnChart.resize();
        _this.chartList.hbChart && _this.chartList.hbChart.resize();
        _this.chartList.turnChart && _this.chartList.turnChart.resize();
      };
    },
    drawTurnChart(data) {
      this.totalNum.createNum = 0;
      this.totalNum.allotNum = 0;
      let _this = this;
      data && (_this.chatRawData.turnChat = data);
      let cstartTimer = _this.chatRawData.turnChat.current.start_time;
      let cendTimer = _this.chatRawData.turnChat.current.end_time;
      this.turnDefaultTime = [];
      this.cusSearchTime = [cstartTimer, cendTimer];
      this.turnDefaultTime.push(moment(cstartTimer, this.dateFormat));
      this.turnDefaultTime.push(moment(cendTimer, this.dateFormat));
      let xAxisData = [];
      let seriesData = {
        earlie_allot: [],
        earlie_create: [],
        late_allot: [],
        late_create: []
      };
      let mytotalNum = {
        earlie_allot: 0,
        earlie_create: 0,
        late_allot: 0,
        late_create: 0
      };
      for (var key in _this.chatRawData.turnChat.current.earlie_create) {
        xAxisData.push(key);
        seriesData.earlie_create.push(
          _this.chatRawData.turnChat.current.earlie_create[key]
        );
        mytotalNum.earlie_create +=
          _this.chatRawData.turnChat.current.earlie_create[key];
      }
      for (var key1 in _this.chatRawData.turnChat.current.earlie_allot) {
        seriesData.earlie_allot.push(
          _this.chatRawData.turnChat.current.earlie_allot[key1]
        );
        mytotalNum.earlie_allot +=
          _this.chatRawData.turnChat.current.earlie_allot[key1];
      }
      for (var key2 in _this.chatRawData.turnChat.current.late_create) {
        seriesData.late_create.push(
          _this.chatRawData.turnChat.current.late_create[key2]
        );
        mytotalNum.late_create +=
          _this.chatRawData.turnChat.current.late_create[key2];
      }
      for (var key3 in _this.chatRawData.turnChat.current.late_allot) {
        seriesData.late_allot.push(
          _this.chatRawData.turnChat.current.late_allot[key3]
        );
        mytotalNum.late_allot +=
          _this.chatRawData.turnChat.current.late_allot[key3];
      }
      let seriesType = "bar";
      let seriesLabelShow = true;
      if (xAxisData.length > 31) {
        seriesType = "line";
      }
      if (xAxisData.length > 24) {
        seriesLabelShow = false;
      }
      let titleText = [];
      if (!this.hidetabActive.sourceChart) {
        if (_this.turnNum == 0) {
          titleText = [
            cstartTimer + "转化率",
            cstartTimer + "转化率",
            cstartTimer + "转化率"
          ];
        } else if (_this.turnNum == 1) {
          titleText = [
            cstartTimer + "--" + cendTimer + "转化率",
            cstartTimer + "--" + cendTimer + "转化率",
            cstartTimer + "--" + cendTimer + "转化率"
          ];
        } else if (_this.turnNum == 2) {
          titleText = [
            cstartTimer + "--" + cendTimer + "转化率",
            cstartTimer + "--" + cendTimer + "转化率",
            cstartTimer + "--" + cendTimer + "转化率"
          ];
        } else if (_this.turnNum == 3) {
          titleText = [
            cstartTimer.slice(0, 7) + "--" + cendTimer.slice(0, 7) + "转化率",
            cstartTimer.slice(0, 7) + "--" + cendTimer.slice(0, 7) + "转化率",
            cstartTimer.slice(0, 7) + "--" + cendTimer.slice(0, 7) + "转化率"
          ];
        }
      } else {
        titleText = [
          cstartTimer + "--" + cendTimer + "转化率",
          cstartTimer + "--" + cendTimer + "转化率",
          cstartTimer + "--" + cendTimer + "转化率"
        ];
      }
      const titleArr = ["早班客户量", "晚班客户量", "早晚班客户量"];
      const barWidthArr = ["50%", "20%", "30%", "30%"];
      const labelShow = [true, true, true, true];
      let mySeries = [];
      if (this.earlieNum == 0) {
        this.totalNum.createNum = mytotalNum.earlie_create;
        this.totalNum.allotNum = mytotalNum.earlie_allot;
        mySeries = [
          {
            name: "已录入",
            type: seriesType,
            // barWidth: barWidthArr[_this.turnNum],
            data: seriesData.earlie_create,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top",
                distance: 2
              }
            },
            color: "#4fa8f9"
          },
          {
            name: "已分配",
            type: seriesType,
            // barWidth: barWidthArr[_this.turnNum],
            data: seriesData.earlie_allot,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top",
                distance: 2
              }
            },
            color: "#6ec71e"
          }
        ];
      } else if (this.earlieNum == 1) {
        this.totalNum.createNum = mytotalNum.late_create;
        this.totalNum.allotNum = mytotalNum.late_allot;
        mySeries = [
          {
            name: "已录入",
            type: seriesType,
            // barWidth: barWidthArr[_this.turnNum],
            data: seriesData.late_create,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top",
                distance: 2
              }
            },
            color: "#4fa8f9"
          },
          {
            name: "已分配",
            type: seriesType,
            // barWidth: barWidthArr[_this.turnNum],
            data: seriesData.late_allot,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top",
                distance: 2
              }
            },
            color: "#6ec71e"
          }
        ];
      } else if (this.earlieNum == 2) {
        mySeries = [
          {
            name: "早班已录入",
            type: seriesType,
            // barWidth: barWidthArr[_this.turnNum],
            data: seriesData.earlie_create,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top",
                distance: 2
              }
            },
            color: "#4fa8f9"
          },
          {
            name: "早班已分配",
            type: seriesType,
            // barWidth: barWidthArr[_this.turnNum],
            data: seriesData.earlie_allot,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top",
                distance: 2
              }
            },
            color: "#6ec71e"
          },
          {
            name: "晚班已录入",
            type: seriesType,
            // barWidth: barWidthArr[_this.turnNum],
            data: seriesData.late_create,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top",
                distance: 2
              }
            },
            color: "#4fa8f9"
          },
          {
            name: "晚班已分配",
            type: seriesType,
            // barWidth: barWidthArr[_this.turnNum],
            data: seriesData.late_allot,
            label: {
              normal: {
                show: seriesLabelShow,
                position: "top",
                distance: 2
              }
            },
            color: "#6ec71e"
          }
        ];
      }
      _this.chartList.turnChart = echarts.init(this.$refs.turnChart);
      _this.chartList.turnChart.setOption(
        {
          color: ["#5b9bd5"],
          title: {
            text: titleArr[this.earlieNum],
            left: "center",
            top: "2%"
            // textStyle: {
            //   fontSize: 14,
            //   fontWeight: 400
            // }
          },
          legend: {
            left: "center",
            bottom: 0,
            selectedMode: false
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            formatter: function(params) {
              return (
                params[0] &&
                params[0].marker +
                  params[0].seriesName +
                  "<br/>" +
                  params[0].name +
                  "：" +
                  params[0].value +
                  "<br/>" +
                  (params[1].marker +
                    params[1].seriesName +
                    "<br/>" +
                    params[1].name +
                    "：" +
                    params[1].value)
              );
            }
          },
          grid: {
            left: "4%",
            right: "4%",
            bottom: "14%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: xAxisData,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: "#999"
                }
              }
            }
          ],
          series: mySeries
        },
        true
      );
      _this.loadingSet.turnChartLoading = false;
    },
    drawGroupNumber(data) {
      this.totalNum.createNum = 0;
      this.totalNum.allotNum = 0;
      let _this = this;
      data && (_this.chatRawData.turnChat = data);
      let cstartTimer = _this.chatRawData.turnChat.start_time;
      let cendTimer = _this.chatRawData.turnChat.end_time;
      this.turnDefaultTime = [];
      this.turnDefaultTime.push(moment(cstartTimer, this.dateFormat));
      this.turnDefaultTime.push(moment(cendTimer, this.dateFormat));
      let xAxisData = [];
      let seriesData = { current: [] };
      let mytotalNum = {
        earlie_allot: 0,
        earlie_create: 0,
        late_allot: 0,
        late_create: 0
      };
      for (var key in _this.chatRawData.turnChat.current) {
        xAxisData.push(_this.chatRawData.turnChat.current[key].name);
        seriesData.current.push(_this.chatRawData.turnChat.current[key].count);
      }
      let titleText = [];
      const titleArr = ["小组客户量"];
      const barWidthArr = ["50%", "20%", "30%", "30%"];
      const labelShow = [true, true, true, true];
      let mySeries = [];
      this.totalNum.allotNum = data.total;
      mySeries = [
        {
          name: "已分配",
          type: "bar",
          // barWidth: barWidthArr[_this.turnNum],
          data: seriesData.current,
          label: {
            normal: {
              show: labelShow[_this.turnNum],
              position: "top",
              distance: 2
            }
          },
          color: "#4fa8f9"
        }
      ];
      _this.chartList.turnChart = echarts.init(this.$refs.turnChart);
      _this.chartList.turnChart.setOption(
        {
          color: ["#5b9bd5"],
          title: {
            text: titleArr[0],
            left: "center",
            top: "2%"
          },
          legend: {
            left: "center",
            bottom: 0,
            selectedMode: false
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {
            left: "4%",
            right: "4%",
            bottom: "14%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: xAxisData,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: "#999"
                }
              }
            }
          ],
          series: mySeries
        },
        true
      );
      _this.loadingSet.turnChartLoading = false;
    },
    // chartShow(num) {
    //   this.hidetabActive.hbChat = false;
    //   this.activeNum = num - 1;
    //   this.getCusData();
    //   this.cusdefaultTime = [];
    // },

    getNow() {
      const _this = this;
      window.setInterval(function() {
        _this.nowTimer = moment(new Date()).format("HH:mm:ss");
      }, 1000);
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
      // height: 36px;
      overflow: hidden;
      background-color: #f9f9f9;
      border-bottom: 1px solid #f2f2f2;
      ul {
        text-align: right;
        li {
          display: inline-block;
          width: 70px;
          border-left: 1px solid #f2f2f2;
          text-align: center;
          cursor: pointer;
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
      .myheight {
        height: 35px;
      }
      .myborderTop {
        border-top: 1px solid #f2f2f2;
      }
      .myborderBottom {
        border-bottom: 1px solid #f2f2f2;
      }
    }
    .trend-chart {
      position: relative;
      padding-bottom: 20px;
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
      .chartcon {
        // position: relative;
        margin: 16px 0 16px;
      }
      .hidechatbg {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 260px;
        // background-color: #fff;
      }
      .chatTitle {
        position: absolute;
        top: 6px;
        left: 0;
        width: 100%;
        font-size: 18px;
        line-height: 22px;
        font-weight: 600;
        color: #000;
        text-align: center;
        p:nth-of-type(1) {
          span {
            display: inline-block;
            width: 20px;
            height: 12px;
            vertical-align: middle;
            background-color: #fc8b40;
            border-radius: 2px;
          }
        }
        p:nth-of-type(2) {
          span {
            display: inline-block;
            width: 20px;
            height: 12px;
            vertical-align: middle;
            background-color: #447ed9;
            border-radius: 2px;
          }
        }
      }
    }
    .keyword {
      height: 400px;
      font-size: 14px;
      line-height: 34px;
      box-sizing: border-box;
      padding: 10px 16px 0;
      .keyword-title {
        color: #999;
        border-bottom: 1px solid #f2f2f2;
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