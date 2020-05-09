<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" :toggle-click="toggleSideBar" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      // activeName: '',
      activeIndex: '1',
      // circleUrl: '../../.././assets/favicon.png',
      size: 'small',
      boxWidth: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'roles', // 权限(是否已经认证)
      'avatar', // 用户头像
      'name' // 用户名字
    ])
  },
  watch: {
    '$route.name': {
      handler(newval, oldval) {
        const route = ['clist', 'ticket', 'dgather', 'sdetail']
        if (newval === 'cloud') {
          this.activeIndex = '1'
        } else if (route.indexOf(newval) !== -1) {
          this.activeIndex = '2'
        }
      },
      immediate: true
    }
  },
  mounted() {
    // const width = this.$refs.box.offsetWidth
    // if (width > 100) {
    //   this.boxWidth = true
    // }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

<style lang="scss" >
.navbar {
  height: $menuHeight;
  overflow: hidden;
  background: #fff;
  box-shadow: rgba(0, 0, 0, .2) 0 1px 5px;
  position:relative;
  z-index: 10;

  .hamburger-container {
    height: 100%;
    line-height: $menuHeight;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }
}
</style>

