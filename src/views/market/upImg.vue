<template>
  <div class="my-upload" ref="myUpload">
    <input ref="img-upload-input"
           class="img-upload-input"
           type="file"
           accept=".jpg, .png, .jpeg"
           @change="handleClick">
    <div class="upload-list"
         v-if="showPic || hasSrc">
      <div class="list-item">
        <div class="list-item-info">
          <img :src="imgSrc"
               alt="">
        </div>
        <span class="del-actions">
          <a href="javascript:;"
             title="删除"
             @click="delImage">
            <a-icon type="close-circle" />
          </a>  
        </span>
        <span class="item-actions"
              v-if="editModel">
          <a href="javascript:;"
             title="预览文件"
             @click="onPreview">
            <a-icon type="eye" /></a>
          <a href="javascript:;"
             title="重新上传"
             @click="handleUpload">
            <a-icon type="reload" /></a>
        </span>
        <span class="item-actions"
              v-else>
          <a href="javascript:;"
             title="预览文件"
             @click="onPreview">
            <a-icon type="eye" /></a>    
          <a href="javascript:;"
             title="重新上传"
             @click="handleUpload">
            <a-icon type="reload" /></a>
        </span>
      </div>
    </div>
    <div v-else
         class="upload-box">
      <div class="uploadtext"
           @drop="handleDrop"
           @dragover="handleDragover"
           @dragenter="handleDragover"
           @click="handleUpload"
           v-if="!loading">
        <div class="text">
          <a-icon type="plus" />
        </div>
      </div>
      <div class="uploadtext"
           v-else>
        <div class="text">
          <a-icon type="loading" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
    onPreview: Function,
    onDel: Function,
    tipText: String,
    src: String,
    editMd: Boolean,
    upBoxSize: {
      type: Object,
      default() {
        return {
          width: 50,
          height: 50,
        };
      }
    },
  },
  data () {
    return {
      loading: false,
      imgSrc: undefined,
      showPic: false,
      showSrc: false,
      reBoxSize:{
        width: this.upBoxSize.width,
        height: this.upBoxSize.height
      }
    }
  },
  mounted () {
    this.setBoxSize();
  },
  computed: {
    hasSrc: function () {
      if (this.src) {
        this.showSrc = true
        this.imgSrc = this.src
        return true
      } else {
        return false
      }
    },
    editModel: function () {
      return this.editMd
    }
  },
  methods: {
    setBoxSize(){
      this.$refs.myUpload.style.width= this.upBoxSize.width+"px";
      this.$refs.myUpload.style.height= this.upBoxSize.height+"px";
    },
    generateData (flie) {
      this.onSuccess && this.onSuccess(flie)
    },
    handleDrop (e) {
      this.unescapedFile= this.$refs['img-upload-input'].value
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('只支持同时上传一个文件!')
        return
      }
      const rawFile = files[0] // only use files[0]
      if (!this.isImg(rawFile)) {
        this.$message.error('只支持上传 .png, .jpg, .jpeg 格式的图片')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover (e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload () {
      this.$refs['img-upload-input'].click()
    },
    refresh () {
      this.$refs.myUpload.style.width= this.reBoxSize.width+"px";
      this.$refs.myUpload.style.height= this.reBoxSize.height+"px";
      this.showSrc = false
      this.showPic = false
      this.imgSrc = undefined
      this.$refs['img-upload-input'].value = null
    },
    handleClick (e) {
      if(e.target.files.length){
        const files = e.target.files
        const rawFile = files[0] // only use files[0]
        if (rawFile) {
          let fileSize = (rawFile.size / 1024).toFixed(0)
        }
        if (!this.isImg(rawFile)) {
          this.$message.error('只支持上传 .png, .jpg, .jpeg 格式的图片')
          return false
        }
        if (!rawFile) return
        this.onSuccess && this.onSuccess(rawFile)
        this.loading = true
      }
    },
    upload (rawFile) {
      this.$refs['img-upload-input'].value = null // fix can't select the same excel
      if (!this.beforeUpload) {
        this.generateData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.generateData(rawFile)
      }
    },
    isImg (file) {
      return /\.(jpg|png|jpeg)$/.test(file.name)
    },
    showImg (src) {
      this.loading = false
      this.imgSrc = src
      this.showPic = true
    },
    err () {
      this.loading = false
      this.$refs['img-upload-input'].value = null
    },
    delImage(){
      this.onDel&&this.onDel()
      this.refresh()
    }
  }
}
</script>

<style lang="less" scoped>
.my-upload {
  vertical-align: middle;
  display:inline-block;
}
.upload-box {
  display: inline-block;
  border: 1px dashed #d9d9d9;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: #fafafa;
  text-align: center;
  cursor: pointer;
  -webkit-transition: border-color 0.3s ease;
  transition: border-color 0.3s ease;
  vertical-align: top;
  display: table;
  &:hover {
    border: 1px dashed #70bcfb;
  }
  .uploadtext {
    font-size: 14px;
    width: 100%;
    height: 100%;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    padding: 0;
    .text {
      line-height: 20px;
      p {
        margin: 0;
        padding: 0;
        line-height: 22px;
      }
    }
  }
}
.upload-list {
  display: inline-block;
  border: 1px solid #d9d9d9;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 4px;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  list-style: none;
  zoom: 1;
  .list-item {
    width: 100%;
    height: 100%;
    position: relative;
    .list-item-info {
      height: 100%;
      position: relative;
      overflow: hidden;
      &::before {
        content: " ";
        position: absolute;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        position: static;
      }
    }
    .item-actions {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      z-index: 10;
      white-space: nowrap;
      opacity: 0;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      a {
        display: inline-block;
        margin: 6px;
        color: #fff;
      }
    }
    &:hover {
      .list-item-info {
        &::before {
          opacity: 1;
        }
      }
      .item-actions {
        opacity: 1;
      }
      .del-actions{
        opacity: 1;
      }
    }
  }
  .del-actions{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    white-space: nowrap;
    opacity: 0;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    a {
      display: inline-block;
      margin: 6px;
      color: #fff;
    }
  }
}
.img-upload-input {
  display: none;
  z-index: -9999;
}
.ant-form input[type="file"] {
  display: none;
  z-index: -9999;
}
</style>
