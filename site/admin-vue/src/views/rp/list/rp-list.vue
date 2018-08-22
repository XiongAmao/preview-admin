<template>
  <div class="container">
    <i-row :gutter="16" type="flex" justify="start">
      <i-col
        v-for="(item, index) in list" :key="index"
        :xs="12"
        :md="8"
        :lg="6"
      >
        <i-card class="card">
          <p slot="title" class="title">项目：{{ item.projectName}} <Icon type="ios-folder-outline" /></p>
          <div
            class="link"
            v-for="(subItem, idx) in item.children"
            :key="idx"
          >
            <a href="#" slot="extra" @click.prevent="handleLinkClick(subItem.path)">
              <Icon type="ios-document-outline" />
              {{ subItem.subName }}
            </a>
          </div>
        </i-card>
      </i-col>
    </i-row>
  </div>
</template>

<script>
  import rpApi from '@/api/rp'
  export default {
    data() {
      return {
        list: [1,2,3,4,5,6,7]
      }
    },
    methods: {
      getList() {
        rpApi.getRpList().then(res => {
          this.list = res.list
        })
      },
      handleLinkClick(path) {
        this.$router.push({
          name: 'rp-viewer',
          query: {
            path: path,
            hash: ''
          }
        })
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style scoped lang="scss">
  .card {
    margin-bottom: 16px;
    .title {
      font-size: 16px;
    }
    .link {
      line-height: 32px;
      font-size: 16px;

      span{
        cursor: pointer;
        &:hover {
          color: #509FF9;
        }
      }
    }
  }
</style>
