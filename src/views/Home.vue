<template>
  <div class="home">
   <topNav></topNav>
    <swiperCom></swiperCom>
    <iconList></iconList>
    <musicList></musicList>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import topNav from '@/components/topNav.vue';
import swiperCom from '@/components/swiperCom.vue'
import iconList from '@/components/iconList.vue'
import musicList from '@/components/musicList.vue'
@Options({
  components: {

    topNav,
    swiperCom,
    iconList,
    musicList


  },
  data(){
    return{

    }
  },
  computed: {

  },


})

export default class Home extends Vue {}
</script>
<style lang="less" scoped>

</style>