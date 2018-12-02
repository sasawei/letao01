$(function () {
  var currentPage = 1
  var pageSize = 5
  render()
  //渲染当前页面
  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      type: 'get',
      dataType: 'json',
      success: function (info) {
        console.log(info)
        var htmlStr = template('productTmp', info)
        $('tbody').html(htmlStr)
        //分页标签的渲染
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render()
          }
        })
      }
    })
  }
  //添加商品
  $('.btnadd').on('click', function () {
    // alert(2)
    $('#productModal').modal('show')
    //获取到后台的数据并且添加给下拉框
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      type: 'get',
      dataType: 'json',
      success: function (info) {
        console.log(info)
        var htmlStr = template('droptmp', info)
        $('.dropdown-menu').html(htmlStr)

      }
    })
  })

  //点击下拉框将选择数据的ID 传递给
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text()
    $('.dropdownText').text(txt)
    $('[name="brandId"]').val($(this).data('id'))
    console.log($(this).data('id'))
    //表单校验成功
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')
  })

  //配置文件上传插件
  var picArr = []
  $('#fileUpload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      var picObj = data.result
      var picUrl = picObj.picAddr
      console.log(picObj)
      //  console.log(picUrl)
      //将获取到的图片地址赋值给图片的SRC
      picArr.unshift(picObj)
      $('#imgBox').prepend('<img src="' + picUrl + '" alt="" style="width:100px" id="uploadimg">')
      //判断长度
      if (picArr.length > 3) {
        picArr.pop()
        $('#imgBox img:last-of-type').remove()
      }

      //
    }
  })

  //添加表单校验
  $('#form').bootstrapValidator({
    excluded: [],
    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    //校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },

      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },

      size: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          },
          //尺码格式, 必须是 xx-xx格式, xx为两位数字,
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'尺码格式, 必须是 xx-xx格式, xx为两位数字,'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          //正则校验受字母不能为0
          regexp: {
            regexp:/^[1-9]\d*$/,
            message:'商品库存格式，必须非零开头'
          }
        }
      }
    }
  })

  //表单校验成功
  $('#form').on('success.form.bv',function(e){
    e.preventDefault()

    var paramsStr = $('#form').serialize()
    paramsStr += "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr
    paramsStr += "&picName1="+picArr[1].picName+"&picAddr1="+picArr[1].picAddr
    paramsStr += "&picName1="+picArr[2].picName+"&picAddr1="+picArr[2].picAddr

    //发送AJax请求
    $.ajax({
      url:'/product/addProduct',
      type:'post',
      data:paramsStr,
      dataType:'json',
      success:function(info){
        // console.log(info)
        if(info.success){
          $('#productModal').modal('hide')
          currentPage = 1
          render()
        }
      }

    })
  })
})