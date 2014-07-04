/*!
 * PRHONE Applications
 * JavaScript 1.8 Tests | WebWorker
 * Romel Perez, 2014
 **/

var pixel = function (r, g, b) {
    var color = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    var f = Math.floor;
    return '#' + (color[f(r*15)] + color[f(r*15)]) + (color[f(g*15)] + color[f(g*15)]) + (color[f(b*15)] + color[f(b*15)]);
};

onmessage = function (o) {
    var i, j;
    var aData = [];
    for (i=0; i<o.data.width; i++) {
        aData[i] = [];
        for (j=0; j<o.data.height; j++) {
            aData[i][j] = pixel(Math.random(), Math.random(), Math.random());
        }
    }
    postMessage(aData);
    aData = null;  // Free up memory
};
