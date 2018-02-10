<template>
  <div>
    <div class="upper-bar">
      <span class="bar-btn"><img style="height: 30px;width: 30px" src="../../assets/menu.svg" alt="menu"></span>
      <span class="bar-btn" @click="clicked"><img style="height: 30px;width: 30px" src="../../assets/TV.svg" alt="TV"></span>
      <span class="bar-btn"><img style="height: 30px;width: 30px" src="../../assets/add.svg" alt="add"></span>
    </div>
    <div class="bottom-bar">
      <span class="bar-btn"><img style="height: 30px;width: 30px" src="../../assets/tag.svg" alt="tag"></span>
      <span class="bar-btn"><img style="height: 35px;width: 35px" src="../../assets/AZ.svg" alt="az"></span>
      <span class="bar-btn"><img style="height: 42px;width: 42px" src="../../assets/timeup.svg" alt="timeup"></span>
    </div>
    <div class="control-bar">
      <span class="bar-btn" @click="windowMinimize"><img style="height: 30px;width: 30px" src="../../assets/minus.svg" alt="menu"></span>
      <span class="bar-btn" @click="windowMaximize">
        <template v-if="windowMaximizeState">
          <img style="height: 30px;width: 30px" src="../../assets/square-double.svg" alt="MaximizeRestore">
        </template>
        <template v-else>
          <img style="height: 30px;width: 30px" src="../../assets/square.svg" alt="Maximize">
        </template>
      </span>
      <span class="bar-btn" @click="windowClose"><img style="height: 30px;width: 30px" src="../../assets/cross.svg" alt="add"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapActions } from 'vuex'
  const glob = require('glob');
  const ipc = require('electron').ipcRenderer;
  // options is optional

  export default {
    data () {
      return {
        switchOnColor: '#2a2a2a',
        switchOffColor: '#ffffff'
      }
    },
    components: {
    },
    mounted () {
      glob('f:/TV/**/*.mp4', {}, function (er, files) {
        console.log(er, files)
      })
    },
    computed: {
      ...mapGetters({
        switchOn: 'switchOn',
        windowMaximizeState: 'windowMaximize'
      }),
      bgStyle () {
        return {
          'background-color': this.switchOn ? this.switchOnColor : this.switchOffColor
        }
      }
    },
    methods: {
      ...mapActions({
        turnOnSwitch: 'turnOnSwitch',
        turnOffSwitch: 'turnOffSwitch',
        maximizeWindow: 'maximizeWindow',
        maximizeWindowRestore: 'maximizeWindowRestore'
      }),
      clicked () {
        if (this.switchOn) {
          this.turnOffSwitch()
        } else {
          this.turnOnSwitch()
        }
      },
      windowMinimize () {
        console.log('min');
        ipc.send('window-min')
      },
      windowMaximize () {
        console.log('max');
        if (!this.windowMaximizeState) {
          this.maximizeWindow()
        } else {
          this.maximizeWindowRestore()
        }
        ipc.send('window-max')
      },
      windowClose () {
        console.log('close');
        ipc.send('window-close')
      }
    }
  }
</script>

<style>
  .bar-btn{
    width: 47px;
    height: 47px;
    margin: auto;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    align-content: space-between;
    justify-content: center;
    cursor: pointer;
  }
  .圆角矩形_1_拷贝_2 {
    background-image: -moz-linear-gradient( -51deg, rgb(179,20,186) 0%, rgb(249,37,129) 50%, rgb(251,147,103) 100%);
    background-image: -webkit-linear-gradient( -51deg, rgb(179,20,186) 0%, rgb(249,37,129) 50%, rgb(251,147,103) 100%);
    background-image: -ms-linear-gradient( -51deg, rgb(179,20,186) 0%, rgb(249,37,129) 50%, rgb(251,147,103) 100%);

  }


  .upper-bar{
    background-image: -moz-linear-gradient( 0deg, rgb(249,37,129) 0%, rgb(179,20,186) 26%, rgb(82,142,252) 64%, rgb(67,170,251) 72%, rgb(51,198,250) 91%, rgb(153,225,251) 100%);
    background-image: -webkit-linear-gradient( 0deg, rgb(249,37,129) 0%, rgb(179,20,186) 26%, rgb(82,142,252) 64%, rgb(67,170,251) 72%, rgb(51,198,250) 91%, rgb(153,225,251) 100%);
    background-image: -ms-linear-gradient( 0deg, rgb(249,37,129) 0%, rgb(179,20,186) 26%, rgb(82,142,252) 64%, rgb(67,170,251) 72%, rgb(51,198,250) 91%, rgb(153,225,251) 100%);
    box-shadow: 0px 3px 27px 0px rgba(179, 20, 186, 0.57);
    position: fixed;
    left: 0;
    top: 0;
    width: 200px;
    height: 50px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    justify-content: center;
  }
  .bottom-bar {
    background-image: -moz-linear-gradient( 0deg, rgb(126,220,253) 0%, rgb(51,198,250) 5%, rgb(67,170,251) 18%, rgb(82,142,252) 24%, rgb(249,37,129) 63%, rgb(251,147,103) 100%);
    background-image: -webkit-linear-gradient( 0deg, rgb(126,220,253) 0%, rgb(51,198,250) 5%, rgb(67,170,251) 18%, rgb(82,142,252) 24%, rgb(249,37,129) 63%, rgb(251,147,103) 100%);
    background-image: -ms-linear-gradient( 0deg, rgb(126,220,253) 0%, rgb(51,198,250) 5%, rgb(67,170,251) 18%, rgb(82,142,252) 24%, rgb(249,37,129) 63%, rgb(251,147,103) 100%);
    box-shadow: 0px 3px 27px 0px rgba(179, 20, 186, 0.57);
    position: fixed;
    bottom: 0;
    right: 0;
    width: 200px;
    height: 50px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    justify-content: center;
  }
  .control-bar {
    background: transparent;
    position: fixed;
    top: 0;
    right: 0;
    width: 200px;
    height: 50px;
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    justify-content: center;
  }

</style>
