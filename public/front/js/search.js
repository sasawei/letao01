// $('.btn-search').on('click',function(){
//   // alert(3)
//    // 功能分析
//   // 1. 获取所有搜索历史, 完成渲染
//   // 2. 删除单个搜索历史
//   // 3. 清空所有搜索历史
//   // 4. 添加单个搜索历史
//   var txt = $('.lt_search input').val()
//   $.ajax({
//     url:''
//   })
// })

$(function () {
  render()
  //获取本地历史的数组
  function getHistory() {
    //由于所有的操作都是对本地存储 的操作，可以约定一个键名search_list
    var jsonStr = localStorage.getItem('search_list') || '[]'
    var arr = JSON.parse(jsonStr)
    return arr
  }
  //获取本地的历史数组，并进行渲染
  function render() {
    var arr = getHistory()
    var htmlStr = template('historyTmp', {
      list: arr
    })
    $('.lt_history').html(htmlStr)
    console.log(arr)
  }

  /**
   * 2.清空所有
   * 给清空所有添加事件委托
   * 清除所有的search_list
   * 重新渲染页面
   */
  $('.lt_history').on('click', '.btn-empty', function () {
    //mui 中添加确认框
    mui.confirm('您确定要清空历史记录吗？', '温馨提示', ['取消', '确认'], function (e) {
      //取消的index === 0  确认的index === 1
      if (e.index === 1) {
        localStorage.removeItem('search_list')
        render()
      }
    })
  })


  /**
   * 3.删除单个记录
   * 给所有的删除按钮添加事件委托
   * 获取数组 根据下标 将对应数组的对应项删除
   * 将数组转成jsonStr 存到本地
   * 重新渲染
   */
  $('.lt_history').on('click', '.btn_delete', function () {
    var arr = getHistory()
    //获取下标删除对应项
    var index = $(this).data('index')
    //删除问号
    arr.splice(index, 1)
    //转成jsonStr存储到本地
    localStorage.setItem('search_list', JSON.stringify(arr))
    //重新渲染
    render()
  })
  /**
   * 4.添加单个历史记录
   * 店家搜索按钮添加点击事件
   */
  $('.btn_search').on('click', function () {
    alert(111)
    var key = $('.search_input').val().trim()
    //搜索关键字不能为空
    if (key == '') {
      //mui 框架 的提示框
      mui.totast('请输入搜索关键字')
      return
    }
    //跟据关键字获取对应 的数组
    var arr = getHistory()
    //如果有重复项，需要先将重复城乡删除在再头部添加
    var index = arr.indexOf(key)
    if(index !== -1){
       //有重复项，根据index删除对应项
       arr.splice(index,1)

    }
    //当长度超过 10个保留最前面的删除最后一个
    if(arr.length >= 10){
      arr.pop()
    }
    arr.unshift(key)
    //将数组转成jsonstring存储到本地
    localStorage.setItem('search_list',JSON.stringify(arr))
    render()
    //跳转到搜索类表业并且将关键字传递过去
    location.href = "searchList.html?key="+key
  })




})