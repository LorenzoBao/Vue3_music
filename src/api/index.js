import axios from "axios";
let baseUrl='http://110.40.251.92:3000';

export function getBanner(type=1) {
    return  axios.get(`${baseUrl}/banner?type=${type}`)
}
export function getMusicList(limit=10) {
    return  axios.get(`${baseUrl}/personalized?limit=${limit}`)
}
export function getPlaylistDetail(id) {
    return  axios.get(`${baseUrl}/playlist/detail?id=${id}`)
}