<template>
  <div class="side-search-menu" :class="{visual: visual}">
    <div class="search-wrapper">
      <i-input v-model="searchVal" enter-button placeholder="Enter something..." />
    </div>
    <div class="tree-wrapper">
      <i-tree :data="list" :render="renderFn" @on-select-change="handleSelect"></i-tree>
    </div>
    <div class="hide-btn" @click="hide">
      <div>快</div>
      <div>捷</div>
      <div>菜</div>
      <div>单</div>
      <span></span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        visual: false,
        searchVal: ''
      }
    },
    methods: {
      handleSelect(val) {
        console.log(val)
      },
      renderFn(h, { root, node, data}) {
        return (
          <span
            style={{
              cursor: 'pointer'
            }}
            onClick={this.handleTreeClick(data.title)}
          >{data.title}</span>
        )
      },
      handleTreeClick (title) {
        return () => {
          console.log(title)
        }
      },
      hide() {
        this.visual = !this.visual
      }
    },
    created() {
      this.list = [
        {
          title: 'project1',
          expand: false,
          children: [
            {
              title: '1.1',
              expand: false
            },
            {
              title: '阿凡达撒扥啊',
              expand: false
            }
          ],
        },
        {
          title: 'project1',
          expand: false,
          children: [
            {
              title: '1.1',
              expand: false
            },
            {
              title: '阿凡达撒扥啊',
              expand: false
            }
          ],
        }
      ]
    }
  }
</script>

<style scoped lang="scss">
  .side-search-menu {
    position: fixed;
    top: 50%;
    right: -200px;
    min-width: 200px;
    min-height: 200px;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #ccc;
    transition: .3s ease-in-out;

    &.visual {
      right: 0px;
    }
  }
  .search-wrapper {
    padding: 12px;
  }

  .tree-wrapper {
    padding: 12px;
  }

  .hide-btn {
    cursor: pointer;
    position: absolute;
    padding:16px;
    left: -45px;
    top: -1px;
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: #fff;
  }

</style>
