'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var matrix = [];
var finish;
var done;

var PipeMatrix = function () {
	function PipeMatrix() {
		_classCallCheck(this, PipeMatrix);
	}

	_createClass(PipeMatrix, [{
		key: 'when',
		value: function when(argument) {
			for (var _len = arguments.length, queues = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				queues[_key - 1] = arguments[_key];
			}

			// if the first argument is function
			if (typeof argument === 'function') {
				var factory = argument;
				factory(this.next.bind(this), concat);
				return this;
			}

			// if the arguments are all streams
			var queues = [argument].concat(_toConsumableArray(queues));
			var length = queues.length;
			var counter = 0;
			var self = this;

			function callback() {
				counter++;
				if (counter >= length) {
					self.next();
				}
			}

			queues.forEach(function (queue) {
				queue.end(callback);
			});

			return this;
		}
	}, {
		key: 'then',
		value: function then(factory) {
			if (typeof factory === 'function') {
				matrix.push(factory);
			}

			return this;
		}
	}, {
		key: 'end',
		value: function end(factory) {
			finish = factory;

			return this;
		}
	}, {
		key: 'next',
		value: function next() {
			if (matrix.length > 0) {
				var factory = matrix.shift();
				if (typeof factory === 'function') {
					factory(this.next.bind(this));
				}
			} else {
				if (typeof finish === 'function') {
					finish();
				}
				if (typeof done === 'function') {
					done();
				}
			}

			return this;
		}
	}, {
		key: 'promise',
		value: function promise() {
			return new Promise(function (resolve, reject) {
				done = resolve;
			});
		}
	}]);

	return PipeMatrix;
}();

exports.default = PipeMatrix;