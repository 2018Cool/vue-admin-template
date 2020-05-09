<template>
  <div :class="classObj" class="app-wrapper">
    <app-header />
    <div class="content">
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <navbar />
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, AppHeader } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    AppHeader
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device
    }),
    classObj() {
      return {
        'hideSidebar': !this.sidebar.opened,
        'openSidebar': this.sidebar.opened,
        // withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .content{
      display: flex;
      width:100%;
      align-items: stretch;
      height: calc(100% - #{$headerHeight});
      overflow: hidden;
      position: relative;
    }
    .main-container{
      width: calc(100% - #{$sideBarWidth});
      height:100%;
      overflow: hidden;
      position: relative;
      background: $mainBg;
    }
  }
  .hideSidebar{
      .main-container {
        transition: width 0.28s;
        width: calc(100% - 54px);
        transform: translateZ(0);
      }
  }
  .openSidebar{
      .main-container {
         transition: width 0.28s;
         width: calc(100% - #{$sideBarWidth});
         transform: translateZ(0);
      }
   }

</style>
