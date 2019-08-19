# yang997.github.io
##原生JS轮播图插件 sliderImg
- 插件使用方法:获取到轮播图父级dom元素div，调用扩展在HTMLDivElement原型上的sliderImg方法
- 在应用样式中需要设置父级的固定宽高
- 同时插件需要传入参数为展示图片的路径和图片切换时间
- 例如：

 ```js
  var oDiv = document.getElementById('wrapper');
        oDiv.sliderImg({
            image: ['./imges/1.jpg', './imges/2.jpg', './imges/3.jpg', './imges/4.jpg'],
            interVal: 3000
        })
```
