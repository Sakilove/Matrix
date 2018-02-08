<template>
  <div>
    <div class="fluid-container">
      <div class="buttons">
        <label class="button button--1" @click="clicked">PLAY AGAIN</label>
      </div>
      <div >
          <transition-group
                  name="staggered-fade"
                  class="sites"
                  v-on:before-enter="beforeEnter"
                  v-on:enter="enter"
          >

            <a
                    class="long-shadow"
                    v-if="!switchOn"
                    v-for="(item, index) in computedList"
               v-bind:key="item.msg"
               v-bind:data-index="index"
                    id="Netflix" href="https://Netflix.com">
            </a>

          </transition-group>
        <transition-group
                name="staggered-fade"
                class="sites"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
        >

          <a
                  class="long-shadow"
                  v-if="switchOn"
                  v-for="(item, index) in computedList"
                  v-bind:key="item.msg"
                  v-bind:data-index="index"
                   href="https://Netflix.com">
          </a>

        </transition-group>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapActions } from 'vuex'
  function addClass (obj, cls) {
    var objClass = obj.className
    // 获取 class 内容.
    var blank = (objClass !== '') ? ' ' : ''
    // 判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    var added = objClass + blank + cls
    // 组合原来的 class 和需要添加的 class.
    obj.className = added
    // 替换原来的 class.
  }
  function hasClass (obj, cls) {
    var objClass = obj.className
    // 获取 class 内容.
    return (objClass.indexOf(cls) !== -1)
  }
  function removeClass (obj, cls) {
    var objClass = ' ' + obj.className + ' '
    // 获取 class 内容, 并在首尾各加一个空格. ex) 'abc        bcd' -> ' abc        bcd '
    objClass = objClass.replace(/(\s+)/gi, ' ')
    // 将多余的空字符替换成一个空格. ex) ' abc        bcd ' -> ' abc bcd '
    var removed = objClass.replace(' ' + cls + ' ', ' ')
    // 在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, '')
    // 去掉首尾空格. ex) 'bcd ' -> 'bcd'
    obj.className = removed
    // 替换原来的 class.
  }
  export default {
    data () {
      return {
        datas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        switchOnColor: '#2a2a2a',
        switchOffColor: '#d5d5d5',
        query: '',
        list: [
          { msg: 'Bruce Lee' },
          { msg: 'Jackie Chan' },
          { msg: 'Chuck Norris' },
          { msg: 'Jet Li' },
          { msg: 'Kung Fury' }
        ]
      }
    },
    mounted () {
    },
    computed: {
      ...mapGetters({
        switchOn: 'switchOn'
      }),
      computedList: function () {
        var vm = this
        return this.list.filter(function (item) {
          return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
        })
      }
    },
    methods: {
      ...mapActions({
        turnOnSwitch: 'turnOnSwitch',
        turnOffSwitch: 'turnOffSwitch'
      }),
      clicked () {
        if (this.switchOn) {
          this.turnOffSwitch()
        } else {
          this.turnOnSwitch()
        }
      },
      beforeEnter: function (el) {},
      enter: function (el, done) {
        if (!this.switchOn) {
          if (!hasClass(el, 'shadowIn')) {
            let delay = el.dataset.index * 150
            setTimeout(function () {
              addClass(el, 'shadowIn')
              el.addEventListener('webkitAnimationEnd', function () {
                removeClass(el, 'shadowIn')
                el.style.backgroundImage = 'url("https://www.itsnicethat.com/system/files/012017/588091df7fa44cc1b30020e3/images_slice_large/Abstract_Art_of_Design_Its_Nice_That.png")'
                el.style.backgroundSize = 'contain'
              })
            }, delay)
          }
        } else {
          if (!hasClass(el, 'darkShadowIn')) {
            let delay = el.dataset.index * 150
            setTimeout(function () {
              addClass(el, 'darkShadowIn')
              el.addEventListener('webkitAnimationEnd', function () {
                removeClass(el, 'darkShadowIn')
                el.style.backgroundImage = 'url("https://www.itsnicethat.com/system/files/012017/588091df7fa44cc1b30020e3/images_slice_large/Abstract_Art_of_Design_Its_Nice_That.png")'
                el.style.backgroundSize = 'contain'
              })
            }, delay)
          }
        }
      }
    }
  }
</script>

