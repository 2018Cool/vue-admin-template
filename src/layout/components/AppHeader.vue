<template>
  <div class="app-header">
    <span class="logo">后台管理模板</span>
    <div v-if="name" class="right-menu">
      <el-dropdown class="avatar-container avatar-box" @command="handleCommand" @visible-change="changeIcon">
        <div class="accout-box">
          <wb-icon name="el-icon-user-solid" />
          <span class="ml-1">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="my-dropdown">
          <el-dropdown-item command="info">
            账号信息
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  data() {
    return {

      visible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'roles', // 权限(是否已经认证)
      'avatar', // 用户头像
      'name' // 用户名字
    ])
  },

  mounted() {
    // const width = this.$refs.box.offsetWidth
    // if (width > 100) {
    //   this.boxWidth = true
    // }
  },
  methods: {

    handleCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      } else if (command === 'info') {
        this.$router.push({ path: '/account/info' })
      }
    },
    changeIcon(visible) {
      this.visible = visible
    }
  }
}
</script>

<style lang="scss" >
.app-header {
  height: $headerHeight;
  overflow: hidden;
  position: relative;
  background: $headerBg;
  .logo{
    line-height: $headerHeight;
    color:white;
    font-weight: bold;
    font-size:18px;
    padding-left: 20px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: $headerHeight;
  }

  .avatar-container {
    // cursor: pointer;
    height: $headerHeight;
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 0px;
    font-size: 14px;
    color: $menuText;
    cursor: pointer;
    &:hover{
      color:#fff;
    }
    .accout-box{
      .icon{
        background-color: #ccc;
        width: 30px;
        height: 30px;
        border-radius: 15px
      }
      .box{
        max-width: 120px;
        color: #fff;
        vertical-align: middle;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: inline-block;
      }
      .attestation{
        vertical-align: middle;
        border-radius: 6px;
        padding: 3px;
      }
    }
  }
}
.my-dropdown{
  background: $sideBarBg;
  top:46px !important;
  border: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  .popper__arrow{
    display:none;
  }
  .el-dropdown-menu__item{
    color:$menuText;
    width:110px;
    text-align: center;
    &:hover{
      color:#fff;
      background: $menuHover;
    }
  }
}
</style>

