<template>
  <div class="wb-list" :style="{'max-width':tableMaxWidth}">
    <el-table
      :data="listData"
      :border="border"
      fit
      size="medium"
      empty-text="暂无数据"
      highlight-current-row
      :stripe="stripe"
      max-height="auto"
      @row-click="(data)=>$emit('row-click',data)"
      @filter-change="(data)=>$emit('filter-change',data)"
      @selection-change="onSelectionChange"
    >
      <el-table-column
        v-if="showSelection"
        type="selection"
        width="45"
        align="right"
      />
      <slot />
      <template v-for="(item,index) in columns">
        <el-table-column
          :key="item.prop+`${index}`"
          :prop="item.prop"
          :label="item.label"
          align="center"
          show-overflow-tooltip
        />
      </template>

      <el-table-column
        v-if="showHandleColumn"
        label="操作"
        align="center"
        :width="handleColumnWidth"
      >
        <slot
          slot-scope="scope"
          name="handleColumn"
          :row="scope.row"
        />
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'WbList',
  props: {
    columns: { // 表格列信息
      type: Array,
      default: () => []
    },
    showSelection: Boolean, // 是否显示选择按钮
    listData: {
      type: Array,
      default: () => []
    },
    maxWidth: { // 最大宽度设置
      type: [Number, String],
      default: '100%' },
    border: Boolean,
    stripe: Boolean,
    showHandleColumn: { // 是否显示操作栏
      type: Boolean,
      default: false
    },
    handleColumnWidth: { // 操作栏宽度
      type: Number,
      default: 120
    }
  },
  data() {
    return {
      tableHeight: '',
      checkedCount: 0
    }
  },
  computed: {
    tableMaxWidth() {
      if (typeof this.maxWidth === 'string') {
        return this.maxWidth
      } else {
        return this.maxWidth + 'px'
      }
    }
  },
  watch: {
    data(val) {
      this.listData = val
    }
  },

  methods: {
    onSelectionChange(data) {
      this.checkedCount = data.length
      this.$emit('selection-change', data)
    }
  }

}
</script>
<style lang="scss">
.wb-list{
  position: relative;
  width:100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  background: #fff;
  .el-table{
    position: relative;
    width:100%;
    margin-left:0;
    border: 1px solid #DCDFE6;
    &:before{
      display: none;
    }
    .el-checkbox{
      margin: 0;
    }

    thead{
      font-weight: bold;
      color:#606266;
    }
    .el-table-column--selection .cell {
      padding-right: 0;
    }
  }
}
</style>
