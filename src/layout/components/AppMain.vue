<template>
  <div id="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>

<style lang="scss" scoped>
#app-main {
  position: relative;
  width: 100%;
  height:calc(100% - #{$menuHeight});
  overflow-y: auto;
  overflow-x: hidden;
  padding:25px;
}
</style>
