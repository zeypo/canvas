var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
    c.height = window.innerHeight;
    c.width  = window.innerWidth;

var AbStract = function AbStract() {

    var _this  = this;
    var stars  = [];
    var config = {
        stars : {
            length : 2000,
            velocity : 0.2
        },
        radius : 100
    };
    var mouse = {
        x : c.width / 2,
        y : c.height / 2
    };

    this.init = function init() {
        _this.createStars();
        _this.loop();
    };

    this.createStars = function createStars() {
        for(var i = 0; i < config.stars.length; i++) {
            var star = new Star(c, ctx, config.stars);
            stars.push(star);
        }
    };

    this.updateMousePosition = function updateMousePosition(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    this.updatePosition = function updatePosition() {

        for(var i = 0; i < stars.length; i++) {
            var star = stars[i];

            if( Math.pow( (star.x - mouse.x), 2 ) + Math.pow( (star.y - mouse.y), 2 ) < Math.pow(config.radius, 2) ) {
                star.r = star.rbig;
                star.color = star.colored;
                star.configs.ismoovable = false;
            }
            else {
                star.r = star.rbase;
                star.color = '#fff';
                star.configs.ismoovable = true;
            }

        }
    };

    this.update = function update() {
        this.updatePosition();

        for(var i = 0; i < stars.length; i++) {
            var star = stars[i];
            star.update();
        }
    };

    this.render = function render() {

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, c.width, c.height);

        for(var i = 0; i < stars.length; i++) {
            stars[i].draw();
        }
    };

    this.loop = function loop() {
        var now = window.Date.now();

        if (_this.lastUpdate) {
            _this.lastUpdate = now;
            _this.update();
            _this.render();
        }
        else {
            _this.lastUpdate = now;
        }

        window.requestAnimationFrame(_this.loop);
    };

};

var abStract = new AbStract();
abStract.init();

document.addEventListener('mousemove', function(e) {
    abStract.updateMousePosition(e);
});
