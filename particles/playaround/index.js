var lastUpdate;
var canvas = document.getElementById('canvas');
var c      = canvas.getContext('2d');

var Particle = function Particle(id) {

    this.id      = id;
    this.x       = canvas.width / 2;
    this.y       = canvas.height / 2;
    this.r       = 5;
    this.vx      = Math.random() * 20 -10;
    this.vy      = Math.random() * 20 -5;
    this.gravity = 0.5;
    this.life    = 0;
    this.maxLife = 100;

    this.update = function updateParticle() {
        this.x  += this.vx;
        this.y  += this.vy;
        this.vy += this.gravity;
    };

    this.draw = function drawParticle() {
        c.beginPath();
        c.fillStyle = 'white';
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.closePath();
        c.fill();
    };
}

var particle = new Particle();

var update = function update() {
    particle.update();
};

var render = function render() {

    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particle.draw();
};


var tick = function tick() {

    var now = window.Date.now();

    if (lastUpdate) {
        var elapsed = (now-lastUpdate) / 1000;
        lastUpdate = now;
        update();
        render();
    }
    else {
        lastUpdate = now;
    }

    window.requestAnimationFrame(tick);
};

tick();
