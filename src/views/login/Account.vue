<template>
  <div class="account">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form mt-5" label-position="left">
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          placeholder="请输入邮箱或者手机号"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        >
          <i slot="prefix" class="el-icon-s-custom acct" />
          <i slot="suffix" class="view " />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          :type="pwdType"
          name="password"
          placeholder="请输入密码"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        >
          <i slot="prefix" class="el-icon-lock acct" />
          <i slot="suffix" class="el-icon-view view" @click="showPwd" />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" class="btn-login" type="primary" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'Account',
  data() {
    const validateUsername = (rule, value, callback) => {
      const name = value.trim()
      if (name.length === 0) {
        callback(new Error('请输入账号'))
      } else if (name.length >= 50) {
        callback(new Error('请输入正确的账号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      const password = value.trim()
      if (password.length === 0) {
        callback(new Error('请输入密码'))
      } else if (password.length < 8 || password.length > 20) {
        callback(new Error('密码长度为 8-20 个字符'))
      } else {
        callback()
      }
      // const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}')
      // if (!pwdRegex.test(value)) {
      //   callback(new Error('密码长度为 8-20 个字 ，需同时包含数字、字母以及特殊符号'))
      // } else {
      //   callback()
      // }
    }
    return {
      // activeName: 'second',
      redirectUrl: '',
      checked: '',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.redirectUrl = this.$route.query.redirectUrl
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },

    // 登入
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/home' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    forgetPwd() {

    }

  }
}
</script>

<style lang="scss">

  .account {
    .scan-text{
      text-align: center;
      color: #676767;
      font-size: 14px;
      margin: 30px  0px 30px 0px;
    }
    .login-form{
      margin: 0 auto;
      width: 80%;
      // height: 249px;
      .view{
        cursor: pointer;
        margin-right: 5px;
      }
      .acct{
        margin-left: 5px;
      }
      .btn-login{
        display: table;
        margin: 0 auto;
        width: 100%;
      }
      .el-form-item{
        margin-bottom: 25px;
      }
    }
    .buttom{
      width: 80%;
      margin: 0 auto;
      // .el-checkbox{
      //   height: 40px;
      //   line-height: 40px;
      //   float: left;
      // }
      .btn-forget{
        float: right;
      }
      .btn-towechat{
        float: left;
      }
    }

  }

</style>

