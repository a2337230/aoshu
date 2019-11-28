<template>
  <div class="video-box">
    <div class="prism-player" id="J_prismPlayer"></div>
  </div>
  
</template>
<script>
import { VideoPlay } from '@/api/index'
import $ from 'jquery'
export default {
  name: 'video1',
  props: {
    VideoId: {
      type: String,
      default: ''
    },
    VideoImg: {
      type: String,
      default: '',
    }
  },
  data () {
    return {
      player: '',
      // 默认图片
      defaultVideoImg: require('./../common/cover.png'),
      // 是否关闭
      isClose: false,
      player: '',
      // 兼容IOS
      x5_type: '',
      cover_img: require('./../common/cover.png')
    }
  },
  created () {
    var ua = navigator.userAgent.toLowerCase();
    let ios = ua.indexOf("native_app_ios") > -1
    if (ios) {
      this.x5_type = 'h5'
    }
  },
  mounted () {
    this.playVideo()
  },
  beforeDestroy () {
    this.isClose = true
  },
  methods: {
    async playVideo() {
      let _this = this
      let result = await VideoPlay({
        VideoID: this.VideoId
      })
      if (result.Code === 200) {
        if (!result.Data.includes('RequestId') && !this.isClose) {
          _this.$emit('videoCodeIng')
        } else {
          let data = JSON.parse(result.Data) 
          if (data.PlayAuth) {
            _this.player = new Aliplayer({
              id: 'J_prismPlayer',
              width: '100%',
              height: '100%',
              autoplay:false,
              preload: false,
              vid: _this.VideoId,
              playauth: data.PlayAuth,
              useH5Prism:true,
              x5_fullscreen:false,
              playsinline:true,
              x5_type: _this.x5_type, // 不启用同层播放，设置为h5 则为启用
              qualitySort: true,
              controlBarVisibility:'click',
              showBarTime:3000,//配合click使用
              cover: _this.VideoImg ? _this.VideoImg :  _this.defaultVideoImg,

            }, function (player) {
                player.play()
                player.getDuration()
                _this.$emit('codeing')
                $("#J_prismPlayer").find(".prism-marker-text").css('display',  'none')

                $("#J_prismPlayer video").attr("poster", _this.cover_img)
                var userAgent = navigator.userAgent
                // 判断华为手机
                let huawei = navigator.appVersion.toLowerCase()
                // alert(huawei.includes('huawei'))
                var isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
                
                if(isiOS || huawei.includes('huawei')) {
                  $("#J_prismPlayer").find(".prism-fullscreen-btn").css('display',  'none')
                }
                // if(navigator.userAgent.toLowerCase().indexOf("iphone")) {
                //     $("#J_prismPlayer").find(".prism-fullscreen-btn").css('display',  'none')
                // }
                setTimeout(()=> {
                  $('.prism-cover').css({
                    'backgroundSize': 'cover'
                  })
                }, 1000)
            })
          }
        }  
      }
    }
  }
}
</script>
<style lang="less" scoped>
.video-box {
  width: 100%;
  height: 100%;
}
.video-box /deep/ .prism-player  {
  width: 100%;
  height: 100%;
  // background-color: blue;
}
.video-box /deep/ .prism-big-play-btn {
  left: 50% !important;
  // top: 50% !important;
  margin-left: -30px;
}
.video-box /deep/ .prism-player video {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  object-position: 50% 50% !important;
 }
.video-box /deep/ .prism-cover {
  background-size: cover;
}
.video-box /deep/ .prism-player video.center {
  object-position: 50% 50% !important;
 }
</style>
