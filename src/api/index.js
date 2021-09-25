import axios from "axios";

let baseUrl = 'http://110.40.251.92:3000';

export function getBanner(type = 1) {
    return axios.get(`${baseUrl}/banner?type=${type}`)
}

export function getMusicList(limit = 10) {
    return axios.get(`${baseUrl}/personalized?limit=${limit}`)
}

export function getPlaylistDetail(id) {
    return axios.get(`${baseUrl}/playlist/detail?id=${id}`)
}

export function getLyric(id) {
    return axios.get(`${baseUrl}/lyric?id=${id}`)
}

export function searchMusic(keyWord) {
    return axios.get(`${baseUrl}/search?keywords=${keyWord}`)
}

export function phoneLogin(phone, passwoed) {
    return axios.get(`${baseUrl}/login/cellphone?phone=${phone}&password=${passwoed}`)
}

export function getuserDetail(uid) {
    return axios.get(`${baseUrl}/user/detail?uid=${uid}`)
}

export default {getBanner, getMusicList, getPlaylistDetail, getuserDetail, getLyric, searchMusic, phoneLogin}