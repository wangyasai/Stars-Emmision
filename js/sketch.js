var shadow;
var theata = 0;
var myCanvas;
var stars = [];
var rgb;

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
} : null;
}


function setup() {
    myCanvas = createCanvas(windowWidth, windowHeight);
    background(10);
    for(var i = 0; i < 4001;i++){
        stars[i] = new Star();
    }
}


function draw() {

    if(options.isPNG == true){
        clear();
    }else{
        rgb = hexToRgb(options.Background);
        background(rgb.r, rgb.g, rgb.b, 30);
    }


    if(frameCount<10){
        background(10);
    }
    if(options.Direction == 'Center-Inward' || options.Direction == 'Center-Outward'  ){
        translate(width/2,height/2);
    }else if (options.Direction == 'Right'){
        translate(0,height/2);
    }else if (options.Direction == 'Left'){
        translate(width,height/2);
    }else if (options.Direction == 'Down'){
        translate(width/2,0);
    }else if (options.Direction == 'Up'){
        translate(width/2,height);
    }

    for (var i = 0; i < options.Counts; i++){
        stars[i].display();
        stars[i].update();
    }
}



function Star(){
    this.x = random(-width*3,width*3);
    this.y = random(-width*3,width*3);
    this.z = random(width*2,width*4);
    this.pz = this.z;
    this.px = this.x;
    this.py = this.y;

    this.angle = 0;

    this.display = function(){
        var sx = map(this.x/this.z/2, -1, 1, -width, width);
        var sy = map(this.y/this.z/2, -1, 1, -height, height);

        if(options.Direction == 'Center-Inward'){
            var r = map(dist(0,0,this.px,this.py),0,width/2, 0, options.Size);
        }else{
            var r = map(dist(sx,sy,this.px,this.py),0,width/2,options.Size,options.Size*4);
        }

        var n = map(options.Range,0,200,0,width);
        var percent = norm(dist(sx,sy,0,0), 0, n);
        from = color(options.Color1);
        to = color(options.Color2);
        between = lerpColor(from, to, percent);

        stroke(between);
        strokeWeight(r);

        if(this.z >= 1 && sx <= width && sx > -width && sy > -height && sy < height ){
           line(this.px,this.py,sx,sy);   
           this.px = sx;     
           this.py = sy; 
       }          
   }

   this.update = function(){
    if(options.Direction == 'Center-Inward'){
       this.z += options.Speed;    
       if( dist(0,0,this.px,this.py) < options.Range || this.z > width*3 ){
        this.angle = random(TWO_PI);
        this.z = random(width*1.5,width*2);
        this.x = random(-width*2,width*2);
        this.y = random(-width*2,width*2);
        this.px = map(this.x/this.z/2, -1, 1, -width, width);
        this.py = map(this.y/this.z/2, -1, 1, -height, height);
    }
}else{
    this.z -= options.Speed;    
    if(this.z<1 ){
        this.z = random(width*1.5,width*2);
        this.x = random(-width*2,width*2);
        this.y = random(-width*2,width*2);
        this.px = map(this.x/this.z/2, -1, 1, -width, width);
        this.py = map(this.y/this.z/2, -1, 1, -height, height);
    }
}
}
}
