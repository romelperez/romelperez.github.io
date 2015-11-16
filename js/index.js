/*!
 * PRHONE Amateur | Interactivity
 * Romel Pérez, 2014
 **/

// -------------------------------------------------------------------------- //
// APPLICATION //

var app = app || {};

app.start = function () {
  $('h2').css('display', 'block').shuffleLetters({callback: app.nav});
};

app.nav = function () {

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

};

app.separator = function () {

  var separatorAnimLength = 2000;

  $('.separator > div').addClass('fullwidth');
  setTimeout(app.body, separatorAnimLength);

};

app.body = function () {

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
            app.audio.stop('writing');
            fn(sections.shift());
          }
        });
      }, 250);
    }});
    app.audio.play('writing', true);
  };
  fn(sections.shift());

};


// -------------------------------------------------------------------------- //
// EVENTS //

$(document).ready(function ($) {
/*
  app.title = $('h1').html();
  $('h1').html('&nbsp;');

  app.audio.set(['loading', 'writing', 'click']);

  setTimeout(function () {
    app.audio.play('loading');

    $('h1').html(app.title).css('display', 'block')
    .shuffleLetters({callback: app.start});
  }, 1500);

  $('html').on('click', function () {
    app.audio.play('click');
  });
  $('a:not([target])').on('click', function (e) {
    var url = $(this).attr('href');
    setTimeout(function () {
      window.location.href = url;
    }, 500);
    e.preventDefault();
  });
*/
});
