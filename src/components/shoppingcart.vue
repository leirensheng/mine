<template>
<div id="main">
  <div class="container">
    <div>
      <div v-if="!submited"  >
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">填写并核对订单信息 </h3>
          </div>
          <div class="panel-body row">
            <div class="col-md-6 col-xs-12">
              <table id="cart" class="table">
                <thead>
                <tr>
                  <th>
                    <input type="checkbox" v-model="selAll"/>
                    <label >全选</label>
                  </th>
                  <th>商品</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>小计</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(obj,index) in cartdata" >
                  <td>
                    <input type="checkbox" v-model="obj.selected"/>
                    <input type="hidden" value="1" />
                    <div><img :src="'../../static/img/'+obj.img_sm" class=" img-responsive center-block" alt="">
                    </div>
                  </td>
                  <td><a href="">{{obj.name}}</a></td>
                  <td>{{obj.price}}</td>
                  <td>
                    <button @click="decrease(index)">-</button><input type="text" v-model="obj.count"/><button @click="increase(index)">+</button>
                  </td>
                  <td><span v-text="sum[index]"></span></td>
                  <td><a @click="warn(index)">删除</a></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-6 col-xs-12" >
              <div class="alert ">
                <form>
                  <div class="form-group">
                    <label for="user" class="">联系人：</label>
                    <input type="text" id="user" v-model="rcvName" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="orderphone" class="" >联系电话：</label>
                    <input  type="tel" id="orderphone" name="phone"  v-model="orderPhone" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="address" class="">收货地址：</label>
                    <input type="text" id="address" v-model="addr" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="other" class="">订单备注：</label>
                    <input type="text" id="other" v-model="other" class="form-control">
                  </div>
                  <div class="form-group">
                    <label  class="">付款方式：</label>
                    <div class="row">
                      <div class=" col-xs-6 col-sm-3" >
                        <span :class="class0[0]" @click="pay(0)">微信支付</span>
                      </div>
                      <div class="col-xs-6 col-sm-3">
                        <span :class="class0[1]" @click="pay(1)">银联支付</span>
                      </div>
                      <div class="col-xs-6 col-sm-3">
                        <span :class="class0[2]" @click="pay(2)">餐到付款</span>
                      </div>
                      <div class="col-xs-6 col-sm-3">
                        <span :class="class0[3]" @click="pay(3)">支付宝支付</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <footer id="cart_footer">
          <div class="container row">
            <div class="col-xs-1 col-sm-6">
              <transition  enter-active-class="rotateInUpLeft" leave-active-class="zoomOutRight">
                <button class="btn btn-primary animated"  v-show="cartdata.some((val)=> val.selected==true)" @click="footerDel">删除</button>
              </transition>
            </div>
            <b>
              总价：<span>￥{{all}}</span>
              <button class="btn btn-primary" disabled v-if="state==1">￥30起送</button>
              <button class="btn btn-primary" disabled v-if="state==2">请输入收货信息</button>
              <button  class="btn btn-primary"  v-if="state==3" @click="toSubmit" :disabled="submiting">提交订单</button>
            </b>
          </div>
        </footer>
        <div id="shine"></div>
      </div>
      <transition  enter-active-class="rotateInUpLeft" leave-active-class="zoomOutRight">
        <div v-if="submited" class="animated" >
        <div class="panel-default panel" >
          <h2  class="text-primary text-center">订单提交成功！
        <span class="animated " >{{seconds}}</span>秒跳转到{{payed[0]}}页面！
      </h2>
        </div>
      </div>
      </transition>
    </div>
  </div>
  <div class="modal" id="mymodal-data" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog"id="modal">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
          <h4 class="modal-title">温馨提示</h4>
        </div>
        <div class="modal-body">
          <p>确认删除?</p>
        </div>
        <div class="modal-footer">
          <router-link   to="/shopcart"><button class="btn btn-primary" data-dismiss="modal" @click="del(curIndex)">确定</button></router-link>
          <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import Promise from 'promise'
  import router from '../router/index'
  export default{
//    加载完毕从服务器中获取数据获取数据，添加属性
    mounted () {
      if (sessionStorage['phone']) {
        axios.post('http://127.0.0.1/leirensheng/php/cart_detail_select.php', qs.stringify({uphone: sessionStorage['phone']}))
          .then((res) => {
//            往data中添加属性，保存初始订单菜品数量和菜品是否选中的状态
            res.data.forEach((obj, index, arr) => {
              this.$set(arr[index], 'initCount', obj.count)
              this.$set(arr[index], 'selected', false)
            })
            this.cartdata = res.data
          })
      }
      else {
        router.push('/notlogin')
      }
    },
    data: function () {
      return {
//        菜品数量是否被用户修改
        modified: false,
//        保存购物车数据
        cartdata: [],
//        保存用户手机号
        phone: sessionStorage['phone'],
//        保存订单接收人手机号，默认当前用户手机号
        orderPhone: sessionStorage['phone'],
//        保存接收人名称
        rcvName: '',
//        保存收货地址
        addr: '',
//        保存备注
        other: '',
//        保存付款方式
        payment: '',
//        保存付款方式样式
        class0: [{active: true}, {active: false}, {active: false}, {active: false}],
//        保存是否提交
        submited: false,
//        保存倒计时间
        seconds: 3,
//        保存往订单完成后显示的数据
        payed: ['支付', './main'],
//          保存着删除按钮传入的索引号
        curIndex: '',
//        保存着是否提交的状态
        submiting: false,
//        保存是否全选
        selAll: false
      }
    },
    computed: {
//      一个菜品的总价
      sum () {
        return this.cartdata.map(obj => obj.price * obj.count)
      },
//      所有菜品总价
      all () {
        if (this.sum.length === 0) return
        return this.sum.reduce((a, b) => a + b)
      },
//      提交按钮3种状态
      state () {
        if (this.all < 30) {
          return 1
        }
        else if (this.rcvName && this.phone && this.addr) {
          return 3
        }
        else {
          return 2
        }
      }
    },
    methods: {
//      减少数量
      decrease (index) {
        if (this.cartdata[index].count === 1) {
          this.warn(index)
          return
        }
        this.cartdata[index].count--
      },
//      增加数量
      increase (index) {
        this.cartdata[index].count++
      },
//      根据传入的索引号弹出具有不同内容的模态框
      warn (index) {
        this.curIndex = index
        $('#mymodal-data').modal()
      },
//      往服务器中删除数据
      del (index) {
        axios.post('http://127.0.0.1/leirensheng/php/cart_detail_delete.php', qs.stringify({detailid: this.cartdata[index].detailid}))
          .then((res) => {
            if (res.data.msg !== 'succ') {
              alert('删除失败')
            }
          })
        this.cartdata.splice(index, 1)
      },
//      footer中的删除操作
      footerDel () {
        for (var i = this.cartdata.length - 1; i >= 0; i--) {
          if (this.cartdata[i].selected) {
            this.del(i)
          }
        }
      },
//      根据用户选择的付款方式进行处理
      pay (index) {
        this.class0.forEach((val, index0, arr) => {
          arr[index0].active = false
        })
        this.class0[index].active = true
        this.payment = index
      },
//      提交时处理
      toSubmit () {
//        禁用提交按钮
        this.submiting = true
//        arr数组保存promise对象
        var arr = [], p
        this.cartdata.forEach((obj) => {
//          如果用户修改了购买数量，更新服务器数据
          if (obj.count !== obj.initCount) {
            p = axios.post('http://127.0.0.1/leirensheng/php/cart_update.php?', qs.stringify({
              detailid: obj.detailid,
              count: obj.count
            }))
              .then((res) => {
                if (res.data.msg !== 'succ') {
                  alert('更新失败')
                }
              })
            arr.push(p)
          }
        })
//        保证购物车商品数量更新完毕后再发起添加订单请求
        Promise.all(arr).then(() => {
          axios.post('http://127.0.0.1/leirensheng/php/order_add.php', qs.stringify(
            {
              rcvName: this.rcvName,
              addr: this.addr,
              sumprice: this.all,
              payment: this.payment,
              userPhone: this.phone,
              orderPhone: this.orderPhone
            }))
            .then((res) => {
              if (res.data.msg !== 'succ') {
                this.submiting = false
                alert('提交失败，错误原因为:' + res.data.msg)
              }
              else {
                this.submited = true
//                如果是餐到付款的方式，跳转到订单页面
                if (this.payment === 2) {
                  this.payed[0] = '订单'
                  this.payed[1] = './center/myorder'
                }
                setInterval(() => {
                  this.seconds--
                  if (this.seconds === 0) {
                    router.push(this.payed[1])
                  }
                }, 1000)
              }
            })
            .catch((err) => console.log(err))
        })
      }
    },
    watch: {
      cartdata: {
        handler (curVal) {
//          输入数量有误处理
          curVal.forEach((obj, index, arr) => {
            if (obj.count < 1) {
              alert('输入有误!')
              arr[index].count = 1
            }
          })
//         每个菜品选择状态影响全选状态
          if (curVal.some((obj) => obj.selected == false)) {
            this.selAll = false
          }
          else this.selAll = true
        },
        deep: true
      },
//      全选状态变化，影响每个菜品选择状态
      selAll: {
        handler (curVal) {
          if (curVal === true) {
            this.cartdata.forEach((obj, index, arr) => {
              arr[index].selected = true
            })
          }
//          如果在所有商品都选中的情况下，某一商品取消选择，不进行操作
          else if (this.cartdata.filter( obj=>obj.selected === false).length === 1) {
            return
          }
          else {
            this.cartdata.forEach((obj, index, arr) => {
              arr[index].selected = false
            })
          }
        }
      }
    }
  }
