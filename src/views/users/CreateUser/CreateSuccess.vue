<template>
  <wb-dialog
    title="新建成功"
    :close-on-click-modal="false"
    class="create-success"
    width="60%"
  >
    <div class="success-tip">
      <p class="tip-content">
        <wb-icon name="el-icon-success" color="#00C155" size="28" class="mr-1" /> 您已成功新建用户，该用户的密码或访问秘钥如下所示，您可以查看和下载用户安全凭证。
      </p>
      <el-button type="primary" size="small" @click="downloadCert">
        下载安全凭证
      </el-button>
    </div>
    <div class="list-div">
      <wb-list :list-data="users">
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
        />
        <el-table-column
          align="center"
          prop="password"
          label="密码"
        >
          <template slot-scope="scope">
            {{ scope.row.showPwd?scope.row.password:'*****' }}
            <span class="btn-text" @click="togglePwd(scope.row,scope.$index)">
              {{ scope.row.showPwd?'隐藏':'显示' }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="accesskey"
          label="ACCESSKEY"
        />
        <el-table-column
          align="center"
          prop="secretkey"
          label="SECRETKEY"
        >
          <template slot-scope="scope">
            {{ scope.row.showKey?scope.row.secretkey:'*****' }}
            <span class="btn-text" @click="toggleKey(scope.row,scope.$index)">{{ scope.row.showKey?'隐藏':'显示' }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column
          align="center"
          label="发送到邮箱"
        >
          <template slot-scope="scope">
            {{ scope.row.type ? scope.row.type.name : '' }}
          </template>
        </el-table-column> -->
      </wb-list>
    </div>
  </wb-dialog>
</template>

<script>

export default {
  props: {

  },
  data() {
    return {
      users: [{
        name: '123455',
        password: '123sdss',
        accesskey: 'sadkfsdf jsdhfsdfjklasdkjfssdf',
        secretkey: 'skdjfhsdkjfhsdfj'
      },
      {
        name: '123455jj',
        password: '123sdssdsfds',
        accesskey: 'sadkfsdf jsdhfsdfjklasdkjfsdfdssdf',
        secretkey: 'skdjfhsdkjfhsdfsdfj'
      },
      {
        name: '123455fgh',
        password: '123sdssfgh',
        accesskey: 'sadkfsdf fghjsdhfsdfjklasdkjfssdf',
        secretkey: 'skdjfhsdkjfghfhsdfj'
      },
      {
        name: '123455fg',
        password: '123sdssgfh',
        accesskey: 'sadkfsdf jsdhfsbndfjklasdkjfssdf',
        secretkey: 'skdjfhsdkjfhfgsdfj'
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
    toggleKey(data, index) {
      data.showKey = !data.showKey
      this.$set(this.users, index, data)
    },
    togglePwd(data, index) {
      data.showPwd = !data.showPwd
      this.$set(this.users, index, data)
    },
    downloadCert() {

    }
  }
}
</script>

<style lang="scss">
.create-success{
  .success-tip{
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 1px 2px 6px rgba(0,0,0,0.4);
    border-radius: 2px;
    padding:30px;
    .tip-content{
      color:$tipGray;
      display: inline-flex;
      align-items: center;
      margin-bottom: 15px;
    }
  }
  .list-div{
    box-shadow: 1px 2px 6px rgba(0,0,0,0.4);
    border-radius: 2px;
    padding:20px;
    margin-top:20px;
  }
  .btn-text{
    color: $primary;
    cursor: pointer;
    white-space: nowrap;
  }
}
</style>
