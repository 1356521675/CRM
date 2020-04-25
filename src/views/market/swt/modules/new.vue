<template>
  <div class="center-box">
    <h4 class="title">
      <span>分类默认</span>
    </h4>
    <a-spin :spinning="confirmLoading">
      <a-form class="add-form" :form="form" autocomplete="off">
        <a-row :gutter="16">
          <a-col :xs="24" :sm="24" :lg="{span:14,offset:5}">
            <a-row :gutter="24">
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item label="选择商务通" :colon="false">
                  <a-radio-group name="radioGroup" v-model="value" @change="onChange(value)">
                    <a-radio
                      v-for="item in ListData"
                      :key="item.bscnym_id"
                      :value="item.bscnym_id"
                    >{{item.name}}</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
          <a-col :xs="24" :sm="24" :lg="{span:14,offset:5}">
            <a-row :gutter="24">
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item label="分类展示" :colon="false">
                  <a-checkbox-group name="radioGroup" @change="classifyChange" v-model="classify">
                    <a-col
                      :xs="24"
                      :sm="24"
                      :lg="6"
                      v-for="item in classifyData"
                      :key="item.class_id"
                    >
                      <a-checkbox :value="item.class_id">{{item.class_name}}</a-checkbox>
                    </a-col>
                  </a-checkbox-group>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>

          <a-col
            :xs="24"
            :sm="24"
            :lg="{span:18,offset:0}"
            style="margin-top:50px;line-height:39px;text-align:center"
          >
            <a-form-item>
              <a-button type="primary" class="waves-effect waves-light" @click="handleSubmit">保存</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import moment from "moment";
import STable from "@/components/table/";
import ESource from "./editSource";
import {
  getbscnymList,
  getbscnymJoinClass,
  putbscnymJoinClass
} from "@/api/businessLink";
export default {
  name: "TableEdit",
  components: {
    STable,
    ESource
  },
  data() {
    return {
      confirmLoading: false,
      value: "",
      ListData: [],
      classifyData: [],
      classify: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.sform = this.$form.createForm(this, { name: "two" });
  },

  mounted() {
    this.getbscnymListInit();
  },
  methods: {
    getbscnymListInit() {
      getbscnymList().then(res => {
        if (res.code == 200) {
          this.ListData = res.data;
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    onChange(value) {
      const _this = this;
      _this.classify = [];
      getbscnymJoinClass(value).then(res => {
        if (res.code == 200) {
          _this.classifyData = res.data;
          _this.classifyData.forEach(function(item) {
            if (item.is_checked.value == 1) {
              _this.classify.push(item.class_id);
            }
          });
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    classifyChange(checkedValues) {
      this.classify = checkedValues;
    },
    handleSubmit() {
      const _this = this;
      let parameter = {};
      _this.ListData.forEach(function(item) {
        if (item.bscnym_id == _this.value) {
          parameter.name = item.name;
          parameter.is_open = item.is_open.value;
          parameter.default = item.default.value;
          parameter.join_class = _this.classify.toString();
        }
      });
      putbscnymJoinClass(_this.value, parameter).then(res => {
        if (res.code == 200) {
          _this.$message.success("保存成功");
        } else {
          _this.$message.warning(res.msg);
        }
      });
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
    span {
      font-size: 12px;
      color: #666;
    }
  }
}
.add-form {
  box-sizing: border-box;
  padding: 24px;
  background: #fff;
  border-top: 1px solid #d9d9d9;
  button {
    margin-top: 4px;
  }
}

.ant-form-item {
  display: flex;
}

.add-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 0;
}
.ant-tabs {
  box-sizing: border-box;
  background-color: #fefefe;
  margin: 20px 20px 0;
}
.mybtn {
  padding-top: 4px;
}
</style>
<style scoped>
.ant-form-item {
  padding-left: 78px;
}
.ant-form-item >>> .ant-form-item-control-wrapper {
  flex: 1;
}
.ant-form-item >>> .ant-form-item-label {
  width: 78px;
  position: absolute;
  left: 0;
  top: 0;
  text-align: right;
}

.bottom >>> .ant-table-wrapper {
  background-color: #fff;
}

.bottom >>> .ant-table-wrapper .ant-table-thead th {
  padding: 12px 18px;
}

.bottom >>> .ant-table-wrapper .ant-table-tbody td {
  padding: 8px 18px;
}
</style>


