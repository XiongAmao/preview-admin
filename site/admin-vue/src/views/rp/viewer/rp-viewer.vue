<template>
  <div class="container">
    <rp-iframe
      class="iframe"
      ref="iframe"
      :src="computedSrc"
      @hash-update="handleHashUpdate"
    ></rp-iframe>
    <sideSearchMenu></sideSearchMenu>
  </div>
</template>

<script>
  import rpIframe from './rp-iframe.vue'
  import sideSearchMenu from '@/components/side-search-menu/side-search-menu'

  export default {
    name: 'rp-viewer',
    components: {
      rpIframe,
      sideSearchMenu
    },
    data() {
      return {
        rpSrc: '',
        data: []
      }
    },
    methods: {
      handleSelect(val) {
        console.log(val)
      },
      handleHashUpdate(hash) {
        console.log(hash)
        this.$router.push({
          name: 'rp-viewer',
          query: {
            path: this.iframePath,
            hash: hash
          }
        })
      },
      expand() {

      }
    },
    computed: {
      iframePath() {
        return this.$route.query.path || ''
      },
      iframeHash() {
        return this.$route.query.hash || ''
      },
      computedSrc() {
        return `/rp/${this.iframePath}#g=1&p=${this.iframeHash}`
      }
    },
    created() {
      if (!this.iframePath) this.$router.push({ name: 'rp-list'})
    }
  }
</script>

<style scoped lang="scss">
  .iframe {
    height: 100%;
    width: 100%;
  }
  .container {
    position: relative;
    height: 100vh;
  }
  .side-bar {
    position: fixed;
    top: 50%;
    right: 0px;
    background: #fff;
    margin: 20px;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
