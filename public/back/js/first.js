$(function () {
  var currentPage = 1
  var pageSize = 5

  render()

  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info)
        var htmlStr = template('firsttmp', info)
        $('tbody').html(htmlStr)
        //获取数据成功后渲染分类页面
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            // console.log(page)
            currentPage = page
            render()
          }
        })
      }
    })

  }

  // 点击添加分类，弹出模态框
  $('.btnadd').on('click', function () {
    // alert(33)
    $('#firstModal').modal('show')

  })

  //输入表单数据，校验表单数据，点击确定发送AJAX请求
  //表单校验  message
  $('#form').bootstrapValidator({
    //校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    //校验字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    }
  })

  //4.注册表单校验成功事件
  $('#form').on('success.form.bv', function (e) {
    //阻止表单的默认提交
    // alert(222)
    // console.log(e)
    e.preventDefault()
    //通过AJAX提交
    $.ajax({
      url: '/category/addTopCategory',
      type: 'post',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        // console.log(info)
        if (info.success) {
          //提交成功
          //重置表单数据
          $('#form').data('bootstrapValidator').resetForm(true)
          //关闭模态框
          $('#firstModal').modal('hide')
          
          render()
        }
      }
    })
  })



})