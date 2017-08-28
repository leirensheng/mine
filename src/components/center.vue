<template>
  <div class="container" id="container">
    <div class="out_box">
      <div class="row">
        <div class="left  col-xs-12 col-sm-3  ">
          <ul>
            <li>
              <h4 @click="jump('main')">我的订单</h4>
              <ul>
                <li @click="tomyOrder(0)">近三个月订单</li>
                <li @click="tomyOrder(1)">待付款订单
                  <transition  enter-active-class="zoomIn" leave-active-class="zoomOutRight">
                    <span v-show="statusCount(1)" class="badge animated">{{statusCount(1)}}</span>
                  </transition>
                </li>
                <li @click="tomyOrder(2)">准备中订单
                  <transition  enter-active-class="zoomIn" leave-active-class="zoomOutRight">
                    <span v-show="statusCount(2)" class="badge animated">{{statusCount(2)}}</span>
                  </transition>
                </li>
              </ul>
            </li>
            <li>
              <h4>我的资产</h4>
              <ul>
                <li>我的红包</li>
                <li>账户余额</li>
                <li>我的积分</li>
              </ul>
            </li>
            <li>
              <h4>我的资料</h4>
              <ul>
                <li>个人资料</li>
                <li>地址管理</li>
                <li>安全中心</li>
                <li @click="jump('modify')">修改密码</li>
              </ul>
            </li>
            <li>
              <h4>我的收藏</h4>
              <ul>
                <li></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="right  col-xs-12 col-sm-9  " >
          <div>
            <router-view :data="data"  :status="status" :tomyOrder="tomyOrder" :statusCount="statusCount"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import router from '../router/index'
  export default{
//    如果未登录跳转到登录页面，否则从服务器获取订单数据
    mounted () {
      if (sessionStorage['phone']) {
        this.phone = sessionStorage['phone']
        axios.get(`http://127.0.0.1/leirensheng/php/my_order.php?userPhone=${this.phone}`)
          .then((res) => {
            this.data = res.data
          })
      }
      else {
        router.push('/notlogin')
      }
    },
//    保存订单数据、用户手机号、手动选择的订单状态
    data: function () {
      return {
        data: [],
        phone: '',
        status: {status: 0}
      }
    },
    methods: {
//      路由跳转
      jump (route) {
        router.push(route)
      },
//      根据传入的订单状态跳转到订单详情页面
      tomyOrder (status) {
        this.status.status = status
        router.push('myorder')
      },
//      根据传入的订单状态返回符合条件的订单数
      statusCount (status) {
        return this.data.filter(obj=> obj.status == status).length
      }
    }
  }
</script>

<style scoped>
  .out_box{
    height: 100%;
    overflow: hidden;
  }
  ul,li,div,p{
    box-sizing: border-box;
  }
  ul{
    list-style: none;
    padding: 0;
    text-align: center;
  }
  li{
    cursor: pointer;
    padding: 0px;

  }
  ul,li{
    margin: 0;
    box-sizing: border-box;

  }
  .left{
    padding-right: 1px;
  }
  .left>ul{
    border: 1px solid #e1e2e5;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
    background-color: white;
  }
  .left h4{
    padding: 7px;
    margin: 0px;
    background-color: #1e89e0;
    color: white;
  }
  .left>ul>li{
    margin-bottom: 20px;
  }
  .left>ul>li>ul>li{
    margin: 5px;
    font-size: 1.3em;
    padding: 5px;
  }
  .left>ul>li>ul>li:hover{
    color: red;
  }
  .left>ul>li>ul>li>span{
    background-color: red;
  }
  .right{
    overflow: auto;
  }
  .right>div{
    margin-left: 5px;

  }
</style>
