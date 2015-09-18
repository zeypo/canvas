var canvas = document.getElementById('canvas');
var ctx    =  canvas.getContext('2d');
var H      = 500;
var W      = 800;
var ismove = false;

var matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


var colors = ['#27ae60', '#2ecc71', '#16a085', '#1abc9c'];


var getPositions = function getPositions(matrix) {
    var positions = [];
    var ywidth = matrix.length;
    var xwidth = matrix[0].length;

    for(arr in matrix) {
        for(num in matrix[arr]) {

            var n = matrix[arr][num];
            var position = {};

            position.x = W / xwidth * num;
            position.y = H / ywidth * arr;
            position.b = n;

            positions.push(position);
        }
    }

    return positions;
}

var positions = getPositions(matrix);
console.log(positions);

var getTotalParticles = function getTotalParticles(matrix) {
    var count = 0;

    for(arr in matrix) {
        for(num in matrix[arr]) {
            if(matrix[arr][num] == 1) {
                count++;
            }
        }
    }

    return count;
};

var particlesCount = getTotalParticles(matrix);

var Particle = function Particle(posx, posy) {

    this.x        = Math.floor((Math.random() * 790) + 9);
    this.y        = Math.floor((Math.random() * 490) + 9);
    this.posx     = posx;
    this.posy     = posy;
    this.continue = true;
    this.vx       = Math.random() * 2;
    this.vy       = Math.random() * 2;
    this.r        = 5;
    this.color    = colors[Math.floor(Math.random() * colors.length)];

    this.draw = function drawParticle() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
        ctx.fill();

        if(this.x > W) {
            this.vx = -this.vx;
        }
        if(this.y > H) {
            this.vy = -this.vy;
        }
        if(this.x < -1) {
            this.vx = -this.vx;
        }
        if(this.y < -1) {
            this.vy = -this.vy;
        }
    }
}

var particles = [];

for(var i = 0; i < positions.length; i++) {
    if (positions[i].b == 1) {
        particles.push(new Particle(positions[i].x, positions[i].y));
    }
}

var moveParticles = function moveParticles() {
    for(var j = 0; j < particles.length; j++) {
        var p = particles[j];

        p.x = p.posx;
        p.y = p.posy;
    }
}

function moveObject(ac, ne, v){
    var s = {x:1, y:1};        // sens
    var move = {x:1, y:1}; // pixel de déplacement
    var delta = 0;     // delta -> pythagore
    var dist = {};     // distance entre start et end

    // distance x/y
    dist.x = Math.abs(ac.x-ne.x);
    dist.y = Math.abs(ac.y-ne.y);

    // racine carré de A² + B² (pythagore) -> donne l'hypoténuse
    delta = Math.sqrt((dist.x*dist.x)+(dist.y*dist.y));

    // règle des tiers afin d'avoir le déplacement par rapport à V et Delta
    move.x = (dist.x*v)/delta;
    move.y = (dist.y*v)/delta;

    // déplacement vers la gauche -1, droite 1, haut -1, bas 1
    s.x = (ac.x > ne.x)? -1: 1;
    s.y = (ac.y > ne.y)? -1: 1;

    // rajoute à nos coordonnées actuel le déplacement dans le bon sens
    ac.x += move.x*s.x;
    ac.y += move.y*s.y;
    ac.continue = (dist.x <= v && dist.y <= v)? true: false;
    // retourne si l'objet est arrivé à son objectif -Vpx=marge d'erreur-
    return ac;//
};

var update = function update() {

    if(ismove == false) {
        for(var j = 0; j < particles.length; j++) {
            var p = particles[j];

            p.x += p.vx;
            p.y += p.vy;
        }
    }
    else {
        for(var j = 0; j < particles.length; j++) {
            var p = particles[j];
            if(p.continue == true){
                var place = {x : p.x, y : p.y};
                var to = {x : p.posx, y : p.posy};
                var pos = moveObject(place, to, 6);
                if(!pos.continue) {
                    p.x = pos.x;
                    p.y = pos.y;
                }
                else {
                    p.continue = false;
                }
            }
        }
    }
};

var render = function render() {

    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, W, H);

    for(var j = 0; j < particles.length; j++) {
        var p = particles[j];
        p.draw();
    }
};


var lastUpdate;

function tick() {
  var now = window.Date.now();

  if (lastUpdate) {
    var elapsed = (now-lastUpdate) / 1000;
    lastUpdate = now;
    update();
    render();
  } else {
    lastUpdate = now;
  }

  window.requestAnimationFrame(tick);
};

canvas.addEventListener('click', function(event) {
    ismove = true;
});

tick();
