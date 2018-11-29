$(function(){
  $.ajax({
    url:'/user/queryUser',
    type:'get',
    data:{
      page:1,
      pageSize:5
    },
    success:function(info){
      console.log(info)
      var obj ={
        list:info.rows
      }
      var htmlstr = template('tmp',obj)
      $('tbody').html(htmlstr)
    }
  })
})