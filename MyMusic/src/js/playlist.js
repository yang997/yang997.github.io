(function($,root){
    var $scope = $(document.body);
    var $playList = $("<div class = 'play-list'>"+
    "<div class='play-header'>播放列表</div>" + 
    "<ul class = 'list-wrapper'></ul>" +
    "<div class='close-btn'>关闭</div>"+
"</div>") 

    function renderList(songList){
        var str = '';
        for(var i = 0; i < songList.length; i++){
            str += "<li><h3 >"+songList[i].song+"-<span>"+songList[i].singer+"</span></h3></li>"
        }
        $playList.find("ul").html(str);
        $scope.append($playList);
        bindEvent();
    }
    function show (control){
        $playList.addClass("show");
        signSong(control.index);
    }
    function signSong (index) {
        $playList.find(".sign").removeClass("sign");
        $playList.find("ul li").eq(index).addClass("sign");
    }
    function bindEvent(){
        $(".close-btn").on('click',function(){
            $playList.removeClass("show")
        });
        $('ul').on('click','li',function(){
            var index = $(this).index();
            signSong(index);
            control.index = index;
            audio.status = "play";
            $scope.trigger("play:change",index);
            $scope.find(".play").addClass("playing");
            setTimeout(function(){
                $playList.removeClass("show")
            },200);

        })
    }


    root.playList = {
        renderList : renderList,
        show : show
    }
})(window.Zepto,window.player || (window.player = {}))