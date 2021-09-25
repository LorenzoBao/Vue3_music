<template>
  <div class="ListView">
    <listViewTop :playlist="state.playlist"></listViewTop>
    <playList :playlist="state.playlist"></playList>
  </div>


</template>

<script>

import {getPlaylistDetail} from "../api";
import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import listViewTop from '../components/listviewTop'
import playList from '../components/playList'
import store from "../store";

export default {
  name: "ListView",
  setup() {
    const route = useRoute()
    let state = reactive({
      list: [],
      playlist: {
        creator: {},
        tracks: []
      }
    })

    onMounted(async () => {
      let res = await getPlaylistDetail(route.query.id);
      state.playlist = res.data.playlist
      store.commit('setPlayList', state.playlist.tracks)

    })

    return {
      state
    }
  },
  components: {
    listViewTop,
    playList
  }
}
</script>

<style scoped>

</style>