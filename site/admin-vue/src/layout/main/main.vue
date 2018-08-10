<template>
  <div class="layout">
    <Layout style="height: 100%;">
      <header-bar></header-bar>
      <Layout style="height: 100%;">
        <Sider class="layout-sider" hide-trigger>
          <side-menu></side-menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <breadcrumb-bar></breadcrumb-bar>
          <Content :style="{padding: '24px', background: '#fff'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <ImgLightBox /> <!-- TODO: 暂时放在这里，等做成指令式再说 -->
  </div>
</template>
<script>
  import HeaderBar from './components/header-bar/header-bar.vue'
  import SideMenu from './components/side-menu/side-menu.vue'
  import BreadcrumbBar from './components/breadcrumb-bar/breadcrumb-bar.vue'
  import ImgLightBox from '@/components/img-light-box/img-light-box.vue'

  export default {
    components: {
      HeaderBar,
      SideMenu,
      BreadcrumbBar,
      ImgLightBox
    }
  }
</script>
<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }
  .layout-sider {
    background: #fff;
    height: 100%;
  }
</style>
