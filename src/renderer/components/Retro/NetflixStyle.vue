<template>
  <div>
    <input class="retrigger" type="radio" name="rerun" id="retrigger--1"/>
    <input class="retrigger" type="radio" name="rerun" id="retrigger--2" checked="checked"/>
    <div class="buttons">
      <label class="button button--1" for="retrigger--1">PLAY AGAIN</label>
      <label class="button button--2" for="retrigger--2">PLAY AGAIN</label>
    </div>
    <div class="logo"><span>N </span><span>E </span><span>T</span><span>F</span><span>L</span><span>I</span><span>X</span></div>
    <div class="logo">
      <span class="card-box">

      </span>
      <span class="card-box">

      </span>
      <span class="card-box">

      </span>
      <span class="card-box">

      </span>
      <span class="card-box">

      </span>
      <span class="card-box">

      </span>
      <span class="card-box">

      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        datas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        switchOnColor: '#2a2a2a',
        switchOffColor: '#d5d5d5'
      }
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

<style lang="scss">
  /// Create the same keyframes twice (for retrigger in pure CSS)
  /// @author Gregor Adams
  /// @param  {Keyword} $name - name of the animation (will be suffixed with --1 and --2)
  @mixin double-keyframes($name) {
    // write the keyframe rules to the document root
    @at-root {
      // write the same keyframes twice
      @for $i from 1 through 2 {
        $keyframe-name: unquote($name + "--" + $i);

        @keyframes #{$keyframe-name} {
          @content;
        }
      }
    }
  }

  /// Create a 3d-shadow in a certain direction
  /// @author Gregor Adams
  /// @param  {Number}        $depth - length of the shadow
  /// @param  {Unit}          $color - color of the shadow
  /// @param  {Unit}          $x     - step to next shadow on the x axis
  /// @param  {Unit}          $y     - step to next shadow on the y axis
  /// @param  {Unit}          $blur  - blur of the shadow
  /// @param  {Color|false}   $mix   - optinally add a color to mix in
  /// @return {List}          - returns a text-shadow
  @function d3($depth, $color, $x: 1px, $y: 1px, $blur: 0, $mix: false) {
    $shadow: ();

    @for $i from 1 through $depth {
      // append to the existing shadow
      @if type-of($mix) != 'color' {
        $shadow: append($shadow, round($i * $x) round($i * $y) $blur $color, comma);

      } @else {
        $shadow: append($shadow, round($i * $x) round($i * $y) $blur mix($mix,$color,0.3%*$i), comma);
      }
    }

    @return $shadow;
  }

  // options

  $c_fg:         #f00;
  $c_bg:         #fff;
  $c_3d:         #f2f2f2;
  $c_shadow:     #dadada;
  $c_shadow-mix: #6998da;

  $google-font: Oswald; // should be a google font
  $font-weight: 700;
  $letters: 7;


  // fonts
  @import url(https://fonts.googleapis.com/css?family=#{$google-font}:#{$font-weight});

  $font-family: $google-font, Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  // basic styles
  html,
  body {
    // force full viewport size
    height: 100%;
    width: 100%;
    // disable scrolling
    overflow: hidden;
  }

  body {
    // remove the body margin
    margin: 0;
    // create a flex-box model
    display: flex;
    flex-flow: row wrap;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }

  // hide the radios that allow us to retrigger the animation
  .retrigger {
    position: absolute;
    left: -5em;
    opacity: 0;
  }

  // the section containing the retrigger button
  .buttons {
    flex: 0 0 auto;
    height: 2em;
    line-height: 2em;
    background: $c_bg;
    text-align: center;
    cursor: pointer;
    user-select: none;

    // the labels are disguised as buttons
    .button {
      padding: 0.3em 1em;
      font-family: $font-family;
      color: $c_fg;
      font-size: 1.3em;
      display: none;
      cursor: pointer;
      border: 2px solid $c_fg;
      &:hover {
        color: $c_bg;
        background: $c_fg;
      }
      // display the label for the unchecked input
      @for $i from 1 through 2 {
        &--#{$i} {
          #retrigger--#{$i % 2 + 1}:checked ~ & {
            display: block;
          }
        }
      }
    }
  }

  // the logo area
  .logo {
    // create a flex-box model
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    // set the perspective
    perspective: 1000px;
    perspective-origin: 50% 0%;
    // define fonts;
    font-size: 8em;
    font-family: $font-family;
    color: $c_bg;
    // scale the logo
    transform: scaleY(0.8);
  }
  .card-box {
    background-color: $c_bg;
    width: 192px;
    height: 108px;
    margin-right: 50px;
  }

  // animation for the color
  @include double-keyframes("color") {
    0% {
      color: $c_bg;
    }
    100% {
      color: $c_fg;
    }
  }

  // the letters
  span {
    // enable webkit GPU rendering
    -webkit-backface-visibility: hidden;
    // animation settings
    animation-fill-mode: forwards;
    animation-timing-function: ease-in, ease-out, linear;

    // handle each letter separately
    @for $i from 1 through $letters {
      $offset: $i - ceil($letters / 2);
      // $trans: if($offset > 0, -45deg, 45deg);
      // $sc1: 95.9;
      // $sc2: 126.2;
      // $sc3: 116.2;
      // $sc4: 105.9;
      $shadowDepth1: 15;
      $shadowDepth2: 30;

      &:nth-child(#{$i}) {
        $del: 1s + 0.1s * $i;
        $maxdel: 1s + 0.1s * $letters;
        $dur: 1s + 0.05s * $i;
        $maxdur: 1s + 0.05s * $letters;
        animation-delay: $del, $maxdel + $maxdur, $maxdel + $maxdur + 0.4s;
        animation-duration: $dur, 3s, 0.1s;

        // allow to run the animation again
        @for $j from 1 through 2 {
          #retrigger--#{$j}:checked ~ .logo & {
            animation-name: in_#{$i}--#{$j}, out_#{$i}--#{$j}, color--#{$j};
          }
        }

        // trans/de-form the letters
        transform-origin: 50% + 50%/$offset 200%;

      }

      // the animation magic
      @include double-keyframes("in_" + $i) {
        0% {
          transform: scale(1, 1)
                  // if($offset == 0, scale(1, 1), scale($sc1 - abs($offset) * 10, 1))
                  // if($offset == 0, translatey(0%), null);
                   if($offset == 0, translatey(0%), translatey(0%));
          text-shadow:
                  d3($shadowDepth1, rgba($c_3d, 0), 0, 0),
                  d3($shadowDepth2, rgba($c_shadow, 0), 0, 0);
          box-shadow:
                  d3($shadowDepth1, rgba($c_3d, 0), 0, 0),
                  d3($shadowDepth2, rgba($c_shadow, 0), 0, 0);
        }

        50% {
          transform: scale(1.2, 1.2)
                  // if($offset == 0, scale(1.2, 1.2), scale($sc2 - abs($offset) * 10, 1.2))
                  // if($offset == 0, translatey(-16%), null);
                  if($offset == 0, translatey(-16%), translatey(0%));
          text-shadow:
                  d3($shadowDepth1, $c_3d, if($offset == 0, 0, -0.25px * $offset), 0),
                  d3($shadowDepth2, $c_shadow, 1px, 3px, 3px, $c_shadow-mix);
          box-shadow:
                  d3($shadowDepth1, $c_3d, if($offset == 0, 0, -0.25px * $offset), 0),
                  d3($shadowDepth2, $c_shadow, 1px, 3px, 3px, $c_shadow-mix);
        }

        100% {
          transform: scale(1.1, 1.1)
                  // if($offset == 0, scale(1.1, 1.1), scale($sc3 - abs($offset) * 10, 1.1))
                  // if($offset == 0, translatey(-12%), null);
                  if($offset == 0, translatey(-12%), translatey(0%));
          text-shadow:
                  d3($shadowDepth1, $c_3d, if($offset == 0, 0, -0.25px * $offset), 0),
                  d3($shadowDepth2, $c_shadow, 1px, 3px, 3px, $c_shadow-mix);
          box-shadow:
                  d3($shadowDepth1, $c_3d, if($offset == 0, 0, -0.25px * $offset), 0),
                  d3($shadowDepth2, $c_shadow, 1px, 3px, 3px, $c_shadow-mix);
        }
      }

      @include double-keyframes("out_" + $i) {
        0% {
          transform: scale(1.1, 1.1)
                  // if($offset == 0, scale(1.1, 1.1), scale($sc3 - abs($offset) * 10, 1.1))
                  // if($offset == 0, translatey(-12%), null);
                  if($offset == 0, translatey(-12%), translatey(0%));
          text-shadow:
                  d3($shadowDepth1, $c_3d, if($offset == 0, 0, -0.25px * $offset), 0),
                  d3($shadowDepth2, $c_shadow, 1px, 3px, 3px, $c_shadow-mix);
          box-shadow:
                  d3($shadowDepth1, $c_3d, if($offset == 0, 0, -0.25px * $offset), 0),
                  d3($shadowDepth2, $c_shadow, 1px, 3px, 3px, $c_shadow-mix);
        }

        20% {
          transform: scale(1.05, 1.05)
                  // if($offset == 0, scale(1.05, 1.05), scale($sc4 - abs($offset) * 10, 1.05))
                  // if($offset == 0, translatey(-7%), null);
                  if($offset == 0, translatey(-7%), translatey(0%));
          text-shadow:
                  d3($shadowDepth1, rgba($c_3d, 0), 0, 0),
                  d3($shadowDepth2, rgba($c_shadow, 0), 0, 0);
          box-shadow:
                  d3($shadowDepth2, rgba($c_3d, 0), 0, 0),
                  d3($shadowDepth2, rgba($c_shadow, 0), 0, 0);
        }

        100% {
          transform: scale(1, 1)
                  // if($offset == 0, scale(1, 1), scale($sc1 - abs($offset) * 10, 1))
                  // if($offset == 0, translatey(0%), null);
                  if($offset == 0, translatey(0%), translatey(0%));
          text-shadow:
                  d3($shadowDepth1, rgba($c_3d, 0), 0, 0),
                  d3($shadowDepth2, rgba($c_shadow, 0), 0, 0);
          box-shadow:
                  d3($shadowDepth1, rgba($c_3d, 0), 0, 0),
                  d3($shadowDepth2, rgba($c_shadow, 0), 0, 0);
        }
      }
    }
  }





</style>
