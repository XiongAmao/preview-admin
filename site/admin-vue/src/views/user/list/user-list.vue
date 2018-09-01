<template>
  <div class="container">
    <i-table
      :columns="columns"
      :data="list"
      :loading="loading"
      stripe
      border
    />
  </div>
</template>

<script>
  // import TableTextBtn from '@/components/table/table-text-btn'
  import TableFormatContent from '@/components/table/table-format-content'
  import { getUserList } from '@/api/user'

  export default {
    components: {

    },
    data () {
      return {
        list: [],
        columns: [
          { title: '账号', key: 'username', fixed: 'left', width: 160 },
          {
            title: '后台权限',
            render: (h, params) => {
              return (
                <TableFormatContent
                  value={params.row.permission}
                  formatter={this.formatPermission}
                />
              )
            }
          },
          {
            title: 'rp权限',
            render: (h, params) => {
              return (
                <TableFormatContent
                  value={params.row.rpList}
                  formatter={this.formatRpList}
                />
              )
            }
          }
        ],
        loading: false
      }
    },
    methods: {
      getList () {
        this.loading = true
        getUserList().then(res => {
          this.loading = false
          this.list = res.list
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      },
      formatPermission (arr) {
        const map = {
          all: '全部权限',
          rp: 'rp管理',
          user: '账号管理',
          sketch: 'sketch管理'
        }

        const result = arr.map(e => {
          return map[e]
        })
        return result.join(',')
      },
      formatRpList (arr) {
        if (arr.some(e => e === 'all')) {
          return '全部权限'
        }
        return arr.join(',')
      }
    },
    created () {
      this.getList()
    }
  }
</script>

<style>

</style>
