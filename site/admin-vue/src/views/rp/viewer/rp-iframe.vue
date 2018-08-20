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
      }
    },
    methods: {
      loadHandler(event) {
        console.dir(this.$refs.iframe.contentDocument)
        const $sitemapTree = this.$refs.iframe.contentDocument.querySelector('.sitemapTree')
        $sitemapTree.addEventListener('click', (e) => {
          const tar = e.target
          let hash = ''
          if (tar.className === 'sitemapPageLink') {
            hash = tar.attributes.nodeurl.value
          }
          if (tar.parentElement.className === 'sitemapPageLink') {
            hash = tar.parentElement.attributes.nodeurl.value
          }
          if (hash) {
            hash = hash.replace('.html', '')
            this.$emit('hash-update', hash)
          }
        })
      }
    },
    render() {
      return (
        // display: block fix iframe 5px location
        <iframe height="100%" style={{display: 'block', border: 0}} ref="iframe" src={this.src} onLoad={this.loadHandler}></iframe>
      )
    }
  }
</script>

<style scoped lang="scss">

</style>
