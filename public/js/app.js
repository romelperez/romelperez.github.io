// app.js

var app = app || {};

app.init = function () {

    app.university.main();

};

app.university = {

    semNames: [
        'Primer', 'Segundo', 'Tercero', 'Cuarto',
        'Quinto', 'Sexto', 'Septimo', 'Octavo',
        'Noveno', 'Démico', 'Décimo Primero',
        'Décimo Segundo', 'Décimo Tercero'
    ],

    main: function () {
        
        var i, j, k, list, subjSels;
        var subject = 0;
        var year = 2012 - 0.5;
        var $u = $('#university');
        
        // Creating Elements
        var semesters = app.data.university.career.completed.length
                      + app.data.university.career.progress.length
                      + app.data.university.career.stack.length;
        for (i = 1; i <= semesters; i += 1) {
            $u.append($('<div>', {
                id: 'se' + i,
                html: '<h2>[' + (year += 0.5) + '] Semestre ' + i + '</h2> <div id="se' + i + '-subj" class="semester"></div>'
            }));
        }

        // Completed Subjects
        list = app.data.university.career.completed;
        // Every semester
        for (i = 0, j = 1; i < list.length; i += 1, j += 1) {
            // Every subject
            for (k = 0; k < list[i].subjects.length; k += 1) {
                $('#se' + j + '-subj').append($('<div>', {
                    'id': 'subject' + (subject += 1),
                    'class': 'univ-subj univ-subj-term',
                    'html': list[i].subjects[k].name + '<span>' + list[i].subjects[k].grade + '</span>'
                }));
            }
        }

        // In Progress Subjects
        list = app.data.university.career.progress;
        // Every semester
        for (i = 0, j = list[0].semester; i < list.length; i += 1, j += 1) {
            // Every subject
            for (k = 0; k < list[i].subjects.length; k += 1) {
                $('#se' + j + '-subj').append($('<div>', {
                    'id': 'subject' + (subject += 1),
                    'class': 'univ-subj univ-subj-prog',
                    'html': list[i].subjects[k].name
                }));
            }
        }

        // Stack Subjects
        list = app.data.university.career.stack;
        // Every semester
        for (i = 0, j = list[0].semester; i < list.length; i += 1, j += 1) {
            // Every subject
            for (k = 0; k < list[i].subjects.length; k += 1) {
                $('#se' + j + '-subj').append($('<div>', {
                    'id': 'subject' + (subject += 1),
                    'class': 'univ-subj univ-subj-stack',
                    'html': list[i].subjects[k].name
                }));
            }
        }

        // Relation them
        subjSels = '';
        for (i = app.data.university.career.stack[0].semester;
             i <= semesters;
             i += 1) {
            subjSels += '#se' + i + '-subj, ';
        }
        $(subjSels + '#se' + app.data.university.career.progress[0].semester + '-subj').sortable({
            connectWith: '.semester',
            items: "> div",
            placeholder: "placeholder"
        }).disableSelection();

    }

};

jQuery(document).ready(app.init);
