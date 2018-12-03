$(function () {
  //进图页面发送AJAX请求
  $.ajax({
    url: '/category/queryTopCategory',
    type: 'get',
    dataType: 'json',
    success: function (info) {
      // console.log(info)
      var htmlStr = template('categoryTmp', info)
      $('.lt_category_left ul').html(htmlStr)
      //    renderById(id)
      renderById(info.rows[0].id)
    }

  })

  //2.给所有的A添加点击事件 获取对应的id
  $('.lt_category_left ul').on('click', 'a', function () {
    // alert(33)
    var id = $(this).data('id')
    renderById(id)
    //让自己高亮 同时让其他不高亮
    $('.lt_category_left ul a').removeClass('current')
    $(this).addClass('current')
  })
  

  //3.根据一级分类的ID 渲染二级分类 的数据
  function renderById(id){
$.ajax({
  type:'get',
  url:'/category/querySecondCategory',
  data:{
    id:id
  },
  dataType:'json',
  success:function(info){
    console.log(info)
    var htmlStr = template('rightTmp',info)
    $('.lt_category_right ul').html(htmlStr)
  }
})
  }


})