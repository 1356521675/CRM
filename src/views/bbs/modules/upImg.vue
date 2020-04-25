<template>
  <div class="my-upload">
    <input
      ref="img-upload-input"
      class="img-upload-input"
      type="file"
      accept=".jpg, .png, .jpeg"
      @change="handleClick"
      multiple
    />
    <div class="upload-list" v-for="(item, index) in imgSrcList" :key="index">
      <div class="list-item">
        <div class="close" v-show="!previewMode" @click="delPreview(index)"><a-icon type="close" /></div>
        <div class="list-item-info" @click="onPreview(item,index)">
          <img :src="item.src" alt />
        </div>
        <div class="item-actions" @click="onPreview(item,index)">
          <a-icon type="eye" />
        </div>
      </div>
    </div>
    <div class="upload-box" v-if="imgSrcList.length<1 && !previewMode">
      <div class="c-text">
        <div class="uploadtext" @click="handleUpload" v-if="!loading">
          <div class="text">
            <img src="../../../assets/images/upload_imgs.png" alt="">
            <p>上传图片</p>
          </div>
        </div>
        <div class="uploadtext" v-else>
          <div class="text">
            <p>上传中</p>
          </div>
        </div>
      </div>
    </div>
    <a-modal :visible="showPic" :width="previewWidth" :footer="null" @cancel="closePreview">
      <!-- <div class="preclose preclose-l"  @click="upPreview"><a-icon type="left-circle" /></div>
      <div class="preclose preclose-r"  @click="downPreview"><a-icon type="right-circle" /></div> -->
      <img alt="example" style="width: 100%;user-select: none;" :src="previewSrc" />
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
    tipText: {
      type: String,
      default:'上传图片'
    },
    src: String,
    editMd: Boolean,
    previewMode: {
      type: Boolean,
      default:false
    },
    imgSrcList: {
      type: Array,
      default:function (){
        return []
      }
    },
  },
  data() {
    return {
      loading: false,
      // imgSrcList: [],
      showPic: false,
      fileList:[],
      previewWidth: 500,
      previewSrc:undefined,
      listIndex:undefined
    };
  },
  mounted() {},
  computed: {
    editModel: function() {
      return this.editMd;
    }
  },
  methods: {
    setImgWidth(src){
      let _this= this
      let nImg = new Image();
      nImg.src = src;
  　　nImg.onload = function () {
         let swidth= window.innerWidth 
             || document.documentElement.clientWidth 
             || document.body.clientWidth
         let mwidth= Number(nImg.width)
         if(mwidth+80>=Number(swidth)){
           mwidth= swidth*0.9
         }
        _this.previewWidth= mwidth
  　　}
    },
    handleUpload() {
      this.$refs["img-upload-input"].value = null;
      this.$refs["img-upload-input"].click();
    },
    refresh() {
      this.showSrc = false;
      this.showPic = false;
      this.previewSrc = undefined;
      this.$refs["img-upload-input"].value = null;
      this.fileList=[]
    },
    handleClick(e) {
      let _this= this
      const files = e.target.files;
      if(files.length+this.imgSrcList.length>2){
        return
      }
      let okList=[]
      let onOff= true
      for (let key in files){
         if (!this.isImg(files[key])) {
          if(onOff){
            onOff= false
            // _this.$layer.msg("只支持上传 .png, .jpg, .jpeg 格式的图片,已移除格式不符图片");
          }
        }else{
          okList.push(files[key])
        } 
      }
      // var fileSize = (rawFile.size / 1024).toFixed(0);
      // if (!rawFile) return;
      okList.forEach((item)=>{
        this.fileList.push(item)
        let reads = new FileReader();
        reads.readAsDataURL(item);
        reads.onload = function(e) {
          _this.imgSrcList.push({src: this.result});
        };
        this.loading = false;
      })
      this.onSuccess && this.onSuccess(this.fileList);
    },
    isImg(file) {
      return /\.(jpg|png|jpeg)$/.test(file.name);
    },
    err() {
      this.loading = false;
    },
    onPreview(item,index){
      this.listIndex= index
      this.previewSrc = item.src;
      this.setImgWidth(item.src);
      this.showPic = true;
    },
    upPreview(){
      let mIndex= this.listIndex==0? this.imgSrcList.length-1 : this.listIndex-1;
      this.onPreview(this.imgSrcList[mIndex],mIndex)
    },
    downPreview(){
      let mIndex= this.listIndex==this.imgSrcList.length-1? 0 : this.listIndex+1;
      this.onPreview(this.imgSrcList[mIndex],mIndex)
    },
    closePreview(){
      // this.previewSrc = undefined;
      this.showPic = false;
    },
    delPreview(index){
      this.imgSrcList.splice(index,1)
      this.fileList.splice(index,1)
    }
  }
};
</script>

<style scoped>
.my-upload {
  line-height: 0;
  margin-top: -20px;
  overflow: hidden;
}
.upload-box {
  display: inline-block;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  background-color: #fafafa;
  text-align: center;
  cursor: pointer;
  -webkit-transition: border-color 0.3s ease;
  transition: border-color 0.3s ease;
  vertical-align: top;
}
.upload-box .c-text{
  width: 100%;
  height: 100%;
  display: table;
}
.upload-box .uploadtext {
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  padding: 0;
}
.upload-box .uploadtext .text {
  line-height: 20px;
  text-align: center;
}
.upload-box .uploadtext .text p {
  margin: 0;
  padding: 0;
  color: #888;
  line-height: 22px;
}
.upload-box .uploadtext .text img {
  display: inline-block;
  width: 30px;
}
.upload-list {
  vertical-align: top;
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 4px;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  -webkit-box-sizing: border-box;
  margin-right: 10px;
  margin-bottom: 10px;
  list-style: none;
  zoom: 1;
  overflow: hidden;
}
.upload-list .list-item {
  width: 100%;
  height: 100%;
  position: relative;
}

.upload-list .list-item .close{
  position: absolute;
  font-size: 14px;
  color: #fff;
  top: -2px;
  right:1px;
  z-index: 99;
  opacity: 0;
}
.upload-list .list-item-info {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.upload-list .list-item-info img {
  display: block;
  width: 100%;
  position: static;
}

.upload-list .list-item .item-actions{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  font-size: 18px;
  color: #fff;
  text-align: center;
  line-height: 86px;
  opacity: 0;
}
.upload-list .list-item:hover .item-actions{
  opacity: 1;
}
.upload-list .list-item:hover .close{
  opacity: 1;
}
.img-upload-input {
  display: none;
  z-index: -9999;
}
.ant-form input[type="file"] {
  display: none;
  z-index: -9999;
}
.preclose{
  text-align: center;
  width: 50px;
  height: 50px;
  line-height: 50px;
  position: fixed;
  top: 50%;
  cursor: pointer;
  font-size: 40px;
  transform: translateY(-50%);
  color: #fff;
}
.preclose-l{
  left: 10%;
}
.preclose-r{
  right: 10.5%;
}
</style>
