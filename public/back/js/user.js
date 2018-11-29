$(function () {
  //发送AJAX请求获取到后台的数据渲染到模板引擎
  var currentPage = 1
  var pageSize = 5

  var currentId
  var isDelete


  render()

  function render() {
    $.ajax({
      url: '  /user/queryUser',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info)
        var htmlStr = template('usertmp', info)
        $('tbody').html(htmlStr)

        //当AJAX请求回来之后根据最新的数据进行初始化分页插件
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            // console.log(page)
            //跟新当前的页数
            currentPage = page
            //重新渲染页面
            render()

          }
        })
      }
    })
  }


  //2.给所有的禁用按钮添加点击事件
  $('tbody').on('click', '.btn', function () {
    //获取用户的ID 获取用户的当前状态
    currentId = $(this).parent().data('id')
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1

    $('#userModal').modal('show')
  })
    // console.log(currentId)
  
  //当点击确定按钮时发送ajax请求
  //发送ajax请求将数据传输给后台修改
  $('.userlogout').click(function () {
    // alert(233)
    $.ajax({
      url: '/user/updateUser',
      type: 'post',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function (info) {
        console.log(info)
        if (info.success) {
          $('#userModal').modal('hide')
          render()
        }
      }
    })
  })










})