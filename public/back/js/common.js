//进度条使用
$(document).ajaxStart(function(){
  NProgress.start();
  // console.log('ajax已经发送')
})
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },100000)
})


//字体图标左移
$(function(){
  $('.icon_left').on('click',function(){
    // console.log('jsd')
    //侧边栏定位移动到left -180px
    //主体区域的padding-left 切换成0
    $('.lt_aside').toggleClass('hiddenmenu')
    $('.lt_main').toggleClass('hiddenmenu')
    $('.lt_topbar').toggleClass('hiddenmenu')
  })

//模态框退出功能
$('.icon_right').on('click',function(){
  // console.log('sdfjsd')
  //弹出模态框
  $('#myModal').modal('show')
})

//点击退出模态框完成退出功能
$('.logout').on('click',function(){
  //发送ajax请求清除后台的数据
  $.ajax({
    url:'/employee/employeeLogout',
    dataType:'json',
    type:'get',
    success:function(info){
      // console.log(info)
      //退出成功跳转页面
      if(info.success){
        location.href="login.html"
      }
   
    }
  })
})


//二级菜单
$('.category').click(function(){
  // console.log(22)
  $(this).next().stop().slideToggle();
})
})