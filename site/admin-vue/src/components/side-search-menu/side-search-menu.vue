<template>
  <div class="side-search-menu" :class="{visual: visual}">
    <div class="content">
      <div class="info-wrapper">
        当前项目: {{ iframePath.split('/')[1] + ' / ' + iframePath.split('/')[2] }}
      </div>
      <div class="search-wrapper">
        <i-input
          :value="searchVal"
          enter-button
          placeholder="搜索目录..."
          suffix="ios-search"
          @on-change="handleSearchInputChange"
        />
      </div>

      <div class="tree-wrapper">
        <i-tree :data="list" :render="renderFn"></i-tree>
      </div>
      <Divider style="margin: 8px"></Divider>
      <div class="content-btn-wrapper">
        <i-button type="info" long @click="backToList">返回主页</i-button>
      </div>
    </div>
    <div class="hide-btn" @click="hide">
      <i-icon type="md-menu" size="14"></i-icon>
      <div>目</div>
      <div>录</div>
      <span></span>
    </div>
  </div>
</template>

<script>
  import rpApi from '@/api/rp'
  import TreeBtn from './components/tree-btn.vue'
  import debounce from 'lodash/debounce'
  // TODO: 适配sketch 页面
  export default {
    components: {
      TreeBtn
    },
    data() {
      return {
        rawList: [],
        visual: false,
        searchVal: ''
      }
    },
    methods: {
      renderFn(h, { root, node, data}) {
        const title = data.projectName || data.subName
        return (
          <TreeBtn
            dim={data.dim}
            title={title}
            active={data.active}
            treeClickHandle={this.handleTreeClick(node, data)}
          />
        )
      },
      handleTreeClick (node, data) {
        return () => {
          const nk = node.nodeKey

          if (data.projectName) {
            this.list.map(node => {
              if (node.nodeKey === nk) { node.expand = !node.expand }
            })
          } else {
            this.$router.push({
              name: 'rp-viewer',
              query: { path: data.path, hash: '' }
            })
          }
        }
      },
      hide() {
        this.visual = !this.visual
      },
      getList() {
        rpApi.getRpList().then(res => {
          this.rawList = res.list
        })
      },
      handleSearchInputChange: debounce(
        function (e) {
          this.searchVal = e.target.value
        }, 300, {leading: false}
      ),
      backToList() {
        this.$router.push({
          name: 'rp-list'
        })
      }
    },
    computed: {
      iframePath() {
        return this.$route.query.path
      },
      originalList () {
        return this.rawList.map(i => {
          const children = i.children.map(e => {
            const active = e.path === this.iframePath
            return { subName: e.subName, path: e.path, expand: false, active }
          })
          const expand = children.some(e => {
            return e.active
          })
          return { expand: expand, children, projectName: i.projectName }
        })
      },
      list () {
        const val = this.searchVal
        if (!val) return Array.from(this.originalList)

        const reg = new RegExp(val)
        const arr = this.originalList.map(e => {
          let p = e.projectName
          if(reg.test(p)) {
            return Object.assign({}, e, { expand: true })
          } else {
            const match = e.children.some(i =>  reg.test(i.subName))
            if (match) {
              return Object.assign({}, e, { expand: true, dim: true })
            }
          }
        }).filter(e => e)
        return arr
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style scoped lang="scss">
  .side-search-menu {
    box-sizing: border-box;
    position: fixed;
    top: 30%;
    right: -220px;
    width: 260px;
    min-height: 120px;
    background: #F6F9FA;
    border-radius: 6px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #ccc;
    transition: .3s ease-in-out;

    &.visual {
      right: -1px;
    }
  }

  .content {
    padding-left: 40px;
  }

  .info-wrapper {
    padding: 12px 12px 0;
  }
  .search-wrapper {
    padding: 12px 12px 0;
  }

  .tree-wrapper {
    padding: 12px;
    margin-bottom: 16px;
  }
  .content-btn-wrapper {
    padding: 8px 4px;
  }
  .footer-btn {
    position: absolute;
    bottom: -32px;
    right: 120px;
  }
  .hide-btn {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;
    width: 40px;
    left: 0px;
    top: 0;
    height: 100%;
    border-right: 1px solid #ccc;
    transition: .3s ease;

    &:hover {
      color: #fff;
      background: #00a1d6;
    }
  }
</style>
