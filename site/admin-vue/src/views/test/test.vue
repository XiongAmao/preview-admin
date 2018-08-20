<template>
  <div class="container">
    <testIframe
      class="iframe"
      ref="iframe"
      :src="rpSrc"
    ></testIframe>
    <div class="side-bar">
      <i-button @click="changeSrc">change src</i-button>
      <Tree :data="data" @on-select-change="handleSelect"></Tree>
    </div>

  </div>
</template>

<script>
  import { getIframe } from '@/api/test'
  import testIframe from './test-render.vue'

  export default {
    components: {
      testIframe
    },
    data() {
      return {
        rpSrc: '/rp/project1/中文/index.html',
        sw: true,
        data: [
          {
            title: 'parent 1',
            expand: false,
            children: [
              {
                title: 'parent 1-1',
                expand: true,
              },
              {
                title: 'parent 1-2',
                expand: true,
              }
            ]
          },
          {
            title: 'parent 2',
            expand: false,
            children: [
              {
                title: 'parent 2-1',
                path: '123123'
              },
              {
                title: 'parent 2-2',
              }
            ]
          }
        ]
      }
    },
    methods: {
      getIframe() {
        getIframe().then(res => {
          this.iframe = res
        })
      },
      inject() {
        this.html = this.iframe
      },
      handleSelect(val) {
        console.log(val)
      },
      changeSrc() {
        if (this.sw) {
          this.rpSrc = '/rp/project2/rp_resource2/index.html'
        } else {
          this.rpSrc = '/rp/project1/中文/index.html'
        }
        this.sw = !this.sw
      },
      expand() {

      }
    },
    computed: {
      query() {
        return this.$route.query
      }
    }
  }
</script>

<style scoped lang="scss">
  .iframe {
    height: 100vh;
    width: 100vw;
  }
  .container {
    position: relative;
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
