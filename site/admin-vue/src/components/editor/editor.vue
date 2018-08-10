<template>
  <div class="editor-container">
    <div ref="toolbar" class="toolbar"></div>
    <div ref="editor" class="text"></div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import xss from 'xss'
  import { uploadFile } from '@/api/file'

  export default {
    name: 'Editor',
    props: {
      content: {
        type: String,
        default: ''
      },
      editable: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        editor: null,
        _info:'',
        firstLoad: false,
        token: this.$store.state.user.token
      }
    },
    methods: {
      setEditor () {
        const editor = new E(this.$refs.toolbar, this.$refs.editor)
        // TODO: 定制化字号 等等
        editor.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'undo',  // 撤销
          'redo'  // 重复
        ]
        editor.customConfig.pasteFilterStyle = true // style过滤器
        editor.customConfig.uploadImgMaxLength = 1 // 最大图片上传数量
        editor.customConfig.uploadImgShowBase64 = false // 不启用bs64
        editor.customConfig.customUploadImg = this.uploadImg // 自定义上传
        editor.customConfig.customAlert = this.alertImgUpload // 错误提示
        editor.customConfig.onchange = this.onEditorTxtChange
        editor.create() // 创建编辑器
        editor.txt.html(this.content)  // 初始化内容
        editor.$textElem.attr('contenteditable', this.editable)  // 初始化可编辑状态
        this.editor = editor
      },
      onEditorTxtChange(html) {
        // this._info = xss(html)
        let content = ''
        // 处理空白的情况
        if (html !== '<p><br></p>') {
          content = html
        }
        this._info = content
        this.$emit('change', content)
      },
      uploadImg(files, insert) {
        let formData = new FormData()
        formData.append('file', files[0])
        uploadFile(formData).then(res => {
          insert(res.url)
        })
      },
      alertImgUpload (info) {
        this.$Notice.error({
          desc: info
        });
      }
    },
    watch: {
      // 只用于加载文章，当加载完后，文章由编辑器内部处理，否则会丢失撤回、重做功能
      content(val) {
        if (!this.firstLoad) {
          this.editor.txt.html(val)
          this.firstLoad = true
        }
      },
      editable(val) {
        this.editor.$textElem.attr('contenteditable', val)
      }
    },
    mounted() {
      this.setEditor()
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
  .editor-container {
    border: 1px solid #ccc;
  }
  .toolbar {
    border-bottom: 1px solid #ccc;
  }
  .text {
    height: 400px;
  }
</style>
