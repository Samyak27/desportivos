$(document).ready(function(){

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var w = canvas.width = $(window).width(),
      h = canvas.height = $(window).height();

  var rtio = 0;
  var x = 0, y = 0;

  // Vars
  var redColor = [];
  var greenColor = [];
  var blueColor = [];
  var px = [];
  var py = [];
  var direction = [];
  var directionY = [];
  var radius = [];

  // Keyframes Variables
  var filterStrength = 20;
  var frameTime = 0, lastLoop = new Date, thisLoop;

  var x_p = 0;
  var y_p = 0;
  var moving = false;
  $(document).mousemove(function(e){
    x_p = e.pageX;
    y_p = e.pageY;
    moving = true;
    rtio= 100;
  });
  $(document).mouseout(function(e){
    moving = false;
  });

  function clearR(){ ctx.clearRect(0,0,w,h);}
  dibujaCir();
  var ncursor = 1;
  var intervalo = setInterval(dibujaCir, 10);
  var time = 0;
  function dibujaCir()
  {
    for(i=0; i<ncursor;i++)
    {
      // Red Color
      red = Math.floor(Math.random()*155) + 100;
      redColor.push(red);

      // Green Color
      green = Math.floor(Math.random()*155) + 100;
      greenColor.push(green);

      // Blue Color
      blue = Math.floor(Math.random()*155) + 100;
      blueColor.push(blue);

      direction.push(Math.floor(Math.random()*2));
      directionY.push(Math.floor(Math.random()*3));

      r = Math.floor(Math.random()*10)+10;
      radius.push(r);

      x = (x_p+5+(i*200)-((ncursor/2)*200-100));
      px.push(x);

      y = (y_p+5);
      py.push(y);

      // Append Circles
      ctx.beginPath();
      ctx.fillStyle = "rgb("+red+","+green+", "+blue+")";
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    time++;
  }

  setInterval(function(){ 
    $("#fps").text((1000/parseInt(frameTime)).toFixed(1) + " fps");
  },100);

  setInterval(muevebola, 10);
  var time = 0;
  
  function muevebola()
  {
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;
    clearR();
    rtio+=1;
    for(i=0;i<py.length;i++)
    {
      px[i] = direction[i] == 0? px[i]-(Math.random()*2) : px[i]+(Math.random()*2);
      
      if(!moving)
      {
        px[i] = Math.sin((py.length*i)/360)*(2*i) + (w/2);
        x_p+=0.1;
        if(x_p > w)
        {
          x_p = 0;
          rtio = 100;
        }
      }
      
      py[i] = directionY[i] > 0? (directionY[i] == 1 ? py[i]-(Math.random()*2) : py[i]+(Math.random()*2)) :  py[i];
      
      if(!moving)
      {
        py[i] = Math.cos((py.length*i)/360)*(2*i) + (h/2);
      }
      
      ctx.beginPath();
      ctx.fillStyle = "rgb("+redColor[i]+","+greenColor[i]+", "+blueColor[i]+")";
      
      if(time % 5 == 0) 
          radius[i] = parseInt(radius[i]) - (ncursor/5)*2 < 0 ?  0 : parseInt(radius[i]) - (ncursor/5)*2;
      
      ctx.arc(px[i], py[i], radius[i], 0, Math.PI * 2);
      ctx.fill();
      if((parseInt(radius[i]) <= 0  && moving) || (i > 60 && !moving))
      {
        if(!moving) i = 0;
        delete py.splice(i, 1);
        delete redColor.splice(i, 1);
        delete greenColor.splice(i, 1);
        delete blueColor.splice(i, 1);
        delete px.splice(i, 1);
        delete direction.splice(i, 1);
        delete directionY.splice(i, 1);
        delete radius.splice(i, 1);
      }
    }
    time++;

  }
});