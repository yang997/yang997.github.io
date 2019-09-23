
// oDiv.sliderImg({
//     image: ['./imges/1.jpg', './imges/2.jpg', './imges/3.jpg', './imges/4.jpg'],
//     interVal: 3000
// })

(function () {
    function Swiper(opt) {
        this.wrap = opt.father;
        this.img = opt.image;
        this.interVal = opt.interVal;
        this.init();
    }

    Swiper.prototype.init = function () {
        this.nowIndex = 0;
        this.timer = null;
        // this.timer1 = null;
        this.lock = true;
        this.len = this.img.length;
        this.itemWidth = this.wrap.offsetWidth;
        // this.itemHeight = this.wrap.offsetHeight;

        this.createDom();
        this.move();
        // this.changeIndex();
        this.bindEvent();
        // this.autoMove();

        // timer = setTimeout(this.autoMove, 1500);
    }

    Swiper.prototype.createDom = function () {
        var len = this.len;
        var str = '';
        var h = this.wrap.offsetHeight;
        var w = this.wrap.offsetWidth;
        // var h = this.wrap.offsetHeight;
        var ulW = w * (this.len + 1);

        var btn = ` <div class="btn leftBtn">&lt;</div>
                    <div class="btn rightBtn">&gt;</div>`;
        var list = `<ul></ul>`;
        var liStr = '';
        for (var i = 0; i < this.len; i++) {
            str += `<li style="width:${w}px;height:${h}px"><a href="javascript:;" ><img src="${this.img[i]}" alt=""></a></li>`;
            liStr += `<span></span>`;
        }
        str += `<li style="width:${w}px;height:${h}px"><a href="javascript:;"><img src="${this.img[0]}" alt=""></a></li>`

        var sliderPage = `<ul class="sliderPage" style="width:${ulW}px; height:${h}px">${str}</ul>`;

        var sliderIndex = `<div class="sliderIndex">${liStr}</div>`;

        this.wrap.innerHTML = sliderPage + btn + sliderIndex;
        this.wrap.getElementsByTagName('span')[0].className = 'active'
        // console.log(this.wrap.getElementsByClassName('sliderPage')[0].offsetLeft)
        this.dom();
    }

    Swiper.prototype.dom = function () {
        this.sliderPage = this.wrap.getElementsByClassName('sliderPage')[0];
        this.w = this.wrap.offsetWidth;
        this.leftBtn = this.wrap.getElementsByClassName('leftBtn')[0];
        this.rightBtn = this.wrap.getElementsByClassName('rightBtn')[0];
        console.log(this.sliderPage.offsetLeft)
    }

    Swiper.prototype.bindEvent = function () {
        var self = this;
        this.leftBtn.onclick = function () {

            self.autoMove('right->left');
        }
        this.rightBtn.onclick = function () {

            self.autoMove('left->right');
        }
        var wrap = this.wrap;
        for (var i = 0; i < this.len; i++) {
            (function (myIndex) {
                wrap.getElementsByTagName('span')[myIndex].onclick = function () {

                    clearTimeout(self.timer);
                    self.lock = false
                    self.nowIndex = myIndex;
                    self.starSlider(self.sliderPage, -self.nowIndex * self.w, function () {
                        self.lock = true;
                        self.timer = setTimeout(self.autoMove, self.interVal);
                        self.changeIndex(self.nowIndex);
                    })
                }
            })(i)
        }
    }

    Swiper.prototype.changeIndex = function (_index) {
        for (var i = 0; i < this.len; i++) {
            this.wrap.getElementsByTagName('span')[i].className = '';
        }
        this.wrap.getElementsByTagName('span')[_index].className = 'active';
    }

    Swiper.prototype.move = function () {
        var self = this;
        // console.log(self)
        this.autoMove = function (direction) {
            if (self.lock) {

                self.lock = false;
                clearTimeout(self.timer);
                if (!direction || direction == 'left->right') {
                    self.nowIndex++;
                    self.starSlider(self.sliderPage, (self.sliderPage.offsetLeft - self.w), function () {
                        if (self.sliderPage.offsetLeft == -self.len * self.w) {
                            self.nowIndex = 0;
                            self.sliderPage.style.left = 0 + 'px';
                        }
                        self.timer = setTimeout(self.autoMove, self.interVal);
                        self.lock = true;
                        self.changeIndex(self.nowIndex);
                    });
                } else if (direction == 'right->left') {
                    if (self.sliderPage.offsetLeft == 0) {
                        self.sliderPage.style.left = -self.len * self.w + 'px';
                        self.nowIndex = self.len;
                    }
                    self.nowIndex--;
                    // console.log(self.nowIndex)
                    // console.log(self.sliderPage.offsetLeft)
                    self.starSlider(self.sliderPage, (self.sliderPage.offsetLeft + self.w), function () {
                        self.timer = setTimeout(self.autoMove,self.interVal);
                        self.lock = true;
                        self.changeIndex(self.nowIndex);
                    })
                }
            }
        }
        self.timer = setTimeout(this.autoMove, self.interVal);

        this.starSlider = function (dom, target, func) {
            clearInterval(self.timer1);
            var speed = null;
           self.timer1 = setInterval(function () {
                speed = (target - dom.offsetLeft) / 7;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (dom.offsetLeft == target) {
                    clearInterval(self.timer1);
                    func();
                } else {
                    dom.style.left = dom.offsetLeft + speed + 'px';
                }

            }, 30)
        }

       

    }

    HTMLDivElement.prototype.sliderImg = function (options) {
        options.father = this;
        new Swiper(options);

    }
}())


