function jsonp(url,success,data){
    // 1.处理默认参数
    data = data || {};
    // 2.解析数据
    var str = "";
    for(var i in data){
        str += `${i}=${data[i]}&`;
    }

    // 3.创建script标签，设置src，准备开启jsonp
    var script = document.createElement("script");
    script.src = url + "?" + str;
    document.body.appendChild(script);

    // 4.定义全局函数
    window[data[data.columnName]] = function(res){
        success(res);
    }

}