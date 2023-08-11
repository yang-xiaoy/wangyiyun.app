<template>
  <div class="iconList">
    <div class="iconItme">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      <span class="text">每日推荐</span>
    </div>
     <div class="iconItme">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shipin"></use>
      </svg>
      <span class="text">私人FM</span>
    </div>
     <div class="iconItme">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan1"></use>
      </svg>
      <span class="text">歌单</span>
    </div>
     <div class="iconItme">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang1"></use>
      </svg>
      <span class="text">排行榜</span>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.iconList{
  padding-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .iconItme{
     width: 25%;
     display: flex;
     flex-direction: column;
     align-items: center;
    .icon{
      width: 50px;
      height: 30px;
      display: block;
    }
    .text{
      margin-top: 5px;
      font-size: 14px;
    }
  }
}
</style>
