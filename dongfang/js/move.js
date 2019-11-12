function move(ele, json, callback) {
    clearInterval(ele.t);
    ele.t = setInterval(() => {
        var onoff = true;
        for (var i in json) {
            var iNow = parseInt(getStyle(ele, i));
            // json[i]传入的当前点击位置的top值
            //iNow当前创建的div初始状态的top值
            var speed = (json[i] - iNow) / 6;
            speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);
            if (iNow != json[i]) {
                onoff = false;
            }
            ele.style[i] = iNow + speed + "px";
        }
        if (onoff) {
            clearInterval(ele.t);
            callback && callback();
        }
    }, 30);
}

function getStyle(ele, attr) {
    if (ele.currentStyle) {
        return ele.currentStyle[attr];
    } else {
        return getComputedStyle(ele, false)[attr];
    }
}