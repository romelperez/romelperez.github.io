/*!
 * PRHONE Amateur | Frontend | HTML5 | Scripts
 * Romel Pérez, 2014
 **/

// -------------------------------------------------------------------------- //
// TOOLS //

var create = function (e) { return document.createElement(e) };
var id = function (i) { return document.getElementById(i) };
var tag = function (t) { return document.getElementsByTagName(t) };
var clss = function (c) { return document.getElementsByClassName(c) };
var ev = function (o, e, f) {
    'use strict';
    var i;
    o = typeof o === 'string' ? id(o) : o;
    if (typeof e === 'function') {
        f = e;
        e = 'click';
    }
    if (o && typeof(o.length) === 'number') {
        for (i=0; i<o.length; i++) {
            o[i].addEventListener(e, f, false)
        }
    } else {
        o.addEventListener(e, f, false)
    }
};
var queue = function (fn) {
    if (window.ready) {
        fn();
    } else {
        window.addEventListener('load', fn, false);
    }
};


// -------------------------------------------------------------------------- //
// APPLICATION //

var app = {
    seslocTP: sessionStorage,
    sesloc: function (evnt) {
        // Restore default values to inputs
        var reset = function () {
            var l = [
                'seslocSetKey',
                'seslocSetVal',
                'seslocGetKey',
                'seslocGetVal',
                'seslocRemKey',
                'seslocLengthVal',
                'seslocKeyNumber',
                'seslocKeyName'
            ];
            for (var i=0; i<l.length; i++) {
                id(l[i]).value = '';
            }
        };
        ev('seslocSession', function (e) { reset(); app.seslocTP = window.sessionStorage; return true; });
        ev('seslocLocal', function (e) { reset(); app.seslocTP = window.localStorage; return true; });
        ev('seslocSet', function (e) {
            var key = id('seslocSetKey').value;
            var value = id('seslocSetVal').value;
            app.seslocTP.setItem(key, value);
        });
        ev('seslocGet', function (e) {
            var key = id('seslocGetKey').value;
            var value = app.seslocTP.getItem(key);
            id('seslocGetVal').value = value;
        });
        ev('seslocRem', function (e) {
            var key = id('seslocRemKey').value;
            app.seslocTP.removeItem(key);
        });
        ev('seslocClear', function (e) { app.seslocTP.clear(); reset(); });
        ev('seslocLength', function (e) { id('seslocLengthVal').value = app.seslocTP.length });
        ev('seslocKey', function (e) {
            var name = app.seslocTP.key(id('seslocKeyNumber').value);
            id('seslocKeyName').value = name;
        });
    },
    // This is executed when the file has been downloaded, not at DOM Ready
    // Using 'queue' tool
    cache: function (e) {
        var cache = applicationCache;
        queue(function () {
            ev('cacheTest', function (e) {
                cache.update();  // Check to see if the cache manifest file has been updated
            });
        });

        ev(cache, 'checking', function (e) {
            queue(function () {
                id('cacheResp').innerHTML = 'Cheching...';
            });
        });
        ev(cache, 'downloading', function (e) {
            queue(function () {
                id('cacheResp').innerHTML += ' Downloading...';
            });
        });
        ev(cache, 'updateready', function (e) {
            queue(function () {
                id('cacheResp').innerHTML += ' Files cached (next load).';
                if (cache.status === cache.UPDATEREADY) {
                    cache.swapCache();  // Update to the new cache items
                    // OR: window.location.reload();
                    id('cacheResp').innerHTML += ' Files updated (for future use in this loaded).';
                }
            });
        });
        ev(cache, 'noupdate', function (e) {
            queue(function () {
                id('cacheResp').innerHTML += ' No updates.';
            });
        });
    },
    draggable: function (e) {
        var foobar = id('dragdropFoobar');
        var catcher = id('dragdropCatcher');

        // Element to drag
        ev(foobar, 'dragstart', function (e) {
            this.style.border = '4px dotted yellow';
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('Text', this.id);
        });
        ev(foobar, 'dragend', function (e) {
            this.style.border = 'none';
        });

        // Element where it drops
        ev(catcher, 'dragenter', function (e) {
            this.style.border = '4px dotted red';
        });
        ev(catcher, 'dragleave', function (e) {
            this.style.border = 'none';
        });
        ev(catcher, 'dragover', function (e) {
            if (e.preventDefault) e.preventDefault();
            return false;
        });
        ev(catcher, 'drop', function (e) {
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
            this.style.border = 'none';
            var elem = id(e.dataTransfer.getData('Text'));
            elem.parentNode.removeChild(elem);
            this.appendChild(elem);
            return false;
        });
    },
    // Only one image per time
    draggableImg: function (e) {
        var di = id('dragdropImg');
        ev(di, 'dragenter', function (e) {
            this.style.border = '2px dotted red';
        });
        ev(di, 'dragleave', function (e) {
            this.style.border = 'none';
        });
        ev(di, 'dragover', function (e) {
            if(e.preventDefault) e.preventDefault();
            return false;
        });
        ev(di, 'drop', function (e) {
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
            this.style.border = 'none';

            var aFiles = e.dataTransfer.files;
            var reader = new FileReader();
            var placeholder = id('dragdropImg');
            ev(reader, 'load', function (e) {
                var content = e.target.result;  // Read the content
                var img = create('img');
                img.src = content;
                img.height = 200;
                placeholder.appendChild(img);
            });
            reader.readAsDataURL(aFiles[0]);  // Fire

            return false;
        });
    },
    webworkerTemp: 0,
    webworker: function (e) {
        ev('webworkerTrigger', function (e) {
            var self = this;
            var canvas = id('webworkerCanvas');
            var ctx = canvas.getContext('2d');
            var worker = new Worker('../js/frontend/languages/webworker.js');

            self.innerHTML = 'Working...';
            worker.postMessage({
                width: canvas.width,
                height: canvas.height
            });
            ev(worker, 'message', function (d) {
                var i, j, space = 8;  // Only use the width/8 and height/8 part of the array
                self.innerHTML = 'Web Worker';
                for (i=0; i<canvas.width/space; i++) {
                    for (j=0; j<canvas.height/space; j++) {
                        ctx.beginPath();
                        ctx.rect(i*space, j*space, space, space);
                        ctx.closePath();
                        ctx.fillStyle = d.data[i][j];  // Set color
                        ctx.fill();
                    }
                }
            });
            ev(worker, 'error', function (err) {
                console.log('Has ocurred an error!');
                throw err;
            });
        });
        ev('webworkerTest', function (e) {
            var strs = ['Something strange!', 'Something crazy!', 'Something rare!', 'Something unusual!'];
            id('webworkerTestSpace').innerHTML = strs[(app.webworkerTemp++) % 4];
        });
    },
    history: function (e) {
        var text = id('historyText');
        var showText = function (update) {
            text.style.display = 'block';
            if (update)
                history.pushState(null, null, '#show');
        };
        var hideText = function (update) {
            text.style.display = 'none';
            if (update)
                history.pushState(null, null, '#hide');
        };
        var manage = function (e) {
            if (location.href.match('#show')) showText();
            else hideText();
        };

        ev('historyToggle', function (e) {
            if (this.dataset.state === 'show') {
                showText(true);
                this.dataset.state = 'hide';
                this.innerHTML = 'Hide';
            } else {
                hideText(true);
                this.dataset.state = 'show';
                this.innerHTML = 'Show';
            }
        });
        ev('historyReplace', function (e) {
            history.replaceState(null, null, '#normal');
        });
        ev(window, 'popstate', manage);

        manage();
    }
};


// -------------------------------------------------------------------------- //
// ATTACHER //

if (applicationCache) {
    app.cache();
}

window.onload = function (e) {
    window.ready = true;  // Set ready the page load

    if (localStorage)
        app.sesloc(e);
    if ('draggable' in create('span')){
        app.draggable(e);
        if (typeof FileReader !== 'undefined')
            app.draggableImg(e);
    }
    if (!!window.Worker)
        app.webworker(e);
    if (!!window.history && window.history.pushState)
        app.history(e);
};
