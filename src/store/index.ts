import { createStore } from 'vuex'

export default createStore({
  state: {
    playList:[
      {
        name:'彩券',
        id:1486513704,
        al:{
          id: 127127312,
          name: "是以不去",
          pic: 109951165963768800,
          picUrl: "http://p3.music.126.net/DFZQLKkhB7VT0ld5yb1nRg==/109951165963768795.jpg",
          pic_str: "109951165963768795"
        }
      }
    ],
    playCurrentIndex:0
  },
  mutations: {
    setPlayList(state,value){
      state.playList=value
    }
  },
  actions: {

  },
  modules: {
  }
})
