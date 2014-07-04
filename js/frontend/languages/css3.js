/*!
 * PRHONE Amateur | Frontend | CSS3 | Scripts
 * Romel Pérez, 2014
 **/

$(function ($) {

    // Animación CSS3 activada/desactivada mediante JavaScript
    $('#anim-trigger-button').on('click', function (e) {

        var $boton = $(this);
        var $objeto = $('#anim-trigger');

        if ($boton.data('state') === 'offline') {

            // Cambiar estado del boton
            $boton.html('Desactivar animación').data('state', 'online');

            // Activar animación
            $objeto.removeClass('fadeOut').addClass('fadeIn');

        } else {

            // Cambiar estado del boton
            $boton.html('Activar animación').data('state', 'offline');

            // Desactivar animación
            $objeto.removeClass('fadeIn').addClass('fadeOut');

        }
        
    });

});
