<template>

  <router-view/>
  <playController></playController>

</template>

<script>
import playController from "@/components/playController";

export default {
  name: 'App',
  components:{
    playController
  },
  mounted() {
    let userData = JSON.parse(localStorage.userData)
    this.$store.commit('setUser',userData)

  }


};
</script>

<style lang="less">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: '微软雅黑',serif;
}
.icon{
  width: 0.3rem;
  height: 0.3rem;
}
a{
  color: #333;
  text-decoration: none;
}
</style>
