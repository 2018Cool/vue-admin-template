<template>
  <div class="login-container">
    <app-header />
    <div class="login-box">
      <div class="title">
        用户登录
      </div>
      <account />
    </div>
  </div>
</template>

<script>
import Account from '@/views/login/Account'
import { AppHeader } from '@/layout/components'
export default {
  name: 'Loginhome',
  components: {
    Account,
    AppHeader
  },
  data() {
    return {
      // activeName: 'wechatLogin'
      showAcct: this.$route.query.flag
    }
  },
  methods: {
    // 切换

  }
}
</script>

<style lang="scss">

  .login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: $mainBg;
    overflow: hidden;
    .title{
      font-size: 20px;
      font-weight: 650;
      text-align: center;
      height: 55px;
      line-height: 55px;
      // padding: 10px 0;
      border-bottom: 1px solid #E5E5E5
    }
    .login-box {
      margin: 0 auto;
      margin-top:120px ;
      width: 450px;
      height: 350px;
      background: #fff;
      box-shadow: rgb(214, 214, 214) 0px 4px 21px;
      border-radius: 5px;
      .el-tabs__content{
        height: 300px;
      }
    }

  }

</style>

