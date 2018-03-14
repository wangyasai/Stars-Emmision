<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Star Emission</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="" rel="stylesheet">

<!-- Global Site Tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-115624840-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'GA_TRACKING_ID');
</script>
 
 <!--网页标题左侧显示-->
<link rel="icon" href="image/1.ico" type="image/x-icon">
<!--收藏夹显示图标-->
<link rel="shortcut icon" href="image/1.ico" type="image/x-icon">

<script type="text/javascript" src="js/dat.gui.min.js"></script>
<script type="text/javascript" src="js/p5.min.js"></script>
<script type="text/javascript" src="js/gif.js"></script>
<script type="text/javascript" src="js/p5.dom.min.js"></script>


<input id="img-path" type="file" />

<style type="text/css">
  *{
    margin:0;
    padding:0;
  }

#credits {
  font-size: 12px;
  position: absolute;
  bottom: 15px;
  right: 15px;
  opacity: 0.8;
  color: #939393;
  max-width: 70%;
  text-align: right;
}

#img-path {
    display: none;
}
.progress-box{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.progress-bar{
  height: 3px;
  width: 0%;
  background-color: #e61d5f;
}
.save-gif-tip{
  display: none;
  margin-bottom: 5px;
  text-align: center;
  font-size: 16px;
  color: white;
}
</style>
</head>
<body>

<div id="credits"> Created by  <a href = "https://weibo.com/psaiaevegas/profile?rightmod=1&wvr=6&mod=personnumber" target="_blank" style="color: #939393;">Yasai</a>  |  <a href = "http://yasaisai.tumblr.com/archive" target="_blank" style="color: #939393;"> Tumblr Arhive </a> </div>
<div class="progress-box">
  <p class="save-gif-tip">(｀・ω・´) Gif is saving , please wait a moment </p>
  <p class="progress-bar"></p>
</div>
<script type="text/javascript">

var type;
var options ={  
  Background : [10,10,10],
  Color1 : '#FF3054',//[255,48,84],
  Color2 : '#4614E9',
  Range : 400,
  Speed : 20,
  Points : 1000,
  maxSize : 10,
  minSize: 3,
  Direction : 'Center',

  Random: function () { 
          options.Color1 = [random(0,255),random(0,255),random(0,255)]; 
          options.Color2 = [random(0,255),random(0,255),random(0,255)];        
          options.Speed = random(10,20);
          options.Range = random(400);
          options.Points = random(300,2000);
          options.maxSize = random(1,20);
          options.minSize = random(1,5);  
          options.Shape = random( ['Center', 'Left','Right','Up','Down'] );       
        },

  isPNG: false,
  
  Save : function(){
    saveFrames("Star-Emission", "png", 1, 1);
  },

  // SaveGif : function(){
  //   createGif();
  // }
}


var text, gui, config;
window.onload = function() {
  gui = new dat.GUI();

  //folder1
  var folder1 = gui.addFolder('Controls');

  var BgControl = folder1.addColor(options, 'Background');
  BgControl.onChange(draw);

  var color1Control = folder1.addColor(options, 'Color1');
  color1Control.onChange(draw);

  var color2Control = folder1.addColor(options, 'Color2');
  color2Control.onChange(draw);

  var speedControl = folder1.add(options, 'Speed',10,40);
  speedControl.onChange(draw);

  var PointsControl = folder1.add(options, 'Points',100,4000);
  PointsControl.onChange(draw);

  var PointsControl = folder1.add(options, 'Range',100,2000);
  PointsControl.onChange(draw);

  var maxSizeControl = folder1.add(options, 'maxSize',0,20);
  maxSizeControl.onChange(draw);

  var minSizeControl = folder1.add(options, 'minSize',0,10);
  minSizeControl.onChange(draw);

  var DirControl = folder1.add(options, 'Direction',['Center', 'Left','Right','Up','Down'] );

  var RandomControl = folder1.add(options, 'Random');


  //folder2
  var folder2 = gui.addFolder('Save');
  // var isPNGControl = folder2.add(options, 'isPNG');
  // isPNGControl.onChange(draw);

  var SaveControl = folder2.add(options, 'Save');
  // var SaveControl = folder2.add(options, 'SaveGif');


  folder1.open();
  folder2.open();
};


var gif = new GIF({
  workers: 2,
  quality: 10,
  workerScript:'js/gif.worker.js'
});

var canvas = document.getElementById('defaultCanvas0'),
  t, needFrames = 28, startFrame=0, delay=120,
  progressBar = document.querySelector('.progress-bar'),
  progressTip = document.querySelector('.save-gif-tip');

function createGif(){
  t = setInterval(addFrame,50); 
}


function addFrame(){
  gif.addFrame(canvas,{delay:delay});
  startFrame++;
  progressBar.style.width = 100*(startFrame/needFrames)+'%';
  if(startFrame>=needFrames){
    finishGif();
  }
}


function finishGif(){
  clearInterval(t);
  progressTip.style.display='block';
  gif.on('finished', function(blob) {
    window.open(URL.createObjectURL(blob));
    var anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download ='1.gif';
    progressTip.style.display='none';
    progressBar.style.width =0;
    anchor.click();
  });

  gif.render();
}

</script>

<script type="text/javascript" src="js/sketch.js"></script>
</body>

</html>

