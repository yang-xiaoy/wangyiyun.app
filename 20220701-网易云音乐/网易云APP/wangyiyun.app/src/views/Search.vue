<template>
  <div class="search">
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1);">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input type="text" class="text" placeholder="周杰伦" v-model="searchKey" @keydown.enter="enterKey">
    </div>
    <div class="searchHistory">
      <span class="title">历史</span>
      <span class="name" v-for="item in keyWorldList" :key="item" @click="searchHistory(item)">{{item}}</span>
      <svg class="icon" aria-hidden="true" @click="deleteHistory()">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <div class="searchList">
      <div class="searchListTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a-shipinbofang"></use>
        </svg>
        <p class="playSum">播放全部</p><span class="count">(共{{searchList.length}}首)</span>
      </div>
      <div class="searchListContent" v-for="(item,i) in searchList" :key="item">
        <div class="searchContentLeft" @click="updateIndex(item)">
          <span class="number">{{i+1}}</span>
          <div class="text">
            <span class="title">{{item.name}}</span>
            <span class="name" v-for="(item1,index) in item.artists" :key="index">{{item1.name}}</span>
          </div>
        </div>
        <div class="searchContentRight">
          <svg class="icon" aria-hidden="true" v-if="item.mvid">
            <use xlink:href="#icon-shipinbofang"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caidan"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSearchMusic} from '@/request/api/home.js'
export default {
  data(){
    return{
      keyWorldList:[],   // 关键字搜索的历史列表
      searchKey:'',      // 搜索的关键字，是一个字符串
      searchList:[],     // 搜索列表
    }
  },
  mounted(){
    this.keyWorldList = JSON.parse(localStorage.getItem('keyWorldList')) ? JSON.parse(localStorage.getItem('keyWorldList')) : [];
  },
  methods:{
    enterKey: async function(){
      if(this.enterKey !==""){
        this.keyWorldList.unshift(this.searchKey);
        // 使用Set将历史列表中的数据进行去重
        this.keyWorldList = [...new Set(this.keyWorldList)]; 
        // 当历史列表数据超过一定量时候，说明后面的数据很久没有搜索，从数据末尾开始删除数据 
        if(this.keyWorldList.length>10){
          this.keyWorldList.splice(this.keyWorldList.length-1,1);
        }
        localStorage.setItem('keyWorldList',JSON.stringify(this.keyWorldList));

        let res = await getSearchMusic(this.searchKey);
        console.log(res);
        // this.searchList = res.data.result.songs;
        this.searchKey = '';
      }
    },
    deleteHistory:function(){
      localStorage.removeItem('keyWorldList');
      this.keyWorldList = [];
    },
    searchHistory: async function(data){
        let res = await getSearchMusic(data);
        this.searchList = res.data.result.songs
    },
    updateIndex:function(item){
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url; 
      this.$store.commit('pushPlayList',item);
      this.$store.commit('updatePlayListIndex',this.$store.state.playList.length-1);
    }
  }
}
</script>

<style lang="less" scoped>
.search{
  padding: 10px;
  font-size: 16px;
  .searchTop{
    display: flex;
    align-items: center;
    .text{
      width: 85%;
      border: none;
      border-bottom: 1px solid #999;
      margin-left: 20px;
      padding: 5px;
    }
  }
  .searchHistory{
    margin: 20px 0;
    position: relative;
    .title{
      font-weight: 700;
      margin-right: 20px;
    }
    .name{
      background: rgb(222, 215, 215);
      padding: 5px 10px;
      border-radius: 20px;
      display: inline-block;
      margin: 5px;
      line-height: 20px;
    }
    .icon{
      position: absolute;
      right: -5px;
      top: 5px;
    }
  }
  .searchList{
    .searchListTop{
      display: flex;
      .icon{
        margin-right: 10px;
        fill: #666;
      }
      .playSum{
        font-weight: 700;
      }
      .count{
        font-size: 14px;
        color: #666;
        margin-left: 5px;
      }
    }
    .searchListContent{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
      .searchContentLeft{
        display: flex;
        align-items: center;
        .number{
          color: #666;
        }
        .text{
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          .title{
            font-weight: 700;
          }
          .name{
            font-size: 14px;
            color: #666;
          }
        }
      }
      .searchContentRight{
        .icon{
          width: 26px;
          height: 28px;
          margin-left: 10px;
          color: #666;
        }
      }
    }
  }
}
</style>