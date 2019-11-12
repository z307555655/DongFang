
  function setCookie(key,val,option){
    option = option || {};
    var expires=path="";
    if(option.expires){
       var d = new Date;
       d.setDate(d.getDate()+option.expires);
       expires = ";expires="+d;               
    }
   if(option.path){
      path = ";path="+option.path;
    }
    document.cookie  = `${key}=${val}${expires}${path}`
    }
      
    //删除cookie
   function removeCookie(key,option){
     option = option ||{};
     option.expires = -1;   
     setCookie(key,"10",option)
   }

    //获取cookie
    function getCookie(key){
     var myArr =  document.cookie.split("; ");
       for(i=0;i<myArr.length;i++){
          var arr = myArr[i].split("=");
          if (arr[0]==key){
            return arr[1];
          }
       }
            return "";
    }




