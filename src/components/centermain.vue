<template>
  <div class="box">
    <div class="top row">
      <div class="top_left  col-xs-8 col-sm-6">
        <div>
            <ul>
              <li>
                <img src="../../static/img/user_header_1.jpg" alt="">
              </li>
              <li>
                <transition enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
                  <p class="badge animated" id="great" v-show="greatment">{{greatment}}</p>
                </transition>
              </li>
              <li>
                <p>修改个人信息</p>
              </li>
            </ul>

        </div>
      </div>
      <div class="top_right col-xs-12 col-sm-6">
        <div>
          <ul>
            <li>账户安全：<span>一般</span></li>
            <li>绑定邮箱：<span>尚未绑定</span></li>
            <li>手机：<span>{{phone}}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bottom ">
      <ul class="row">
        <li class="col-xs-push-3 col-xs-12 col-sm-push-0 col-sm-6">
          <img src="../../static/img/portal-icon-1.png" alt="" class="img-responsive">
          <div>
            <h4>待支付订单：<span>{{statusCount(1)}}</span></h4>
            <p @click="tomyOrder(1)">查看待支付订单></p>
          </div>
        </li>
        <li class="col-xs-push-3 col-xs-12 col-sm-push-0 col-sm-6">
          <img src="../../static/img/portal-icon-2.png" alt="">
          <div>
            <h4>待收货订单：<span>{{statusCount(3)}}</span></h4>
            <p @click="tomyOrder(3)">查看待收货订单></p>
          </div>
        </li>
        <li class="col-xs-push-3 col-xs-12 col-sm-push-0 col-sm-6">
          <img src="../../static/img/portal-icon-3.png" alt="">
          <div>
            <h4>准备中订单：<span>{{statusCount(2)}}</span></h4>
            <p @click="tomyOrder(2)">查看准备中订单></p>
          </div>
        </li>
        <li class="col-xs-push-3 col-xs-12 col-sm-push-0 col-sm-6">
          <img src="../../static/img/portal-icon-4.png" alt="">
          <div>
            <h4>已完成订单：<span>{{statusCount(4)}}</span></h4>
            <p @click="tomyOrder(4)">查看已完成订单></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
//    根据当前时间输出问候信息
    mounted () {
      var hour = new Date().getHours()
      hour = parseInt(hour)
      if (hour < 6) {this.greatment = '凌晨好！'}
      else if (hour < 12) {this.greatment='早上好！'}
      else if (hour < 19) {this.greatment='下午好！'}
      else if (hour < 24) {this.greatment='晚上好！'}
    },
//    保存问候信息
    data: function () {
      return {
        greatment: '66',
        phone: sessionStorage['phone']
      }
    },
//    接收center传入的订单数据和2个方法
    props: ['data', 'tomyOrder', 'statusCount']
  }
</script>

<style scoped>
  #great{
    background-color: #1e89e0;
    margin-top: 10px;
  }
  div,ul,li{
    list-style: none;
    margin: 0;
    box-sizing: border-box;
  }
  .box{
    background-color: white;
    border: 1px solid ;
    border: 1px solid #e1e2e5;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
    background-color: white;
    padding: 0 50px 50px 50px;
  }
  .top{
    border-bottom: 1px solid #e1e2e5 ;
  }
  .top img{
    /*line-height: 147;*/
    border: 1px solid #e1e2e5;
    border-radius: 50%;
    width: 30%;
    text-align: center;
  }
  .top_right,.top_left{
    height: 233px;
  }
   ul{
    padding: 0px;
  }
  .top_right>div{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .top_left>div{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .top_left li{
    font-size: 1.2em;
  }
  .top_right li{
    padding: 10px;
    font-size: 1.2em;
  }
  .bottom{
    margin-top: 20px;
  }
  .bottom:after{
    clear: both;
    display: block;
    content: '';
  }
  .bottom img{
    /*position: absolute;*/
  }
  /*.bottom li{*/
    /*margin-top: 50px;*/
    /*float:left;*/
    /*width: 50%;*/
  /*}*/
  /*.bottom li>div{*/
    /*margin-left: 130px;*/
  /*}*/
  .bottom li>div p:hover{
    color:red;
    cursor: pointer;
  }
  .bottom span{
    color: red;
  }

</style>
