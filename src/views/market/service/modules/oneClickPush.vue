<template>
  <div class="center-box">
    <h4 class="title">
      一键推送
    </h4>
    <a-form class="add-form" :form="form" autocomplete="off">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="24" :lg="{span:6,offset:0}">
          <a-row :gutter="24">
            <a-col :xs="24" :sm="24" :lg="24">
              <a-form-item label="当前可分配资源量" :colon="false">
                <span class="red">66666</span>
              </a-form-item>
            </a-col>

            <a-col :xs="24" :sm="24" :lg="24" v-for="(item, index) in systemList"
                      :key="index">
              <a-form-item :label="item.name+'当日已分量'" :colon="false">
                <span class="blue">87</span>
              </a-form-item>
              <a-form-item :label="item.name+'累计已分量'" :colon="false">
                <span class="blue">356</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :lg="24">
              
            </a-col>
          </a-row>
        </a-col>
        <a-col :xs="24" :sm="24" :lg="{span:18,offset:0}">
          <a-row>
            <a-col :xs="24" :sm="24" :lg="24">
              <a-row>
                <a-col :xs="24" :sm="24" :lg="8">
                  <a-form-item label="选择系统" :colon="false">
                    <a-select v-decorator="['cop_son',{ rules: [{ required: true, message: '请选择系统' }] }]" placeholder="请选择系统" @change="sysChange">
                      <a-select-option 
                      v-for="(item, index) in systemList"
                      :key="index"
                      :value="item.id">{{item.name}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :lg="5">
                  <a-form-item :colon="false" style="padding-left:4px;">
                    <a-input-number v-decorator="['keyword']"
                    placeholder="请设置单次最大分配量"
                    style="width:100%;" @blur="sysNumChange"/>
                  </a-form-item>
                </a-col>
              </a-row>  
            </a-col>
            <a-col :xs="24" :sm="24" :lg="24">
              <a-form-item label="联系方式" :colon="false">
                <a-checkbox-group name="radioGroup" v-decorator="['check_contact']">
                  <a-checkbox :value="0">手机号</a-checkbox>
                  <a-checkbox :value="2">微信</a-checkbox>
                  <a-checkbox :value="1">QQ</a-checkbox>
                  <a-checkbox :value="3">二维码</a-checkbox>
                </a-checkbox-group>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :lg="24">
              <a-form-item label="选择优先时间分配顺序" :colon="false">
                <a-radio-group name="radioGroup" v-decorator="['push_time']">
                  <a-radio :value="0">随机</a-radio>
                  <a-radio :value="2">最近时间</a-radio>
                  <a-radio :value="1">最早时间</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :lg="24">
              <a-form-item label="选择自有产品" :colon="false">
                <a-radio-group name="radioGroup" v-decorator="['has_product']">
                  <a-radio :value="0">随机</a-radio>
                  <a-radio :value="2">没有</a-radio>
                  <a-radio :value="1">有</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :lg="24">
              <a-form-item label="选择来源分类" :colon="false">
                <a-checkbox-group name="radioGroup" v-decorator="['check_from']">
                  <a-checkbox :value="0">百度移动</a-checkbox>
                  <a-checkbox :value="2">头条</a-checkbox>
                  <a-checkbox :value="1">大搜</a-checkbox>
                  <a-checkbox :value="3">快手</a-checkbox>
                </a-checkbox-group>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :lg="24">
              <a-row>
                <a-col :xs="24" :sm="24" :lg="8">
                  <a-form-item label="请输入分配数量" :colon="false">
                    <a-input-number v-decorator="['keyword11',{ rules: [{ required: true, message: '请输入分配数量' }] }]"
                    placeholder="请输入分配数量"
                    style="width:100%;"/>
                  </a-form-item>
                </a-col>
              </a-row>  
            </a-col>
          </a-row>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :lg="{span:24,offset:0}"
          style="margin-top:20px;line-height:39px;text-align:center"
        >
          <a-button
            type="primary"
            html-type="submit"
            class="waves-effect waves-light"
            :loading="saveLoading"
            @click="handleSubmit"
          >一键推送</a-button>
        </a-col>
      </a-row>
    </a-form>
    <tips-box ref="tipsBox" :on-success="saveSubmit" :tipsText="tipsText"/>
  </div>
</template>

<script>
import api from '@/api/index'
import {} from "@/api/market";
import tipsBox from "../../tipsBox";
export default {
  name: "TableEdit",
  components: {
    tipsBox
  },
  props: ['systemList'],
  data() {
    return {
     tipsText: {
       saveTitle: "确定执行一键推送",
       cancleTitle: '确定进行下一步操作',
       agreenYes: '确定',
       agreenNo: '取消',
       noAgreenYes: '确定',
       noAgreenNo: '取消',
     },
     saveLoading: false,
     pushData: {}
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this,{name:'onepush'});
  },
  mounted() {
  },
  methods: {
    setForm(value) {
      this.mclass_id = undefined;
      this.checkedClassId&& (this.mclass_id = this.checkedClassId);
      this.showSourceTips = false;
      this.payPreviewImage= ''
      this.wechatData= ''
      const record = {
        con_name: undefined,
        con_qq: undefined,
        con_wx: undefined,
        con_telephone: undefined,
        remark: undefined,
        qq_answer: undefined,
        keyword: undefined,
        baidu_account: undefined,
        has_product: 2,
        platform: 1,
        source_id: undefined,
        con_area:'中国'
      };
      this.mdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
      this.sourceName = undefined;
      this.sourceId = undefined;
      this.sourceUrl = undefined;
      this.editStstus = false;
      this.sourceList = [];
      this.loadSource();
    },
    showTips(){
      this.tipsText.saveTitle= "确定执行一键推送";
      this.$refs.tipsBox.isAgreen();
    },
    handleSubmit() {
      const _this = this;
      _this.saveLoading= true;
      this.form.validateFields((err, values) => {
        if (!err) {
          _this.pushData= values;
          _this.showTips();
        }else{
          _this.saveLoading= false;
        }
      });
    },
    saveSubmit() {
      this.saveLoading= false;
      console.log(this.pushData)
    },
    sysChange(val) {
      console.log(val)
    },
    sysNumChange(e) {
      console.log(e.target.value)
    }
  }
};
</script>

<style lang="less" scoped>
.center-box {
  box-sizing: border-box;
  padding: 0 0 50px;
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
  .red{
    color: red;
  }
  .blue{
    color: blue;
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

.ant-checkbox-group {
  .ant-checkbox-wrapper {
    width: 120px;
  }
}

.ant-radio-group {
  .ant-radio-wrapper {
    width: 120px;
  }
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
.add-table {
  box-sizing: border-box;
  border-bottom: 1px solid #d9d9d9;
  background-color: #fefefe;
  padding-bottom: 20px;
  h5 {
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 42px;
    margin: 0;
    color: #333;
  }
}
.ant-row {
  h5 {
    font-size: 14px;
    font-weight: 400;
  }
}
.mylist {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    padding: 0;
    margin: 0;
    float: left;
    margin-right: 8px;
    p {
      margin: 0;
    }
  }
}
</style>

<style scoped>
.ant-form-item {
  padding-left: 146px;
}
.ant-form-item >>> .ant-form-item-control-wrapper {
  flex: 1;
}
.ant-form-item >>> .ant-form-item-label {
  width: 146px;
  position: absolute;
  left: 0;
  top: 0;
  text-align: right;
}
</style>


