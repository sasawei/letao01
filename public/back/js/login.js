$(function () {
  // 校验规则： validators:


  // 2. 用户密码不能为空
  // 3. 用户密码长度为6-12位
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    //指定校验字段
    fields: {
      //校验 用户名
      username: {
        // 1. 用户名不能为空
        validators: {


          notEmpty: {
            message: '用户名不能为空'
          },
          //用户名长度为6-12位
          stringLength: {
            min: 2,
            max: 12,
            message: '用户名长度必须为6到12位'
          },
          callback:{
            message:'用户名错误'
          }
        }
      },

      password: {
        // 1. 用户名不能为空
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          //用户名长度为6-12位
          stringLength: {
            min: 2,
            max: 12,
            message: '密码长度必须为6到12位'
          },
          callback:{
            message:'密码错误'
          }
        }

      }
    }
  });
  //  校验成功之后触发表单校验成功事件
  /**
   * submit默认是提交整个表单，页面跳转
   * 注册表单校验成功事件，阻止默认提交，通过AJAX提交
   */
  $('#form').on('success.form.bv',function(e){
    //表单校验成功
    e.preventDefault();

    //通过ajax发送请求
    $.ajax({
      url:'/employee/employeeLogin',
      type:'post',
      dataType:'json',
      data:$('#form').serialize(),
      success:function(info){
       console.log(info)
       if(info.error == 1000){
        //  alert('用户名不存在')
        //更新表单的校验状态，更新为失败
        /**
         * updateStatus
         * 参数一：field
         * 参数二：status
         * 参数三：validator
         */
        $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
        //  return
       }
       if(info.error == 1001){
        // alert('密码错误')
        $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
        return
      }
      if(info.success){
        //登录成功跳转页面
        location.href = 'index.html'
      }
      }
    })
  })

 /* * 3. 重置功能, 本身重置按钮, 就可以重置内容, 需要额外的重置状态
  * */
  $('[type="reset"]').click(function() {
    // resetForm( boolean );
    // resetForm();   只重置状态
    // resetForm(true);  重置内容 和 状态
    $('#form').data("bootstrapValidator").resetForm();
  })
})