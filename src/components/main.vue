<script src="../../node_modules/_axios@0.16.2@axios/index.js"></script>
<template>
    <div class="container">
      <div class="form-group has-feedback ">
        <input type="text" class="form-control" placeholder="输入菜品或材料" v-model="kw">
        <span class="form-control-feedback glyphicon glyphicon-search"></span>
      </div>
      <transition-group  enter-active-class="zoomInLeft" >
        <div  class="list-group animated" v-for="obj in data " :key="obj">
          <a @click="jump(obj.did)" class="list-group-item" >
            <div class="media-left">
              <img :src="'../../static/img/'+obj.img_sm" class="media-object"/>
            </div>
            <div class="media-body">
              <h3>{{obj.name}}</h3>
              <p>{{obj.material}}</p>
              <p class="text-danger">{{'￥'+obj.price}}</p>
            </div>
          </a>
        </div>
      </transition-group>

      <button v-if="hasMore" class="btn btn-primary btn-block" @click="loadMore()">加载更多</button>
      <div class="text-center">
        <p v-if="!hasMore" class="well">没有更多数据可以加载了</p>
      </div>
    </div>
</template>
<script>
  import axios from 'axios'
  import router from '../router/index'
  export default{
    data: function () {
      return {
//        保存输入的关键字
        kw: '',
//        保存是否有更多数据的状态
        hasMore: true,
//        保存服务器返回的数据
        data: '',
//        服务器返回数据的备份
        copy: '',
//        保存定时器
        timmer: ''
      }
    },
    methods: {
//      路由跳转
      jump(id){
        router.push({path: '/detail/'+id
         })
      },
//      加载更多
      loadMore(){
        axios.get(`http://127.0.0.1/leirensheng/php/dish_getbypage.php?start=${this.data.length}`).then((res) => {
          if(res.data.msg!='kong'){
            this.data=this.data.concat(res.data)
          }
          else {
            this.hasMore=false
          }
        }).catch((err) => console.log(err))
      },
    },
    watch:{
      kw: function() {
        this.kw=this.kw.replace(/(^\s*)|(\s*$)/g,'')
//        变化间隔超过0.4s才有发请求的可能
        clearTimeout(this.timmer)
        this.timmer=setTimeout(()=>{
//            400毫秒过后如果此时为空也不用发起请求
          if(this.kw==''){
            this.data = this.copy
            this.hasMore = true
          }
//            如果400毫秒后没有变化而且变化之后数据不为空发请求
          else{
            axios.get('http://127.0.0.1/leirensheng/php/dish_getbykw.php?kw=' + this.kw).then((res) => {

//            axios.get('http://127.0.0.1/leirensheng/php/dish_getbykw.php?kw=' + this.kw).then((res) => {
              this.data=res.data
              this.hasMore=false
              clearTimeout(this.timmer)
            })
          }
        },400)
      }
    },
//    加载时请求数据
    mounted () {
      axios.get('http://127.0.0.1/leirensheng/php/dish_getbypage.php?start=0').then((res) => {

//        axios.get('http://127.0.0.1/leirensheng/php/dish_getbypage.php?start=0').then((res) => {
        this.data=this.copy=res.data
      }).catch((err) => console.log(err))
    }
  }
</script>
<style scoped>

</style>
