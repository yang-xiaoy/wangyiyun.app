<template>
  <div class="infouser">
    <h3>个人中心</h3>
    <img :src="user.data.profile.avatarUrl" class="img">
    <div class="nickname">{{user.data.profile.nickname}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed:{
    ...mapState(['user'])
  },
  mounted(){
    console.log(this.user)
  }
}
</script>
<style lang="less" scoped>
.infouser{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    text-align: center;
  }
  .nickname{
    font-size: 16px;
    text-align: center;
  }
}
</style>