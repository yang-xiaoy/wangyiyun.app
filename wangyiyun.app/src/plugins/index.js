// 集中管理 vant 插件
import { Swipe, SwipeItem ,Button,Popup } from 'vant';

let plugins = [
  Swipe,
  SwipeItem,
  Button,
  Popup 
];

export default function getVant(app){
  plugins.forEach((item)=>{
    return app.use(item);
  })
}