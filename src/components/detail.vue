<template>
  <div>
    <div class="container">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class=" panel-primary text-center"> {{data.name}} </h4>
        </div>
        <div class="panel-body" v-if="data.img_lg">
          <img :src="'../../static/img/'+data.img_lg" class=" img-responsive center-block" alt="">
          <div class="text-justify">
            <p class="well">{{data.material}}</p>
            <p>{{data.detail}}</p>
            <p class="text-danger" id="price">{{'￥' + data.price}}</p>
          </div>
        </div>
        <div class="panel-footer">
          <div class="text-right">
            <span @click="addToCart(1)" class="btn ">我要订餐</span>
            <span @click="addToCart(2)" class="btn ">加入购物车</span>
            <router-link to="/main" class="btn" id="back">我再看看</router-link>
          </div>
        </div>
      </div>
    </div>
    <My-Modal ref="modal" :data="dataForModal"></My-Modal>
  </div>

</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import router from '../router/index'
  import Modal from './modal.vue'
  export default{
//    模态对话框组件
    components: {
      MyModal: Modal
    },
    data: function () {
      return {
//        服务器返回的数据
        data: {},
//        main页面传输的数据
        id: this.$route.params.id,
//        模态对话框初始数据
        dataForModal: {
          content: "添加失败！错误消息：",
          resolveName: '去结算',
          route: '/shopcart'
        }
      }
    },
    methods: {
//      添加到购物车
      addToCart (type) {
        if (!sessionStorage['phone']) {
          router.push('/notlogin')
          return
        }
        axios.post('http://127.0.0.1/leirensheng/php/cart_product_add.php', qs.stringify({
          uphone: sessionStorage['phone'],
          pid: this.id
        }))
          .then((res) => {
            if (res.data.code === 1) {
              if (type == 1) {
                router.push('/shopcart')
              }
              else {
                this.dataForModal.content = '商品成功添加到购物车！该商品已购买的数量：' + res.data.count
                this.$refs.modal.active()
              }
            }
            else {
              this.dataForModal.content = '添加失败！错误消息：' + res.data.msg
              this.$refs.modal.active()
            }
          })
      }
    },
//    开始加载时请求数据
    mounted () {
      axios.get(`http://127.0.0.1/leirensheng/php/dish_getbyid.php?did=${this.id}`).then((res) => {
        this.data = res.data

        this.$set(this.data, 'count', 0)
      }).catch((err) => console.log(err))
    }

  }
</script>

<style scoped>
  .panel > .panel-heading {
    padding: 3px;
    background-color: #1e89e0;
    color: white;
  }

  .panel-footer span {
    background: #1e89e0;
    color: white;
  }

  #back {
    background: orange;
    color: white;
  }

  .panel-footer span:hover {
    cursor: pointer;
    font-size: 1.1em;
  }

  #back:hover {
    cursor: pointer;
    font-size: 1.1em;
  }

  #price {
    font-size: 1.5em;
    float: right;
  }
</style>
