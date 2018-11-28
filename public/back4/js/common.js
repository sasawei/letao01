//进度条功能
//ajax请求发送前 请求接收后
//开启进度条 结束进度条
$(document).ajaxStart(function(){
  NProgress.start()
})
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done()
  },1000)

})


$(function(){
  //二级分类菜单
  $('.cate').on('click',function(){
    // alert(23)
    $(this).next().stop().slideToggle();
  })
  //左侧图标
  $('.icon_left').on('click',function(){
    // alert(2)
    $('.lt_aside').toggleClass('hiddenmenu')
    $('.lt_topbar').toggleClass('hiddenmenu')
    $('.lt_main').toggleClass('hiddenmenu')
  })
  //右侧图标跳出模态框
  $('.icon_right').on('click',function(){
    $('#myModal').modal('show')
  })

  //点击退出系统实现真正的退出
  $('.logout').on('click',function(){
    // alert(2)
    $.ajax({
      url:'/employee/employeeLogout',
      type:'get',
      success:function(info){
        // console.log(info)
        if(info.success){
          location.href="login.html"
        }
      }
    })
  })
})