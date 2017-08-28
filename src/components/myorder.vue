<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h3 class="panel-title text-center">我的订单</h3>
    </div>
      <div class="table-responsive">
        <table class="table table-striped table-hover table-bordered ">
          <thead class="text-center">
            <tr>
              <th class="text-center">订单编号</th>
              <th class="text-center">菜品</th>
              <th class="text-center">订单金额</th>
              <th class="text-center">收货人</th>
              <th class="text-center">
                <select v-model="orderTime">
                  <option value="0" selected>所有时间</option>
                  <option value="1">最近1小时</option>
                  <option value="2">最近2小时</option>
                  <option value="3">最近3小时</option>
                </select>
              </th>
              <th class="text-center">
                <select v-model="status.status">
                  <option value="0" >所有状态</option>
                  <option value="1">待付款</option>
                  <option value="2">准备中</option>
                  <option value="3">配送中</option>
                  <option value="4">已完成</option>
                </select>
              </th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="obj in accord" class="text-center ">
                <td>{{formatDid(obj.oid)}}</td>
                <td>
                  <span v-for="dish in obj.productlist" >
                   <router-link :to="'/detail/'+dish.did">
                    <img class="img-responsive" :src="'../../static/img/'+dish.img_sm">
                   </router-link>
                  </span>
                </td>
                <td>
                  {{'￥'+obj.sumprice}}<br>
                  {{formatPayment(obj.payment)}}
                </td>
                <td>
                  {{ obj.revName}}<br>
                  {{obj.orderPhone}}
                </td>
                <td>
                  {{formatDate(obj.orderTime)}}<br>
                  {{formatTime(obj.orderTime)}}
                </td>
                <td>
                  <span class="">
                    {{formatStatus(obj.status)}}
                  </span><br>
                  <button v-if="obj.status==1"  >去支付</button>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
  </div>
</template>
<script>
  export default{
//    保存手机号和当前输入的符合要求时间的订单时间
    data: function () {
      return {
        phone: '',
        orderTime: 0
      }
    },
    computed: {
//      根据状态筛选符合订单数据
      accord () {
        return this.data.filter((obj) => {
          return ((parseInt(obj.status) == this.status.status) || (this.status.status == 0)) && (this.orderTime == 0 || new Date() - obj.orderTime < this.orderTime * 3600000)
        })
      }
    },
    methods: {
//      格式化订单编号
      formatDid (input){
        return 1000000 + input
      },
//      格式化支付方式
      formatNum (input){
        return input < 10 ? '0' + input : input
      },
//      格式化日期
      formatDate (input) {
        var date = new Date(parseInt(input))
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      },
//      格式化订单状态数据
      formatStatus (input){
        switch (input) {
          case '1':
            return '待付款';
            break;
          case '2':
            return '准备中';
            break;
          case '3':
            return '配送中';
            break;
          case '4':
            return '已完成';
            break;
        }
      },
//      格式化时间
      formatTime (input){
        var date= new Date(parseInt(input))
        return this.formatNum(date.getHours()) + ':' + this.formatNum(date.getMinutes()) + ':' + this.formatNum(date.getSeconds())
      },
//      格式化时间位数显示
      formatPayment (input) {
        switch (input){
          case '0': return '微信支付' ;break;
          case '1': return '银联支付';break;
          case '2': return '餐到付款';break;
          case '3': return '支付宝支付';break;
        }
      }
    },
//    共享center中的订单数据
    props: ['status','data']
  }
</script>

<style scoped>
  button{
    color:white;
    background-color: #337ab7;
    margin: 5px;
    border-radius: 30px;
    padding: 2px;
  }
  button:hover{
    padding: 4px;
  }
  img{
    display: inline-block;
    float:left;
    margin: 5px;
    border: 3px solid #e0e0b4;
    border-radius:5px ;
  }
  .table tbody tr td{
    vertical-align: middle;
  }
  tr td:nth-child(2){
    max-width: 258px;
  }
  tr td:nth-child(3){
    min-width: 70px;
  }


</style>
