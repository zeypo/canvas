'use strict';

var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
    c.height = window.innerHeight;
    c.width  = window.innerWidth;


var Roots = function Roots() {
    var _this = this;

    this.config = {
        length   : 2,
        velocity : 100,
        radius   : 100,
        maxLife  : 100,
        clickx   : null,
        clicky   : null,
        randomness : 0.99
    };
    this.roots = [];

    this.init = function initCanvas(x, y) {
        _this.config.clickx = x;
        _this.config.clicky = y;
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
        ctx.fillStyle = 'rgba(0,25,25,0.01)';
        ctx.fillRect(0, 0, c.width, c.height);

        for (var i = 0; i < _this.roots.length; i++) {
            if(_this.roots[i]) {
                _this.roots[i].draw();
            }
        }
    };

    this.createRoots = function createRoots() {
        for (var i = 0; i < _this.config.length; i++) {
            //var pos = {x : c.width / 2, y : c.height / 2}
            var pos = {x : _this.config.clickx, y : _this.config.clicky};
            //var pos = {x : Math.floor((Math.random() + 1) * c.width / 2), y : Math.floor((Math.random() + 1) * c.height / 2)};
            console.log(pos.x);
            _this.roots.push(new Root(pos.x, pos.y, i));
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

        this.stroke = Math.floor((Math.random() * 1) + 1);
        this.key    = key;
        this.life   = 0;
        this.rw     = Math.random() * 360;
        this.vx     = 5;
        this.random = _this.config.randomness;
    }

    Root.prototype = {

        draw : function() {
            ctx.beginPath();
            ctx.strokeStyle = '#0ff';
            ctx.lineWidth = this.stroke;
            ctx.moveTo(this.sp.x, this.sp.y);
            ctx.lineTo(this.ep.x, this.ep.y);
            ctx.stroke();
            ctx.closePath();

            this.sp.x = this.ep.x;
            this.sp.y = this.ep.y;
        },

        update : function() {

            var neg = Math.random() < 0.5 ? -1 : 1;
            this.rw   += Math.random() * neg * ((Math.random() * 0.09) + 0.01);//0.03;
            this.ep.x += Math.cos(this.rw) * this.vx +  Math.random() < 0.5 ? -1 : 1;
            this.ep.y += Math.sin(this.rw) * this.vx +  Math.random() < 0.5 ? -1 : 1;
            //this.ep.x += Math.floor((Math.random() * 0.1) + 1);
            //this.ep.y += Math.floor((Math.random() * 0.1) + 1);
            this.life++;

            if (Math.random() > this.random && _this.roots.length < 100) {
            	_this.roots.push(new Root(this.sp.x, this.sp.y, _this.roots.length + 1));
                this.random = this.random - 0.001;
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

document.addEventListener('click', function(e) {
    roots.init(e.clientX, e.clientY);
});
