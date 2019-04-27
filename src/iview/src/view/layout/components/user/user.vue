<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <hf-badge :dot="!!messageUnreadCount">
        <hf-avatar :src="userAvatar"></hf-avatar>
      </hf-badge>
      <hf-icon :size="18" type="md-arrow-dropdown"></hf-icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心
          <hf-badge style="margin-left: 10px" :count="messageUnreadCount"></hf-badge>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  import './user.less'
  import {mapActions} from 'vuex'

  export default {
    name: 'User',
    props: {
      userAvatar: {
        type: String,
        default: ''
      },
      messageUnreadCount: {
        type: Number,
        default: 0
      }
    },
    methods: {
      ...mapActions([
        'handleLogOut'
      ]),
      logout() {
        this.handleLogOut().then(() => {
          this.$router.push({
            name: 'login'
          })
        })
      },
      message() {
        this.$router.push({
          name: 'message_page'
        })
      },
      handleClick(name) {
        switch (name) {
          case 'logout':
            this.logout()
            break
          case 'message':
            this.message()
            break
        }
      }
    }
  }
</script>
