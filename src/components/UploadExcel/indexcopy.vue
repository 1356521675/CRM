<template>
  <div>
    <input ref="excel-upload-input"
           class="excel-upload-input"
           type="file"
           accept=".xlsx, .xls"
           @change="handleClick">
    <a-row>
      <a-col :xs="{span:22,offset:1}"
             :sm="{span:22,offset:1}"
             :lg="{span:15,offset:1}"
             :xl="{span:15,offset:1}"
             :xxl="{span:15,offset:1}">
        <div class="drop"
             @drop="handleDrop"
             @dragover="handleDragover"
             @dragenter="handleDragover">
          <h5>拖拽表格到此区域，自动上传</h5>
          <p>一键导入</p>
        </div>
      </a-col>
      <a-col :xs="24"
             :sm="24"
             :lg="8"
             :xl="8"
             :xxl="8">
        <div class="rightbtn">
          <a-button class="btn-secondary btn-trans"
                    size="large"
                    @click="handleUpload">
            <a-icon type="to-top" />上传文件</a-button>
          <p>支持扩展名：.xlsx，.xls， .csv</p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data () {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      },
      unescapedFile: null,
    }
  },
  methods: {
    // generateData ({ header, results }) {
    //   this.excelData.header = header
    //   this.excelData.results = results
    //   this.onSuccess && this.onSuccess(this.excelData)
    // },
    generateData (flie) {
      this.onSuccess && this.onSuccess(flie)
    },
    handleDrop (e) {
      this.unescapedFile= this.$refs['excel-upload-input'].value
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('只支持同时上传一个文件!')
        return
      }
      const rawFile = files[0] // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error('只支持上传 .xlsx, .xls, .csv 格式的文件')
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
      this.$refs['excel-upload-input'].click()
    },
    handleClick (e) {
      this.unescapedFile= this.$refs['excel-upload-input'].value
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload (rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      if (!this.beforeUpload) {
        // this.readerData(rawFile)
        this.generateData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        // this.readerData(rawFile)
        this.generateData(rawFile)
      }
    },
    isExcel (file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style lang="less" scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}
.ant-form input[type="file"] {
  display: none;
  z-index: -9999;
}
.drop {
  box-sizing: border-box;
  padding-left: 80px;
  position: relative;
  line-height: 140px;
  h5 {
    font-size: 16px;
    text-align: center;
    border: 2px solid #ffc310;
    width: 100%;
    background-color: #fff3cf;
    color: #222;
  }
  p {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 14px;
  }
}
.rightbtn {
  font-size: 14px;
  color: #999;
  text-align: center;
  .btn-secondary {
    background-color: #fff;
    width: 186px;
    height: 50px;
    margin-top: 30px;
  }
  p{
    line-height: 36px;
  }
}
</style>
