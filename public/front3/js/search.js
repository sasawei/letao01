$(function () {
  // 功能分析
  //   // 1. 获取所有搜索历史, 完成渲染
  //   // 2. 删除单个搜索历史
  //   // 3. 清空所有搜索历史
  //   // 4. 添加单个搜索历史
  render()
  //1,获取所有的搜索历史
  function getHistory() {
    var jsonStr = localStorage.getItem('search_list') || '[]'
    var arr = JSON.parse(jsonStr)
    return arr
  }

  //1.2根据搜索历史进行渲染
  function render() {
    var arr = getHistory()
    var htmlStr = template('searchTmp', {
      list: arr
    })
    $('.lt_history').html(htmlStr)
  }

  //2.删除单个搜索历史
  $('.lt_history').on('click', '.btn_delete', function () {
    //根据下标索引删除对应 的数据
    var index = $(this).data('index')
    //将数据更新到本地存储
    var arr = getHistory()
    arr.splice(index, 1)
    //将新数组装成jsonstr返回到本地存储
    var jsonStr = JSON.stringify(arr)
    localStorage.setItem('search_list', jsonStr)
    render()
  })

  //3.清空所有的历史记录
  $('.lt_history').on('click', '.btn_empty', function () {
    // alert(222)
    mui.confirm('您确定要清空数据吗？', '确认框', ['取消', '确认'], function (e) {
      //判断E为确认
      if (e.index === 1) {
        localStorage.removeItem('search_list')
        render()
      }
    })

  })
  //4.添加单个搜索历史
  $('.btn_search').on('click', function () {
    var txt = $('.search_input').val().trim()
    if (txt === '') {
      mui.totast('请输入搜索关键字')
      return
    }
    //获取到数据之后到后台查找对应 的数据
    var arr = getHistory()
    var index = arr.indexOf(txt)
    //改数据存在本地存储中
    if (index !== -1) {
      //将对应项的搜索数据删除
      arr.splice(index, 1)
    }
    if (arr.length >= 10) {
      arr.pop()
    }

    arr.unshift(txt)
    //将数组转成jsonStr添加到本地
    var jsonStr = JSON.stringify(arr)
    localStorage.setItem('search_list',jsonStr)
    $('.search_input').val('')
    render()

  })






})