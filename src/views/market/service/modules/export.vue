<template>
  <div class="center-box">
    <h4 class="title">
      客户导入
      <a-button
        style="float:right;margin:7px 20px 0"
        class="btn-primary"
        size="small"
        @click="getImportOut"
      >模版表格下载</a-button>
    </h4>
    <div class="export-box">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    </div>
    <div class="progress">
      <a-progress :percent="percent" :status="progressStatus" />
    </div>
    <div class="resoultTable" v-show="addList.length>0">
      <a-table
        :columns="columns"
        :dataSource="addList"
        :rowKey="record => record.key"
        :pagination="false"
        :loading="tableloading"
        :scroll="{ x: 1260 }"
      >
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="action" slot-scope="text, record">
          <a-button
            class="btn-primary"
            size="small"
            v-if="record.editable"
            :disabled="record.disable"
            @click="editSave(record)"
          >{{record.text}}</a-button>
          <a-button v-else class="btn-success" size="small">{{record.text}}</a-button>
        </span>
        <span slot="sourceSelect" slot-scope="text, record">
          <template>
            <a-select
              :getPopupContainer="triggerNode => triggerNode.parentNode"
              showSearch
              :disabled="!record.editable"
              placeholder="请选择来源分类"
              style="width: 100%"
              @change="e => handleChange(e, record, 'source_id')"
              :value="text"
              :filterOption="filterOption"
            >
              <a-select-option v-for="item in sourceList" :key="item.source_id">{{item.source_name}}</a-select-option>
            </a-select>
          </template>
        </span>
        <span slot="hasname" slot-scope="text, record">
          <template>
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              placeholder="客户姓名"
              @change="e => handleChange(e.target.value, record, 'con_name')"
            />
            <template v-else>{{text}}</template>
          </template>
        </span>
        <span slot="hasqq" slot-scope="text, record">
          <template>
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              placeholder="qq号码"
              @change="e => handleChange(e.target.value, record, 'con_qq')"
            />
            <template v-else>{{text}}</template>
          </template>
        </span>
        <span slot="hasphone" slot-scope="text, record">
          <template>
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              placeholder="电话号码"
              @change="e => handleChange(e.target.value, record, 'con_telephone')"
            />
            <template v-else>{{text}}</template>
          </template>
        </span>
        <span slot="haswx" slot-scope="text, record">
          <template>
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              placeholder="微信号码"
              @change="e => handleChange(e.target.value, record, 'con_wx')"
            />
            <template v-else>{{text}}</template>
          </template>
        </span>
        <span slot="hasqqpwd" slot-scope="text, record">
          <template>
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              placeholder="qq答案"
              @change="e => handleChange(e.target.value, record, 'con_pwd')"
            />
            <template v-else>{{text}}</template>
          </template>
        </span>
      </a-table>
    </div>
    <div class="bottom-btn" v-show="addList.length>0">
      <a-button class="btn-primary" size="large" @click="editSaveAll()" :loading="handLoading">保存</a-button>
    </div>
    <iframe :src="downloadUrl" frameborder="0"></iframe>
  </div>
</template>

