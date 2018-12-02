$(function(){
  var currentPage = 1
  var pageSize = 5
  render()
  function render(){
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      type:'get',
      dataType:'json',
      success:function(info){
        console.log(info)
        var htmlStr = template('firstTmp',info)
        $('tbody').html(htmlStr)
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page
            render()
          }
        })
        
      }
    })
  }

  //点击分类管理跳出模态框
  $('#firstBtn').on('click',function(){
    // alert(33)
    $('#firstModal').modal('show')

  })

  //点击确定按钮提交表单数据
  $('.btnconfirm').on('click',function(e){
    // alert(33)D
     e.preventDefault();
     $.ajax({
       url:'/category/addTopCategory',
       data:$('#form').serialize(),
       type:'post',
       dataType:'json',
       success:function(info){
        //  console.log(info)
        if(info.success){
          $('#firstModal').modal('hide')
         //返回第一页
         currentPage =1
          render()
          //重置表单状态
          $('#form').data('bootstrapValidator').resetForm(true)
        }
       }
     })
  })

  //进行表单校验
  $('#form').bootstrapValidator({
       // 配置校验图标
       feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',    // 校验成功
        invalid: 'glyphicon glyphicon-remove',   // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
      },
      //校验字段
      fields:{
        categoryName:{
          validators:{
            notEmpty:{
              message:'请输入一级分类名称'
            }
          }
        }
      }
  })
})