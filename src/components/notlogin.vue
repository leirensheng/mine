<template>
  <div class="container">
    <div class="panel-default panel" >
      <h3  class="text-primary text-center">尚未登录!
        <span class="animated " >{{seconds}}</span>秒跳转到登录页面！
    </h3>
    </div>
  </div>
</template>

<script>
   import router from '../router/index'
   export default{
     mounted () {
       var timmer = setInterval(() => {
         this.seconds--
         if (this.seconds === 0) {
           clearInterval(timmer)
           router.push('/login')
         }
       }, 1000)
     },
     data () {
       return {
         seconds: 3
       }
     }
   }
</script>

<style>

</style>
