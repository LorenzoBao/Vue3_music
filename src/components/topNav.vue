<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>

    <div class="topCenter">
      <span class="navBtn" @click="$router.push('/Me')">我的</span>
      <span class="navBtn active">发现</span>
      <span class="navBtn">云村</span>
      <span class="navBtn">视频</span>

    </div>

    <div class="topRight">
      <svg class="icon search" aria-hidden="true" @click="$router.push('/Search')">
        <use xlink:href="#icon-icon- "></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "topNav"
}
</script>

<style lang="less" scoped>
.topNav {
  width: 7.5rem;
  height: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;

  .icon {
    height: 0.5rem;
    width: 0.5rem;
  }

  .search {
    height: 0.45rem;
    width: 0.45rem;
  }

  .topCenter {
    width: 4.5rem;
    display: flex;
    justify-content: space-around;

    .active {
      font-weight: 900;
    }
  }
}
</style>
