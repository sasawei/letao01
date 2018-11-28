//进度条功能
$(document).ajaxStart(function(){
  NProgress.start()
})
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done()
  },1000)
 
})


$(function(){
  //二级菜单栏高亮
  $('.cate').on('click',function(){
    // alert(22)
    $(this).next().stop().slideToggle()
  })

//图标按钮伸缩页面
$('.icon_left').on('click',function(){
  // alert(22)
  $('.lt_aside').toggleClass('hiddenmenu')
  $('.lt_topbar').toggleClass('hiddenmenu')
  $('.lt_main').toggleClass('hiddenmenu')
})


//右侧图标出现模态框
$('.icon_right').on('click',function(){
  //引入模态框
  $('#myModal').modal('show')
})

//点击退出按钮，实现真正的退出功能
$('.btn-logout').on('click',function(){
  $.ajax({
    url:'/employee/employeeLogout',
    type:'get',
    dataType:'json',
    success:function(info){
      // console.log(info)
      if(info.success){
        location.href="login.html"
      }
    }
  })
})

})