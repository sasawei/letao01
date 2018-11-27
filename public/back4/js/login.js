//表单验证功能
$(function () {
  $('#form').bootstrapValidator({
    //校验图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验字段
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 2,
            max: 12,
            message: '密码长度必须在2到12之间'
          }
        },
      }
    }
  })


  //表单校验成功事件
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    //使用ajax提交表单请求
    $.ajax({
      data:$('#form').serialize(),
      type:'post',
      dataType:'json',
      url:'/employee/employeeLogin',
      success:function(info){
        // console.log(info)
        if(info.error == 1000){
          alert('用户名不存在')
          return
        }
        if(info.error == 1001){
          alert('密码错误')
          return
        }
        if(info.success){
          location.href='index.html'
        }
      }
    })
  })

  //表单重置
  $('[type="reset"]').on('click',function(){
   $('#form').data('bootstrapValidator').resetForm()
  })
})