<template>
  <i
    :class="[prefix, name]"
    :style="{fontWeight:bold?'bold':'normal',color:iconColor,fontSize:fontSize,cursor:clickable?'pointer':'none'}"
    @click="$emit('click')"
  />
</template>

<script>
export default {
  name: 'WbIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: () => 16
    },
    bold: Boolean,
    clickable: Boolean,
    color: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    fontSize() {
      if (typeof this.size === 'string') {
        if (isNaN(+this.size)) {
          return this.size
        }
        return this.size + 'px'
      } else {
        return this.size + 'px'
      }
    },
    prefix() {
      if (this.name.startsWith('fa-')) {
        return 'fa'
      }
      return ''
    },
    iconColor() {
      if (this.color) {
        return this.color
      }
      const colors = {
        danger: '#e3504b',
        success: '#67c23a',
        primary: '#2772db',
        warning: '#e6a23c',
        info: '#909399'
      }
      return colors[this.type] || ''
    }
  }
}
</script>

