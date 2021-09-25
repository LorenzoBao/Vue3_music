<template>
  <div id="swipercom">
    <div class="swiper-container" id="swiperIndex">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in imgs" :key="index"><img :src="item.pic" alt=""></div>

      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

    </div>
  </div>
</template>

<script>

import 'swiper/css/swiper.css'
import Swiper from 'swiper'
import axios from "axios";
import {getBanner} from "@/api";

export default {
  name: "swiperCom",
  data() {
    return {
      imgs: [
        {pic: require('../assets/img/swiper1.jpg')},
        {pic: require('../assets/img/swiper2.jpg')},
        {pic: require('../assets/img/swiper3.jpg')},
      ],
    }
  },
  async mounted() {

    var mySwiper = new Swiper('#swiperIndex', {
      // direction: 'vertical', // 垂直切换选项
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
    });

    let res = await getBanner(1)
    this.imgs = res.data.banners

  },
}
</script>

<style lang="less">
#swipercom {
  width: 7.5rem;

  #swiperIndex {

    width: 7.1rem;
    height: 2.6rem;
    border-radius: 0.1rem;

    .swiper-slide img {
      width: 100%;
      height: 100%;
    }

    .swiper-pagination-bullet-active {
      background: orangered;
    }
  }
}


</style>