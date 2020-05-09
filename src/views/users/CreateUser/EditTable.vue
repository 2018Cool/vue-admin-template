<template>
  <div class="edit-table">
    <el-table
      :data="users"
      style="width: 100%"
    >
      <input type="password" hidden autocomplete="new-password">
      <el-table-column align="center">
        <template slot="header">
          用户名<span class="text-danger">*</span>
        </template>
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.name" placeholder="6-20个字符，不支持中文" maxlength="20" :class="{'input-no-error':validateName(scope.row.name)}" />
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        align="center"
      >
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.remark" type="text" maxlength="100" class="input-inner" />
        </template>
      </el-table-column>
      <el-table-column align="center" width="90">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            :disabled="users.length===1"
            @click="delUser(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="d-flex align-items-center mt-3">
      <el-button type="primary" size="mini" :disabled="users.length>=10" @click="addUser">
        新增用户
      </el-button>
      <span class="ml-2 text-gray">（单次最多创建10个用户）</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditTable',
  props: {
    value: {
      type: Array,
      default: () => [{ name: '', remark: '' }]
    }

  },
  data() {
    return {
      users: this.value
    }
  },
  computed: {

  },
  watch: {
    users: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    addUser() {
      this.users.push({ name: '', remark: '' })
    },
    validateName(name) {
      return /^[a-zA-z][\w\d\-]{5,19}$/.test(name)
    },
    delUser(index) {
      this.users.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
.edit-table{
  position: relative;
  .input-no-error{
     .el-input__inner{
       border-color:#DCDFE6;
       &:focus{
         border-color:$primary;
       }
     }
   }
    .input-inner{
     .el-input__inner{
       border-color:#DCDFE6;
       &:focus{
         border-color:$primary;
       }
     }
   }
  .el-table{
     position: relative;
      width:90%;
      margin-left:0;
      border: 1px solid #DCDFE6;
      th{
        padding:0;
      }
       thead{
      font-weight: bold;
      color:#606266;
    }
      &:before{
        display: none;
      }
  }
}
</style>
