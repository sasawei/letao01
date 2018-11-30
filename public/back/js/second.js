//获取后台数据渲染当前页面，生成分页插件

$(function(){
  var currentPage =1
  var pageSize =5

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
        var htmlStr = template('secondtmp',info)
        $('tbody').html(htmlStr)
        //根据数据条数渲染分页页面
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


  //点击添加分类，显示模态框
  $('.btnadd').on('click',function(){
    $('#secondModal').modal('show')
    //点击添加按钮的时候要开始AJAX请求
    //通过写死page 和pagesize获取所有一级分类的信息
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      data:{
       page:1,
       pageSize:100
      },
      dataType:'json',
      type:'get',
      success:function(info){
        console.log(info)
        var htmlStr = template('droptmp',info)
        $('.dropdown-menu').html(htmlStr)
      }
    })
  })


  //给下拉列表的a添加点击事件将值赋值给<ul></ul>
var id 
var url
var brandName = $('.secondtxt').val()
  $('.dropdown-menu').on('click','a',function(){
    // alert(3)
    var txt = $(this).text()
    $('.dropdownText').text(txt)
    //通过隐藏域获取到表单中的数据用于提交
     id = $(this).data('id')
    $('[name="categoryId"]').val(id)
    //跟新表单校验状态
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
  })

  //文件上传
  $('#fileUpload').fileupload({
    dataType:'json',
    //done 表示文件上传完成的回调函数
    done:function(e,data){
      var picObj = data.result
       url = picObj.picAddr
      console.log(url)
      // 获取图片地址 赋值给img的src
     $('#uploadimg').attr('src',url)
     //添加隐藏域设置图片的地址,用于提交表单数据
    $('[name="brandLogo"]').val(url)
    //更新表单校验状态
    $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')

    }
  })


  //表单校验
  $('#form').bootstrapValidator({
    excluded:[],
        // 配置校验图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',    // 校验成功
          invalid: 'glyphicon glyphicon-remove',   // 校验失败
          validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
    
    fields:{
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
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请选择图片'
          }
        }
      }
    }
  })


  //点击添加按钮，阻止sbmit的默认刷新 ，通过AJAX提交表单数据
  $('.ajaxadd').on('click',function(e){
    e.preventDefault()
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      dataType:'json',
      data:{
        brandName:brandName,
        categoryId:id,
        brandLogo:url
      },
      success:function(info){
        // console.log(info)
        if(info.success){
          $('#secondModal').modal('hide')
          render()
        }
      }

    })
  })
})
