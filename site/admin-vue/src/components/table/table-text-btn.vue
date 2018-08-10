<template>
  <i-button
    class="table-text-btn"
    type="text"
    :size="size"
    @click="handleClick"
  >
    <slot></slot>
  </i-button>
</template>

<script>
  import { Button } from 'iview'
  export default {
    name: 'table-text-btn',
    props: {
      handleClick: {
        type: Function,
        default: () => {
          console.log('default')
        }
      },
      size: {
        type: String,
        default: 'small'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table-text-btn {
    box-shadow: none;
  }
</style>
