<template>
  <div class="login">
    <p class="loginTitle">登录</p>
    <input type="text" placeholder="请输入手机号" name="phone" class="phone text" v-model="phone">
    <input type="password" placeholder="请输入密码" name="password" class="password text" v-model="password">
    <input type="submit" value="提交" class="submitBut" @click="login">
  </div>
</template>

<script>
import {getUserInfo} from '@/request/api/home.js'
export default {
  data(){
    return{
      phone:'',
      password:'',
    }
  },
  methods:{
    login: async function(){
      let res = await this.$store.dispatch('getLogin',{phone:this.phone,password:this.password});
      if(res.data.code === 200){  // 返回200说明登录成功跳转到个人中心页面
        this.$store.commit('updateIsLogin',true);
        this.$store.commit('updateToken',res.data.token);
        // 存储用户id
        let result = await getUserInfo(res.data.account.id);
        this.$store.commit('updateUser',result);
        this.$router.push('/infoUser');
      }else{
        alert('手机号或密码错误！');
        this.password = '';     // 清空密码
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  width: 100%;
  height: 100vh;
  background: lightblue;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  align-items: center;
  font-size: 14px;
  padding-top: 100px;
  .loginTitle{
    margin-bottom: 40px;
    font-size: 28px;
    letter-spacing: 20px;
    color: #fff;
  }
  .text{
    width: 80%;
    margin-bottom: 30px;
    height: 40px;
    padding-left: 20px;
    border: 1px solid rgb(220, 214, 214);
    border-radius: 20px;
  }
  .submitBut{
    width: 30%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid rgb(220, 214, 214);
    margin-top: 30px;
    background: #fff;
    font-size: 18px;
    letter-spacing: 10px;
  }
}
</style>