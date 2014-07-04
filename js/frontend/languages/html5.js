/*!
 * PRHONE Amateur | Frontend | HTML5 | Scripts
 * Romel Pérez, 2014
 **/

var app = app || {};
app.html5 = {};

/* -------------------------------------------------------------------------- */
/* APPLICATION */

// Control básico de un audio
app.html5.audio = function () {

    var audio = document.createElement('audio');
    var $audio = $(audio);

    $audio.html('<source src="../sound/frontend/sound2.ogg">'
              + '<source src="../sound/frontend/sound2.mp3">');

    $('#audioPlay').on('click', function () {
        audio.play();
    });
    $('#audioStop').on('click', function () {
        audio.pause();
    });
    $('#audio1Second').on('click', function () {
        audio.currentTime = 1;
    });
    $('#audioDuration').on('click', function () {
        $('#audioState').html(audio.duration);
    });

};


// Control de audio sin renderizarlo
app.html5.audcus = function () {

    var audio = document.getElementById('audcusAudio');
    var controls = document.getElementById('audcusControl');
    var $audio = $(audio);
    var $controls = $(controls);

    var timeFormatter = function (time) {
        var hours = Math.floor(time / 60 / 60);
        var minutes = Math.floor(time / 60) - (hours * 60);
        var seconds = Math.floor(time) - (hours * 60 * 60) - (minutes * 60);
        return hours +':'+ minutes +':'+ seconds;
    };

    // Mostrar duración del audio
    $('#audcusTimesDuration').html(timeFormatter(audio.duration));
    $audio.on('loadedmetadata', function (e) {
        $('#audcusTimesDuration').html(timeFormatter(audio.duration));
    });

    // Actualizar cambios mientras se reproduce
    $audio.on('timeupdate', function (e) {
        var amount = (audio.currentTime / audio.duration) * 512;  // Percent
        $('#audcusLoaded').css('width', amount);
        $('#audcusTimesElapsed').html(timeFormatter(audio.currentTime));
    });

    // Play / Pause
    $controls.on('click', function (e) {
        if (audio.paused) {
            audio.play();
            controls.innerHTML = 'Pause';
        } else {
            audio.pause();
            controls.innerHTML = 'Play';
        }
    });

    // Stop
    $('#audcusStop').on('click', function (e) {
        audio.pause();
        audio.currentTime = 0;
        controls.innerHTML = 'Play';
    });

};


// Manipulación del session y local Storage
app.html5.seslocTP = sessionStorage;
app.html5.sesloc = function () {
    
    // Resetear valores de inputs
    var reset = function () {
        var i, l = [
            'seslocSetKey',
            'seslocSetVal',
            'seslocGetKey',
            'seslocGetVal',
            'seslocRemKey',
            'seslocLengthVal',
            'seslocKeyNumber',
            'seslocKeyName'
        ];
        for (i = 0; i < l.length; i += 1) {
            document.getElementById(l[i]).value = '';
        }
    };

    // Cambiar el tipo de storage
    $('#seslocSession').on('click', function () {
        reset();
        app.html5.seslocTP = window.sessionStorage;
    });
    $('#seslocLocal').on('click', function () {
        reset();
        app.html5.seslocTP = window.localStorage;
    });

    // Guardar valor en el storage
    $('#seslocSet').on('click', function () {
        var key = $('#seslocSetKey').val();
        var value = $('#seslocSetVal').val();
        app.html5.seslocTP.setItem(key, value);
    });

    // Conseguir valor del storage
    $('#seslocGet').on('click', function () {
        var key = $('#seslocGetKey').val();
        var value = app.html5.seslocTP.getItem(key);
        $('#seslocGetVal').val(value);
    });

    // Remover valor del storage
    $('#seslocRem').on('click', function () {
        var key = $('#seslocRemKey').val();
        app.html5.seslocTP.removeItem(key);
    });

    // Limpiear el storage
    $('#seslocClear').on('click', function () {
        app.html5.seslocTP.clear();
        reset();
    });

    // Conseguir la cantidad de valores guardados en el storage
    $('#seslocLength').on('click', function(e) {
        $('#seslocLengthVal').val(app.html5.seslocTP.length);
    });

    // Conseguir el key en el array de key-values del storage
    $('#seslocKey').on('click', function(e) {
        var i = $('#seslocKeyNumber').val();
        var name = app.html5.seslocTP.key(i);
        $('#seslocKeyName').val(name);
    });

};


