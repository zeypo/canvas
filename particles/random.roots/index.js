'use strict';

var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
    c.height = window.innerHeight;
    c.width  = window.innerWidth;


var Roots = function Roots() {
    var _this = this;

    this.config = {
        length   : 1,
        velocity : 1,
        radius   : 10,
        maxLife  : 100
    };
    this.roots = [];

    this.init = function initCanvas() {
        _this.createRoots();
        _this.loop();
    };

    this.update = function updateCanvas() {
        for (var i = 0; i < _this.roots.length; i++) {
            if(_this.roots[i]) {
                _this.roots[i].update();
            }
        }
    };

    this.render = function renderCanvas() {
        ctx.fillStyle = 'rgba(0,25,25,0.05)';
        ctx.fillRect(0, 0, c.width, c.height);

        for (var i = 0; i < _this.roots.length; i++) {
            if(_this.roots[i]) {
                _this.roots[i].draw();
            }
        }
    };

    this.createRoots = function createRoots() {
        for (var i = 0; i < _this.config.length; i++) {
            _this.roots.push(new Root(c.width / 2, c.height / 2, i));
        }
    };

    function Root(x, y, key) {
        this.x = x,
        this.y = y,
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
        this.vx   = 5;
    }

    Root.prototype = {

        draw : function() {
            ctx.beginPath();
            ctx.strokeStyle = '#0ff';
            ctx.moveTo(this.sp.x, this.sp.y);
            ctx.lineTo(this.ep.x, this.ep.y);
            ctx.stroke();
            ctx.closePath();

            this.sp.x = this.ep.x;
            this.sp.y = this.ep.y;
        },

        update : function() {
            this.rw   += Math.random() * -0.09;
            this.ep.x += Math.cos(this.rw) * this.vx +  Math.random() < 0.5 ? -1 : 1;
            this.ep.y += Math.sin(this.rw) * this.vx +  Math.random() < 0.5 ? -1 : 1;
            this.life++;

            if (Math.random() > 0.96 && _this.roots.length < 100) {
            	_this.roots.push(new Root(this.sp.x, this.sp.y, _this.roots.length + 1));
            }

            if(this.life >= _this.config.maxLife) {
                delete _this.roots[this.key];
            }
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
