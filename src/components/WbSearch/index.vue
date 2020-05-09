<template>
  <el-input
    v-model.trim="content"
    class="wb-search"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :clearable="clearable"
    prefix-icon="el-icon-search"
    :style="{width:width}"
    @keyup.enter.native="search"
  >
    <!-- <el-button slot="append" icon="el-icon-search" @click="search" /> -->
  </el-input>
</template>
<script>
export default {
  name: 'WbSearch',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    maxlength: {
      type: Number,
      default: 50
    },
    width: {
      type: String,
      default: '30%'
    }
  },
  data() {
    return {
      content: this.value,
      timer: null
    }
  },
  watch: {
    content(val) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        this.$emit('input', val)
        this.search()
      }, 300)
    }
  },
  methods: {
    search() {
      this.$emit('search')
    }
  }
}
</script>
<style lang="scss">
.wb-search{
  position: relative;
}
</style>
