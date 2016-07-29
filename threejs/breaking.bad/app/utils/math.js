var math = function() {

    return {

        /**
         * Return random number
         * @param  {Number} a
         * @param  {Number} b
         * @param  {Number} chanceOf
         * @param  {Number} base
         * @return {Number} result
         */
        random: function(a, b, chanceOf, base) {
            var isChange = true;
            var result;

            if (chanceOf && base) {
                var isChange = Math.random() <= chanceOf;
            }

            result =  Math.floor(Math.random() * b) + a;

            return !isChange && base ? base : result;
        }

    };

};

module.exports = math();
