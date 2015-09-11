/*!
 * PRHONE Amateur | Applications | Scripts
 * Romel Pérez, 2014
 **/

var app = app || {};

// -------------------------------------------------------------------------- //
// EVENTS //

$(document).ready(function ($) {

  app.title = $('h1').html();
  $('h1').html('&nbsp;').css('display', 'inline-block');

  app.audio.set(['app', 'app-loaded', 'click'], '../');

});

window.onload = function () {

  var separatorAnimLength = 1000;

  setTimeout(function () {
    $('h1').html(app.title)
    .shuffleLetters({callback: function () {
      $('.app-header .home').css('display', 'inline-block')
      .shuffleLetters({callback: function () {
        $('.separator > div').addClass('fullwidth');

        setTimeout(function () {
          $('.app').fadeIn(1000);

          app.audio.play('app-loaded');
        }, separatorAnimLength);
      }});
    }});

    app.audio.play('app');
  }, 1000);

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

};
