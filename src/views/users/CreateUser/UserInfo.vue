<template>
  <div class="user-info">
    <el-form ref="form" label-position="left" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="用户信息" prop="users" size="small">
        <edit-table v-model="formData.users" />
      </el-form-item>

      <el-form-item label="访问方式" prop="accessMode">
        <el-checkbox-group v-model="formData.accessMode" class="d-flex flex-column">
          <el-checkbox label="api">
            编程访问
          </el-checkbox>
          <span class="tip">
            启用ACCESSKEY和SECRETKEY
          </span>
          <el-checkbox label="web">
            控制台访问
          </el-checkbox>
          <span class="tip">
            启用密码，允许用户登录微众AI平台控制台
          </span>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-show="formData.accessMode.includes('web')" label="控制台密码" prop="password">
        <el-radio-group v-model="formData.passwordType" class="d-flex flex-column">
          <el-radio label="auto">
            自动生成密码
          </el-radio>
          <el-radio label="custom">
            自定义密码
          </el-radio>
        </el-radio-group>
        <el-input v-show="formData.passwordType==='custom'" v-model="formData.password" show-password placeholder="请输入密码" maxlength="20" style="width:50%" />
      </el-form-item>
      <el-form-item label="重置密码" prop="needReset">
        <el-checkbox label="用户首次登录时需重置密码" name="api" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import EditTable from './EditTable'
import { validPassword } from '@/utils/validate'
export default {
  name: 'UserInfo',
  components: {
    EditTable
  },
  props: {
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const validateUsers = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请至少新增一条用户信息'))
        return
      }
      let msg = ''
      value.forEach((item, index) => {
        if (!/^[a-zA-z][\w\d\-]{5,19}$/.test(item.name)) {
          msg += `${index + 1}，`
        }
      })
      if (msg !== '') {
        msg = msg.substring(0, msg.lastIndexOf('，'))
        callback(`第${msg}列用户名不合法，用户名必须以字母开头，6-20个字符，支持字母，数字，下划线，中划线`)
      } else {
        callback()
      }
    }
    return {
      // formData: {
      //   users: [],
      //   accessM ode: [ ],
      //   password: '',
      //   passwordType: 'custom',
      //   needReset: false
      // },
      rules: {
        users: [
          { type: 'array', required: true, trigger: ['blur', 'change'], validator: validateUsers }
        ],
        accessMode: [
          { type: 'array', required: true, message: '请至少选择一种访问方式', trigger: 'change' }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validPassword }
        ]
      }
    }
  },

  methods: {
    check() {
      if (this.formData.accessMode.includes('web') && this.formData.passwordType === 'custom') {
        this.rules.password = [
          { required: true, trigger: 'blur', validator: validPassword }
        ]
      } else {
        delete this.rules.password
      }
      this.$refs.form.clearValidate()
      return this.$refs.form.validate()
    }
  }
}
</script>

<style lang="scss">
.user-info{
  .el-radio{
    line-height: 40px;
  }
  .tip{
    font-size:12px;
    color:$tipGray;
    line-height: 15px;
    margin-top:-10px;
    margin-bottom:10px;
    margin-left: 25px;
  }
}
</style>
