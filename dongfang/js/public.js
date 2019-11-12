// 日期格式化功能
function createDate() {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth();
    var mydate = d.getDate();
    var myday = d.getDay();
    var h = d.getHours();
    var mts = d.getMinutes();
    var s = d.getSeconds();

    switch (myday) {
        case 0:
            myday = "星期日";
            break;
        case 1:
            myday = "星期一";
            break;
        case 2:
            myday = "星期二";
            break;
        case 3:
            myday = "星期三";
            break;
        case 4:
            myday = "星期四";
            break;
        case 5:
            myday = "星期五";
            break;
        case 6:
            myday = "星期六";
            break;
    }
    return {
        year: y,
        month: createZero(m + 1),
        date: createZero(mydate),
        day: myday,
        hours: createZero(h),
        minutes: createZero(mts),
        seconds: createZero(s)
    };
}

// 数值的补零（小于10补零）
function createZero(n) {
    return n < 10 ? "0" + n : n;
}

// 计算两个日期之间的差值
function dateDiff(d1, d2) {
    var oldDate = new Date(d1);
    var newDate = d2 ? new Date(d2) : new Date();

    var t = Math.abs(oldDate.getTime() - newDate.getTime());

    var d = parseInt(t / 1000 / 60 / 60 / 24);
    var h = parseInt((t - d * 24 * 60 * 60 * 1000) / 1000 / 60 / 60);
    var m = parseInt((t - d * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000) / 1000 / 60);
    var s = parseInt((t - d * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000);

    return {
        day: d,
        hours: h,
        minutes: m,
        seconds: s
    }
}

// 范围随机数
function random(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}

// 随机颜色
function randomColor() {
    return "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
}


//事件委托的封装
function fn(child, callback) {
    // 2.修改fn的返回值为函数，作为将来真正的事件处理函数
    return function(eve) {
        // 3.找事件对象身上的事件源
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        // 4.遍历传进来的要委托的子元素
        for (var i = 0; i < child.length; i++) {
            // 5.逐个与事件源的元素做比较，相同了表示找到了真正要触发的元素
            if (child[i] === target) {
                //       二、this的改变
                // 6.执行用户传进来的回调函数，完成用户指定的功能
                // 的同时，修改this指向，为真正的事件源
                callback.bind(target)()
            }
        }
    }
}


//ajax-get的封装
function ajaxGet(url, cb, data) {
    data = data || {};
    var str = "";
    for (var i in data) {
        str += `${i}=${data[i]}&`;
    }
    var d = new Date();
    url = url + "?" + str + "__qft=" + d.getTime();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cb(xhr.responseText);
        }
    }
    xhr.send();
}