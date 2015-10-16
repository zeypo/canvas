(function(window) {

    var Star = function Star(c, ctx, config) {

        this.config = config;
        this.config.colors = [
            '26, 188, 156',
            '52, 152, 219',
            '230, 126, 34',
            '231, 76, 60',
            '155, 89, 182',
            '241, 196, 15'
        ];

        this.x       = Math.random() * c.width;
        this.y       = Math.random() * c.height;
        this.r       = Math.random();
        this.vx      = (this.config.velocity - (Math.random() * 0.5)) * randomPos();
        this.vy      = (this.config.velocity - (Math.random() * 0.5)) * randomPos();
        this.color   = '#fff';
        this.colored = 'rgba(' + this.config.colors[Math.floor(Math.random() * this.config.colors.length)] + ', ' + Math.random() + ')';
        this.rbase   = this.r;
        this.rbig    = Math.floor(Math.random() * 1) + 9;

        this.configs = {
            ismoovable : true
        };

    };

    Star.prototype = {

        draw : function() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 10;
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        },

        update : function() {
            this.x += this.vx;
            this.y += this.vy;

            if(this.x >= c.width || this.x <= 0) {
                this.vy = this.vy;
                this.vx = -this.vx;
            }
            if(this.y >= c.height || this.y <= 0) {
                this.vy = -this.vy;
                this.vx = this.vx;
            }
        }

    };

    /**
     * @private
     */
    function randomPos() {
        return Math.random() > 0.5 ? 1 : -1;
    }

    window.Star = Star;

})(window);
