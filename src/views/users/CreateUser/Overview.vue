<template>
  <el-form label-position="top" class="overview-style">
    <el-form-item label="用户列表" prop="users" size="small">
      <wb-list
        :list-data="formData.users"
        :columns="[{prop:'name',label:'用户名'},{prop:'remark',label:'备注'}]"
      />
    </el-form-item>

    <el-form-item label="访问权限">
      <p><span class="label">访问方式</span>{{ accessMode }}</p>
      <p><span class="label">密码类型</span> {{ formData.passwordType==='auto'?'自动生成密码':'自定义密码' }}</p>
      <p><span class="label">需重置密码</span> {{ formData.needReset?'是':'否' }}</p>
    </el-form-item>

    <el-form-item label="策略列表">
      <wb-list
        :list-data="formData.strategies"
        :columns="[{prop:'name',label:'策略名'},{prop:'desc',label:'描述'}]"
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
    }
  },
  computed: {
    accessMode() {
      return this.formData.accessMode.map((item) => {
        if (item === 'api') {
          return '编程访问'
        } else if (item === 'web') {
          return '控制台访问'
        }
      }).join('，')
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss">
.overview-style{
  overflow-y: auto;
  .label{
    display: inline-block;
    width:85px;
  }

}
</style>
