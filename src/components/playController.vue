<template>
  <div class="playController">

    <div class="left" @click="show =! show">
      <img :src="playList[playCurrentIndex].al.picUrl" alt="">
      <div class="content">
        <div class="title">{{ playList[playCurrentIndex].al.name }}</div>
        <div class="tips"> 横滑可以切换上下首</div>
      </div>
    </div>

    <div class="right">
      <svg class="icon" aria-hidden="true" @click="play()" v-if="paused">
        <use xlink:href="#icon-ico_zanting_xuanzhong"></use>
      </svg>

      <svg class="icon" aria-hidden="true" @click="play()" v-else>
        <use xlink:href="#icon-bofang"></use>
      </svg>

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiaoxiangyou"></use>
      </svg>

    </div>

    <playMusic :play="play" :paused="paused" v-show="show" @back="show=!show"
               :playDetil="playList[playCurrentIndex]"></playMusic>

    <audio ref="audio"
           :src="`https://music.163.com/song/media/outer/url?id=${playList[playCurrentIndex].id}.mp3`"></audio>


  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import $store from '../store/index'
import playMusic from "@/components/playMusic";

export default {
  name: "playController",
  components: {
    playMusic
  },
  data() {
    return {
      paused: false,
      show: false

    }
  },
  computed: {
    ...mapState(['playList', 'playCurrentIndex'])
  },
  mounted() {
    this.$store.dispatch('reqLyric', {id: this.playList[this.playCurrentIndex].id})
    this.updataTime();
  },
  updated() {
    this.updataTime();
    this.$store.dispatch('reqLyric', {id: this.playList[this.playCurrentIndex].id})

  },
  watch: {
    playCurrentIndex() {
      this.$nextTick(() => {
        this.$refs.audio.play()
        this.paused = true
      })

    }


  },
  methods: {

    updataTime() {
      this.$store.state.intervalId = setInterval(() => {
        this.$store.commit('setCurrentTime', this.$refs.audio.currentTime);
      }, 1000)
    },
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.paused = true
        this.updataTime();
      } else {
        this.$refs.audio.pause()
        this.paused = false
        clearInterval(this.$store.state.intervalId)
      }
    }
  }

}
</script>

<style scoped lang="less">
.playController {
  z-index: 1;
  background: #fff;
  height: 1rem;
  width: 7.5rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;

  .left {
    display: flex;
    padding: 0 0.2rem;

    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 1rem;
    }

    .content {
      padding: 0 0.2rem;

      .tips {
        font-size: 0.2rem;
        color: #999;
      }

    }
  }

  .right {
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 0.2rem;
    }
  }
}

</style>