/*!
 * PRHONE Amateur | Frontend | CSS3 | Scripts
 * Romel Pérez, 2014
 **/

var app = {
    animClasses: ''
};

window.onload = function () {
    // Save initial classes
    var elem = document.getElementById('animTrigger');
    app.animClasses = elem.className;
    // Trigger the animation
    document.getElementById('animTriggerButton').addEventListener('click', function (e) {
        if (this.dataset.state === 'offline') {
            this.innerHTML = 'Desactive';
            this.dataset.state = 'online';
            elem.className = app.animClasses + ' fadeOut';
        } else {
            this.innerHTML = 'Active';
            this.dataset.state = 'offline';
            elem.className = app.animClasses + ' fadeIn';
        }
    }, false);
};
