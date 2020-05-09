<template>
  <wb-table
    ref="table"
    :fetch-fun="fetchFun"
    show-bar
    search-placeholder="搜索用户名"
    class="user-list"
  >
    <el-button slot="tableBar" type="primary" @click="createUser">
      新建用户
    </el-button>

    <el-table-column
      prop="name"
      label="用户名"
      align="center"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <span
          class="text-primary"
          style="cursor:pointer"
          @click="showUserDetail(scope.row)"
        >{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column
      prop="lastTime"
      label="上次登录"
      align="center"
      show-overflow-tooltip
    />
    <el-table-column
      label="操作"
      align="center"
    >
      <template slot-scope="scope">
        <span class="text-primary btn-style" @click="setupPermission(scope.row)">
          设置权限
        </span>
        <span class="text-danger ml-4 btn-style" @click="delUser(scope.row)">
          删除
        </span>
      </template>
    </el-table-column>
  </wb-table>
</template>
<script>
import { getUserList, delUser } from '@/api/user'
import CreateUser from './CreateUser'
import CreateSuccess from './CreateUser/CreateSuccess'
import SetPermission from './SetPermission'
export default {
  data() {
    return {
      fetchFun: getUserList
    }
  },
  methods: {
    refreshData() {
      this.$refs.table.refreshTable()
    },
    createUser() {
      this.$showDialog(CreateUser).onDialogClosed((res) => {
        if (res) {
          this.refreshData()
          this.$showDialog(CreateSuccess)
        }
      })
    },
    showUserDetail(user) {

    },
    setupPermission(user) {
      this.$showDialog(SetPermission, { id: user.id })
    },
    delUser(user) {
      this.$confirm(`删除后用户数据将无法恢复，确定删除用户${user.name}?`, '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser({ id: user.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch((e) => {

      })
    }
  }
}
</script>
<style lang="scss">
.user-list{
  .btn-style{
    font-size:13px;
    font-weight: normal;
    cursor: pointer;
  }
}
</style>

