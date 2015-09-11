/*!
 * PRHONE Amateur | Frontend | JS | Scripts
 * Romel Pérez, 2014
 **/

// JavaScript Provenance
/*
Syntax from Java
Functions from Scheme
Prototypal Inheritance from Self
Regular Expressions from Perl
*/

// Reserved Words
/*
abstract boolean break byte case catch char class const continue debugger default
delete do double else enum export extends false final finally float for function goto
if implements import in instanceof int interface long native new null package private
protected public return short static super switch synchronized this throw throws
transient true try typeof var volatile void while with
*/

// -------------------------------------------------------------------------- //
// UI TOOLS //

var create = function (e) { return document.createElement(e); };
var id = function (i) { return document.getElementById(i); };
var tag = function (t) { return document.getElementsByTagName(t); };
var clss = function (c) { return document.getElementsByClassName(c); };
var ev = function (o, e, f) {
  var i;
  o = typeof o === "string" ? id(o) : o;
  if (typeof e === "function") {
    f = e;
    e = "click";
  }
  if (typeof o.length === "number") {
    for (i = 0; i < o.length; i += 1) {
      o[i].addEventListener(e, f, false);
    }
  } else {
    o.addEventListener(e, f, false);
  }
};
var queue = function (fn) {
  if (window.ready) {
    fn();
  } else {
    window.addEventListener("load", fn, false);
  }
};

// -------------------------------------------------------------------------- //
// OBJECTS FUNCTIONS //

// Inherits a new object from another
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}

// Detect the own properties
var obj1 = { name: 'Romel', surname: 'Pérez', job: 'Programmer' };
var obj2 = Object.create(obj1);
obj2.name = 'Francisco';
var member1 = obj2.hasOwnProperty('name');  // member1 is true
var member2 = obj2.hasOwnProperty('surname');  // member2 is false

// Create a new method to an object-type
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};

// Inherits properties to an object
Function.method('inherits', function (Parent) {
  this.prototype = new Parent();
  return this;
});

// Access to a superior propertie
Object.method('superior', function (name) {
  var that = this;
  var method = that[name];
  return function () {
    return method.apply(that, arguments);
  };
});

// Modular object
var mammal = function (spec) {
  var that = {};
  that.get_name = function () {
    return spec.name;
  };
  that.says = function () {
    return spec.saying || '';
  };
  return that;
};
var myMammal = mammal({ name: 'Michu' });


// -------------------------------------------------------------------------- //
// ARRAY METHODS //

// array.concat(item...)
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.concat(b, true);
// c is ['a', 'b', 'c', 'x', 'y', 'z', true]

// array.join(separator)
var a = ['a', 'b', 'c'];
var b = a.join('');  // c is 'abc'

// array.reverse()
var a = ['a', 'b', 'c'];
var b = a.reverse();
// both a and b are ['c', 'b', 'a']


// array.push(item...)
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.push(b, true);
// a is ['a', 'b', 'c', ['x', 'y', 'z'], true] & c is 5

// array.unshift(item...)
var a = ['a', 'b', 'c'];
var r = a.unshift('?', '@');
// a is ['?', '@' 'a', 'b', 'c'] & r is 5


// array.pop()
var a = ['a', 'b', 'c'];
var b = a.pop();  // a is ['a', 'b'] & b is 'c'

// array.shift()
var a = ['a', 'b', 'c'];
var b = a.shift();  // a is ['b', 'c'] & b is 'a'


// array.slice(start, end)
var a = ['a', 'b', 'c'];
var b = a.slice(0, 1);  // b is ['a']
var c = a.slice(1);  // c is ['b', 'c']
var d = a.slice(1, 2);  // d is ['b']

// array.splice(start, deleteCount, item...)
var a = ['a', 'b', 'c'];
var r = a.splice(1, 1, 'ache', 'bug');
// a is ['a', 'ache', 'bug', 'c'] & r is ['b']


// -------------------------------------------------------------------------- //
// REGULAR EXPRESSIONS //

// /regexp/g reemplazar todas las ocurrencias
// /regexp/i case-insensitive: se ignoran mayúsculas y minúsculas
var a = 'Romel Francisco Pérez Estrada';
var b = a.replace(/r/gi, '@');
// b is "@omel F@ancisco Pé@ez Est@ada"


// -------------------------------------------------------------------------- //
// APPLICATION //

var app = {

  convert: {
    to10: function (n, b) { return parseInt(n, b); },
    from10: function (n, b) { return n.toString(b); }
  },

  secure: function () {
    var prefix = '';
    var seq = 0;
    return {
      set_prefix: function (p) { prefix = String(p); },
      set_seq: function (s) { seq = s; },
      gensym: function () {
        var result = prefix + seq;
        seq += 1;
        delete this.set_prefix;
        delete this.set_seq;
        return result;
      }
    };
  }

};

// Presentation
window.onload = function () {
  var log = id('log');
  var div = create('div');
  div.textContent = '>>> Everything is okay!';
  log.innerHTML = '';
  log.appendChild(div);
};
