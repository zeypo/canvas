'use strict';

var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
    c.height = window.innerHeight;
    c.width  = window.innerWidth;

var Constelation = function Constelation() {

    var _this = this;

    this.config = {
        length   : 200,
        velocity : 0.1,
        radius   : 1
    };
    this.stars = [];

    this.init = function init() {

        _this.createStars();
        _this.loop();
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

    };

    this.createStars = function createStars() {
        for (var i = 0; i < _this.config.length; i++) {
            _this.stars.push(new Star());
            var star = _this.stars[i];

            star.draw();
        }
    };

    function Star() {
        this.x  = Math.random() * c.width;
        this.y  = Math.random() * c.height;
        this.r  = Math.random() * _this.config.radius;
        this.vx = (_this.config.velocity - (Math.random() * 0.5));
        this.vy = (_this.config.velocity - (Math.random() * 0.5));
    }

    Star.prototype = {

        draw : function() {
            ctx.beginPath();
            ctx.fillStyle = '#fff';
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
        },

        line : function() {

            //for (var i = 0; i < _this.config.)
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

var constelation = new Constelation();
constelation.init();
