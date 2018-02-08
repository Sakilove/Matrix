<template>
  <div id="app">
    <test5></test5>
  </div>
</template>

<script>
  // import test1 from './components/Retro/RetroTransition.vue'
  // import test2 from './components/Retro/RetroMenu.vue'
  // import test3 from './components/Retro/NetflixStyle.vue'
  // import test4 from './components/Retro/BoxGrid.vue'
  import test5 from './components/Retro/main.vue'
  export default {
    name: 'matrix',
    components: { test5 }
  }
</script>

<style lang="scss">
  @import '~animate.css';
  .animated {
    animation-duration: .377s;
  }
  @import '~bulma';

  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome';
</style>
