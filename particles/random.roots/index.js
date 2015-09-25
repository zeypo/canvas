'use strict';

var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
    c.height = window.innerHeight;
    c.width  = window.innerWidth;


var Roots = function Roots() {
    var _this = this;

    this.config = {
        length   : 200,
        velocity : 1,
        radius   : 1
    };
    this.roots = [];

    this.init = function initCanvas() {
        _this.createRoots();
        _this.loop();
    };

    this.update = function updateCanvas() {

    };

    this.render = function renderCanvas() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, c.width, c.height);

        for (var i = 0; i < _this.roots.length; i++) {
            _this.roots[i].draw();
        }
    };

    this.createRoots = function createRoots() {
        for (var i = 0; i < _this.config.length; i++) {
            _this.roots.push(new Root(i));
            _this.roots[i].draw();
        }
    };

    function Root(key) {
        this.x = Math.random() * c.width;
        this.y = Math.random() * c.height;
        this.sp = {
            x : this.x,
            y : this.y
        };
        this.ep = {
            x : this.x,
            y : this.y
        };
        this.key  = key;
        this.life = 0;
        this.rw   = Math.random() * 360;
        this.vx   = Math.random() * _this.config.velocity;
    }

    Root.prototype = {

        draw : function() {
            ctx.beginPath();
            ctx.strokeStyle = '#fff';
            ctx.moveTo(this.sp.x, this.sp.y);
            ctx.lineTo(this.ep.x, this.ep.y);
            ctx.stroke();
            ctx.closePath();
            this.sp = this.ep;
        },

        update : function() {
            this.rw   += Math.random() * -5;
            this.ep.x += Math.cos(this.rw) * this.vx;
            this.ep.y += Math.sin(this.rw) * this.vx;
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



var roots = new Roots();
roots.init();
