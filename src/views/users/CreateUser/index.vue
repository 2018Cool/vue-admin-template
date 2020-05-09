<template>
  <wb-dialog
    title="新建用户"
    :visible.sync="isShow"
    :close-on-click-modal="false"
    class="create-user"
    width="50%"
  >
    <el-tabs v-model="activeIndex" :before-leave="leaveCheck" stretch @tab-click="handleClick">
      <el-tab-pane>
        <span slot="label" class="d-inline-flex align-items-center px-2">
          <span class="step-index" :class="{'step-ok':activeIndex > '0'}">
            <span v-show="showIndexNum('0')">1</span>
            <wb-icon v-show="activeIndex > '0'" name="el-icon-check" bold class="p-1" />
          </span>
          <span class="mx-2">填写用户信息</span>
          <wb-icon name="el-icon-arrow-right" bold :size="18" />
        </span>
        <user-info ref="userInfo" :form-data="formData" />
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="d-inline-flex align-items-center px-2">
          <span class="step-index" :class="{'step-ok':activeIndex > '1'}">
            <span v-show="showIndexNum('1')">2</span>
            <wb-icon v-show="activeIndex > '1'" name="el-icon-check" bold class="p-1" />
          </span>
          <span class="mx-2">设置用户权限</span>
          <wb-icon name="el-icon-arrow-right" bold :size="18" />
        </span>
        <strategy :form-data="formData" />
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="d-inline-flex align-items-center px-2">
          <span class="step-index">
            <span v-show="showIndexNum('2')">3</span>
          </span>
          <span class="mx-2">审阅</span>
        </span>
        <overview :form-data="formData" />
      </el-tab-pane>
    </el-tabs>
    <div slot="footer">
      <el-button type="primary" size="small" :disabled="activeIndex==='0'" @click="back">
        上一步
      </el-button>
      <el-button v-show="activeIndex < '2'" type="primary" size="small" @click="next">
        下一步
      </el-button>
      <el-button v-show="activeIndex === '2'" type="primary" size="small" style="width:68px" @click="submit">
        完成
      </el-button>
    </div>
  </wb-dialog>
</template>

<script>
import UserInfo from './UserInfo'
import Strategy from './Strategy'
import Overview from './Overview'
export default {
  components: {
    UserInfo,
    Strategy,
    Overview
  },
  props: {

  },
  data() {
    return {
      isShow: false,
      activeIndex: '0',
      formData: {
        users: [{ name: '', remark: '' }],
        accessMode: ['web'],
        password: '',
        passwordType: 'custom',
        needReset: false,
        strategies: []
      }
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
    handleClick() {},
    leaveCheck(nowIndex, checkIndex) {
      if (checkIndex === '0') {
        return new Promise((resolve, reject) => {
          this.$refs.userInfo.check().then((valid) => {
            resolve()
          }, () => {
            this.$message.error('表单输入信息有误，请检查！')
            this.activeIndex = checkIndex
            reject()
          })
        })
      } else {
        return true
      }
    },
    next() {
      this.activeIndex = (+this.activeIndex + 1) + ''
      console.log(this.activeIndex)
    },
    back() {
      this.activeIndex = (+this.activeIndex - 1) + ''
      console.log(this.activeIndex)
    },
    submit() {},
    showIndexNum(index) {
      return this.activeIndex === index || this.activeIndex < index
    }
  }
}
</script>

<style lang="scss">
.create-user{
  .step-index{
    color:#fff;
    width:24px;
    height:24px;
    text-align: center;
    line-height: 24px;
    border-radius: 50%;
    display: inline-block;
    background: #D8D8D8;
    margin-left:5px;
    &.step-ok{
      background: $primary;
    }
  }

  .el-tabs{
    .el-tabs__item{
      padding: 0 10px;
    }
    .is-active{
      .step-index{
        background: $primary;
      }
    }
    .el-tabs__content{
      margin-top: 20px;
    }
    .el-tab-pane{
      height:55vh;
      max-height:900px;
      overflow-y: auto;
    }
  }
}
</style>
