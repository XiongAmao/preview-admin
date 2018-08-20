<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      src: {
        type: String,
        default: '/404'
      },
      selectHandler: {
        type: Function
      }
    },
    methods: {
      loadHandler(event) {
        console.dir(this.$refs.iframe.contentDocument)
        const $sitemapTree = this.$refs.iframe.contentDocument.querySelector('.sitemapTree')
        $sitemapTree.addEventListener('click', (e) => {
          const tar = e.target
          let val = ''
          if (tar.className === 'sitemapPageLink') {
            val = tar.attributes.nodeurl.value
          }
          if (tar.parentElement.className === 'sitemapPageLink') {
            val = tar.parentElement.attributes.nodeurl.value
          }
          val = val.replace('.html', '')

        })
      }
    },
    render() {
      return (
        <iframe ref="iframe" src={this.src} onLoad={this.loadHandler}></iframe>
      )
    }
  }
</script>

<style scoped lang="scss">

</style>
