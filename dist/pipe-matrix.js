'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
		value: function when(queue) {
			queue.end(this.next.bind(this));

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