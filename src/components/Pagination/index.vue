<template>
  <div
    :class="{'hidden':hidden,'float-right':float==='right','float-left':float==='left','check':showChecked}"
    class="pagination-container"
  >
    <span v-if="showChecked" class="checked-tip">已选中<span>{{ checkedCount }}</span>条</span>
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="paginationLayout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scrollTo'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    showChecked: Boolean,
    checkedCount: { // 选中的总数
      type: Number,
      default: 0
    },
    float: {
      type: String,
      default: 'right'
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50, 100]
      }
    },
    layout: {
      type: String,
      default: ''
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    },
    paginationLayout() {
      if (this.layout) {
        return this.layout
      }
      if (this.float === 'right') {
        return 'total, prev, pager, next, sizes, jumper'
      } else {
        return 'total, sizes, prev, pager, next, jumper'
      }
    }
  },

  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style lang="scss">
.pagination-container {
  background: #fff;
  padding: 24px 0 8px 0;
  .checked-tip{
    font-size:13px;
    color:#606266;
    line-height: 32px;
    white-space: nowrap;
    > span{
      margin:0 5px;
    }
  }
}
.check{
  display: flex;
}
 .float-right{
    text-align:right;
    justify-content: space-between;
    .el-pagination__sizes{
      margin-right:0;
    }
}
  .float-left{
    text-align:left;
    justify-content: flex-start;
  }
.pagination-container.hidden {
  display: none;
}

</style>
