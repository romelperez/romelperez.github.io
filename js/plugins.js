/*!
 * PRHONE Amateur | Plugins
 * Romel Pérez, 2014
 **/

var app = app || {};

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


// -------------------------------------------------------------------------- //
// Audio //

app.audio = {

    _audios: {},

    _create: function (file, prepath) {
        var firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
        var audio = document.createElement('audio');
        var src = firefox ? file + '.ogg' : file + '.mp3';

        prepath = prepath ? prepath : '';
        src = prepath + 'sound/' + src;
        audio.src = src;
        audio.preload = 'metadata';
        audio.load();

        audio.toPlay = function () {
            audio.src = src;
            audio.play();
        };

        return audio;
    },

    set: function (files, prepath) {
        files = typeof files === 'string' ? [files] : files;
        files.forEach(function (e, i) {
            app.audio._audios[e] = app.audio._create(e, prepath);
        });
    },

    play: function (file, infinite) {
        var audio = app.audio._audios[file];
        if (audio && $.isNumeric(audio.currentTime)) {
            audio.toPlay();

            $(audio).off('ended', audio.toPlay);
            if (infinite) {
                $(audio).on('ended', audio.toPlay);
            }
        }
    },

    stop: function (file) {
        var audio = app.audio._audios[file];
        $(audio).off('ended', audio.toPlay);
        audio.pause();
        audio.currentTime = 0;
    }

};


// -------------------------------------------------------------------------- //
// Google Analitycs //

(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'http://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-50433259-1', 'auto');
ga('send', 'pageview');
