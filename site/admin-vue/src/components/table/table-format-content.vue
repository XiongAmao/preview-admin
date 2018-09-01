<template>
  <div class="div">
    {{ text }}
  </div>
</template>

<script>
  export default {
    props: {
      formatter: {
        type: Function,
        default: function(val) {
          return val
        }
      },
      params: {
        type: [String, Array],
        default: ''
      },
      value: {
        type: [String, Number, Array],
        default: ''
      }
    },
    name: 'table-format-content',
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {
      text() {
        return this.formatter(this.value, this.params)
      }
    }
  }
</script>

<style>

</style>
