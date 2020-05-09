<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    custom-class="wb-dialog"
    :top="top"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :before-close="beforeClose"
    @closed="onClosed"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="onClose"
  >
    <slot slot="title" name="title" />
    <slot />
    <slot slot="footer" name="footer" />
  </el-dialog>
</template>

<script>

export default {
  name: 'WbDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '50%'
    },
    beforeClose: {
      type: Function,
      default: null
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: '15vh'
    }
  },
  data() {
    return {
      isShow: this.visible
    }
  },
  watch: {
    visible(val) {
      this.isShow = val
    }
  },
  methods: {
    onClosed() {
      this.$onClosed()
      this.$emit('closed')
      const el = document.body
      el.removeChild(this.$el)
    },
    display() {
      this.isShow = true
      this.$emit('update:visible', true)
    },
    close() {
      this.isShow = false
      this.$emit('update:visible', false)
    },
    onClose() {
      this.$emit('close')
    }

  }

}
</script>
<style lang="scss">
.wb-dialog{
  min-width:600px;
  .el-dialog__body{
    overflow-y: auto;
    max-height:70vh;
    padding:20px;
  }
}
</style>
