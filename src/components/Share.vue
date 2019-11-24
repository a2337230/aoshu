<template>
  <div class="share">
    <ul class="share-container">
      <li class="icon">
        <div class="weixin">
          <div class="imgs">
            <img src="./../common/weixin.png" alt="">
          </div>
          <p>微信好友</p>
        </div>
        <div class="weixin">
          <div class="imgs">
            <img src="./../common/pengyouquan.png" class="pengyou">
          </div>
          <p>朋友圈</p>
        </div>
        <div class="weixin">
          <div class="imgs"
            v-clipboard:copy="isHref" 
            v-clipboard:success="copy" 
            v-clipboard:error="onError"
          >
            <img src="./../common/lianjie.png" class="lianjie">
          </div>
          <p>复制链接</p>
        </div>
      </li>
      <li class="close" @click="close">
        取消
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  name: 'share',
  data() {
    return {
      isHref: window.location.href
    }
  },
  methods: {
    copy (e) {
      Toast('链接复制成功,快去粘贴吧')
    },
    onError (e) {
      Toast('复制失败')
    },
    close () {
      this.$emit('closeShare')
    }
  },
}
</script>
<style lang="less" scoped>
.share {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999;
  background-color: rgba(0,0,0,0.6);
  left: 0;
  top: 0;
  .share-container {
    width: 100vw;
    // height: .88rem;
    background-color: #F6F6F6;
    position: absolute;
    bottom: -7rem;
    border-radius: .2rem .2rem 0 0;
    animation: top .2s forwards;
    @keyframes top {
      0% {
        bottom: -7rem;
      }
      100% {
        bottom: 0;
      }
    }
    .icon {
      width: 100%;
      height: 2.61rem;
      padding: .95rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .weixin {
        .imgs {
          width: 1.2rem;
          height: 1.2rem;
          background-color: #fff;
          border-radius: .1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: .7rem;
            height: .57rem;
          }
          .pengyou {
            width: .6rem;
            height: .63rem;
          }
          .lianjie {
            width: .56rem;
            height: .56rem;
          }
        }
        p {
          font-size: .28rem;
          line-height: .4rem;
          margin-top: .24rem;
          color: #848484;
          text-align: center;
        }
      }
    }
    .close {
      height: .98rem;
      text-align: center;
      line-height: .98rem;
      background-color: #fff;
    }
  }
}
</style>