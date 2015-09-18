var canvas  = document.getElementById('canvas');
var ctx     = canvas.getContext('2d');
var W = 500;
var H = 500;

var Round = function Round(data) {

    var _this  = this;
    this.parts = [];
    this.posx  = 1.5 * Math.PI;
    this.posy  = 0;

    data.forEach(function(v, k) {
        var roundpart = new Roundpart(_this, v);
        _this.parts.push(roundpart);
    });

    for(k in _this.parts) {
        _this.parts[k].draw();
        _this.posx = _this.parts[k].posx;
        console.log(_this.posx);
    }

}

var Roundpart = function Roundpart(round, percent) {

    this.x = W / 2;
    this.y = H / 2;
    this.r = 100;
    this.percent = percent || 100;
    this.percent = 100 - this.percent;

    this.draw = function drawRoundPart() {

        var startAngle = round.posx;
        var endAngle = (2 * Math.PI) / 100 * this.percent;
        round.posx = startAngle;
        round.posy = startAngle - endAngle;

        console.log(round);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, round.posx, round.posy, false);
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#e67e22';
        ctx.stroke();

        this.posy = round.posy;
        this.posx = round.posx;

        // Draw les extremités
        // ctx.beginPath();
        // ctx.fillStyle = '#e67e22';
        // ctx.arc(this.x, this.y - this.r, 5, 0, Math.PI * 2, false);
        // ctx.fill();
        //
        // ctx.beginPath();
        // ctx.fillStyle = '#e67e22';
        // ctx.arc(this.x + this.r, this.y, 5, Math.PI * 2, false);
        // ctx.fill();
    }

};

var data = [20, 10, 70];
var round = new Round(data);
//var roundPart = new Roundpart(20);
//roundPart.draw();
