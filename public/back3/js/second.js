$(function(){
  var currentPage =1
  var pageSize = 5
  render()
  function render(){
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info)
        var htmlStr = template('secondTmp',info)
        $('tbody').html(htmlStr)
        //渲染分页插件
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
           currentPage=page,
           render()
          }
        })
      }
    })
  }


  //2.点击添加分类出现模态框；获取后台数据渲染到ul下面的li中
  $('#secondBtn').on('click',function(){
    // alert(33)
    $('#secondModal').modal('show')
    //获取数据通过写死page和pagesize
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      dataType:'json',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        // console.log(info)
        var htmlStr = template('secondTmp2',info)
        $('.dropdown-menu').html(htmlStr)


      }
    })
  })

  //3.点击选中按钮选中对应的值到a标签中
  $('.dropdown').on('click','.categoryImg',function(){
    // alert(22)
    $('.firstDropdown').text($(this).text())
    //获取ID值并设置的隐藏域
    var id = $(this).data('id')
     console.log("Id的值为："+id)
    $('[name="categoryId"]').val(id)
    //进行表单校验
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
  })

  //4.点击图片上传按钮将input框的url传给
  $('#addFile').fileupload({
    dataType:'json',
    done:function(e,data){
      var picObj = data.result
      var picUrl = picObj.picAddr
      $('#picImg').attr('src',picUrl)
      //给隐藏的表单域设置图片的src地址
      $('[name="brandLogo"]').val(picUrl)
      //将隐藏域的校验状态更改成VAILD
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')

    }
  })


  //5.设置校验
  $('#form').bootstrapValidator({
    excluded:[],
    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    //指定校验状态
    fields:{
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传图片'
          }
        }
      },
      categoryId:{
        validators:{
          notEmpty:{
            message:'请输入一级分类'
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级分类'
          }
        }
      },
    }
  })

  //6.点击确定按钮隐藏模态框发送ajax请求;注册表单校验成功事件
  $('#form').on('success.form.bv',function(e){
    // alert(111)
    var aa=$('#form').serialize();
    console.log(aa);
    e.preventDefault();
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data:aa,
      dataType:'json',
      success:function(info){
        // console.log(info)
        if(info.success){
          $('#secondModal').modal('hide')

          currentPage = 1
          render()
          //重置表单内容
          $('#form').data('bootstrapValidator').resetForm(true)
          //由于下拉菜单不是表单元素
            $('.firstDropdown').text('请选择一级分类')
            $('#picImg').attr('src','./images/none.png')
        }
      }
    })


  })
})