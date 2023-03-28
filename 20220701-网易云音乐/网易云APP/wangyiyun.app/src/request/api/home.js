// 导入实例（api/index.js），因为是当前目录，from后面直接省略了
import service from "..";

// 获取首页轮播图数据
export function getBanner(){
  return  service({
    method:'GET',
    url:'/banner?type=2',
  })
}

// 获取发现好歌单（API中推荐歌单数据）
export function getMusicList(){
  return service({
    method:'GET',
    url:'/personalized?limit=30'
  })
}

// 搜索 （API搜索接口）
export function getSearchMusic(data){
  return service({
    method:'GET',
    url:`/search?keywords=${data}`
  });
}

// 登录（API登录一共有三种方式，1.手机号，2.邮箱，3.二维码登录）
export function getPhoneLogin(data){
  return service({
    method:'GET',
    url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
  });
}

// 用户详情，infoUser信息
export function getUserInfo(data){
  return service({
    method:'GET',
    url:`/user/detail?uid=${data}`
  });
}