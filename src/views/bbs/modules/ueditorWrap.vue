<template>
  <div class="hello">
    <a-form autocomplete="off" :form="form">
      <a-form-item>
        <textarea v-decorator="['theme']" cols="10" rows="5" style="width:100%"></textarea>
      </a-form-item>
    </a-form>
    <!-- <vue-ueditor-wrap ref="ueditor" v-model="msg" :destroy="false" :config="config" @beforeInit="addCustomUI"></vue-ueditor-wrap> -->
    <div v-show="showImgFile">
      <up-img ref="mupImg" :imgSrcList="imgSrcList" :on-success="successUplod" />
    </div>
    <a class="my-htbtn" v-show="modelStatus==1" @click="handleSearch">发表</a>
    <a class="my-htbtn" v-show="modelStatus==3" @click="handleSearch">跟帖</a>
    <a class="my-htbtn" v-show="modelStatus==2" @click="handleSearch">修改</a>
    <a class="my-htbtn" v-show="modelStatus==4" @click="handleSearch">回复</a>
    <a class="my-htbtn" style="background-color:#999;" v-show="modelStatus==2" @click="cancelEdit">取消</a>
  </div>
</template>

<script>
import api from "@/api/index";
import UpImg from "./upImg";
import { postBbs,putBbs,postBbsStorey,postBbsScomment} from "@/api/common";
export default {
  name: "HelloWorld",
  // 2、注册组件
  props: {
    modelStatus: {
      type: Number,
      default: 1
    },
    showImgFile: {
      type: Boolean,
      default: true
    },
    modelStatus: {
      type: Number,
      default: 1
    },
    floorbbsId: {
      type: Number,
      default: null
    },
    formName: {
      type: String,
      default: null
    },
  },
  components: {
    UpImg
  },
  data() {
    return {
      imgList: [],
      imgSrcList: [],
      rawData:{},
      form:this.$form.createForm(this,{name: this.formName})
    };
  },
  methods: {
    successUplod(result) {
      this.imgList = result;
    },
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        if (!error) {
          let formData = new FormData();
          this.imgList.length&&formData.append("image", this.imgList[0]);
          if (this.modelStatus == 1) {
            values.theme&&formData.append("theme", values.theme);
            this.addmybbs(formData);
          }else if(this.modelStatus == 2) {
            this.saveEdit({theme: values.theme});
          }else if(this.modelStatus == 3) {
            formData.append("content", values.theme);
            formData.append("bbs_id", this.floorbbsId);
            this.floorAdd(formData, values.theme);
          }else if(this.modelStatus == 4) {
            this.replyQueSave({storey_id:this.rawData.storey_id,content:values.theme});
          }
        }
      });
    },
    addmybbs(data) {
      postBbs(data)
        .then(res => {
          if (res.code == 200) {
            this.imgSrcList= [];
            this.$message.success("发帖成功");
            this.$refs.mupImg.refresh();
            this.form.resetFields();
            this.$emit("success");
          } else {
            this.$message.warning(res.msg);
          }
        })
        .catch(err => {});
    },
    floorAdd(data,content){
      if(content){
        postBbsStorey(data)
          .then(res => {
            if (res.code == 200) {
              this.imgSrcList= [];
              this.$message.success("发帖成功");
              this.$refs.mupImg.refresh();
              this.form.resetFields();
              this.$emit("success");
            } else {
              this.$message.warning(res.msg);
            }
          })
          .catch(err => {});
      }else{
        this.$message.warning('请输入内容');
      }
    },
    replyQueEdit(record){
      this.imgSrcList= []
      this.rawData= record;
      this.form.resetFields();
    },
    replyQueSave(data) {
      postBbsScomment(data)
        .then(res => {
          if (res.code == 200) {
            this.$message.success("回复成功");
            this.form.resetFields();
            this.$emit("editSuccess", true);
          } else {
            this.$message.warning(res.msg);
          }
        })
        .catch(err => {});
    },
    saveEdit(data) {
      putBbs(this.rawData.bbs_id,data)
        .then(res => {
          if (res.code == 200) {
            this.imgSrcList= []
            this.$message.success("修改成功");
            this.$refs.mupImg.refresh();
            this.form.resetFields();
            this.$emit("editSuccess", true);
          } else {
            this.$message.warning(res.msg);
          }
        })
        .catch(err => {});
    },
    edit(record){
      this.rawData= record;
      this.imgSrcList= []
      if(record.images){
        this.imgSrcList= [{src: api.baseUrl+record.images}]
      }
      const sitem = {
        theme: record.theme
      };
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...sitem });
      });
    },
    cancelEdit(){
      this.imgSrcList= []
      this.$refs.mupImg.refresh();
      this.form.resetFields();
      this.$emit("editSuccess");
    }
  }
};
</script>

<style scoped>
.my-htbtn {
  font-size: 16px;
  cursor: pointer;
  padding: 10px 18px;
  border-radius: 6px;
  color: #fff;
  display: inline-block;
  margin: 8px 10px 0px 0;
  text-decoration: none;
  background-color: #1e2227;
}
</style>
