import api from '../api/index.js'

import {createStore} from 'vuex'

export default createStore({
    state: {
        playList: [
            {
                name: '彩券',
                id: 1486513704,
                al: {
                    id: 127127312,
                    name: "是以不去",
                    pic: 109951165963768800,
                    picUrl: "http://p3.music.126.net/DFZQLKkhB7VT0ld5yb1nRg==/109951165963768795.jpg",
                    pic_str: "109951165963768795"
                }
            }
        ],
        playCurrentIndex: 0,
        lyric: '',
        currentTime: 0,
        intervalId: 0,
        user: {
            isLogin: false,
            account: {},
            userDetail: {}
        },
    },
    getters: {
        lyricList(state) {
            let arr = state.lyric.split(/\n/igs).map((item, i, arr) => {
                let min = parseInt(item.slice(1, 3))
                let sec = parseInt(item.slice(4, 6))
                let mill = parseInt(item.slice(7, 10))
                let pre = 0
                return {
                    min, sec, mill,
                    lyric: item.slice(11, item.length),
                    content: item,
                    time: mill + sec * 1000 + min * 60 * 1000,
                    pre
                }
            })
            arr.forEach((item, i) => {
                if (i == 0) {
                    item.pre = 0
                } else {
                    item.pre = arr[i - 1].time
                }
            })
            return arr
        }
    },
    mutations: {
        setPlayList(state, value) {
            state.playList = value
        },
        pushPlayList(state, value) {
            state.playList.push(value)
        },
        setPlayIndex(state, value) {
            state.playCurrentIndex = value
        },
        setLyric(state, value) {
            state.lyric = value
        },
        setCurrentTime(state, value) {
            state.currentTime = value
        },
        setUser(state, value) {
            state.user = value
        },
    },
    actions: {
        async reqLyric(content, payload) {
            let res = await api.getLyric(payload.id)
            content.commit('setLyric', res.data.lrc.lyric)
        },
        async login(content, payload) {
            let res = await api.phoneLogin(payload.phone, payload.password)
            if (res.data.code === 200) {
                content.state.user.isLogin = true
                content.state.user.account = res.data.account
                content.state.user.userDetail = await api.getuserDetail(res.data.account.id)
                localStorage.userData = JSON.stringify(content.state.user)
                console.log(content.state.user.userDetail);
                content.commit('setUser', content.state.user)
            }
            return res

        },

    },
    modules: {}
})
