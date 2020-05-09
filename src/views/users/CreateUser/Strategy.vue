<template>
  <wb-table
    :fetch-fun="fetchFun"
    show-selection
    show-bar
    search-placeholder="搜索策略名/描述"
    class="strategy-style"
    @selection-change="onChange"
  >
    <el-table-column
      prop="name"
      label="策略名"
      align="left"
      show-overflow-tooltip
    />

    <el-table-column
      prop="desc"
      label="描述"
      align="center"
      show-overflow-tooltip
    />
  </wb-table>
</template>

<script>
import { getStrategy } from '@/api/user'
export default {
  props: {
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      fetchFun: getStrategy
    }
  },
  methods: {
    onChange(data) {
      this.formData.strategies = data
    }
  }
}
</script>

<style lang="scss">
.strategy-style{
  .table-content{
    padding: 0;
    box-shadow: none;
    border-radius: 0;
  }
  .table-bar{
    justify-content: flex-end;
  }

}
</style>
