var matrix = [];
var finish;
var done;

export default class PipeMatrix {
	constructor() {
	}
	when(queue) {
		queue.end(this.next.bind(this));

		return this;
	}
	then(factory) {
		if(typeof factory === 'function') {
			matrix.push(factory);
		}

		return this;
	}
	end(factory) {
		finish = factory;

		return this;
	}
	next() {
		if(matrix.length > 0) {
			var factory = matrix.shift();
			if(typeof factory === 'function') {
				factory(this.next.bind(this));
			}
		}
		else {
			if(typeof finish === 'function') {
				finish();
			}
			if(typeof done === 'function') {
				done();
			}
		}

		return this;
	}
	promise() {
		return new Promise((resolve, reject)=> {
			done = resolve;
		});
	}
}