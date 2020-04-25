<template>
  <div class="tipsbox">
    <a-modal :visible="showNoAgreen"
             :footer="null"
             centered
             :closable="false"
             :maskClosable="false"
             @cancel="cancleReview">
      <div class="myfixcon">
        <div class="top">
          <h4>温馨提示：确认要关闭<span style="color:red">{{tipsText.cancleTitle}}</span>的账户!</h4>
        </div>
        <div class="middle">
          <label>驳回原因：</label>
          <a-input v-model="superiorRemark"
                   @change="sRemarkChange"
                   placeholder="驳回原因(必填)" />
          <div class="tipmsg"
               v-show="tipshow">请填写驳回原因</div>
        </div>
        <div class="bottom">
          <a-button type="primary"
                    class="waves-effect waves-light"
                    @click="noReview"
                    style="margin-right:18px">{{tipsText.noAgreenYes}}</a-button>
          <a-button @click="cancleReview">{{tipsText.noAgreenYes}}</a-button>
        </div>
      </div>
    </a-modal>
    <a-modal :visible="showAgreen"
             :footer="null"
             centered
             :closable="false"
             :maskClosable="false"
             @cancel="cancleReview">
      <div class="myfixcon">
        <div class="top">
          <h4>温馨提示：确认要关闭<span style="color:red">{{userName}}</span>的账户!</h4>
        </div>
        <div class="middle"></div>
        <div class="bottom">
          <a-button type="primary"
                    class="waves-effect waves-light"
                    :loading="saveloading"
                    @click="agReview"
                    style="margin-right:18px">{{tipsText.agreenYes}}</a-button>
          <a-button @click="cancleReview">{{tipsText.agreenNo}}</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    onSuccess: Function,
    tipsText: {
      type: Object,
      default: function () {
        return {
          saveTitle:'确定进行下一步操作',
          cancleTitle: '确定进行下一步操作',
          agreenYes: '确定',
          agreenNo: '取消',
          noAgreenYes: '确定',
          noAgreenNo: '取消',
        }
      }
    }
  },
  data () {
    return {
      saveloading: false,
      showAgreen: false,
      showNoAgreen: false,
      isApprove: false,
      tipshow: false,
      superiorRemark: '',
      userName:''
    }
  },
  mounted () { },
  methods: {
    agReview () {
      this.saveloading = true
      this.isApprove = true
      this.onSuccess()
      this.showAgreen = false
    },
    noReview () {
      this.isApprove = false
      if (this.superiorRemark) {
        this.onSuccess()
        this.showNoAgreen = false
      } else {
        this.tipshow = true
      }
    },
    sRemarkChange (e) {
      if (e.target.value) {
        this.tipshow && (this.tipshow = false)
      }
    },
    notAgreen () {
      this.saveloading = false
      this.showNoAgreen = true
    },
    isAgreen (record) {
      this.userName= record.nick_name
      this.saveloading = false
      this.showAgreen = true
    },
    cancleReview () {
      this.saveloading = false
      this.showAgreen = false
      this.showNoAgreen = false
    },
  }
}
</script>

<style lang="less" scoped>
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
