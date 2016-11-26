var matrix = [];
var finish;
var done;

export default class PipeMatrix {
	constructor() {
	}
	when(argument,...queues) {
		// if the first argument is function
		if(typeof argument === 'function') {
			var factory = argument;
			factory(this.next.bind(this),concat);
			return this;
		}

		// if the arguments are all streams
		var queues = [argument,...queues];
		var length = queues.length;
		var counter = 0;
		var self = this;

		function callback() {
			counter ++;
			if(counter >= length) {
				self.next();
			}
		}

		queues.forEach(queue => {
			queue.end(callback);
		});

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