<template>
  <div class="playList">
    <div class="playList-top">

      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <div class="text">
          <div class="title">播放全部</div>
          <div class="num">(共{{ playlist.tracks.length }}首)</div>
        </div>
      </div>

      <div class="btn">
        + 收藏({{ changeValue(playlist.subscribedCount) }})
      </div>

    </div>

    <div class="list">
      <div class="playItem" v-for="(item,index) in playlist.tracks" :key="index" @click="pushMusic(index) ">
        <div class="left">
          <div class="index">{{ index + 1 }}</div>
          <div class="content">
            <div class="title">{{ item.name }}</div>
            <div class="anthor">
              <span class="tag" v-for="(tag,i) in playlist.tags" :key="i">{{ tag }}</span>
              <span>{{ item.al.name }}</span>

            </div>
          </div>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofangshu"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-diandiandianshu"></use>
          </svg>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "playList",
  props: ['playlist'],
  methods: {
    pushMusic(index) {
      this.$store.commit('setPlayIndex', index)
      this.$store.dispatch('reqLyric', {id: this.$store.state.playList[this.$store.state.playCurrentIndex].id})
    },


    changeValue(num) {
      let res = 0
      if (num >= 100000000) {
        res = num / 100000000
        res = res.toFixed(2) + '亿'
      } else if (num >= 10000) {
        res = num / 10000
        res = res.toFixed(2) + '万'
      }
      return res
    },
    ...mapMutations(['setPlayIndex'])
  },

}
</script>

<style scoped lang="less">
.playList {
  width: 7.5rem;
  padding: 0 0.4rem;
  background: #fff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  margin-top: 0.4rem;

  .playList-top {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .icon {
        width: 0.4rem;
        height: 0.4rem;

      }

      .title {
        font-size: 0.34rem;
        font-weight: 560;

      }

      .num {
        font-size: 0.28rem;
        color: #666;
      }

      .text {
        display: flex;
        align-items: center;
        margin-left: 0.3rem;
      }

    }

    .btn {
      font-size: 0.3rem;
      color: #FFF;
      background: orangered;
      border-radius: 0.4rem;
      height: 0.6rem;
      padding: 0.33rem 0.1rem;
      display: flex;
      align-items: center;
      line-height: 0.6rem;
    }
  }

  .list {
    .playItem {
      display: flex;
      justify-content: space-between;
      height: 1.2rem;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
        color: #666;

        .index {
          width: 0.3rem;
        }

        .content {
          margin-left: 0.4rem;
        }

        .title {
          font-size: 0.3rem;
          font-weight: 900;
          color: #000;
          margin-bottom: 0.05rem;
        }

        .tag {
          font-size: 0.2rem;
          color: orangered;
          border: 1px solid orangered;
          border-radius: 0.1rem;


        }

        .author {
          color: #666;
        }
      }

      .right {
        .icon {
          margin: 0 0.15rem;
          margin-right: 0.1rem;
          fill: #aaa;
          width: 0.35rem;
          height: 0.35rem;
        }
      }

    }
  }
}

</style>