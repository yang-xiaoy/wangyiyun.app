<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="itemTopLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a-shipinbofang"></use>
        </svg>
        <span class="play">播放列表</span>
        <span class="count">(共{{itemList.length}}首)</span>
      </div>
      <div class="itemTopRight">
        <span class="add">+</span>
        <span class="sou">收藏({{subscribedCount}})</span>
      </div>
    </div>
    <div class="itemList" v-for="(item,i) in itemList" :key="item">
      <div class="itemListLeft" @click="playMusic(i)">
        <span class="sort">{{i+1}}</span>
        <div class="text">
          <p class="title">{{item.name}}</p>
          <span class="author" v-for="nick in item.ar" :key="nick">{{nick.name}}</span>
        </div>
      </div>
      <div class="itemListRight">
        <svg class="icon" aria-hidden="true" v-if="item.mv !=0">
          <use xlink:href="#icon-shipinbofang"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-caidan"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  setup(props){
    console.log(props)
  },
  props:['itemList','subscribedCount'],
  methods:{
    playMusic:function(i){
      this.updatePlayList(this.itemList);
      this.updatePlayListIndex(i);
    },
    ...mapMutations(['updatePlayList','updatePlayListIndex']),
  }
}
</script>

<style lang="less" scoped>
.itemMusicList{
  padding: 20px 10px 0 10px;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 10;
  .itemListTop{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    line-height: 30px;
    .itemTopLeft{
      .icon{
        margin-right: 5px;
        vertical-align:-5px;
      }
      .play{
        font-weight: 700;
      }
      .count{
        font-size: 14px;
        color: #999;
        margin-left: 5px;
      }
    }
    .itemTopRight{
      border: 1px solid #f40;
      color: #fff;
      background: #f40;
      padding: 0 8px;
      border-radius: 20px;
      font-weight: normal;
      font-size: 14px;
      .add{
        margin-right: 5px;
      }
    }
  }
  .itemList{
    width: 100%;
    padding-top: 15px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    .itemListLeft{
      width: 50%;
      display: flex;
      align-items: center;
      .text{
        margin: 0 0 8px 20px;
        .title{
          width: 150px;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .author{
          color: #999;
          width: 150px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .sort{
        color: #999;
      }
     
    }
    .itemListRight{
      .icon{
        margin-left: 10px;
        width: 28px;
        height: 30px;
        color: #999;
      }
    }
  }
}
</style>