// 禁用右键菜单
document.oncontextmenu=new Function("return false");
// 检查用户使用浏览设备
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log("请使用最新版电脑端浏览器访问以便获得最佳效果");
// 如果窗口太小,隐藏记事本和win版本窗口
    $("#notepad").hide()
    $("#win-version").hide()
} else {
// 检查窗口是否足够大,弹窗提示用户放大窗口
    if ($(window).width() < 800) {
        alert("请调整窗口尺寸以便获得最佳效果");
    }
}

function menuItem() {
    $('#dropdown').toggle();
}

// File uploader
function onFileSelected(event) {
    dropHide();
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    var result = document.getElementById("npTextarea");
    reader.onload = function (event) {
        result.innerHTML = event.target.result;
    };
    reader.readAsText(selectedFile);
}

// 点击菜单选项后隐藏菜单内容
function dropHide() {
    $('#dropdown').hide();
}

// 任务栏时钟
function checkMins(i) {
    if (i < 10) {
        i = "0" + i
    }  // add zero in front of numbers < 10
    return i;
}

function startTime() {
    let today = new Date();
    let dd = today.getDate();
    let jsmm = today.getMonth();
    let mm = jsmm + 1; // 这个地方有点小问题,不知道为啥要加上一,默认月份从0开始?
    let yy = today.getFullYear();
    let hh = today.getHours();
    let h = ((hh + 11) % 12 + 1);
    let suffix = (hh >= 12) ? 'PM' : 'AM';
    let m = today.getMinutes();
    m = checkMins(m);
    document.getElementById("taskClock").innerHTML = h + ":" + m + "&nbsp;" + suffix + "<br>" + yy + "/" +mm  + "/" + dd ;
    let t = setTimeout(startTime, 500);
}

$(document).ready(function () {
    // 点击窗口改变focus属性
    $(".window").click(function () {
        $('div[class^="window"]').css('z-index', '0');
        $(this).css('z-index', '10');
    });
    // 使窗口可拖动
    $('.window').draggable({
        containment: "parent"
    });
    var handle = $(".window").draggable("option", "handle");
    $('.window').draggable("option", "handle", ".titleFrame");

    // 关闭窗口的动画效果
    $("#winverClose").click(function () {
        $("#win-version").fadeOut(300);
    });
    $("#winverOK").click(function () {
        $("#win-version").fadeOut(300);
    });
    // 点击任务栏图标时的动画效果
    $("#winverIconFrame").click(function () {
        $("#win-version").toggle(300);
    });

    // 记事本关闭按钮的动画效果
    $("#npClose").click(function () {
        $("#notepad").fadeOut(300);
    });
    // 点击任务栏图标时的动画效果
    $("#notepadIconFrame").click(function () {
        $("#notepad").toggle(300);
    });
    // 记事本的相关功能实现
    // 新建文件
    $("#npNew").click(function () {
        var r = confirm('你想将更改保存到未命名吗?');
        if (r === true) {
            //如果选择保存
            dropHide();
            var text = $("#npTextarea").val();
            var blob = new Blob([text], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(blob, "未命名.txt");
            $('#npTextarea').val('');
        } else {
            // 否则直接隐藏
            dropHide();
        }
    });
    // 使用FileSaver.js调用浏览器下载,将文件下载到本地,实现保存功能
    $("#npSave").click(function () {
        dropHide();
        var text = $("#npTextarea").val();
        var blob = new Blob([text], {
            type: "text/plain;charset=utf-8"
        });
        saveAs(blob, "未命名.txt");
    });
    $("#npSaveAs").click(function () {
        dropHide();
        var text = $("#npTextarea").val();
        var blob = new Blob([text], {
            type: "text/plain;charset=utf-8"
        });
        saveAs(blob, "未命名.txt");
    });
    // 没写完
    $("#npPageSetup").click(function () {
        dropHide();
    });
    // 显示打印预览
    $("#npPrint").click(function () {
        dropHide();
        var DocumentContainer = document.getElementById("npTextarea");
        var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Print Preview</title></head><body style="background:#ffffff;"><p style="font-family:monospace;text-align:center;">Untitled</p><pre>' + DocumentContainer.value + '</pre></body></html>';

        var WindowObject = window.open("", "PrintWindow", "width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes");
        WindowObject.document.writeln(html);
        WindowObject.document.close();
        WindowObject.focus();
        WindowObject.print();
        WindowObject.close();

    });

    $("#npExit").click(function () {
        dropHide();
        $("#notepad").fadeOut(300);
    });

    $("#edgeIconFrame").click(function () {
        alert("还没写完");
    });
    // Task View (not implemented yet)
    // Taskbar icon
    $("#taskviewIconFrame").click(function () {
        alert("还没写完");
    });

    $("#startIconFrame").click(function () {
        $("#startMenu").toggle(300);
    });
    // 正则选中所有的窗口
    $('div[class^="window"]').click(function () {
        $("#startMenu").hide();
    });

    $("#taskSearch").focusin(function () {
        $('div[class^="window"]').css('z-index', '0');
        $(this).css('z-index', '10');
        $("#startMenu").hide();
        $("#SearchResults").show();
    });
    $("#taskSearch").focusout(function () {
        $("#SearchResults").hide();
        $('#taskSearch').val('');
    });
    // 显示桌面
    $("#showDesktop").click(function () {
        $('div[class^="window"]').toggle();
    });
});
