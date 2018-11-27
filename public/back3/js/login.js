//需求进行表单校验
//用户名很密码不能为空
//用户名和密码必须是2-12位
$(function () {
  //引入校验插件
  $('#form').bootstrapValidator({
    //指定校验时的图标显示风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'

    },
    //校验字段
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            min:2,
            max:12,
            message:'用户名长度必须在2到12位之间'
          }
        }
      },
       password:{
        validators:{
          notEmpty:{
            message:'密码不能为空'
          },
          stringLength:{
            min:2,
            max:12,
            message:'密码长度必须在2到12位之间'
          }
        }
      }
    }
  })


  //在表单提交时触发 表单验证成功事件
   $('#form').on('success.form.bv',function(e){
     e.preventDefault();
    //  console.log('登录成功')

    //提交ajax请求，跳转页面
    $.ajax({
      type:'post',
      dataType:'json',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      success:function(info){
        console.log(info)
        if(info.error == 1000){
          alert('用户名不存在')
          return
        }
        if(info.error == 1001){
          alert('用户名不存在')
          return
        }
        if(info.success){
          location.href='index.html'
        }
      }
    })
   })


   //重置功能
   $('[type="reset"]').click(function(){
     var validator = $('#form').data('bootstrapValidator')
     validator.resetForm()
   })
})