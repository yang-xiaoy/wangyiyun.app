<template>
  <div class="musicDetail">
    <img :src="musicList.al.picUrl" alt="" class="bgimg">
    <div class="musicDetailTop">
      <div class="musicDetailTopLeft">
        <svg class="icon" aria-hidden="true" @click="backHome()">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="text">
          <Vue3Marquee> 
            <p class="title">{{musicList.al.name}}</p>
          </Vue3Marquee> 
          <span class="nickname" v-for="item in musicList.ar" :key="item">{{item.name}}</span>
        </div>
      </div>
      <div class="musicDetailTopRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-partake"></use>
        </svg>
      </div>
    </div>
    <div class="musicDetailContent" v-if="!isLyricShow">
      <img src="@/assets/needle-ab.png" alt="" class="needle-ab" :class="{'needle-ab-active':!isbtnShow}">
      <img src="@/assets/cd.png" alt="" class="cdImg">
      <img :src="musicList.al.picUrl" alt="" class="imgURL" :class="{imgURL_active:!isbtnShow,imgURL_pauesd:isbtnShow}" @click="isLyricShow=true">
    </div>
    <div class="musicLyric" ref="musicLyric" v-if="isLyricShow">
      <p v-for="item in lyric" :key="item" :class="{active:(currentTime*1000>=item.time && currentTime*1000<item.pre)}">{{item.lrc}}</p>
    </div>
    <div class="musicDetailBouttom">
      <div class="detailButtomTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-heijiaochangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liuyan"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon"></use>
        </svg>
      </div>
      <!-- 歌曲播放进度条 -->
      <div class="detailButtomContent">
        <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
      </div>
      <div class="detailButtom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyiqu101"></use>
        </svg>
        <svg class="icon start" aria-hidden="true" v-if="isbtnShow" @click="play">
          <use xlink:href="#icon-a-shipinbofang"></use>
        </svg>
         <svg class="icon end" aria-hidden="true" v-else @click="play">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon" aria-hidden="true"  @click="goPlay(1)">
          <use xlink:href="#icon-xiayiqu101"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import {Vue3Marquee} from  'vue3-marquee' 
import  'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'
export default {
  data(){
    return{
      isLyricShow:false
    }
  },
  computed:{
    ...mapState(['lyricList','currentTime','playListIndex','playList','duration']),
    lyric:function(){
      let arr;
      if(this.lyricList.lyric){
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
          let min = item.slice(1,3);
          let sec = item.slice(4,6);
          let mill = item.slice(7,10);
          let lrc = item.slice(11,item.length);

          // 将时间转化成毫秒
          let time = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill);

          if(isNaN(Number(mill))){
            mill = item.slice(7,9);
            lrc = item.slice(10,item.length);
            time = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill);
          }
          return {min,sec,mill,lrc,time}
        })
      }
      arr.forEach((item,i)=> {
        // 如果到了最后一句，就不会再获取下一句。isNaN(i+1).time是因为最后一句的time为NaN样式添不上去，所以就直接给她设置一个100000比较大的值。
        if(i===arr.length-1 || isNaN(i+1).time){
          item.pre = 100000;
        }else{
          item.pre = arr[i+1].time;
        }
      });
      console.log(arr)
      return arr
    }
  },
  mounted(){
    this.addDuration();
    // console.log(this.musicList)
    // console.log(this.lyricList.lyric)
  },
  props:['musicList','play','isbtnShow','addDuration'],
  methods:{
    ...mapMutations(['updateDetailShow','updatePlayListIndex']),

    backHome:function(){
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    goPlay:function(num){
      let index = this.playListIndex + num;
      if(index<0){
        index = this.playList.length-1;
      }else if(index == this.playList.length){
        index = 0;
      }
      this.updatePlayListIndex(index);
    }
  },
  watch:{
    currentTime:function(newValue){
      let p = document.querySelector('p.active');
      // console.log([p])   // 可以看到p里面信息
      if(p){
        if(p.offsetTop>300){
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if(newValue === this.duration){
        if(this.playListIndex === this.playList.length-1){
          this.updatePlayListIndex(0);
          this.play();
        }else{
          this.updatePlayListIndex(this.playListIndex+1);
        }
      }
    }
  },
  components:{
    Vue3Marquee
  }
}
</script>

<style lang="less" scoped>
  .musicDetail{  
    width: 100%;
    height: 100%;
    overflow: hidden;
    .bgimg{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      filter: blur(50px);
    }
    .musicDetailTop{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      width: 100%;
      height: 69px;
      .icon{
        fill: #fff;
        width: 28px;
        height: 28px;
      }
      .musicDetailTopLeft{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text{
          font-size: 16px;
          margin-left: 20px;
          .title{
            color: #fff;
            margin-bottom: 5px;
          }
          .nickname{
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }
    .musicDetailContent{
      width: 100%;
      height: 420px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
      position: relative;
      .needle-ab{
        height: 150px;
        z-index: 2;
        position: absolute;
        left: 40%;
        transform-origin: 0 0;
        transform: rotate(-18deg);
        transition: all 3s;
      }
      .needle-ab-active{
        height: 150px;
        z-index: 2;
        position: absolute;
        left: 40%;
        transform-origin: 0 0;
        transform: rotate(-5deg);
        transition: all 3s;
      }
      .cdImg{
        width: 300px;
        height: 300px;
        margin-top: -40px;
        position: absolute;
        top: 130px;
      }
      .imgURL{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        position: absolute;
        top: 140px;
        animation: rotate_img 10s linear infinite;
      }
      .imgURL_active{
        animation-play-state: running;
      }
      .imgURL_pauesd{
        animation-play-state: paused;
      }
      @keyframes rotate_img {
        0%{
          transform: rotateZ(0deg);
        }
        100%{
          transform: rotateZ(360deg);
        }
      }

    }
    .musicLyric{
      width: 100%;
      height: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: scroll;
      text-align: center;
      padding: 0 20px;
      p{
        font-size: 16px;
        color: rgb(206, 194, 194);
        margin-bottom: 20px;
      }
      .active{
        color: #fff;
        font-weight: 700;
      }
    }
    .musicDetailBouttom{
      width: 100%;
      padding: 30px 15px 0 15px; 
      position: absolute;
      bottom: 20px;
      .detailButtomTop{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .icon{
          fill: #fff;
          width: 28px;
          height: 28px;
        }
      }
      .detailButtomContent{
        .range{
          width: 100%;
          height: 3px;
        }
      }
      
      .detailButtom{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
          fill: #fff;
          width: 28px;
          height: 28px;
        }
        .start,.end{
          width: 38px;
          height: 38px;
        }
      }
    }
  }
</style>