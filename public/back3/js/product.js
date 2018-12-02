$(function(){
  var currentPage =1
  var pageSize = 5
  render()
  function render(){
    $.ajax({
      url:'/product/queryProductDetailList',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info)
        var htmlStr = template('productTmp',info)
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

  //点击添加按钮弹出模态框
  $('#productBtn').on('click',function(){
    // alert(33)
    $('#productModal').modal('show')
    //发送AKAX请求，渲染下拉框数据
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      data:{
        page:1,
        pageSize:100
      },
      dataType:'json',
      success:function(info){
        // console.log(info)
        //渲染下拉框
        var htmlStr = template('productTmp2',info)
         $('.dropdown-menu').html(htmlStr)
      }
    })
  })

  //3.给下拉列表添加点击事件
  $('.dropdown-menu').on('click','.categoryVal',function(){
    var txt = $(this).text()
   $('.firstDropdown').text(txt)
   //获取id赋值赋值给隐藏域
   var id = $(this).data('id')
   $('[name="brandId"]').val(id)
   //将表单域的校验状态更改为valid
   $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')
  })

//4.配置文件上传插件
var picArr =[]
$('#addFile').fileupload({
  dataType:'json',
  done:function(e,data){
    var imgObj = data.result
   //将上传的图片对象添加到数组的最前面
  picArr.unshift(imgObj)

   var imgUrl = imgObj.picAddr
   //将每次上传的图片显示在结构的最前面
   $('#imgBox').prepend('<img src="'+imgUrl+'" alt="" style="width:80px"> ')
   //判断长度是否超过三张;超过删除数组的最后一项
   if(picArr.length > 3){
     //删除数组的最后一项
     picArr.pop()
     //删除结构中的最后一张
     $('#imgBox img:last-of-type').remove()
   }

   //如果文件上传状态满了三张当前图片的额加盐状态更新为VALID
   if(picArr.length === 3){
     $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID')
   }

  }
})

  // 5. 添加表单校验
  $('#form').bootstrapValidator({
    // 重置排除项, 都校验, 不排除
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          // \d  0-9
          // ?   0次或1次
          // +   1次或多次
          // *   0次或多次
          // {n,m}  出现n次到m次
          // {n}  出现n次
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 xx-xx格式, xx为两位数字, 例如 36-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });

//6.注册表单校验成功事件阻止默认提交
$('#form').on('success.form.bv',function(e){
  e.preventDefault()
  //提交表单元素 的数据
  var paramsStr = $('#form').serialize()
  //拼接上图片的数据
  paramsStr += "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr
  paramsStr += "&picName1="+picArr[1].picName+"&picAddr1="+picArr[1].picAddr
  paramsStr += "&picName1="+picArr[2].picName+"&picAddr1="+picArr[2].picAddr
  $.ajax({
    url:'/product/addProduct',
    type:'post',
    data:paramsStr,
    dataType:'json',
    success:function(info){
      if(info.success){
        $('#productModal').modal('hide')
        currentPage =1
        render()
        //重置表单内容
        $('#form').data('bootstrapValidator').resetForm(true)
        //手动设置文本和图片的内容
        $('.firstDropdown').text('请选择二级分类')
        $('#imgbox img').remove()
        picArr = []
      }
    }
  })
})


















  

})