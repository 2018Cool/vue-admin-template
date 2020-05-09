<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    title="上传图片"
    append-to-body
  >
    <el-upload
      :multiple="true"
      :file-list="fileList"
      :show-file-list="true"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :http-request="uploadImg"
      action=""
      accept="image/png, image/jpeg"
      class="editor-slide-upload"
      list-type="picture-card"
    >
      <el-button size="small" type="primary">
        点击上传
      </el-button>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: [],
      fileList: []
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    checkAllSuccess() {
      return this.listObj.every(item => item.hasSuccess)
    },
    handleSubmit() {
      const arr = this.listObj.concat([])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = []
      this.fileList = []
      this.dialogVisible = false
    },
    uploadImg(data) {
      const formData = new FormData()
      formData.append('file', data.file)
      request({
        url: '/resource/upload',
        method: 'post',
        data: formData
      }).then((res) => {
        this.handleSuccess(res, data.file)
      })
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const resData = response.data || {}
      for (let i = 0, len = this.listObj.length; i < len; i++) {
        const item = this.listObj[i]
        if (item.uid === uid) {
          item.hasSuccess = true
          item.src = resData.serUrl
          item.cosSrc = resData.cosUrl
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      for (let i = 0, len = this.listObj.length; i < len; i++) {
        if (this.listObj[i].uid === uid) {
          this.listObj.splice(i, 1)
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return false
      }
      const _URL = window.URL || window.webkitURL
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj.push({ hasSuccess: false, uid: file.uid, width: this.width, height: this.height })
        }
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss">
  .editor-slide-upload {
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}

</style>
