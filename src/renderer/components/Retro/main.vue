<template>
  <div id="wrapper">
    <tool-bars></tool-bars>

    <box-grid style="width: 100%"></box-grid>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapActions } from 'vuex'
  import boxGrid from './gridBoxes.vue'
  import toolBars from './toolBars.vue'

  export default {
    name: 'landing-page',
    data () {
      return {
        switchOnColor: '#2a2a2a',
        switchOffColor: '#ffffff'
      }
    },
    components: {
      boxGrid,
      toolBars
    },
    mounted () {},
    computed: {
      ...mapGetters({
        switchOn: 'switchOn'
      })
    },
    methods: {
      ...mapActions({
        turnOnSwitch: 'turnOnSwitch',
        turnOffSwitch: 'turnOffSwitch'
      })
    }
  }
</script>

<style>

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: sans-serif; }

  #wrapper {
    /*background:*/
      /*radial-gradient(*/
        /*ellipse at top left,*/
        /*rgba(255, 255, 255, 1) 40%,*/
        /*rgba(229, 229, 229, .9) 100%*/
      /*);*/
    background: linear-gradient(-51deg, rgb(251,147,103) 0%, rgb(249,37,129) 50%, rgb(179,20,186) 100%);
    height: 100vh;
    padding:0 0;
    width: 100vw;
  }


  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .menu-bar {
    width: 100%;
    height: 55px;
    background-color: transparent;
  }

</style>
