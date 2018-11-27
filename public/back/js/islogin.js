//一进入页面就发送ajax请求，如果没有用户数据，就跳转到登录页面
//如果当前在登录页面就不需要发送ajax请求了
$.ajax({
  url:'/employee/checkRootLogin',
  dataType:'json',
  type:'get',
  success:function(info){
    if(info.error === 400){
      location.href = 'login.html'
    }
    if(info.success){
      // alert('用户已经登录')
    }
  }
})