<template>
  <div>
      <nav class="light-strip-1 neon-light">

      </nav>
      <nav class="light-strip-2 neon-light">

      </nav>
      <nav class="light-strip-3 neon-light">
      </nav>
      <!--<div style="width: 120px;height: 120px;margin: 0 auto;position: relative; top: -100px; z-index: 11" >-->
          <!--<transition-->
                  <!--enter-active-class="zoomIn"-->
                  <!--leave-active-class="zoomOut"-->
                  <!--appear>-->
              <!--<img v-if="switchOn === false" class="animated" id="open" @click="openClick" src="../../assets/movie-icon.png" alt="" style="width: 120px;height: 120px;">-->
          <!--</transition>-->
          <!--<transition-->
                  <!--enter-active-class="zoomIn"-->
                  <!--leave-active-class="zoomOut"-->
                  <!--appear>-->
              <!--<img v-if="switchOn === true" class="animated"  id="close" @click="closeClick" src="../../assets/tv-icon.png" alt="" style="width: 120px;height: 120px;">-->
          <!--</transition>-->
      <!--</div>-->
      <div class="matrix-icon" :style="iconStyle" @click="iconClick" ></div>
  </div>
</template>

<script type="text/ecmascript-6">
  /*
   Only tested in Chrome!

   Todo:
   - Allow editing settings for the final color for both the opening and closing animation.
   - Cross browser support/testing
   */

  // init - draw canvas over the page and run the resize listener ✓
  // drawRect - draw a rectangle (x, y, width, height, fill) ✓
  // distributeRects - evenly spread rectangles (spawnX, spawnY, radius, elementCount, fill) ✓
  // spawnCircle - low level function to make transition (x, y, fill) ✓
  // open - higher level function to spawn the transition with predefined colors. ✓
  // close - spawns a new circle that clears the rects after it. (then runs a canvas clear to remove any artifacts) ✓
  // destroy - remove the canvas ✓
  // resizeHandler - does what it says on the tin
  // import randomColor from 'randomcolor' // import the randomColor script
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'landing-page',
    data () {
      return {
        width: 0,
        height: 0,
        rectWidth: 25,
        rectHeight: 25,
        speed: 25,
        canvas: null,
        ctx: null,
        cords: null,
        // switchOn: false,
        switching: false,
        switchOnColor: '#2a2a2a',
        switchOffColor: '#ffffff',
        neonColor: ['#fb9367', '#f92581', '#b314ba', '#528efc', '#33c6fa', '#528efc', '#b314ba', '#f92581', '#fb9367'],
        switchOnColorArr: [42, 42, 42, 255],
        switchOffColorArr: [255, 255, 255, 255]
      }
    },
    mounted () {
    },
    computed: {
      ...mapGetters({
        switchOn: 'switchOn'
      }),
      iconStyle () {
        if (this.switching) {
          if (this.switchOn) {
            return {
              'background-image': 'url("/src/renderer/assets/tv-animate.gif")'
            }
          } else {
            return {
              'background-image': 'url("/src/renderer/assets/movie-animate.gif")'
            }
          }
        } else {
          if (this.switchOn) {
            return {
              'background-image': 'url("/src/renderer/assets/tv-icon.png")'
            }
          } else {
            return {
              'background-image': 'url("/src/renderer/assets/movie-icon.png")'
            }
          }
        }
      }
    },
    methods: {
      ...mapActions({
        turnOnSwitch: 'turnOnSwitch',
        turnOffSwitch: 'turnOffSwitch'
      }),
      iconClick (e) {
        e.preventDefault()
        if (!this.switching) {
          this.switching = true
          this.init()
          var self = this
          if (!self.switchOn) {
            this.open(e, function () {
              self.switching = false
              self.turnOnSwitch()
              self.destroy()
              console.log('its on!')
            })
          } else {
            this.close(e, function () {
              self.switching = false
              self.turnOffSwitch()
              self.destroy()
              console.log('its off!')
            })
          }
        }
      },
      open (e, callback) {
        var rect = e.target.getBoundingClientRect()
        var cords = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
        var self = this

        this.spawnCircle(cords.x, cords.y, 'random', self.switchOnColorArr)

        setTimeout(function () {
          self.spawnCircle(cords.x, cords.y, self.switchOnColor, self.switchOnColorArr, callback)
        }, 100)
      },
      close (e, callback) {
        var rect = e.target.getBoundingClientRect()
        var cords = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
        var self = this

        this.spawnCircle(cords.x, cords.y, 'random', self.switchOffColorArr)

        setTimeout(function () {
          self.spawnCircle(cords.x, cords.y, self.switchOffColor, self.switchOffColorArr, callback)
        }, 100)
      },
      init () {
        this.width = window.innerWidth
        this.height = window.innerHeight
        var wid = Math.max(window.innerWidth * 0.02, 15)
        this.rectWidth = wid
        this.rectHeight = wid
        this.speed = wid
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.id = 'pixel-overlay'
        this.canvas.style.zIndex = 8
        this.canvas.style.top = 0
        this.canvas.style.left = 0
        this.canvas.style.position = 'fixed'

        document.body.appendChild(this.canvas)

        this.ctx.canvas.width = this.width
        this.ctx.canvas.height = this.height
      },
      drawRect (x, y, fill) {
        this.ctx.fillStyle = fill
        this.ctx.fillRect(x, y, this.rectWidth, this.rectHeight)
      },
      distributeRects (spawnX, spawnY, radius, elemCount, fill) {
        //    var width = this.width
        //    var height = this.height
        var angle = 0
        var step = (2 * Math.PI) / elemCount

        for (var i = 0; i < elemCount; i++) {
          var x = spawnX + radius * Math.cos(angle) - this.rectWidth / 2
          var y = spawnY + radius * Math.sin(angle) - this.rectHeight / 2
          this.drawRect(x, y, fill)
          angle += step
        }
      },
      spawnCircle (x, y, fill, finishColor, callback) {
        var count = 0
        var colorCount = 0
        var tempColor
        var offset = 0.5
        var self = this

        function draw (timestamp, finishColor, callback) {
          if (fill === 'random') {
            if (colorCount === 9) {
              colorCount = 0
            }
            // tempColor = randomColor({hue: 'purple'})
            tempColor = self.neonColor[colorCount]
            colorCount++
          } else {
            tempColor = fill
          }

          self.distributeRects(x, y, self.rectWidth * count * offset, 4 * count, tempColor)

          if (self.checkDone(finishColor)) {
            if (callback && typeof (callback) === 'function') callback()
          } else {
            count++
            requestAnimationFrame(function (timestamp) {
              draw(timestamp, finishColor, callback)
            })
          }
        }
        requestAnimationFrame(function (timestamp) {
          draw(timestamp, finishColor, callback)
        })
      },
      checkDone (finishColor) {
        var topLeftSensor = this.ctx.getImageData(0, 0, 1, 1).data
        var topRightSensor = this.ctx.getImageData(this.width - 1, 0, 1, 1).data
        var bottomRightSensor = this.ctx.getImageData(this.width - 1, this.height - 1, 1, 1).data
        var bottomLeftSensor = this.ctx.getImageData(0, this.height - 1, 1, 1).data
        var diff = topLeftSensor[0] + topRightSensor[0] + bottomRightSensor[0] + bottomLeftSensor[0] - finishColor[0] * 4 + topLeftSensor[1] + topRightSensor[1] + bottomRightSensor[1] + bottomLeftSensor[1] - finishColor[1] * 4 + topLeftSensor[2] + topRightSensor[2] + bottomRightSensor[2] + bottomLeftSensor[2] - finishColor[2] * 4 + topLeftSensor[3] + topRightSensor[3] + bottomRightSensor[3] + bottomLeftSensor[3] - finishColor[3] * 4
        diff = Math.abs(diff)
        if (diff < 10) {
          return true
        }
      },
      destroy () {
        var canvas = document.getElementById('pixel-overlay')
        canvas.parentNode.removeChild(canvas)
      }
    }
  }
</script>

<style>
    .light-strip-1 {
        z-index: 10;
        width: 100%;
        height: 5px;
        position: relative;
    }
    .light-strip-2 {
        z-index: 10;
        margin-top: 5px;
        width: 100%;
        height: 10px;
        position: relative;
    }
    .light-strip-3 {
        z-index: 10;
        margin-top: 5px;
        width: 100%;
        height: 20px;
        position: relative;
    }
    .matrix-icon {
        cursor: pointer;
        background-size: contain;
        z-index: 11;
        width: 120px;
        height: 120px;
        margin: 0 auto;
        top: -100px;
        position: relative;
    }
    .neon-light {
        background: linear-gradient(270deg, #fb9367, #f92581, #b314ba, #528efc, #33c6fa, #528efc, #b314ba, #f92581, #fb9367);
        background-size: 2000% 2000%;

        -webkit-animation: AnimationName 8s ease infinite;
        -moz-animation: AnimationName 8s ease infinite;
        animation: AnimationName 8s ease infinite;
    }
    @-webkit-keyframes AnimationName {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }
    @-moz-keyframes AnimationName {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }
    @keyframes AnimationName {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }
</style>
