<template>
  <div :class="{fullscreen:fullscreen}" :style="{width:containerWidth}" class="tinymce-container">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <editorImage ref="uploadImg" color="#1890ff" @successCBK="imageSuccessCBK" />
  </div>
</template>

<script>

import editorImage from './components/editorImage'
import plugins from './plugins'
import toolbar from './toolbar'
export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    extendedValidElements: {
      type: String,
      default: ''
    },
    setupFunc: {
      type: Function,
      default: () => {}
    },
    menubar: {
      type: String,
      default: ''
      // default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      isShow: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN'
      }
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.hasChange = false
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        language: 'zh_CN',
        selector: `#${this.tinymceId}`,
        height: this.height,
        image_advtab: true,
        extended_valid_elements: this.extendedValidElements,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        branding: false, // 是否禁用“Powered by TinyMCE”
        menubar: this.menubar, // 顶部菜单栏显示
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        font_formats: `
                      微软雅黑=微软雅黑;
                      宋体=宋体;
                      黑体=黑体;
                      仿宋=仿宋;
                      楷体=楷体;
                      隶书=隶书;
                      幼圆=幼圆;
                      Andale Mono=andale mono,times;
                      Arial=arial, helvetica,
                      sans-serif;
                      Arial Black=arial black, avant garde;
                      Book Antiqua=book antiqua,palatino;
                      Comic Sans MS=comic sans ms,sans-serif;
                      Courier New=courier new,courier;
                      Georgia=georgia,palatino;
                      Helvetica=helvetica;
                      Impact=impact,chicago;
                      Symbol=symbol;
                      Tahoma=tahoma,arial,helvetica,sans-serif;
                      Terminal=terminal,monaco;
                      Times New Roman=times new roman,times;
                      Trebuchet MS=trebuchet ms,geneva;
                      Verdana=verdana,geneva;
                      Webdings=webdings;
                      Wingdings=wingdings,zapf dingbats`,

        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
          editor.ui.registry.addIcon('upload', '<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 8.999l-.352.015c-.824-2.375-3.312-4.015-5.898-4.015-3.309 0-6.25 2.69-6.25 6v.126c-1 .445-2.75 2.014-2.75 3.875 0 2.206 2.044 4 4.25 4h11c2.757 0 5-2.244 5-5s-2.243-5.001-5-5.001zm0 8.001h-4.5v-3.794l2.146 2.146c.098.099.226.146.354.146s.256-.049.354-.146c.195-.194.195-.512 0-.707l-2.998-3-.164-.107c-.123-.051-.26-.051-.383 0l-.162.107-3 3c-.194.195-.194.513 0 .707.099.099.227.146.354.146s.256-.049.354-.146l2.145-2.146v3.794h-5.5c-1.104 0-2-.896-2-2s.896-2 1.908-2.005l1.422.015-.248-1.201c-.055-.264-.082-.536-.082-.809 0-2.206 1.794-4 4-4 1.951 0 3.604 1.402 3.93 3.334l.187 1.102 1.073-.306c.312-.089.569-.13.812-.13 1.653 0 3 1.346 3 3s-1.348 3-3.002 3z"/></svg>')
          editor.ui.registry.addButton('customUploadImgButton', {
            icon: 'upload',
            tooltip: '上传图片',
            onAction: function(_) {
              _this.$refs['uploadImg'].show()
            }
          })

          if (typeof _this.setupFunc === 'function') {
            _this.setupFunc(editor)
          }

          // editor.ui.registry.addMenuButton('customVarButton', {
          //   text: '插入变量',
          //   // icon: 'insert-time',
          //   // tooltip: '插入变量',
          //   fetch: function(callback) {
          //     var items = [
          //       {
          //         type: 'menuitem',
          //         text: '插入姓名变量',
          //         onAction: function() {
          //           editor.insertContent('<span>@{name}</span>')
          //         }
          //       }
          //       // {
          //       //   type: 'nestedmenuitem',
          //       //   text: 'Menu item 2',
          //       //   icon: 'user',
          //       //   getSubmenuItems: function() {
          //       //     return [
          //       //       {
          //       //         type: 'menuitem',
          //       //         text: 'Sub menu item 1',
          //       //         icon: 'unlock',
          //       //         onAction: function() {
          //       //           editor.insertContent('&nbsp;<em>You clicked Sub menu item 1!</em>')
          //       //         }
          //       //       },
          //       //       {
          //       //         type: 'menuitem',
          //       //         text: 'Sub menu item 2',
          //       //         icon: 'lock',
          //       //         onAction: function() {
          //       //           editor.insertContent('&nbsp;<em>You clicked Sub menu item 2!</em>')
          //       //         }
          //       //       }
          //       //     ]
          //       //   }
          //       // }
          //     ]
          //     callback(items)
          //   }
          // })

          // var toTimeHtml = function(date) {
          //   return '<time datetime="' + date.toString() + '">' + date.toDateString() + '</time>'
          // }

          // editor.ui.registry.addButton('customResourcesButton', {
          //   // icon: 'insert-time',
          //   // tooltip: '插入素材',
          //   text: '插入素材',
          //   disabled: false,
          //   onAction: function(_) {
          //     editor.insertContent(toTimeHtml(new Date()))
          //   }
          //   // onSetup: function(buttonApi) {
          //   //   var editorEventCallback = function(eventApi) {
          //   //     buttonApi.setDisabled(eventApi.element.nodeName.toLowerCase() === 'time')
          //   //   }
          //   //   editor.on('NodeChange', editorEventCallback)

          //   //   /* onSetup should always return the unbind handlers */
          //   //   return function(buttonApi) {
          //   //     editor.off('NodeChange', editorEventCallback)
          //   //   }
          //   // }
          // })

          // editor.ui.registry.addButton('customPreviewButton', {
          //   // icon: 'insert-time',
          //   // tooltip: '插入素材',
          //   text: '预览',
          //   disabled: false,
          //   onAction: function(_) {

          //   }
          // })
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }
      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img src="${v.src}" cos-src="${v.cosSrc}"  height="${v.height}" width ="${v.width}" />`)
      })
    }
  }
}
</script>

<style lang="scss">

.tox-silver-sink{
  z-index: 5000 !important;
}
.tox-fullscreen .tox.tox-tinymce-aux {
 z-index: 10001 !important;
}
.tox .tox-dialog-wrap__backdrop{
  background-color: rgba(0,0,0,.5) !important;
}
.tinymce-container {
  position: relative;
  line-height: normal;
  .tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
}
.fullscreen .editor-custom-btn-container {

  position: sticky;
}
.editor-upload-btn {
  display: inline-block;
}
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}

</style>
