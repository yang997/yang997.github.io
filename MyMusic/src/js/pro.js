(function ($, root) {
    var duration;
    var frameId;
    var lastPer = 0;
    var startTime;
    //渲染总时间
    function renderAllTime(time) {
        lastPer = 0;
        duration = time;
        time = formatTime(time);
        $('.all-time').html(time);
    }
    //处理时间格式
    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        return m + ':' + s;
    }
    //渲染左侧时间
    function start(p){
        lastPer = p === undefined ? lastPer : p; //拖拽进度条的百分比p
        startTime = new Date().getTime();
        
        function frame (){
            // console.log(audio.audio.currentTime)//打印歌播放的时间
            var curTime  = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (duration*1000);
            update(per);
           frameId= requestAnimationFrame(frame)

           
        }
        frame();
    }

    //更新时间 、进度条
    function update(p){
       var time = p * duration;
       time = formatTime(time);
        $('.cur-time').html(time);
        var perX = (p -1) * 100 + '%';
        $('.pro-top').css({
            transform: 'translateX(' + perX + ')'
        })
    }

    //停止更新
    function stop(){
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (duration * 1000);
        cancelAnimationFrame(frameId);

    }
    root.pro = {
        renderAllTime :renderAllTime,
        start : start,
        stop : stop,
        update : update,
        frameId : frameId
    }
})(window.Zepto, window.player || (window.player = {}))