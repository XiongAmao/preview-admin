<template>
  <div>
    <Dropdown
      class="username"
      v-if="account"
      @on-click="onClick"
    >
      <a class="link" href="javascript:void(0)">
        {{ account }}
      </a>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>

</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {

      }
    },
    methods: {
      ...mapActions('user', [
        'handleLogout',
      ]),
      onClick(name) {
        if (name === 'logout') {
          const loadingMsg = this.$Message.loading({
            content: '登出中...',
            duration: 0
          })
          this.handleLogout().then(res => {
            loadingMsg()
            this.$Message.warning('账号已登出')
            this.$router.push({
              name: 'login'
            })
          }).catch(err => {
            loadingMsg()
          })
        }
      }
    },
    computed: {
      account() {
        return  this.$store.state.user.account || ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .username {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    .link {
      color: #fff;
    }
  }

</style>