<style lang="scss">

  // This only fully supports Webkit right now

  //
  // Variables
  //

  $black: #000000;
  $blue: #4584ee;
  $blue-2: lighten($blue, 4%);
  $gray: #d7d7d7;
  $gray-2: #f5f5f5;
  $white: #ffffff;
  $bg: #ffffff;
  $link-color: #4584ee;
  $label-color: #aaaaaa;
  $label-size: 16px;
  $search-bg: $white;
  $box-shadow: 0 0 0 1px rgba($black, 0.1), 0 2px 8px rgba($black, 0.2);
  $label-shadow: 0 0 2px rgba($white, 0.0);
  $font-family: sans-serif;

  // Brand Colors
  $Amazon:#0B0C07;$Apple:#0B0C07;$AmericanExpress:#2E77BC;$Apple:#999999;$Basecamp:#66CC66;$Behance:#1769FF;$Bing:#008373;$Bitbucket:#205081;$Bitcoin:#F7931A;$Bitly:#EE6123;$Blogger:#F38936;$Bootstrap:#563D7C;$Buffer:#323B43;$ChromeStore:#e3e4e5;$Codepen:#181818;$Delicious:#3399FF;$DeviantArt:#05CC47;$Digg:#000000;$Discover:#FF6000;$Disqus:#2E9FFF;$Docker:#1488C6;$Dribbble:#E84C88;$Dropbox:#007EE5;$Ebay:#E53238;$Ello:#000000;$Etsy:#F45800;$Evernote:#2DBE60;$Facebook:#3B5998;$Feedly:#6CC655;$Firefox:#C13832;$FitBit:#00B0B9;$Flickr:#0063DC;$Flipboard:#df272e;$Foursquare:#F94877;$FreeCodeCamp:#006600;$Git:#F14E32;$GitHub:#25292e;$Gitlab:#E24329;$Gitter:#FF0064;$Gmail:#D14836;$Goodreads:#663300;$Google:#4285F4;$GoogleAnalytics:#FFC107;$GoogleDrive:#4386FC;$GoogleHangouts:#0C9D58;$GoogleKeep:#FFBB00;$GooglePlay:#607D8B;$GooglePlayMusic:#FF5722;$GooglePlus:#DC4E41;$Gulp:#DA4648;$Html5:#E34F26;$Heroku:#430098;$Hipchat:#205281;$Hootsuite:#000000;$Hulu:#66AA33;$IMDB:#E6B91E;$Imgur:#34373c;$Invision:#FF3366;$Instagram:#E4405F;$Instapaper:#1F1F1F;$Intercom:#1F8DED;$JSFiddle:#3FA1F5;$Kickstarter:#2BDE73;$Kik:#82BC23;$Lastfm:#D51007;$Launchpad:#F8C300;$Line:#00C300;$LinkedIn:#0077B5;$Livestream:#CF202E;$Mailchimp:#2C9AB7;$Mastercard:#EB001B;$Medium:#00AB6C;$Messenger:#0084FF;$Microsoft:#666666;$MicrosoftAccess:#BA141A;$MicrosoftExcel:#217346;$MicrosoftOnenote:#80397B;$MicrosoftOutlook:#0072C6;$MicrosoftPowerpoint:#D24726;$MicrosoftWord:#2B579A;$Myspace:#030303;$Netflix:#E50914;$Onedrive:#094AB2;$Opera:#FF1B2D;$PayPal:#00457C;$Periscope:#40A4C4;$Pinterest:#BD081C;$Pocket:#EF3F56;$Podcasts:#9933CC;$ProductHunt:#DA552F;$Protoio:#34A7C1;$Quora:#A82400;$RSS:#FFA500;$Rdio:#008FD5;$React:#00D8FF;$Reddit:#FF4500;$Shopify:#7AB55C;$Sitepoint:#258AAF;$Skype:#00AFF0;$Slack:#6ECADC;$Slashdot:#026664;$SmashingMagazine:#E85C33;$SoundCloud:#FF3300;$Spotify:#2EBD59;$StackExchange:#1E5397;$StackOverflow:#FE7A16;$Stripe:#008CDD;$StumbleUpon:#EB4924;$SuperUser:#2EACE3;$Ted:#E62B1E;$Tesla:#CC0000;$TravisCI:#39A85B;$Trello:#0079BF;$Tumblr:#36465D;$Twitch:#6441A5;$Twitter:#1DA1F2;$Uber:#000000;$Ubuntu:#DD4814;$Vimeo:#1AB7EA;$Visa:#142787;$WeChat:#7BB32E;$WhatsApp:#25D366;$Wikipedia:#ffffff;$Windows:#0078D6;$Wire:#000000;$Ycombinator:#F0652F;$Yahoo:#440099;$Yelp:#C41200;$YouTube:#fd0016;$Mevlut:#eeeeee;


  //
  // Mixins
  //

  @mixin shadow() {
    box-shadow: 0 1px 3px rgba($black, 0.12), 0 1px 2px rgba($black, 0.24);
    -webkit-appearance: none;
  }

  @mixin shadow-h() {
    box-shadow: 0 2px 4px rgba($black, 0.28);
    transition: all 250ms cubic-bezier(0.4,0,0.2,1);
    -webkit-appearance: none;
    &:hover, &:focus, &:active {
      box-shadow: 0 5px 12px rgba(0, 0, 0, 0.32);
    }
  }

  @keyframes appear {
    0%   { opacity: 0; }
    10% { opacity: 0; }
    100% { opacity: 1; }
  }


  //
  // Font
  //



  //
  // Main
  //

  body {
    font-family: $font-family;
    font-weight: 400;
    background-color: $bg;
    color: $white;
    padding-bottom: 4rem;
  }

  a {
    img {
      visibility: visible;
    }

    span:first-child {
      visibility: visible;
    }
  }


  //
  // Sites
  //

  .sites {
    padding-top: 3rem;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -ms-flex-line-pack: justify;
    align-content: space-between;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;

    .hidden {
      display: none;
    }

    a {
      color: inherit;
      font-size: 1.3rem;
      border-radius: 4px;

      width: 188px;
      height: 120px;
      margin: 1rem;
      line-height: 120px;
      text-align: center;
      color: $link-color;
      box-sizing: border-box;
      display: block;
      vertical-align: middle;
      // @include shadow-h();

      span {
        &:nth-child(1) {
          font-family: Material-Icons;
          padding-right: 0;
          font-size: 55px;
        }

        &#title {
          opacity: 0;
          position: absolute;
          font-size: 16px;
          font-family: $font-family;
          font-weight: 400;
          transition: all ease-in-out 150ms;
          position: absolute;
          top: 77px;
          left: 0;
          color: $label-color;
          width: 188px;
          height: 1rem;
          text-align: center;
          text-shadow: none;
        }
      }


      img {
        width: 55px;
      }
      + &:nth-child(3n) {
        page-break-after: always;
      }


    }
  }




  //
  // Sites that need a little extra customization
  //


  $c_fg:         #f00;
  $c_bg:         #fff;
  $c_3d:         #f2f2f2;
  $c_shadow:     #dadada;
  $c_shadow-mix: #6998da;
  @keyframes color {
    0% {
      background-color: $c_bg;
    }
    100% {
      background-color: $c_fg;
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
        $shadow: append($shadow, round($i * $x) round($i * $y) $blur mix($mix,$color,0.1%*$i), comma);
      }
    }

    @return $shadow;
  }
  @function d33($depth, $color, $x: 1px, $y: 1px, $blur: 0, $mix: false) {
    $shadow: ();

    @for $i from 1 through $depth {
      // append to the existing shadow
      @if type-of($mix) != 'color' {
        $shadow: append($shadow, round($i * $x) round($i * $y) $blur $color, comma);

      } @else {
        $shadow: append($shadow, round($i * $x) round($i * $y) $blur mix($mix,$color,2%*$i), comma);
      }
    }

    @return $shadow;
  }
  $ls_shadow:     #7EDCFD;
  $ls_shadow-mix: #528EFC;
  .long-shadow:hover {
    transform: scale(1.1, 1.1) translatey(0%);
    box-shadow:
            //d3(15, rgba($c_3d, 1), 1px, 1px),
            //d3(30, rgba($c_shadow, 1), 1px, 2px);
            //d3(15, $c_3d, 1px, 0),
            d33(15, $ls_shadow, 1px, 1px, 3px, $ls_shadow-mix);
    -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  $shadowDepth1: 15;
  $shadowDepth2: 25;
  $l_fg:         #f00;
  $l_bg:         #fff;
  $l_3d:        #528EFC;
  $l_shadow:     #8dfffd;
  $l_shadow-mix: #7EDCFD;
  @keyframes lightColor {
    0% {
      background-color: $l_bg;
    }
    100% {
      background-color: $l_fg;
    }
  }
  @keyframes lightShadowIn {
    0% {
      transform: scale(1, 1);
      box-shadow:
              d3($shadowDepth1, rgba($l_3d, 0), 0, 0),
              d3($shadowDepth2, rgba($l_shadow, 0), 0, 0);
    }

    50% {
      transform: scale(1.2, 1.2);
      box-shadow:
              d3($shadowDepth1, $l_3d, 0.5px, 0),
              d3($shadowDepth2, $l_shadow, 1px, 2px, 3px, $l_shadow-mix);
    }

    100% {
      transform: scale(1.1, 1.1);
      box-shadow:
              d3($shadowDepth1, $l_3d, 0.5px, 0),
              d3($shadowDepth2, $l_shadow, 1px, 2px, 3px, $l_shadow-mix);
    }
  }

  @keyframes lightShadowOut {
    0% {
      transform: scale(1.1, 1.1);
      box-shadow:
              d3($shadowDepth1, $l_3d, 0.5px, 0),
              d3($shadowDepth2, $l_shadow, 1px, 3px, 3px, $l_shadow-mix);
    }

    20% {
      transform: scale(1.05, 1.05);
      box-shadow:
              d3($shadowDepth2, rgba($c_3d, 0), 0, 0),
              d3($shadowDepth2, rgba($c_shadow, 0), 0, 0);
    }

    100% {
      transform: scale(1, 1);
      box-shadow:
              d3($shadowDepth1, rgba($c_3d, 0), 0, 0),
              d3($shadowDepth2, rgba($c_shadow, 0), 0, 0);
    }
  }
  .shadowIn {
    animation-name: lightShadowIn , lightShadowOut, lightColor;
    animation-delay: 0s, 1.15s, 2s;
    animation-duration: 1.15s, 2s, 0.1s;
  }
  .shadowOut {
    background-image: url("../../../renderer/assets/tv.jpg");
    background-size: contain;
  }
  $d_fg:         #f00;
  $d_bg:         #2a2a2a;
  $d_3d: #484848;
  $d_shadow: #666666;
  $d_shadow-mix: #6998da;
  @keyframes darkColor {
    0% {
      background-color: $d_bg;
    }
    100% {
      background-color: $d_fg;
    }
  }
  @keyframes darkShadowIn {
    0% {
      transform: scale(1, 1);
      box-shadow:
              d3($shadowDepth1, rgba($d_3d, 0), 0, 0),
              d3($shadowDepth2, rgba($d_shadow, 0), 0, 0);
    }

    50% {
      transform: scale(1.2, 1.2);
      box-shadow:
              d3($shadowDepth1, $d_3d, 0.5px, 0),
              d3($shadowDepth2, $d_shadow, 1px, 3px, 3px, $d_shadow-mix);
    }

    100% {
      transform: scale(1.1, 1.1);
      box-shadow:
              d3($shadowDepth1, $d_3d, 0.5px, 0),
              d3($shadowDepth2, $d_shadow, 1px, 3px, 3px, $d_shadow-mix);
    }
  }

  @keyframes darkShadowOut {
    0% {
      transform: scale(1.1, 1.1);
      box-shadow:
              d3($shadowDepth1, $d_3d, 0.5px, 0),
              d3($shadowDepth2, $d_shadow, 1px, 3px, 3px, $d_shadow-mix);
    }

    20% {
      transform: scale(1.05, 1.05);
      box-shadow:
              d3($shadowDepth2, rgba($d_3d, 0), 0, 0),
              d3($shadowDepth2, rgba($d_shadow, 0), 0, 0);
    }

    100% {
      transform: scale(1, 1);
      box-shadow:
              d3($shadowDepth1, rgba($d_3d, 0), 0, 0),
              d3($shadowDepth2, rgba($d_shadow, 0), 0, 0);
    }
  }
  .darkShadowIn {
    animation-name: darkShadowIn , darkShadowOut, darkColor;
    animation-delay: 0s, 1.15s, 2s;
    animation-duration: 1.15s, 2s, 0.1s;
  }

</style>
