<template>
  <div>
    <div>
      <i-button @click="getIframe">try me</i-button>
      <i-button @click="inject">inject</i-button>
    </div>
    <iframe ref="iframe" src="/rp/some-project/1.1/project/index.html"></iframe>
  </div>

</template>

<script>
  import { getIframe } from '@/api/test'
  export default {
    data() {
      return {
        iframe: '',
        html: ''
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
      }
    }
  }
</script>

<style>

</style>
