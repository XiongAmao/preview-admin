<template>
  <div class="container">
    <div class="wrapper">
      <div class="exclamation">
        <div class="top"></div>
        <div class="bottom">
          <div class="block"></div>
          <div class="shadow"></div>
        </div>
      </div>
      <main class="description">
         <section class="title">{{ config.title }}</section>
         <section class="text">{{ config.content }}</section>
         <section class="text">点击 <span class="link" @click="goBack()">这里</span> 可以返回上一页；</section>
      </main>
    </div>
  </div>
</template>

<script>
  const conf = {
    '404': {
      title: '404',
      content: '抱歉，你访问的页面未找到；'
    },
    '403': {
      title: '403',
      content: '抱歉，你无权访问该页面；'
    }
  }

  export default {
    name: 'error_page',
    methods: {
      goBack() {
        if (this.type === '404') this.$router.go(-1)
        if (this.type === '403') this.$router.go(-2)
      }
    },
    computed: {
      type() {
        return this.$route.meta.type || '404'
      },
      config() {
        return conf[this.type]
      },

    }
  }
</script>

<style scoped lang="scss">
  .container {
    overflow: auto;
  }
  .wrapper {
    display: flex;
    width: 980px;
    margin: 20vh auto;
    justify-content: center;
    align-items: center;
  }
  .exclamation {
    width: 20%;

    .top {
      width: 60px;
      height: 200px;
      background-color: #fd4e08;
      margin-bottom: 14px;

    }
    .bottom {
      width: 100px;
      height: 60px;
      display: flex;

      .block {
        width: 60px;
        height: 60px;
        background-color: #fd4e08
      }

      .shadow {
        height: 0px;
        width: 0px;
        border-bottom: 60px solid transparent;
        border-left: 25px solid rgba(253, 78, 8, 0.4);
      }
    }
  }
  .description {
    color: #409EFF;

    .title {
      font-size: 56px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .text {
      font-size: 18px;
    }
    .link {
      cursor: pointer;
      color: #fd4e08;
      font-weight: 700;
    }
  }
</style>
