<template>
  <div class="swipe">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from 'axios'
import {getBanner} from '@/request/api/home.js'
import {reactive,onMounted} from 'vue'

export default {
   setup() {
    const state = reactive({
      images:[],
    });
    onMounted(async ()=>{
      let res = await getBanner();
      state.images = res.data.banners
    });
    return { state };
  },
}
</script>

<style lang="less" scoped>
.swipe{
  .van-swipe{
    width: 100%;
    .van-swipe__track{

      .van-swipe-item{
        padding: 0 10px;
        img{
          width: 100%;
          height: 160px;
          border-radius: 10px;
        }
      }
    }
    .van-swipe__indicators{
      top: 148px;
    }
  }
}

</style>