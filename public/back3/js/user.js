$(function(){
  var currentPage =1
  var pageSize = 5
  //1.发送ajax渲染页面
  render()
  function render(){
    $.ajax({
      url:'/user/queryUser',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info)
        var htmlStr = template('userTmp',info)
        $('tbody').html(htmlStr)
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            console.log(page)
            currentPage=page;
            render()
          }
        })
      }
    })
  }
  var id
  var isDelete
  //2.点击启用禁用按钮 更改对应的数据库的值
  $('tbody').on('click','.btn',function(){
    // alert(33)
     id = $(this).parent().data('id')
     isDelete = $(this).hasClass('btn-danger')? 0:1

    //弹出模态框
    $('#userModal').modal('show')
   
  })

   //点击退出按钮提交ajax请求
   $('.btnconfirm').on('click',function(){
    $.ajax({
      url:'/user/updateUser',
      type:'post',
      dataType:'json',
      data:{
        id:id,
        isDelete:isDelete
      },
      success:function(info){
        console.log(info)
        if(info.success){
          $('#userModal').modal('hide')
          render()
        }
      }
    })
  })


})