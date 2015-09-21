var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
    c.height = window.innerHeight;
    c.width  = window.innerWidth;

var Constelation = function Constelation() {

    var _this = this;
    var config = {
        length   : 1000,
        velocity : 0.1,
        radius   : 150,
        maxnodes : 5,
        position : {
            x : 0,
            y : 0
        },
        distance : 50,
        colors : [
            [
                '26, 188, 156',
                '22, 160, 133',
                '46, 204, 113',
                '39, 174, 96'
            ],
            [
                '192, 57, 43',
                '192, 57, 43'
            ]
        ]
    };

    this.stars = [];

    this.init = function init() {
        _this.setInitialPosition();
        _this.createStars();
        _this.loop();
    };

    this.setInitialPosition = function() {
        config.position = {
            x : c.width * 0.5,
            y : c.height * 0.5
        };
    };

    this.update = function update() {
        for (var i = 0; i < _this.stars.length; i++) {
            _this.stars[i].update();
        }
    };

    this.render = function render() {

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, c.width, c.height);

        for (var i = 0; i < _this.stars.length; i++) {
            _this.stars[i].draw();
        }

        _this.stars[0].line();

    };

    function Star() {
        var palette = 1;
        var color   = Math.floor(Math.random() * config.colors[palette].length);

        this.x      = Math.random() * c.width;
        this.y      = Math.random() * c.height;
        this.r      = Math.random();
        this.vx     = (config.velocity - (Math.random() * 0.5));
        this.vy     = (config.velocity - (Math.random() * 0.5));
        this.color  = 'rgba(' + config.colors[palette][color] + ', ' + Math.random() + ')';
        this.nodes  = 0;
    }

    Star.prototype = {

        draw : function() {
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = 10;
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        },

        update : function() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.y < 0 || this.y > c.height) {
                this.vx = this.vx;
                this.vy = -this.vy;
            }
            else if (this.x < 0 || this.x > c.width) {
                this.vx = -this.vx;
                this.vy = this.vy;
            }

            this.nodes = 0;
        },

        line : function() {

            for (i = 0; i < config.length; i++) {
                for (j = 0; j < config.length; j++) {
                    iStar = _this.stars[i];
                    jStar = _this.stars[j];

                    if (
                        (iStar.x - jStar.x) < config.distance &&
                        (iStar.y - jStar.y) < config.distance &&
                        (iStar.x - jStar.x) > - config.distance &&
                        (iStar.y - jStar.y) > - config.distance
                    ) {
                        if (
                            (iStar.x - config.position.x) < config.radius &&
                            (iStar.y - config.position.y) < config.radius &&
                            (iStar.x - config.position.x) > - config.radius &&
                            (iStar.y - config.position.y) > - config.radius &&
                            iStar.nodes < config.maxnodes //&& jStar.nodes < config.maxnodes
                        ) {
                            var color = Math.floor(Math.random() * config.colors.length);
                            ctx.beginPath();
                            ctx.strokeStyle = iStar.color;
                            ctx.moveTo(iStar.x, iStar.y);
                            ctx.lineTo(jStar.x, jStar.y);
                            ctx.stroke();
                            ctx.closePath();

                            _this.stars[i].nodes++;
                            _this.stars[j].nodes++;
                        }
                    }
                }
            }
        }
    };

    this.createStars = function createStars() {
        var star;

        for (var i = 0; i < config.length; i++) {
            _this.stars.push(new Star());
            star = _this.stars[i];
            star.draw();
        }

        star.line();
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

    this.updatePosition = function updatePosition(e) {
        config.position = {
            x : e.clientX,
            y : e.clientY
        };
    };

};

var constelation = new Constelation();

constelation.init();

window.addEventListener('mousemove', function(e) {
    constelation.updatePosition(e);
});