</script>

<style scoped>
  #modal{
    margin: 20% auto;
    width:  40%;
  }
    .form-group .row>div{
      padding: 0px;
    }
   .form-group span{
     box-sizing: border-box;
    display: inline-block;
    margin: 3px 10px;
    padding: 5px;
    border-radius: 5px;
     background-color: #fcfffa;
    border: 3px solid transparent;
  }
  .form-group .active{
    border: 3px solid red;
  }

  b{
    display: inline-block;
    float: right;
  }
  #cart
  {
    border: 1px solid #f1f1f1;
    border-top:1px solid #aaa;
    width:100%;
    background-color: #fcfffa;
    margin:0px auto;
    margin-top:36px;
    border-collapse: collapse;
  }
  #cart td,#cart th{
    min-height:40px;
    line-height:40px;
    border-top:1px solid #f1f1f1;
    border-bottom:1px solid #f1f1f1;
    padding:5px;
    vertical-align: middle;
    text-align: left;
  }
  #cart thead input{
    vertical-align: middle;
  }
  #cart tbody input[type='checkbox']{
    float:left;
    margin-right: 10px;
  }
  #cart tbody div{
    border:1px solid #f1f1f1;
    padding:5px;
    float:left;
    width:90px;
    height:80px;
    text-align: center;
  }
  #cart tbody img {
    width:90%;
  }
  #cart a
  {
    text-decoration:none;
    color:#666;
  }
  #cart a:hover
  {
    color:#E4393C;
  }
  #cart tbody td{
    vertical-align: middle;
  }
  #cart tbody td span{
    font-weight: bold;
  }

  #cart tbody td input[type='text']{
    border:1px solid #CACBCB;
    border-left:0;
    border-right:0;
    height:20px;
    width:30px;
    padding:0;
    text-align: center;
  }
  #cart tbody td button{
    border:1px solid #CACBCB;
    height:20px;
    width:20px;
    padding:0;
    background-color: #fff;
    box-sizing:content-box;
    display: inline-block;
    font: 12px "microsoft yahei", Arial, Helvetica, sans-serif;
  }
  #cart_footer{
    position: fixed;
    width:100%;
    height:80px;
    bottom:0px;
    left:0px;
    background-color: #fff;
    box-shadow: 0 -1px 8px rgba(0,1,1,.08);
    z-inxe:10000;
  }
   #cart_footer>div>div{
     display: inline-block;
   }
   #cart_footer>div>div>button{
     background-color:#E54346;
     border:0;
     color: #fff;

     text-align: center;
     font-size: 15px;
     font-weight: bold;
     font-family: "microsoft yahei";
     padding: 8px;
   }
   #cart_footer>.container b{
     display: inline-block;
     float: right;
   }
  #cart_footer>.container{
    margin:10px auto;
    line-height: 52px;
  }
  #cart_footer>div span{
    font-size: 16px;
    color: #e4393c;
    font-weight: 700;
  }
  #cart_footer>div>b>button{
    display: inline-block;
    background-color:#E54346;
    border:0;
    color: #fff;
    width: 150px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    font-family: "microsoft yahei";
    margin-left:5px;
    padding: 13px;
  }

  #cart tbody img{
    transition: transform 0.5s linear;
  }

  #cart tbody img:hover{
    transform:scale(1.1);
  }

  /*#cart:hover::before{*/
    /*transition: left 3s;*/
    /*left: 30%;*/

  /*}*/
  #cart:before{
    content: "";
    position: absolute;
    width: 80px;
    height: 400px;
    top: 180px;
    left: -150px;
    overflow: hidden;
    background-image: linear-gradient(to right,rgba(255,255,255,0.2) 0,rgba(255,255,255,0.8) 50%,rgba(255,255,255,0.2) 100%);
    transform: skewX(-25deg);
  }
</style>
