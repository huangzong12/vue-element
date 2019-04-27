<template>
  <div class="login">
    <div class="login-con">
      <hf-card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </hf-card>
    </div>
  </div>
</template>

<script>
  import './login.less'
  import LoginForm from './login-form'
  import {mapActions} from 'vuex'
  import HfCard from "@/common/hf-card";

  export default {
    components: {
      HfCard,
      LoginForm
    },
    methods: {
      ...mapActions([
        'handleLogin',
        // 'getUserInfo'
      ]),
      handleSubmit({userName, password}) {
        this.handleLogin({userName, password}).then(() => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      }
    }
  }
</script>
