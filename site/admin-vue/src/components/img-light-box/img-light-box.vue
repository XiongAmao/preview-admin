<template>
  <div class="img-container">
    <Lightbox
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="handleHide"
    ></Lightbox>
  </div>
</template>

<script>
  import Lightbox from 'vue-easy-lightbox'
  import { mapState } from 'vuex'
  export default {
    name: 'img-light-box',
    components: {
      Lightbox
    },
    data () {
      return {

      }
    },
    methods: {
      handleHide() {
        this.$store.commit('app/hideLightBox')
      }
    },
    computed: {
      ...mapState('app', {
        visible: state => state.lightBoxVisible,
        imgs: state => state.lightBoxList,
        index: state => state.lightBoxIndex
      })
    }
  }
</script>

<style>

</style>
