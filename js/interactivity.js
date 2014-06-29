/*!
 * PRHONE Amateur | Interactivity
 * Romel Pérez, 2014
 **/

// -------------------------------------------------------------------------- //
// APPLICATION //

var app = {

    start: function () {
        $('h2').css('display', 'block').shuffleLetters({callback: app.nav});
    },

    nav: function () {

        var iconHeight = $('nav .connectbtn .socialicon').css('height');

        $('nav .connectbtn').each(function () {
            var $this = $(this);

            $this.find('.socialicon')
            .css({display: 'block', height: 0})
            .animate({
                height: iconHeight,
                opacity: 1
            }, 250, function () {
                $this.find('.connectbtnlabel')
                .css('display', 'block')
                .shuffleLetters({callback: app.separator});
            });

            $this.css('display', 'block');
        });

    },

    separator: function () {

        var separatorAnimLength = 2000;

        $('.separator > div').addClass('fullwidth');
        setTimeout(app.body, separatorAnimLength);

    },

    body: function () {

        var containers = document.getElementsByClassName('innercontainer');
        var sections = $.makeArray(containers);
        var fn = function (next) {
            if (!next) return;
            next = $(next);
            next.css('display', 'block')
            .find('h3').shuffleLetters({callback: function () {
                setTimeout(function () {
                    next.find('span').css('display', 'block').shuffleLetters({
                        fps: 200,
                        step: 8,
                        callback: function () {
                            app.notify.writing(true);
                            fn(sections.shift());
                        }
                    });
                }, 250);
            }});
            app.notify.writing();
        };
        fn(sections.shift());

    },

    files: function (callback) {

        var firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
        var createSoundFile = function (source) {
            var audio = document.createElement("audio");
            var src = firefox ? 'sound/' + source + '.ogg' : 'sound/' + source + '.mp3';
            audio.src = src;
            audio.preload = 'auto';
            audio.load();
            audio.refreshSoundToPlay = function () {
                audio.src = src;
                audio.play();
            };
            return audio;
        };
        app.notify.audios = {
            loading: createSoundFile('loading'),
            writing: createSoundFile('writing')
        };

    },

    notify: {

        audios: {},

        _play: function (sound) {
            if (sound && $.isNumeric(sound.currentTime)) {
                sound.refreshSoundToPlay();
            }
        },
        _stop: function (sound) {
            sound.pause();
            sound.currentTime = 0;
        },

        loading: function () {
            app.notify._play(app.notify.audios.loading);
        },
        writing: function (stop) {
            if (stop) {
                clearInterval(app.notify._writingInt);
                app.notify._stop(app.notify.audios.writing);
            } else {
                app.notify._play(app.notify.audios.writing);
                clearInterval(app.notify._writingInt);
                app.notify._writingInt = setInterval(function () {
                    app.notify._play(app.notify.audios.writing);
                }, 3380);
            }
        }

    }

};


// -------------------------------------------------------------------------- //
// EVENTS //

$(document).ready(function ($) {

    app.title = $('h1').html();
    $('h1').html('&nbsp;');

    app.files();
    setTimeout(function () {
        app.notify.loading();
        $('h1').html(app.title).css('display', 'block')
        .shuffleLetters({callback: app.start});
    }, 1500);

});


// -------------------------------------------------------------------------- //
// shuffleLetters //

(function($){

    $.fn.shuffleLetters = function(prop){
        
        var options = $.extend({
            "step"      : 2,            // How many times should the letters be changed
            "fps"       : 25,           // Frames Per Second
            "text"      : "",           // Use this text instead of the contents
            "callback"  : function(){}  // Run once the animation is complete
        },prop)
        
        return this.each(function(){
            
            var el = $(this),
                str = "";


            // Preventing parallel animations using a flag;

            if(el.data('animated')){
                return true;
            }
            
            el.data('animated',true);
            
            
            if(options.text) {
                str = options.text.split('');
            }
            else {
                str = el.text().split('');
            }
            
            // The types array holds the type for each character;
            // Letters holds the positions of non-space characters;
            
            var ch;
            var types = [],
                letters = [];

            // Looping through all the chars of the string
            
            for(var i=0;i<str.length;i++){
                
                ch = str[i];
                
                if(ch == " "){
                    types[i] = "space";
                    continue;
                }
                else if(/[a-z]/.test(ch)){
                    types[i] = "lowerLetter";
                }
                else if(/[A-Z]/.test(ch)){
                    types[i] = "upperLetter";
                }
                else {
                    types[i] = "symbol";
                }
                
                letters.push(i);
            }
            
            el.html("");            

            // Self executing named function expression:
            
            (function shuffle(start){
            
                // This code is run options.fps times per second
                // and updates the contents of the page element
                    
                var i,
                    len = letters.length, 
                    strCopy = str.slice(0); // Fresh copy of the string
                    
                if(start>len){
                    
                    // The animation is complete. Updating the
                    // flag and triggering the callback;
                    
                    el.data('animated',false);
                    options.callback(el);
                    return;
                }
                
                // All the work gets done here
                for(i=Math.max(start,0); i < len; i++){

                    // The start argument and options.step limit
                    // the characters we will be working on at once
                    
                    if( i < start+options.step){
                        // Generate a random character at thsi position
                        strCopy[letters[i]] = randomChar(types[letters[i]]);
                    }
                    else {
                        strCopy[letters[i]] = "";
                    }
                }
                
                el.text(strCopy.join(""));
                
                setTimeout(function(){
                    
                    shuffle(start+1);
                    
                },1000/options.fps);
                
            })(-options.step);
            

        });
    };
    
    function randomChar(type){
        var pool = "";
        
        if (type == "lowerLetter"){
            pool = "abcdefghijklmnopqrstuvwxyz0123456789";
        }
        else if (type == "upperLetter"){
            pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        }
        else if (type == "symbol"){
            pool = ",.?/\\(^)![]{}*&^%$#'\"";
        }
        
        var arr = pool.split('');
        return arr[Math.floor(Math.random()*arr.length)];
    }

})(jQuery);
