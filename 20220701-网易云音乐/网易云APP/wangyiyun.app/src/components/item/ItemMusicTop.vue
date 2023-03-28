<template>
  <div>
    <div class="itemMusicTop">
      <div class="musicTopLeft">
        <img :src="playlist.coverImgUrl" alt="">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1);">
          <use xlink:href="#icon-jiantou_xiangzuo"></use>
        </svg>
        <span class="text">歌单</span>
      </div>
      <div class="musicTopRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-caidan"></use>
        </svg>
      </div>
    </div>

    <div class="itemContent">
      <div class="contentLeft">
        <img :src="playlist.creator.avatarUrl" alt="">
        <div class="playCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
          </svg>
          <span class="">{{changeCount(playlist.playCount)}}</span>
        </div>
      </div>
      <div class="contentRight">
        <div class="title">{{playlist.name}}</div>
        <div class="imgIcon">
          <img :src="playlist.creator.backgroundUrl" alt="">
          <span class="nickname">{{playlist.creator.nickname}}</span>
        </div>
        <p class="dis">{{playlist.description}}</p>
      </div>
    </div>

    <div class="itemBottom">
      <div class="one">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liuyan"></use>
        </svg>
        <span class="meg">{{playlist.commentCount}}</span>
      </div>

      <div class="two">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-partake"></use>
        </svg>
        <span class="">{{playlist.shareCount}}</span>
      </div>

      <div class="three">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <span>下载</span>
      </div>

      <div class="four">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duoxuankuangzu"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
export default{
  setup(props){ 
    // (props.playlist.creator='') 这个条件对吗，赋值？判断？
    if((props.playlist.creator='')){
      props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator;
    }
    // 播放量数字进行处理
    function changeCount(num){
      if(num>=10000){
        return (num/10000).toFixed(1)+'万';
      }
    };
    // 函数定义后，使用一定要在这里进行导出
    return {changeCount}
  },
  props:['playlist'],
}
</script>

<style lang="less" scoped>
  .itemMusicTop{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .musicTopLeft{
      .text{
        font-size: 18px;
        color: #fff;
      }
    }
    .musicTopLeft,.musicTopRight{
      margin: 10px;
      display: flex;
      width: 20%;
      justify-content: space-between;
      .icon{
        fill: #fff;
      }
    }
  
    img{
      z-index: -1;
      position: fixed;
      height: 300px;
      width: 100%;
      filter: blur(30px);
    }
  }
  .itemContent{
    display: flex;
    justify-content: space-between;
    margin: 10px;
    height: 150px;
    overflow: hidden;
    .contentLeft{
      width: 150px;
      height: 150px;
      position: relative;
      img{
        width: 100%;  
        height: 100%;
        border-radius: 10px;
      }
      .playCount{
        position: absolute;
        top: 5px;
        right: 5px;
        color: #fff;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
          width: 18px;
          height: 20px;
        }
        span{
          margin-left: 5px;
        }
      }
    }
    .contentRight{
      width: 190px;
      .title{
        width: 100%;
        font-size: 16px;
        color: #fff;
      }
      .imgIcon{
        width: 100%;
        height: 50px;
        margin: 10px 0;
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          float: left;
          margin-right: 10px;
        }
        .nickname{
          float: left;
          font-size: 16px;
          color: #fff;
          line-height: 50px;
        }    
      }
      .dis{
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 14px;
        color: #fff;
      }
    }
  }
  .itemBottom{
    padding: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: #fff;
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon{
        width: 24px;
        height: 26px;
      }
      span{
        margin-top: 5px;
        font-size: 14px;
      }
    }
  }
</style>