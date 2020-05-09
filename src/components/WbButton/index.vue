<template>
  <el-button
    :type="type"
    :disabled="disabled"
    :icon="icon"
    :loading="loading"
    :size="size"
    @click="onClick"
  >
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'WbButton',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean
    },
    icon: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean
    },
    size: {
      type: String,
      default: '' // medium / small / mini
    }
  },
  data() {
    return {
      throttleTime: 500,
      timer: null
    }
  },
  methods: {
    onClick() {
      if (this.timer !== null) {
        return
      }
      this.timer = setTimeout(() => {
        this.timer = null
      }, this.throttleTime)
      this.$emit('click')
    }
  }

}
</script>
