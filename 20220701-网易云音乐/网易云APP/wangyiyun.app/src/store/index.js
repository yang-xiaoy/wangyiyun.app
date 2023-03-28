import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item';
import { getPhoneLogin } from '@/request/api/home';
export default createStore({
  state: {
    playList:[
      {
        // 播放列表的默认值(默认值取自ItemmusicList里面)
        al:{
          id: 512812,
          name: "幸福的味道",
          pic: 109951165164767650,
          picUrl: "https://p1.music.126.net/VLPzBp6tHFXe7DYCWJVqmw==/109951165164767650.jpg",
          pic_str: "109951165164767650"
        },
        id:5267808,
        ar: [
          {id: '16874',name: "木村弓"},
          {id: 231900,name: '奥户巴寿'}
        ],
        name:'幸福的味道'
      }
    ],
    playListIndex:0,     // 默认的播放下标为0 
    isbtnShow:true,      // 暂停按钮显示
    detailShow:false,    // 歌曲详情页显示
    lyricList:[],        // 歌词
    currentTime:0,       // 当前时间
    duration:0,          // 歌曲总时长
    isLogin:false,       // 判断用户是否登录，默认为false
    isFooterMusic:true,  // 判断底部组件是否需要显示，在login页面时不需要显示的
    token:'',            // 用户登录成功后存储token
    user:{}              // 用户信息
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.isbtnShow = value;
    },
    pushPlayList:function(state,value){
      state.playList.push(value);
    },
    updatePlayList:function(state,value){
      state.playList = value;
    },
    updatePlayListIndex:function(state,value){
      state.playListIndex = value;
    },
    updateDetailShow:function(state){
      state.detailShow = !state.detailShow;
    },
    updateLyricList:function(state,value){
      state.lyricList = value;
    },
    updateCurrentTime:function(state,value){
      state.currentTime = value;
    },
    updateDuration:function(state,value){
      state.duration = value;
    },
    updateIsLogin:function(state,value){
      state.isLogin = true;
    },
    updateToken:function(state,value){
      state.token == value;
      localStorage.setItem('token',state.token);
    },
    updateUser:function(state,value){
      state.user = value;
    }
    
  },
  actions: {
    getLyric: async function(context,value){
      let res = await getMusicLyric(value);
      console.log(res);
      context.commit("updateLyricList",res.data.lrc);
    },
    getLogin: async function(context,value){
      let res = await getPhoneLogin(value);
      // console.log(res);
      return res
    }
  },
  modules: {
  }
})
