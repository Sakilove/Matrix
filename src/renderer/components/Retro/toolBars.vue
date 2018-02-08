<template>
  <div>
    <div class="upper-bar">
      <span class="bar-btn"><i class="fa fa-lg fa-heart" style="height: 45px;width: 45px"></i></span>
      <span class="bar-btn"><i class="fa fa-lg fa-heart" style="height: 45px;width: 45px"></i></span>
      <span class="bar-btn"><i class="fa fa-lg fa-heart" style="height: 45px;width: 45px"></i></span>
    </div>
    <div class="bottom-bar">
      <span class="bar-btn"><i class="fa fa-lg fa-heart" style="height: 45px;width: 45px"></i></span>
      <span class="bar-btn"><i class="fa fa-lg fa-heart" style="height: 45px;width: 45px"></i></span>
      <span class="bar-btn"><i class="fa fa-lg fa-heart" style="height: 45px;width: 45px"></i></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapActions } from 'vuex'
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
    },
    computed: {
      ...mapGetters({
        switchOn: 'switchOn'
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
        turnOffSwitch: 'turnOffSwitch'
      })
    }
  }
</script>

<style>
  .bar-btn{
    width: 47px;
    height: 47px;
    margin: auto;
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
  }

</style>
