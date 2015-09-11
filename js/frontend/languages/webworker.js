/*!
 * PRHONE Amateur | Frontend | HTML5 | WebWorker
 * Romel Pérez, 2014
 **/

// Función para calcular el color aleatorio
var pixel = function (r, g, b) {
  var color = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  var f = Math.floor;
  return '#' + (color[f(r*15)] + color[f(r*15)])
         + (color[f(g*15)] + color[f(g*15)])
         + (color[f(b*15)] + color[f(b*15)]);
};

// Al recibir una petición nueva
onmessage = function (o) {
  var i, j;
  var aData = [];
  for (i = 0; i < o.data.width; i += 1) {
    aData[i] = [];
    for (j=0; j<o.data.height; j += 1) {
      aData[i][j] = pixel(Math.random(), Math.random(), Math.random());
    }
  }

  // Devolver respuesta
  postMessage(aData);

  // Liberar memoria
  aData = null;
};
