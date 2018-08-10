<template>
  <i-menu
    :active-name="defaultActiveName"
    theme="light"
    width="auto"
    :open-names="openNames"
    @on-select="toPath"
  >
    <!-- TODO: 暂时写死菜单栏 -->
    <i-submenu name="rp">
      <template slot="title">
        <i-icon type="md-photos"></i-icon>
        原型管理
      </template>
      <i-menu-item name="rp-list">原型列表</i-menu-item>
    </i-submenu>

    <i-submenu name="article">
      <template slot="title">
        <i-icon type="md-person"></i-icon>
        账号管理
      </template>
      <i-menu-item name="user-list">账号列表</i-menu-item>
    </i-submenu>
  </i-menu>
</template>

<script>
  export default {
    data () {
      return {
        defaultActiveName: '',
        openNames: []
      }
    },
    methods: {
      toPath(name) {
        this.$router.push({ name: name })
      }
    },
    created () {
      this.defaultActiveName = this.$route.name
      this.openNames.push(this.$route.matched[0].name)
    }
  }
</script>

<style>

</style>