// Verificador de actualización de cache
app.html5.cache = function () {

    var cache = window.applicationCache;
    var cacheResp = document.getElementById('cacheResp');
    
    // Verificar si el manifiesto ha sido actualizado
    $('#cacheTest').on('click', function () {
        cache.update();
    });

    // Mientras se está chechando el cache
    cache.addEventListener('checking', function (e) {
        cacheResp.innerHTML = 'Verificando...';
    }, false);

    // Cuando se está descargando
    cache.addEventListener('downloading', function (e) {
        cacheResp.innerHTML += ' Descargando...';
    }, false);

    // Cuando está ya descargado
    cache.addEventListener('updateready', function (e) {
        cacheResp.innerHTML += ' Archivos cacheados (para la próxima carga).';
        if (cache.status === cache.UPDATEREADY) {
            cacheResp.innerHTML += ' Archivos actualizados.';
            
            // Actualizar nuevos archivos
            if (confirm('Hay nuevos archivos. ¿Desea actualizar aplicación?')) {
                window.location.reload();
            }
        }
    }, false);

    // Si no hubo ninguna nueva actualización al verificar
    cache.addEventListener('noupdate', function (e) {
        cacheResp.innerHTML += ' No hay actualizaciones.';
    }, false);

};


// Dragado básico
app.html5.draggable = function () {

    var foobar = document.getElementById('dragdropFoobar');
    var catcher = document.getElementById('dragdropCatcher');

    // Eventos del elemento a arrastrar
    foobar.addEventListener('dragstart', function (e) {
        this.style.border = '4px dotted yellow';
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('Text', this.id);
    }, false);
    foobar.addEventListener('dragend', function (e) {
        this.style.border = 'none';
    }, false);

    // Eventos de arrastre del elemento donde se deja
    catcher.addEventListener('dragenter', function (e) {
        this.style.border = '4px dotted red';
    }, false);
    catcher.addEventListener('dragleave', function (e) {
        this.style.border = 'none';
    }, false);
    catcher.addEventListener('dragover', function (e) {
        if (e.preventDefault) e.preventDefault();
        return false;
    }, false);
    catcher.addEventListener('drop', function (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        // Procesar los datos soltados
        this.style.border = 'none';
        var elem = document.getElementById(e.dataTransfer.getData('Text'));
        elem.parentNode.removeChild(elem);
        this.appendChild(elem);
        return false;
    }, false);

};


// Dragado de una imágen de la computadora
app.html5.draggableImg = function () {

    // Objecto donde dejar la imágen
    var di = document.getElementById('dragdropImg');
    
    // El mouse arrastrando algo entra
    di.addEventListener('dragenter', function (e) {
        this.style.border = '2px dotted red';
    }, false);
    
    // El mouse arrastrando algo sale
    di.addEventListener('dragleave', function (e) {
        this.style.border = 'none';
    }, false);
    
    // El mouse arrastrando algo pasa por encima
    di.addEventListener('dragover', function (e) {
        if (e.preventDefault) e.preventDefault();
        return false;
    }, false);

    // El mouse suelta lo que llevaba arrastrando
    di.addEventListener('drop', function (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        
        // Datos de llegada y crear un lector de tales datos
        var aFiles = e.dataTransfer.files;
        var reader = new FileReader();
        var placeholder = document.getElementById('dragdropImg');

        this.style.border = 'none';

        // Cuando el lector de datos haya terminado
        reader.addEventListener('load', function (e) {

            // Crea imágen con el contenido leido
            var content = e.target.result;
            var img = document.createElement('img');
            img.src = content;
            img.height = 200;

            // Insertar imágen procesada en un contenedor
            placeholder.appendChild(img);

        }, false);

        // Comenzar a leer datos de llegada
        reader.readAsDataURL(aFiles[0]);

        return false;
    }, false);

};


