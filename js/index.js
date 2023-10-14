window.onload = function () {
    window.requestAnimationFrame(getDate)
}

let login_flag = 0;
document.oncontextmenu=new Function("return false");

function getDate() {
    window.setTimeout(function () {
        window.requestAnimationFrame(getDate)
    }, 1000 / 2)
    let d = new Date();
    let month = d.getMonth() + 1;  //获取月，从 Date 对象返回月份 (0 ~ 11)，故在此处+1
    let day = d.getDay();    //获取日
    let days = d.getDate(); //获取日期
    let hour = d.getHours();   //获取小时
    let minute = d.getMinutes();  //获取分钟

    if (month < 10) month = "0" + month
    if (days < 10) days = "0" + days
    if (hour < 10) hour = "0" + hour
    if (minute < 10) minute = "0" + minute

    const week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let time = hour + ":" + minute;
    let date = +month + "月" + days + "日" + ", " + week[day];
    document.getElementById("current-time").innerHTML = time;
    document.getElementById("current-date").innerHTML = date;
}

function to_login() {
    let time = document.getElementById("time");
    let main=document.getElementById("main");
    let headshot=document.getElementById("headshot");
    let username=document.getElementById("username");
    let password=document.getElementById("password");
    let confirm=document.getElementById("confirm");
    let option=document.getElementById("option");
    let user_select=document.getElementById("user_select");
    main.style.zIndex="0";
    if(login_flag===0) {
        password.focus();
    }
    login_flag=1;
    time.style.animation="time_animation 0.25s forwards";
    main.style.animation="background_blur 0.75s 0.25s forwards";
    headshot.style.animation="switch_login 0.75s 0.25s forwards";
    username.style.animation="switch_login 0.75s 0.25s forwards";
    password.style.animation="switch_login 0.75s 0.25s forwards";
    confirm.style.animation="switch_login 0.75s 0.25s forwards";
    option.style.animation="switch_login 0.75s 0.25s forwards";
    user_select.style.animation="switch_login 0.75s 0.25s forwards";
}

function verify(){
    let pwd = document.getElementById("password");
    if(pwd.value==="123"){
        window.location.href=("./desktop.html");
    }else{
        alert("密码错误");
    }
}