<script>
import api from "@/api/index";
import UploadExcelComponent from "@/components/UploadExcel/indexcopy.vue";
import {
  getCsdImport,
  getCsdImportSave,
  getAllSource,
  getCsdimportExample
} from "@api/market";
export default {
  components: {
    UploadExcelComponent
  },
  data() {
    return {
      handLoading: false,
      percent: 0,
      progressStatus: "active",
      maxNum: 80,
      upTimer: null,
      addList: [],
      sourceList: [],
      columns: [
        {
          title: "id",
          scopedSlots: { customRender: "serial" },
          width: "50px"
        },
        {
          title: "客户来源",
          dataIndex: "source_id",
          scopedSlots: { customRender: "sourceSelect" },
          width: 180,
          align: "left"
        },
        {
          title: "所在区域",
          dataIndex: "con_area",
          width: "160px",
          align: "left"
        },
        {
          title: "姓名",
          dataIndex: "con_name",
          scopedSlots: { customRender: "hasname" },
          width: "120px",
          align: "left"
        },
        {
          title: "qq",
          dataIndex: "con_qq",
          scopedSlots: { customRender: "hasqq" },
          width: "160px",
          align: "left"
        },
        {
          title: "电话",
          dataIndex: "con_telephone",
          scopedSlots: { customRender: "hasphone" },
          width: "180px",
          align: "left"
        },
        {
          title: "微信",
          dataIndex: "con_wx",
          scopedSlots: { customRender: "haswx" },
          width: "180px",
          align: "left"
        },
        {
          title: "qq答案",
          dataIndex: "con_pwd",
          scopedSlots: { customRender: "hasqqpwd" },
          width: "130px",
          align: "left"
        },
        {
          title: "状态",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          width: "100px",
          align: "center"
        }
      ],
      tableloading: false,
      downloadUrl: ""
    };
  },
  created() {
    this.obAllSource();
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 3;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "请不要上传超过 3m 大小的文件.",
        type: "warning"
      });
      return false;
    },
    obAllSource(parameter) {
      getAllSource(parameter)
        .then(res => {
          this.sourceList = res.data;
        })
        .catch(err => {});
    },
    sourceChange() {},
    handleChange(value, record, column) {
      record[column] = value;
    },
    handleSuccess(results) {
      let formData = new FormData();
      formData.append("excel", results);
      getCsdImport(formData)
        .then(res => {
          if (res.code == 200) {
            this.addList = [];
            res.data.forEach((item, index) => {
              item.editable = true;
              item.disable= false
              item.text = "未保存";
              item.key = index;
              if (!item.con_qq) {
                item.con_qq = undefined;
              }
              if (!item.con_telephone) {
                item.con_telephone = undefined;
              }
              if (!item.con_wx) {
                item.con_wx = undefined;
              }
              if (!item.con_pwd) {
                item.con_pwd = undefined;
              }
            });
            this.percentShow(res.data);
          } else if (res.code == 400) {
            this.$message.warning(res.msg, 1.5);
          }
        })
        .catch(err => {
          
          this.$message.warning("导入数据列表格式有误，请修改后重试", 1.5);
        });
    },
    percentShow(data) {
      this.percent = 0;
      this.progressStatus = "active";
      this.upTimer = window.setInterval(() => {
        this.percent += 10;
        if (this.percent < this.maxNum) {
          // this.percent += 1
        } else {
          if (this.percent == 100) {
            // this.$notification.open({
            //   message: '操作成功',
            //   description: res.data,
            //   style: {
            //     width: '600px',
            //     marginLeft: `${335 - 600}px`,
            //   },
            //   onClick: () => {
            //     
            //   },
            // });
            this.percent = 100;
            this.progressStatus = "success";
            window.clearInterval(this.upTimer);
            this.upTimer = null;
            this.tableloading = true;
            let addtimer = window.setTimeout(() => {
              this.addList = data;
              window.clearTimeout(addtimer);
              addtimer = null;
              this.tableloading = false;
            }, 300);
          }
        }
      }, 30);
    },
    handleOk() {
      // this.addList= data
    },
    editSave(record) {
      if (record.con_qq || record.con_wx || record.con_telephone) {
        record.disable= true
        let putData = [
          {
            con_name: record.con_name ? record.con_name : "",
            con_wx: record.con_wx ? record.con_wx : "",
            con_qq: record.con_qq ? record.con_qq : "",
            con_telephone: record.con_telephone ? record.con_telephone : "",
            con_area: record.con_area ? record.con_area : "",
            baidu_account: record.baidu_account ? record.baidu_account : "",
            source_id: record.source_id ? record.source_id : "",
            keyword: record.keyword ? record.keyword : "",
            con_pwd: record.con_pwd ? record.con_pwd : "",
          }
        ];
        
        // let parameter= {data: JSON.stringify(putData)}
        let parameter = { data: putData };
        if (record.editable) {
          getCsdImportSave(parameter)
            .then(res => {
              if (res.code == 200) {
                record.text = res.data[0].msg;
                res.data[0].code == 200&&(record.editable = false)
              } else if (res.code == 400) {
                this.$message.warning(res.msg);
              }
              record.disable= false
            })
            .catch(err => {
              record.disable= false
              
            });
        }
      } else {
        this.$message.warning("请至少填写一种联系方式", 1.5);
      }
    },
    editSaveAll() {
      this.handLoading = true;
      this.tableloading = true;
      let onOff = true;
      let saveNum = 0;
      let errOnOff = true;
      let putData = [];
      let myIndex = [];
      this.addList.forEach((item, index) => {
        item.con_name= item.con_name ? item.con_name : "";
        item.con_wx= item.con_wx ? item.con_wx : "";
        item.con_qq= item.con_qq ? item.con_qq : "";
        item.con_telephone= item.con_telephone ? item.con_telephone : "";
        item.con_area= item.con_area ? item.con_area : "";
        item.baidu_account= item.baidu_account ? item.baidu_account : "";
        item.source_id= item.source_id ? item.source_id : "";
        item.keyword= item.keyword ? item.keyword : "";
        item.con_pwd= item.con_pwd ? item.con_pwd : "";
        if (item.editable) {
          myIndex.push(index);
          putData.push(item);
        }
      });
      if (putData.length == 0) {
        this.handLoading = false;
        this.tableloading = false;
        this.$message.warning('暂无可导入数据');
        return;
      }
      getCsdImportSave({ data: putData })
        .then(res => {
          this.tableloading = false;
          if (res.code == 200) {
            let successNum = 0;
            let faleNum = 0;
            res.data.forEach((list, num) => {
              if (list.code == 200) {
                successNum++;
                this.addList[myIndex[num]].editable = false;
                this.addList[myIndex[num]].text = list.msg;
              } else {
                faleNum++;
                this.addList[myIndex[num]].text = list.msg;
              }
            });
            let myMsg = "已成功导入" + successNum + "条，失败" + faleNum + "条";
            this.$message.success(myMsg);
            window.setTimeout(() => {
              this.handLoading = false;
            }, 1000);
          } else if (res.code == 400) {
            this.handLoading = false;
            this.$message.warning(res.msg);
          }
        })
        .catch(err => {
          this.tableloading = false;
          this.handLoading = false;
        });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    getImportOut() {
      const token = this.$store.getters.token;
      window.open(api.abaseUrl + "/csd/import_example?accessToken=" + token);
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
  .export-box {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .progress {
    margin: 40px;
  }
  .resoultTable {
    margin: 0 20px 20px;
  }
  .bottom-btn {
    padding: 30px 0 80px;
    text-align: center;
    .btn-primary {
      width: 160px;
      height: 44px;
    }
  }
}
</style>
<style  scoped>
.resoultTable >>> .ant-table-wrapper {
  background-color: #fff;
}

.resoultTable >>> .ant-table-wrapper .ant-table-thead th {
  padding: 12px 18px;
}

.resoultTable >>> .ant-table-wrapper .ant-table-tbody td {
  padding: 8px 18px;
}
</style>


