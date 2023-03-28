<template>
  <div>
    <ItemMusicTop :playlist="state.playlist"/>
    <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"/>
  </div>
</template>

<script>
// useRoute 里面可以拿到路由参数
import {useRoute} from 'vue-router'
import {getItemMusicList,getItemList} from '@/request/api/item.js'
import {onMounted,reactive} from 'vue'

import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'
export default {
  setup(){
    const state = reactive({
      // 歌单详情页
      playlist:{},
      itemList:[],

    });
    onMounted(async ()=>{
      // var id = useRoute().query.value.id; 在控制台可以看到value颜色不一样，说明id是query下面的属性，可以直接拿值
      var id = useRoute().query.id;
      // 获取歌单详情
      let res = await getItemMusicList(id);
      state.playlist = res.data.playlist
      // console.log(res)

      // 获取歌单歌曲
      let result = await getItemList(id);
      state.itemList = result.data.songs

      // 防止页面刷新数据丢失，将数据保存在sessionStorage中
      sessionStorage.setItem('itemDetail',JSON.stringify(state))
    });
    return { state};
  },
  components:{
    ItemMusicTop,
    ItemMusicList
  }
}
</script>

<style lang="less" scoped>

</style>