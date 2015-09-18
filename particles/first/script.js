
// Création de l'élément Canvas
var canvas = document.getElementById('canvas');
var ctx    = canvas.getContext('2d'); // Donne le context du canvas

// Dimensions du canvas
var W = 800;//window.innerWidth;
var H = 600;//window.innerHeight;


// Création d'un générateur de particule
var CreateParicle = function() {

    // Création d'une position aléatoire
    this.x = Math.random() * W;
    this.y = Math.random() * H;

    // Création d'une vélocité aléatoire
    this.vx = Math.random() * 1;
    this.vy = Math.random() * 1;
};


var particules = [];
// On crée un array de 50 particules
for(var i=0; i < 100; i++) {
    particules.push(new CreateParicle());
}

// On dessine une particule
var x = 200;
var y = 200;
function draw() {

    // On peint le canvas
    ctx.fillStyle = '#16a085' // Remplit le context d'une couleur
    ctx.fillRect(0, 0, W, H); // Draw un rectangle (posx, posy, width, height)

    // On dessine une nouvelle particules pour chaques entré de l'array
    for(var t = 0; t < particules.length; t++) {
        var p = particules[t];

        ctx.beginPath(); // Initie une path
        ctx.fillStyle = '#27ae60';
        ctx.arc(p.x, p.y, 5, 0, Math.PI*2, false); // Draw un arc (x-center_of_circle, y-center_of_circle, radus, starting_angle, ending_angle, counterclockwise)
        ctx.fill(); // Remplit la forme couleur

        // On utilise la vélocité de chaques particules
        p.x += p.vx;
        p.y += p.vy;

        // On empeche les particules de sortir du cardre
        // En les remplacant si elle doivent sortir
        if(p.x > W + 1) {
            p.x = -1;
        }
        if(p.y > H + 1) {
            p.y = -1;
        }
        if(p.x < -1) {
            p.x = W + 1;
        }
        if(p.y < -1) {
            p.y = H + 1;
        }
    }
};

// On redessine une particule toutes
// les 33ms, ce qui donnera une impression de mvmt
//setInterval(draw, 20);
draw();
