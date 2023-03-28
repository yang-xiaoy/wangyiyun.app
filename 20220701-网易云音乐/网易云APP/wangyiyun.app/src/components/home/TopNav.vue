<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caidan"></use>
      </svg>
    </div>

    <div class="tabContent">
      <span @click="$router.push('/infoUser')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>

    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.topNav{
  width: 100%;
  height: 50px;
  padding: 0 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tabContent{
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    align-items: center;

    .active{
      font-weight: 700;
    }
  }

}
</style>