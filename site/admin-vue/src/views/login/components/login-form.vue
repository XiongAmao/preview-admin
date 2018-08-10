<template>
  <Form ref="form" :model="form" :rules="rules" >
    <i-form-item prop="userName">
      <i-input
        type="text"
        v-model="form.userName"
        placeholder="账号"
        size="large"
        @on-keydown.enter="handleSubmit('form')"
      >
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-input>
    </i-form-item>
    <i-form-item prop="password">
      <i-input
        type="password"
        v-model="form.password"
        placeholder="密码"
        size="large"
        @on-keydown.enter="handleSubmit('form')"
      >
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </i-input>
    </i-form-item>
    <i-form-item>
      <Button
        size="large"
        type="primary"
        @click="handleSubmit('form')"
        long
        :loading="loading"
      >登录</Button>
    </i-form-item>
  </Form>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        loading: false,
        form: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [ { required: true, message: '请填写账号', trigger: 'blur' } ],
          password: [ { required: true, message: '请填写密码', trigger: 'blur' } ]
        }
      }
    },
    methods: {
      ...mapActions('user', [
        'handleLogin',
      ]),
      handleSubmit(name) {
        if (this.loading) return
        this.$refs[name].validate((valid) => {
          if (valid) { this.login() }
        })
      },
      login() {
        this.loading = true
        this.handleLogin({
          userName: this.form.userName,
          password: this.form.password
        }).then(res => {
          this.loading = false
          this.$Message.success('登录成功')
          this.$router.push({ // TODO: 暂时跳转到这里
            name: 'rp-list'
          })
        }).catch(er => {
          this.loading = false
        })
      }
    }
  }
</script>
