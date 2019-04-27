<template>
  <hf-form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <hf-form-item prop="userName">
      <hf-input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </hf-input>
    </hf-form-item>
    <hf-form-item prop="password">
      <hf-input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </hf-input>
    </hf-form-item>
    <hf-form-item>
      <hf-button @click="handleSubmit" type="primary" long>登录</hf-button>
    </hf-form-item>
  </hf-form>
</template>
<script>
  export default {
    name: 'LoginForm',
    props: {
      userNameRules: {
        type: Array,
        default: () => {
          return [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ]
        }
      },
      passwordRules: {
        type: Array,
        default: () => {
          return [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    data() {
      return {
        form: {
          userName: 'super_admin',
          password: ''
        }
      }
    },
    computed: {
      rules() {
        return {
          userName: this.userNameRules,
          password: this.passwordRules
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$emit('on-success-valid', {
              userName: this.form.userName,
              password: this.form.password
            })
          }
        })
      }
    }
  }
</script>
