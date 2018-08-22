<template>
  <span
    class="tree-btn"
    :class="{dim: dim, active: active}"
    @click="treeClickHandle"
  >{{title}}</span>
</template>

<script>
  export default {
    name: 'tree-btn',
    props: {
      treeClickHandle: {
        type: Function,
        default: () => () =>{}
      },
      title: {
        type: String,
        default: ''
      },
      dim: {
        type: Boolean,
        default: false
      },
      active: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .tree-btn {
    font-size: 14px;
    cursor: pointer;
    padding: 2px;
    transition: .3s ease;
    border: transparent 1px dotted;
    border-radius: 4px;

    &.dim {
      color: #999;
    }
    &.active {
      font-weight: 600;
      color: #509FF9;
    }
    &:hover {
      border: 1px dotted #aaa;
    }
  }
</style>
