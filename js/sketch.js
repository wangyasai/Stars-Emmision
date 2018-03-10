var shadow;
var theata = 0;
var myCanvas;
var stars = [];

function setup() {
    myCanvas = createCanvas(windowWidth, windowHeight);
    background(10,10,10);
    for(var i = 0; i < 2000;i++){
        stars[i] = new Star();
    }
}

function draw() {
    // background(10,10,10,10);
    // shadow='rgba(10,10,10,'+(1-options.Shadow)+')';
    background(10,10,10,options.Shadow);

    if(options.isPNG == true){
        clear();
    }

    if(options.Direction == 'Center'){
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
    
    for (var i = 0; i < options.Points; i++){
        stars[i].display();
        stars[i].update();
    }
}

function Star(){
    this.x = random(-width,width);
    this.y = random(-height,height);
    this.z = random(width);


    this.display = function(){

        var sx = map(this.x/this.z, 0, 1, 0, width);
        var sy = map(this.y/this.z, 0, 1, 0, height);
        var r = map(dist(sx,sy,0,0),0,width/2,options.minSize,options.maxSize);
        
        var percent = norm(dist(sx,sy,0,0), 0, options.Range);
        from = color(options.Color1);
        to = color(options.Color2);
        between = lerpColor(from, to, percent);
       
        fill(between);
        noStroke();
        ellipse(sx, sy, r,r);

    }

    this.update = function(speed){
        this.z = this.z-options.Speed;
        if( this.z < -50 ){
            this.z = width;    
            this.x = random(-width/2, width/2);
            this.y = random(-height/2, height/2);
        }

    }
}
