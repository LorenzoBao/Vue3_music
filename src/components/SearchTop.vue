<template>
  <div class="SearchTop">

    <div class="SearchTopNav">

      <div class="back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xianxingzuojiantou-copy"></use>
        </svg>
      </div>

      <div class="right">
        <input type="text" v-model="searchKeyWord" :placeholder="placeholder" @keydown.enter="saveKeyWord()">
      </div>
    </div>

    <div class="history" v-show="searchSongs.length===0">
      <div class="historyLeft">
        历史
      </div>
      <div class="historyRight">
        <div @click="historySearch(item)" class="keywordItem" v-for="(item,index) in keywordList" :key="index">
          {{ item }}
        </div>
      </div>
    </div>

    <div class="searchSongs" v-show="searchSongs.length!==0">
      <div class="searchSongs-top">

        <div class="left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
          <div class="text">
            <div class="title">播放全部</div>
            <div class="num">(共{{ searchSongs.length }}首)</div>
          </div>
        </div>


      </div>

      <div class="list">
        <div class="playItem" v-for="(item,index) in searchSongs" :key="index" @click="setPlay(item,index) ">
          <div class="left">
            <div class="index">{{ index + 1 }}</div>
            <div class="content">
              <div class="title">{{ item.name }}</div>
              <div class="anthor">
                <span class="tag" v-for="(tag,i) in searchSongs.tags" :key="i">{{ tag }}</span>
                <span>{{ item.album.name }}</span>

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


  </div>
</template>

<script>

import {searchMusic} from "../api";

export default {
  name: "listview-top",
  props: ['playlist'],
  data() {
    return {
      placeholder: '陈奕迅',
      keywordList: [],
      searchKeyWord: '',
      searchSongs: '',
    }
  },
  methods: {
    setPlay(item, index) {
      item.al = item.album
      item.album.picUrl = item.album.artist.img1v1Url
      this.$store.commit('pushPlayList', item)
      this.$store.commit('setPlayIndex', this.$store.state.playList.length - 1)
    },
    historySearch(keyWord) {
      this.searchKeyWord = keyWord
      this.saveKeyWord()
    },
    async saveKeyWord() {

      this.keywordList.push(this.searchKeyWord)
      this.keywordList = Array.from(new Set(this.keywordList))
      if (this.keywordList.length > 10) {
        this.keywordList = this.keywordList.slice(this.keywordList.length - 10, this.keywordList.length)
      }
      localStorage.keywordList = JSON.stringify(this.keywordList)
      let res = await searchMusic(this.searchKeyWord)
      this.searchSongs = res.data.result.songs

    }

  },
  beforeMount() {

    this.keywordList = localStorage.keywordList ? JSON.parse(localStorage.keywordList) : []
  }
}

</script>

<style scoped lang="less">
.SearchTop {
  height: calc(100vh - 1.2rem);
  width: 7.5rem;
  padding: 0 0.4rem;

  .SearchTopNav {
    height: 1.2rem;
    width: 100%;
    display: flex;
    padding: 0 0.4rem;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;

    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }

    .right {
      flex: 1;
      padding: 0 0 0 0.4rem;

      input {
        border: none;
        outline: none;
        border-bottom: 1px solid #666;
        width: 100%;
        height: 0.5rem;

      }
    }
  }

  .history {
    display: flex;
    margin-top: 1.2rem;

    .historyLeft {
      width: 1.2rem;
      height: 0.6rem;
      margin: 0.2rem 0;
      line-height: 0.6rem;
      font-weight: 900;
    }

    .historyRight {
      color: #666;
      display: flex;
      flex-wrap: wrap;
      flex: 1;

      .keywordItem {
        background-color: #EEE;
        height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.4rem;
        line-height: 0.6rem;
        margin: 0.2rem 0.1rem;
      }
    }
  }

  .searchSongs {
    width: 7.5rem;
    padding: 0 0.4rem;
    background: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    position: fixed;
    top: 1.2rem;
    bottom: 1.2rem;
    overflow: scroll;

    .searchSongs-top {
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
}

</style>