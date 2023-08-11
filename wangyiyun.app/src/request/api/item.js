import service from "..";

/**
 * 发现好歌单，swiper里面，(API获取歌单详情)
 * @param {*} data id
 * @returns 
 */
export function getItemMusicList(data){
  return service({
    method:'GET',
    url:`/playlist/detail?id=${data}`
  })
}

/**
 * 获取歌单的所有歌曲，发现好歌的歌曲列表（API获取歌单所有歌曲）
 * @param {*} data 
 *  - data：传入一个id
 *  - limit：数据条数
 *  - offset：从第一条数据开始取20条
 * @returns 
 */
export function  getItemList(data){
  return service({
    method:'GET',
    url:`/playlist/track/all?id=${data}&limit=30&offset=1`
  })
}

/**
 * 获取歌曲（API获取歌词）
 * @param {*} data 
 * @returns 
 */
export function getMusicLyric(data){
  return service({
    method:'GET',
    url:`/lyric?id=${data}`
  });
}