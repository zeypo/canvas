window.onload = function() {
// RequestAnimFrame: a browser API for getting smooth animations
var lastUpdate;


// Création de l'environement
var canvas = document.getElementById('canvas');
var ctx    = canvas.getContext('2d');
var animloop;

var W = 800;
var H = 800;

// Définitions des éléments necessaires
var particles = [];
var ball      = {};
var paddles   = [2];

// Définition de la balle
var ball = {
    x  : 50,
    y  : 50,
    r  : 5,
    c  : 'yellow',
    vx : 4,
    vy : 8,

    draw : function() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        ctx.fill();
    }
};

// Constructeur paddle
var Paddle = function(pos) {

    this.w = 150;
    this.h = 10;
    this.x = W / 2 - (this.w / 2);
    this.y = pos === 'top' ? 0 : H - this.h;
}

paddles.push(new Paddle('top'));
paddles.push(new Paddle('bottom'));


function draw() {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, W, H);

    for(var i = 0; i < paddles.length; i++) {
        var p = paddles[i];

        ctx.fillStyle = 'green';
        ctx.fillRect(p.x, p.y, p.w, p.h)
    }

    ball.draw();
}

function update() {
	console.log('coucou');
    ball.x += ball.vx;
    ball.y += ball.vy;

    draw();
}

function tick() {
  var now = window.Date.now();

  if (lastUpdate) {
    var elapsed = (now-lastUpdate) / 1000;
    lastUpdate = now;

    // Update all game objects here.
    update();
    // ...and render them somehow.
    render();
  } else {
    // Skip first frame, so elapsed is not 0.
    lastUpdate = now;
  }
}

window.requestAnimFrame(tick);


}
