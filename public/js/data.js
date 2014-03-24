// data.js

var app = app || {};

app.data = {

    university: {

        career: {

            completed: [
                {
                    semester: 1,
                    subjects: [
                        {name: 'Programación 1', credits: 4, grade: 4.8},
                        {name: 'Algebra Lineal', credits: 4, grade: 3},
                        {name: 'Cálculo 1', credits: 4, grade: 3.3},
                        {name: 'Química', credits: 4, grade: 3.2},
                        {name: 'Lenguaje', credits: 3, grade: 3.6},
                        {name: 'Deportes', credits: 4, grade: 4.4}
                    ]
                }, {
                    semester: 2,
                    subjects: [
                        {name: 'Programación 2', credits: 4, grade: 4.5},
                        {name: 'Inglés 1', credits: 4, grade: 4},
                        {name: 'Biología', credits: 2, grade: 3.4}
                    ]
                }, {
                    semester: 3,
                    subjects: [
                        {name: 'Programación 3', credits: 4, grade: 4.4},
                        {name: 'Cálculo 2', credits: 4, grade: 3.1},
                        {name: 'Física 1', credits: 4, grade: 3},
                        {name: 'Inglés 2', credits: 4, grade: 4}
                    ]
                }
            ],

            progress: [
                {
                    semester: 4,
                    subjects: [
                        {
                            name: 'Bases de Datos 1',
                            credits: 4,
                            grade: [{grade: 0, percent: 0}]
                        }, {
                            name: 'Inglés 3',
                            credits: 4,
                            grade: [{grade: 0, percent: 0}]
                        }, {
                            name: 'Cálculo 3',
                            credits: 4,
                            grade: [{grade: 0, percent: 0}]
                        }, {
                            name: 'Física 2',
                            credits: 4,
                            grade: [{grade: 0, percent: 0}]
                        }, {
                            name: 'Matemáticas Discretas',
                            credits: 4,
                            grade: [{grade: 0, percent: 0}]
                        }, {
                            name: 'Selección de Karate',
                            credits: 2,
                            grade: [{grade: 0, percent: 0}]
                        }
                    ]
                }
            ],

            stack: [
                {
                    semester: 5,
                    subjects: [
                        {name: 'Bases de Datos 2', credits: 4},
                        {name: 'Inglés 4', credits: 4},
                        {name: 'Cálculo 4', credits: 4},
                        {name: 'Física 3', credits: 4}
                    ]
                }, {
                    semester: 6,
                    subjects: [
                        {name: 'Programación Web', credits: 4},
                        {name: 'Inglés 5', credits: 4},
                        {name: 'Análisis Numérico', credits: 4},
                        {name: 'Autómatas y Lenguajes Formales', credits: 4}
                    ]
                }, {
                    semester: 7,
                    subjects: [
                        {name: 'Ingeniería de Software 1', credits: 4},
                        {name: 'Electricidad y Electrónica', credits: 4},
                        {name: 'Pensamiento Sistemático', credits: 4},
                        {name: 'Dirección Empresarial', credits: 3}
                    ]
                }, {
                    semester: 8,
                    subjects: [
                        {name: 'Ingeniería de Software 2', credits: 4},
                        {name: 'Sistemas Digitales', credits: 4},
                        {name: 'Estadística 1', credits: 4},
                        {name: 'Redes 1', credits: 4}
                    ]
                }, {
                    semester: 9,
                    subjects: [
                        {name: 'Sistemas de Información', credits: 4},
                        {name: 'Arquitectura de Computadores', credits: 4},
                        {name: 'Estadística 2', credits: 4},
                        {name: 'Redes 2', credits: 4}
                    ]
                }, {
                    semester: 10,
                    subjects: [
                        {name: 'Inteligencia Artificial 1', credits: 4},
                        {name: 'Sistemas Operacionales', credits: 4},
                        {name: 'Simulación Digital', credits: 4},
                        {name: 'ELECTIVA', credits: 4}
                    ]
                }, {
                    semester: 11,
                    subjects: [
                        {name: 'Ingeniería Económica', credits: 3},
                        {name: 'Economía Empresarial', credits: 4},
                        {name: 'ELECTIVA', credits: 4},
                        {name: 'ELECTIVA', credits: 4}
                    ]
                }, {
                    semester: 12,
                    subjects: [
                        {name: 'Proyecto de Grado 1', credits: 3},
                        {name: 'ELECTIVA', credits: 4}
                    ]
                }, {
                    semester: 13,
                    subjects: [
                        {name: 'Proyecto de Grado 2', credits: 7}
                    ]
                }
            ]

        }

    }

};

// The final promedium is:
// PPA = Z(Note*Credits)/Z(Credits)
