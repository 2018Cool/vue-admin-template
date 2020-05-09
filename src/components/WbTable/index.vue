<template>
  <div class="wb-table" :style="{'max-width':tableMaxWidth}">
    <div v-if="showBar" class="table-bar">
      <slot name="tableBar" />
      <wb-search v-model="searchText" :placeholder="searchPlaceholder" @search="onSearch" />
    </div>
    <div class="table-content" :style="{height:tableHeight}" :class="{'no-pagation':hidePagination}">
      <el-table
        ref="table"
        v-loading="loading"
        :data="listData"
        :border="border"
        fit
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
            v-if="!item.hidden"
            :key="item.prop+`${index}`"
            :prop="item.prop"
            :label="item.label"
            align="center"
            show-overflow-tooltip
          >
            <slot
              slot-scope="scope"
              :row="scope.row"
              :item="item"
            />
          </el-table-column>
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
      <!-- 分页组件 -->
      <pagination
        v-if="!hidePagination"
        class="w-100"
        :total="total"
        :float="paginationFloat"
        :layout="paginationLayout"
        :show-checked="showSelection"
        :checked-count="checkedCount"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getListData"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '../Pagination/index.vue'

export default {
  name: 'WbTable',
  components: {
    Pagination
  },
  props: {
    columns: { // 表格列信息
      type: Array,
      default: () => []
    },
    showBar: Boolean, // 是否显示操作栏
    showSelection: Boolean, // 是否显示选择按钮
    selectedData: {
      type: Array,
      default: () => []
    },
    idField: {
      type: String,
      default: 'id'
    },
    searchPlaceholder: {
      type: String,
      default: '请输入'
    },
    maxWidth: { // 最大宽度设置
      type: [Number, String],
      default: '100%' },
    searchField: { // 搜索参数字段名称
      type: String,
      default: 'param'
    },
    fetchFun: { // 获取列表数据的函数
      type: Function,
      required: true
    },
    border: Boolean,
    stripe: Boolean,
    showHandleColumn: { // 是否显示操作栏
      type: Boolean,
      default: false
    },
    hidePagination: Boolean, // 隐藏分页组件
    paginationLayout: {
      type: String,
      default: ''
    },
    paginationFloat: {
      type: String,
      default: 'right'
    },
    handleColumnWidth: { // 操作栏宽度
      type: Number,
      default: 120
    }
  },
  data() {
    return {
      searchText: '',
      queryParams: {
        pageNum: 1,
        pageSize: 20
      }, // 查询参数
      loading: false,
      listData: [],
      total: 0,
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
  created() {
    this.getListData()
  },
  mounted() {
    window.onresize = this.setTableHeight
  },
  destroyed() {
    window.onresize = null
  },
  methods: {
  // 刷新表格
    refreshTable(params) {
      if (params) {
        this.queryParams = Object.assign(this.queryParams, params)
      }
      this.queryParams.pageNum = 1
      this.getListData()
    },
    // 刷新当前分页
    refreshTablePage(params) {
      this.queryParams = Object.assign(this.queryParams, params)
      this.getListData()
    },

    // 搜索
    onSearch() {
      this.queryParams.pageNum = 1
      this.queryParams[this.searchField] = this.searchText
      this.getListData()
    },
    onSelectionChange(data) {
      this.checkedCount = data.length
      this.$emit('selection-change', data)
    },
    async getListData() {
      this.loading = true
      try {
        const res = await this.fetchFun(this.queryParams)
        const data = res.data
        if (data) {
          this.total = data.totalCount || 0
          this.listData = data.list || []
        }
        this.setTableHeight()
        this.setSelectionItem()
        // console.log(this.listData)
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },

    // 设置选中项
    setSelectionItem() {
      if (!this.showSelection) {
        return
      }
      const ids = this.selectedData.map((item) => item[this.idField])
      const selected = this.listData.filter((item) => ids.includes(item.id))
      this.$nextTick(() => {
        const table = this.$refs.table
        table.clearSelection()
        selected.forEach((item) => {
          table.toggleRowSelection(item)
        })
      })
    },
    setTableHeight() {
      let parentHeight = 300
      if (this.$el.parentNode._prevClass === 'el-dialog__body') {
        const dialog = this.$el.parentNode.parentNode
        const dialogOffsetHeight = dialog.offsetHeight
        const pNodeHeight = this.$el.parentNode.clientHeight
        const dialogOffsetTop = dialog.offsetTop
        const clientHeight = document.body.clientHeight
        parentHeight = clientHeight - dialogOffsetHeight - dialogOffsetTop - 155 + pNodeHeight
      } else {
        parentHeight = this.$parent.$el.clientHeight
      }
      const contentHeight = 48 * this.listData.length + 163
      const maxHeight = parentHeight - (this.hidePagination ? 0 : 64)
      const minHeight = 300
      if (contentHeight >= maxHeight) {
        this.tableHeight = maxHeight + 'px'
      } else if (contentHeight <= minHeight) {
        this.tableHeight = minHeight + 'px'
      } else {
        this.tableHeight = contentHeight + 'px'
      }
    }
  }

}
</script>
<style lang="scss">
.wb-table{
  position: relative;
  width:100%;
  height: 100%;
  margin: 0 auto;
  .table-bar{
    display:flex;
    justify-content: space-between;
  }

  .table-content{
    margin-top:15px;
    padding:20px;
    position: relative;
    background: #fff;
    border-radius: 5px;
    overflow-y: auto;
    height:calc(100% - 55px);
    box-shadow: rgba(0,0,0,.2) 0 0 5px;
    &.no-pagation{
      .el-table{
        height: 100%;
      }
    }
    .el-table{
      position: relative;
      width:100%;
      margin-left:0;
      height: calc(100% - 64px);
      border: 1px solid #DCDFE6;
      &:before{
        display: none;
      }
      .el-checkbox{
        margin: 0;
      }
      .el-table__column-filter-trigger{
        line-height: 22px;
      }
      .gutter{
        border-bottom: 1px solid #EBEEF5;
        height:49px;
      }
      thead{
        font-weight: bold;
        color:#606266;
      }
      .el-table-column--selection .cell {
        padding-right: 0;
      }

      .el-table__body-wrapper{
          overflow-y: auto;
          overflow-x: hidden;
          position: relative;
          width: 100%;
          max-height: calc(100% - 48px);
          min-height:160px;
      }
    }

      // @media screen and (max-height:900px){
      //   .el-table__body-wrapper{
      //     max-height:52vh;
      //   }
      // }
      // @media screen and (min-height:1500px){
      //   .el-table__body-wrapper{
      //     max-height:70vh;
      //   }
      // }
  }
}
</style>
