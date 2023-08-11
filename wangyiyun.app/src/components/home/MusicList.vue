<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">更多</div>  
    </div>

    <div class="musicContent">
     <van-swipe :loop="false" :width="150" class="myMusic" :show-indicators="false">
        <van-swipe-item v-for="item in state.musicsList" :key="item" class="musicItem">
          <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
            <img :src="item.picUrl" alt="">
            <div class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play"></use>
              </svg>
              <span class="">{{changeCount(item.playCount)}}</span>
            </div>
            <div class="name">{{item.name}}</div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import {getMusicList} from '@/request/api/home.js'
import {reactive,onMounted} from 'vue'

export default {
  setup(){
    const state = reactive({
      musicsList:[]
    });
    function changeCount(num){
      if(num>=10000){
        return (num/10000).toFixed(1)+'万';
      }
    };
    onMounted(async ()=>{
      let res = await getMusicList();
      state.musicsList = res.data.result
    });
    return { state,changeCount};

  }
}
</script>

<style lang="less" scoped>
  .musicList{
    .musicTop{
      display: flex;
      justify-content: space-between;
      padding: 20px 10px;
      align-items: center;
      .title{
        font-size: 20px;
        font-weight: 700;
      }
      .more{
        font-size: 16px;
        border: 1px solid #999;
        padding: 5px 10px;
        border-radius: 25px;
        line-height: 16px;
        color: #333;
      }
    }
    .musicContent{
      padding: 0 10px;
      font-size: 16px;
      .myMusic{
        height: 100%;
        position: relative;
        .musicItem{
          margin-right: 10px;
          // word-wrap: break-word;
        }
        img{
          width: 100%;
          height: 150px;
          border-radius: 10px;
        }
        .playCount{
          position: absolute;
          top: 2px;
          right: 5px;
          color: #fff;
          font-size: 14px;
          display: flex;
          justify-content:space-around;
          align-items: center;
          .icon{
            fill: #fff;
            width: 20px;
            height: 18px;
          }
        }
        .name{
          font-size: 15px;
          color: #000;
        }
      }
    }
  }
</style>