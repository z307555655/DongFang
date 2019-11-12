;
(function() {

    class Shop {
        constructor() {
            this.url = "http://localhost/dongfang/js/goods.json";
            this.cont = document.querySelector(".cont-kuang");

            this.load();

            // this.addEvent();
        }
        load() {
            // console.log(1)
            ajax({
                url: this.url,
                success: res => {
                    console.log(res)
                    this.res = JSON.parse(res);
                    // console.log(this.res)
                    this.display()
                }
            })

        }
        display() {
            // console.log(2)
            var str = "";
            for (var i = 0; i < this.res.length; i++) {
                str += `
                        <li>
                            <a href="#"><img src="${this.res[i].url}" title=""></a>
                            <p class="tit-p"><a href="#" class="tit-a">${this.res[i].name}</a></p>

                            <p class="cont">
                                <i class="cont-fudou"></i>
                                <em>${this.res[i].price}</em>
                                <a href="#" class="cart-icon"></a>
                            </p>
                        </li>
                        `
            }
            this.cont.innerHTML = str;
        }

        addEvent() {
            var that = this;
            // 二、点击加入
            this.cont.addEventListener("click", function(eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if (target.className == "add") {
                    // 1.点击时找到当前点击商品的货号
                    that.id = target.parentNode.getAttribute("index");
                    // 2.准备存cookie
                    // that.setCookie()
                }
            })
        }
        setCookie() {
            // 三、存储数据（cookie）
            // 商品id，商品数量
            // 多个商品
            // 数据格式：对象为基础，一个对象存储一个商品；多个商品，多个对象，放在一个数组中
            // [{id:"adasd",num:12},{id:"132a",num:6},{},{},{}....]

            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            // 3.存之前，判断是第一次还是非第一次
            if (this.goods.length < 1) {
                // 第一次存，直接存
                this.goods.push({
                    id: this.id,
                    num: 1
                })
            } else {
                // 不是第一次存：
                // var i = 0;
                // var onoff = this.goods.some((val,index)=>{
                //     i = index;
                //     return val.id === this.id;
                // })
                // if(onoff){
                //     this.goods[i].num++
                // }else{
                //     this.goods.push({
                //         id:this.id,
                //         num:1
                //     })
                // }

                var onoff = 1;
                for (var i = 0; i < this.goods.length; i++) {
                    // 查看是否存在
                    if (this.goods[i].id === this.id) {
                        // 存在，增加数量
                        this.goods[i].num++;
                        // 同时修改状态
                        onoff = 0;
                    }
                }
                // 判断状态，不存在
                if (onoff == 1) {
                    // 直接增加
                    this.goods.push({
                        id: this.id,
                        num: 1
                    })
                }
            }
            // 4.经过第三步对数据的处理，可以将数据再设置回cookie了
            setCookie("goods", JSON.stringify(this.goods))
        }

    }


    new Shop();
})();