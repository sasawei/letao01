$.ajax({
  url:'/employee/checkRootLogin',
  type:'get',
  dataType:'json',
  success:function(info){
    // console.log(info)
    if(info.error === 400){
      //用户未登录
      location.href ="login.html"
    }
    if(info.success){
      console.log('当前用户登录过了')
    }
  }
})