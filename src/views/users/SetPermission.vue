<template>
  <wb-dialog
    title="设置权限"
    :close-on-click-modal="false"
    class="set-permission"
    width="50%"
  >
    <wb-table
      :fetch-fun="fetchFun"
      show-selection
      show-bar
      :selected-data="strategies"
      pagination-layout="total"
      pagination-float="left"
      search-placeholder="搜索策略名/描述"
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
    <div slot="footer">
      <el-button type="primary" size="small" style="width:68px" @click="submit">
        完成
      </el-button>
    </div>
  </wb-dialog>
</template>

<script>
import { getStrategy } from '@/api/user'
export default {
  props: {
    id: {
      type: Number,
      required: true

    }
  },
  data() {
    return {
      fetchFun: getStrategy,
      strategies: [{
        id: 10,
        name: '123455',
        password: '123sdss',
        accesskey: 'sadkfsdf jsdhfsdfjklasdkjfssdf',
        secretkey: 'skdjfhsdkjfhsdfj'
      },
      {
        id: 5,
        name: '123455',
        password: '123sdss',
        accesskey: 'sadkfsdf jsdhfsdfjklasdkjfssdf',
        secretkey: 'skdjfhsdkjfhsdfj'
      }

      ]
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    submit() {

    },
    onChange(data) {
      this.strategies = data
    }
  }
}
</script>

<style lang="scss">
.set-permission{
  height: 100%;
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
