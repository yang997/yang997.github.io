
var root = window.player;
var nowIndex = 0;
var dataList;
var len;
var audio = root.audioManager;
var control;
var timer;
var $scope = $(document.body);
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data);
            dataList = data;
            len = data.length;
            control = new root.indexControl(len)//传入数组的长度
            root.render(data[0]);
            audio.getAudio(data[0].audio)//默认加载第一条音频
            root.pro.renderAllTime(dataList[0].duration)//默认加载第一条音频总时间
            bindEvent();
            bindTouch();
            root.playList.renderList(dataList);

        },
        error: function () {
            console.log("error")
        }
    })
}
function bindEvent() {
    $scope.on('play:change', function (e, index) { //自定义事件
        audio.getAudio(dataList[index].audio);//加载第index条音频
        root.render(dataList[index]);//页面渲染第index条信息
        root.pro.renderAllTime(dataList[index].duration);//渲染第index条音频总时间
        if (audio.status == 'play') { //切换歌的时候如果当前状态为play,则继续播放状态
            audio.play();
            // root.pro.update(0);
            root.pro.stop()
            root.pro.start(0);
            rotated(0);
            // root.pro.start(0);
        }
        else {
            root.pro.update(0);
         }
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            transform: 'ratateZ(' + 0 + 'deg)',
            transtion: 'none'
        })
    })

    $('.prev').on('click', function () {    //切上一首
        var index = control.prev(); //索引
        $scope.trigger('play:change', index);
        // if(audio.status == 'play'){
        //     root.pro.start(0);
        // }else{
        //     root.pro.update(0);;
        // }

    });
    $('.next').on('click', function () {    //切下一首
        var index = control.next();
        $scope.trigger('play:change', index);
        // if(audio.status == 'play'){
        //     root.pro.start(0);
        // }else{
        //     root.pro.update(0);;
        // }

    });
    $('.play').on('click', function () { //播放音频
        if (audio.status == 'pause') {
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');//获取自定义属性值deg
            rotated(deg);
        }
        else {
            audio.pause();
            root.pro.stop();//停止时间更新
            clearInterval(timer);

        }
        $('.play').toggleClass('playing')
    });
    $('.list').on('click',function(){
        root.playList.show(control);
    })
}

function bindTouch() {
    var left = $('.pro-bottom').offset().left;
    var width = $('.pro-bottom').offset().width;
    $('.slider-point').on('touchstart', function (e) {
        root.pro.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per >= 0 && per < 1) {
            root.pro.update(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        var duration = dataList[control.index].duration;
        var curTime = per * duration; 
        if (per >= 0 && per < 1) {
            // var duration = dataList[control.index].duration;
            // var curTime = per * duration; 
            audio.playTo(curTime);  //音频跳到固定时间点播放
            audio.play();
           
           
            $('.play').addClass('playing');
            audio.status = 'play';
            root.pro.start(per)
        }
    })
}
$(audio.audio).on('ended',function(){
    $('.next').trigger('click');
})
//图片旋转
function rotated(deg) {
    clearInterval(timer);
    deg = parseInt(deg);
    timer = setInterval(function () {
        deg += 1;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            transform: 'rotateZ(' + deg + 'deg)',
            transtion: 'all 0.1s linear'
        })
    }, 200)
}

getData("../mock/data.json")