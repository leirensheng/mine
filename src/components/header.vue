<template>
  <div class="navbar navbar-default navbar-fixed-top " id="nav">
    <div class="container" id="container">
      <nav class="navbar ">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <router-link to="/main" class="navbar-brand" href="#" id="icon">
              <span class="glyphicon glyphicon-apple"></span>首页
            </router-link>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-left">
              <!--<li ><router-link to="/main"><span id="home">首页</span> </router-link></li>-->
            </ul>

            <ul class="nav navbar-nav navbar-right">
              <li id="specialLi">
                <transition-group  enter-active-class="zoomInLeft" leave-active-class="zoomOutRight" id="tran" >
                  <div key="1" class="animated" v-if="!logined" >
                    <router-link to="/login"><span id="login">请登录</span></router-link>
                  </div>
                  <div  @mouseenter="handleEnter()" @mouseleave="handleLeave()" id="welcome"key="2" class="animated" v-else>
                    <span>欢迎回来<img src="../../static/img/user_header_1.jpg" alt=""></span>
                    <div id="panel">
                      <p>{{phone}}</p>
                      <p>会员等级</p>
                      <div class="progress">
                        <div class="progress-bar progress-bar-primary progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
                          <span id="member">白金会员</span>
                        </div>
                      </div>
                      <p><span @click="jump('/center/main')">个人中心</span><span>我的收藏</span></p>
                      <p><span>我的钱包</span><span>我的优惠</span></p>
                      <p @click="exit">退出</p>
                    </div>
                  </div>
                </transition-group>
              </li>
              <li><router-link to="/shopcart"><span id="mycart">我的购物车</span></router-link></li>
              <li><router-link to="/center/main"><span id="center">个人中心</span></router-link></li>
              <li> <router-link to="/regist"><span id="register">注册</span></router-link></li>
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>
    </div>
  </div>

</template>
<style scoped>
  #member{
    color: white;
  }
  #icon{
    font-size: 1.2em;
    color: white;
  }
  li{
    /*font-size: 1.2em;*/
  }
  #nav,#container{
    background-color: #1e89e0;
    /*height: 60px;*/

  }
  li,ul{
    overflow: visible;
  }
  #welcome>span{
    color: white;
  }
  #mycart,#register,#center,#login{
    color: white;

  }
  #mycart :hover{
    color: red ;
  }
 #login{
   color: white;
   font-size: 1.1em;
   line-height: 50px;
 }

 nav{
   margin-bottom:0 ;
   border: 0px;
   box-sizing: border-box;
 }
  a {
    text-decoration: none;
    color: white;
  }
 #welcome{
    text-align: center;
    margin-right: 5px;
  }
 #welcome img{
   display: inline-block;
   z-index: 3;
   position: absolute;
   top:3px;
   left:-50px;
   width: 40px;
   height: 40px;
   border-radius: 50%;
   transition: all 0.5s ;
 }
 #welcome>span{
   line-height: 50px;
 }
 #welcome img:hover{
   top:20px;
   transform:scale(1.3);
 }
  #panel{
    z-index: 2;
    color: black;
    opacity: 0;
    height: 0px;
    overflow: hidden;
    background-color: white;
    position: absolute;
    top:56px;
    left: -55px;
    width: 220px;
    font-family: "Microsoft Yahei";
    border: 1px solid #e1e2e5;
    box-sizing: border-box;
    border-top:transparent ;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
    transition: all 0.5s;
  }
 #panel p {
   padding: 0px;
  line-height: 40px;
   text-align: center;
   box-sizing: border-box;
 }
  #panel p span:hover{
    background-color: #9483e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
    cursor: pointer;
    color: white;
  }
 #panel p:nth-child(3) {
     border-bottom: 1px solid #f1f1f1;
   }
 #panel p:last-child {
   background-color: #f1f1f1;
   cursor: pointer;
 }
  #panel p:last-child:hover {
    background-color: #1e89e0;
    color: white;
  }
 #panel p {
   margin: 0px;
   padding: 0px;
   line-height: 40px;
   text-align: center;
 }
 #panel span {
   padding: 10px;
 }
 #panel p>span:first-child {
   margin-right: 30px;
 }
  ul{
    float: right;
    margin: 0px;
    padding: 5px;
    line-height: 50px;
  }
  ul>li{
    margin: 0 15px;
    line-height: 30px;
  }
  ul>li:hover{
    /*font-size: 1.1em;*/
    margin: 0 15px;
    line-height: 30px;
  }
  li.animated{
   display: inline-block;
 }
</style>
<style scoped>

</style>
<script>
  import router from '../router/index'
  export default{
//    保存是否登录状态、用户手机号
    data: function () {
      return {
        logined: false,
        phone: ''
      }
    },
//    加载完毕之后接收来自登录页面的登录信息
    mounted () {
      this.$root.$on('phone', (data)=> {
        this.logined = true;
        this.phone = data
      })
      this.phone=this.logined=sessionStorage['phone']
    },
    methods: {
//     鼠标进入下拉面板设置面板样式
      handleEnter() {
        $('#panel').css({opacity:1,height:240})
      },
//      鼠标离开下拉面板设置面板样式
      handleLeave() {
        $('#panel').css({opacity:0,height:0})
      },
//      注销登录清除sessionStorage，修改登录状态，跳转到详情页
      exit () {
        sessionStorage.removeItem('phone')
        this.logined = false
        router.push('/main')
      },
//      路由跳转
      jump(route){
        router.push(route)
      }
    }
  }
</script>
