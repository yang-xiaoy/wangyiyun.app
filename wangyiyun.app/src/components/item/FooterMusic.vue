<template>
  <div class="footerMusic">
    <div class="footerMusicLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <span class="text">{{playList[playListIndex].name}}</span>
    </div>

    <div class="footerMusicRight">
      <svg class="icon" aria-hidden="true" @click="play()" v-if="isbtnShow">
        <use xlink:href="#icon-a-shipinbofang"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" @click="play()"  v-else>
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <!-- audio标签加上controls属性就可以显示播放器了，可以测试音乐是否能播放 -->
    <audio ref="audio"  :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `"></audio>
    <van-popup :show="detailShow" position="right" :style="{ height: '100%',width:'100%' }">
      <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"/>
    </van-popup>
  </div>
</template>

<script>
import MusicDetail from '@/components/item/MusicDetail.vue'
import {mapMutations, mapState} from 'vuex'
export default {
  data(){
    return{
      timer:0,    // 定义定时器变量
    }
  },
  computed:{
    ...mapState(['playList','playListIndex','isbtnShow','detailShow']),
  },
  mounted(){
    // console.log(this.$refs)
     this.$store.dispatch('getLyric',this.playList[this.playListIndex].id);
  },
  updated(){
    this.$store.dispatch('getLyric',this.playList[this.playListIndex].id);
    this.addDuration();
  },
  methods:{
    play:function(){
      if(this.$refs.audio.paused){
        this.$refs.audio.play();   // 播放
        this.updateIsbtnShow(false);

        this.updatedTime();
      }else{
        this.$refs.audio.pause();  // 暂停
        this.updateIsbtnShow(true);
        clearInterval(this.timer);
      }
    },
    addDuration:function(){
      this.updateDuration(this.$refs.audio.duration);
    },
    updatedTime:function(){
      this.timer=setInterval(()=>{
        this.updateCurrentTime(this.$refs.audio.currentTime);
      },1000);
    },
    ...mapMutations(['updateIsbtnShow','updateDetailShow','updateCurrentTime','updateDuration']),
  },
  watch:{
    playListIndex:function(){      // 监听下标，如果下标发生了改变自动播放音乐 
      this.$refs.audio.autoplay = true;
      if(this.$refs.audio.paused){ // 如果本来是暂停转台，改变图标
        this.updateIsbtnShow(false);
      }
    },
    playList:function(){
      if(this.isbtnShow){
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    }
  },
  commponents:{
    MusicDetail
  }
}
</script>

<style lang="less" scoped>
  .footerMusic{
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
    height: 69px;
    border-top: 0.5px solid rgba(228, 227, 227,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .footerMusicLeft{
      display: flex;
      align-items: center;
      width: 50%;
      img{
        width: 50px;
        height: 50px;
        border: 1px solid #999;
        border-radius: 50%;
        margin-right: 10px;
      }
      .text{
        width: 100%;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .footerMusicRight{
      display: flex;
      justify-content: space-around;
      .icon{
        margin-left: 20px;
        width: 26px;
        height: 26px;
        fill: #666;
      }
      .bofang{
        width: 24px;
        height: 24px;
      }
    }
  }
</style>