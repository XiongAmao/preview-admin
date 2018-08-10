<template>
  <Header>
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo">
        <div class="title">
          工具后台
        </div>
      </div>
      <div class="avatar">
        <User />
      </div>
    </Menu>
  </Header>
</template>

<script>
  import User from '../user/user.vue'

  export default {
    components: {
      User
    }
  }
</script>

<style scoped lang="scss">
  .layout-logo {
    width: 200px;
    height: 30px;
    /* background: #5b6270; */
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 0;
    color: #fff;
    .title {
      font-size: 20px;
      line-height: 30px;
    }
  }
  .avatar {
    max-width: 50px;
    margin: 0 auto;
    margin-right: 0;
    color: #fff;
  }
</style>
