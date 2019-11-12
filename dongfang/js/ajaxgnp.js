// ajax(
//     {
//         type:"get",
//         url:"",
//         success:function(){},
//         error:function(){},
//         data:{} 

//     }
// )


function ajax(options) {
    let { type, url, success, error, data } = options;
    //判断是否输入type或者data
    type = type || "get";
    data = data || {};
    //解析上传数据
    var str = "";
    for (var i in data) {
        str += `${i}=${data[i]}&`
    }
    //判断是否是get类型
    if (type == "get" || type == "jsonp") {
        //拼接url
        var d = new Date();

        url = url + "?" + str + "__cj" + d.getTime();
    }


    if (type == "jsonp") {
        //创建script 节点 用来引入 外部地址
        var script = document.createElement("script");
        script.src = url;
        document.body.appendChild(script);
        //回调函数
        window[data[data.column]] = function(res) {
            success(res);

        }
    } else {
        //var 出 xhr
        var xhr = new XMLHttpRequest();

        xhr.open(type, url, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                success(xhr.responseText);
            } else if (xhr.readyState == 4 && xhr.status != 200) {
                if (error) { error(xhr.status) }
            }
        }

        //判断是否get 和post 结尾
        if (type == "get") {
            xhr.send();
        } else if (type == "post") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(str.slice(0, str.length - 1));
        }
    }



}


// function jsonp(url,cd,data){
//     //准备工作
//     data  = data || {};
//     var str = "";
//     for (var i in data){
//         str +=`${i}=${data[i]}&`
//     }
//     url = url +"?"+str;

//      //创建script 节点 用来引入 外部地址
//     var script = document.createElement("script");
//     script.src = url;
//     document.body.appendChild(script);
//     //回调函数
//     window[data[data.column]] = function(res){
//          cd(res)
//     }
// }j