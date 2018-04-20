"use strict";

var _api = _interopRequireDefault(require("./helpers/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = 'http://192.168.1.231:8080';
var api = new _api.default(apiUrl);

var accreditamento = function accreditamento() {
  return api.post('/accreditamento', {
    nome: 'Denis Goryaynov'
  }).then(console.log).catch(console.log);
};

var es1 = function es1() {
  return api.get('/esercizi/1').then(function (_ref) {
    var data = _ref.data;
    return data.reduce(function (accumulator, value) {
      return accumulator + value;
    }, 0);
  }).then(function (data) {
    return api.post('/esercizi/1', {
      data: data
    });
  }).catch(console.log);
};

var es2 = function es2() {
  return api.get('/esercizi/2').then(function (_ref2) {
    var data = _ref2.data;
    var min = data.sort(function (a, b) {
      return a - b;
    }).shift();
    var newData = data.map(function (value) {
      return value * min;
    });
    return api.post('/esercizi/2', {
      data: newData
    });
  });
};

var es3 = function es3() {
  return api.get('/esercizi/3').then(function (_ref3) {
    var data = _ref3.data;
    return data.filter(function (value) {
      return value <= 3;
    });
  }).then(function (data) {
    return api.post('/esercizi/3', {
      data: data
    });
  });
};

accreditamento().then(function () {
  return Promise.all([es1(), es2(), es3()]);
});