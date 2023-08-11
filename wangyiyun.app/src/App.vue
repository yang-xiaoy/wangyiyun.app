<template>
  <div>
    <router-view/>
    <FooterMusic v-show="$store.state.isFooterMusic"/>
  </div>
  
  
</template>

<script>
import FooterMusic from '@/components/item/FooterMusic.vue'
export default {
  setup() {
    
  },
  components:{
    FooterMusic,
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  // iconfont 使用的Symbol类型图标它的大小设置方式是width，height，有彩色图标。
  width: 22px;
  height: 22px;
}
</style>