// Ejecutar un proceso largo asincronicamente sin 'bloquear' la página actual
// Luego, utilizar los datos procesados
// Esto también utiliza Canvas
app.html5.webworkerTemp = 0;
app.html5.webworker = function () {

    // Ejecutar el WebWorker
    $('#webworkerTrigger').on('click', function (e) {
        var _this = this;
        var canvas = document.getElementById('webworkerCanvas');
        var ctx = canvas.getContext('2d');

        // El WebWorker es otro archivo JavaScript que procesará los datos
        // de llegada y enviará una respuesta. En este ejemplo, es calcular los
        // colores de cuadros pequeños para renderizarlos en un canvas
        var worker = new Worker('../js/frontend/languages/webworker.js');

        _this.innerHTML = 'Procesando...';

        // Iniciar ejecución
        worker.postMessage({
            width: canvas.width,
            height: canvas.height
        });

        // Recibir mensaje
        worker.addEventListener('message', function (data) {

            // Pintando el canvas con tejas de 8*8 con los colores recibidos
            var i, j;
            var space = 8;
            _this.innerHTML = 'Web Worker';
            for (i = 0; i < canvas.width / space; i += 1) {
                for (j = 0; j < canvas.height / space; j += 1) {
                    ctx.beginPath();
                    ctx.rect(i * space, j * space, space, space);
                    ctx.closePath();
                    ctx.fillStyle = data.data[i][j];  // Color
                    ctx.fill();
                }
            }
        }, false);

        // Error procesando el WebWorker
        worker.addEventListener('error', function (err) {
            console.log('Ha ocurrido un error procesando el WebWorker!');
            throw err;
        }, false);
    });

    // Una función para ejecutar y probar lo asíncrono del WebWorker
    $('#webworkerTest').on('click', function (e) {
        var strs = [
            'Hola Hola Hola!',
            'Qué cosa tan rara esto!',
            'Ohhh, sorprendente!',
            'Y funciona bien rápido!'
        ];
        $('#webworkerTestSpace').html(strs[(app.html5.webworkerTemp++) % 4]);
    });

};


// Cambiar parcialmente la URL para explícitamente mostrar estados
// de la aplicación
app.html5.history = function () {
    
    var text = document.getElementById('historyText');
    var toggle = document.getElementById('historyToggle');

    // Estado: #show
    var showText = function (update) {
        text.style.display = 'block';
        history.pushState(null, null, '#show');
        toggle.innerHTML = 'Hide';
        toggle.dataset.state = 'hide';
    };

    // Estado: #hide
    var hideText = function (update) {
        text.style.display = 'none';
        history.pushState(null, null, '#hide');
        toggle.innerHTML = 'Show';
        toggle.dataset.state = 'show';
    };

    // Cambiar el estado de la aplicación
    $('#historyToggle').on('click', function (e) {
        this.dataset.state === 'show' ? showText() : hideText();
    });

    // No hay controlador para el estado: #normal
    $('#historyNormal').on('click', function (e) {
        history.replaceState(null, null, '#normal');
    });

    // Administrar el estado
    var manage = function (e) {
        location.href.match('#show') ? showText() : hideText();
    };

    // Cuando se ha actualizado
    window.addEventListener('popstate', manage, false);
    
    // Verificar el estado que ha recibido
    manage();

};



/* -------------------------------------------------------------------------- */
/* EVENTS */

$(function ($) {

    // Manipulación de audio
    app.html5.audio();
    app.html5.audcus(); 

    // Está disponible la cache
    if (window.applicationCache) {
        app.html5.cache();
    }

    // Está disponible el localStorage
    if (window.localStorage) {
        app.html5.sesloc();
    }

    // Está dispinible el draggable
    if ('draggable' in document.createElement('span')) {
        app.html5.draggable();

        // Está disponible el lector de archivos
        if (typeof window.FileReader !== 'undefined') {
            app.html5.draggableImg();
        }
    }

    // Está disponible el WebWorker
    if (!!window.Worker) {
        app.html5.webworker();
    }

    // Está disṕonible el history manager
    if (!!window.history && window.history.pushState) {
        app.html5.history();
    }

});
