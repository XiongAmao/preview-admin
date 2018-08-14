<template>
  <div class="login">
    <Card
      class="login-card"
      :border="false"
      dis-hover
    >
      <template class="card-title" slot="title">
        <Icon size="16" type="log-in" /><span style="padding-left: 16px;font-weight: 600;">工具后台</span>
      </template>

      <main class="login-form">
        <LoginForm></LoginForm>
      </main>
    </Card>
  </div>
</template>

<script>
  import LoginForm from './components/login-form.vue'

  export default {
    components: {
      LoginForm
    }
  }
</script>

<style scoped lang="scss">
  .login {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
      width: 300px;
      // height: 300px;
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      border-color: #eee;
    }
    .card-title {
      text-align: center;
    }
  }
</style>
