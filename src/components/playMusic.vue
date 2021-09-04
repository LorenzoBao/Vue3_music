<template>
  <div class="playMusic">

    <div class="bg" :style="{backgroundImage:`url(${playDetil.al.picUrl})`}"></div>

    <div class="playTop">
      <div class="back" @click="$emit('back')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xianxingzuojiantou-copy"></use>
        </svg>
      </div>

      <div class="center">
          <div class="title">
            <marquee  behavior="scroll" direction="left"> {{playDetil.al.name}}</marquee>
            </div>
      </div>

      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-share_icon"></use>
        </svg>
      </div>
    </div>


    <div class="playContent"  v-show="!isLyric">
      <img class="needle" :class="{active:paused}" src="@/assets/img/needle-ab.png">
      <img  class="disc" src="@/assets/img/disc-plus.png" >
      <img class="playImg" :src="playDetil.al.picUrl">
    </div>


    <div class="playLyric"  v-show="isLyric" ref="playLyric">
      <p :class="{active:(currentTime*1000-2000>item.pre&&currentTime*1000-2000<item.time)}" v-for="(item,index) in $store.getters.lyricList" :key="index">
        {{item.lyric}}
      </p>
    </div>

    <div class="proGress"></div>
    <div class="playFooter">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon play"  aria-hidden="true" @click="play"  v-if="paused" >
        <use xlink:href="#icon-ico_zanting_xuanzhong"></use>
      </svg>
      <svg class="icon play"  aria-hidden="true" @click="play" v-else >
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiaoxiangyou"></use>
      </svg>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
name: "playMusic",
  methods:{
    goPlay(num){
      let index=this.playCurrentIndex+num

      if (index<0){
        index = this.playList.length-1
      }else if(index === this.playList.length){
        index=0
      }

      this.$store.commit("setPlayIndex",index);
    }
  },
  props:['playDetil','play','paused'],
  data(){
    return{
      isLyric:true,
    }
  },
  computed:{
  ...mapState(['lyric','currentTime',"playList","playCurrentIndex"])
  },
  watch:{
    currentTime(newValue){
      this.$nextTick(()=>{
        let p =document.querySelector('p.active')
        this.$refs.playLyric.scrollTop=p.offsetTop
      })
    },

  }

}
</script>

<style lang="less" scoped>
  .playMusic{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #FFF;
    .bg{
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      background-size: auto 100VW;
      filter: blur(50px);
      background-position: center;
    }
    .playTop{
      display: flex;
      width: 7.5rem;
      height: 1.2rem;
      position: absolute;
      justify-content: space-between;
      align-items: center;
      left: 0;
      top: 0;
      color: #FFF;
      padding: 0 0.4rem;
      .icon{
        fill: #fff;
        width: 0.4rem;
        height: 0.4rem;

      }
     marquee{
       width: 5rem;
       flex: 1;
     }
    }
    .playContent{
      position: absolute;
      width: 7.5rem;
      height: 7.5rem;
      left: 0;
      top: 1.5rem;

      .needle {
        width: 2rem;
        height: auto;
        position: absolute;
        left: 3.5rem;
        z-index: 10;
        transform-origin: 0.3rem 0;
        transform: rotate(-20deg);
        transition: all 1s;
      }
      .needle.active{
        width: 2rem;
        height: auto;
        position: absolute;
        left: 3.5rem;
        z-index: 10;
        transform-origin: 0.3rem 0;
        transform: rotate(0deg);
        transition: all 1s;
      }
      .disc{
        width: 5rem;
        height: auto;
        position: absolute;
        left: calc(50% - 2.25rem);
        top: 2rem;
      }
      .playImg{
        width: 3rem;
        height: 3rem;
        border-radius: 1.5rem;
        position: absolute;
        left: calc(50% - 1.25rem);
        top: 3rem;
      }
    }
    .playFooter{
      width: 7.5rem;
      height: 1.5rem;
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.4rem;
      .icon{
        width: 0.5rem;
        height: 0.5rem;
        fill: #fff;
      }
      .play{
        width: 1rem;
        height: 1rem;
      }
    }
    .playLyric{
      position: absolute;
      width: 7.5rem;
      height: 7.5rem;
      left: 0;
      top: calc(50% - 4rem);
      overflow: scroll;
      text-align: center;
      color: white;
      padding: 0.2rem 0;
      .active{
        color: orangered;
      }
    }
  }
</style>