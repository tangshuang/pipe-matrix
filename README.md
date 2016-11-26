# Pipe Matrix

Run pipe queue one by one.

When you are using `pipe-queue`, you may want to run these queues one by one syncly. However, pipe-matrix help you to reach this.

By using pipe-matrix, you can arrange which queue to run first and the next...

Before you start, you may read about [pipe-queue](https://github.com/tangshuang/pipe-queue). pipe-matrix is for pipe-queue, if you have not used pipe-queue in your project, you may not use pipe-matrix.

## Install

```
$ npm install pipe-matrix
```

## Usage

```
var PipeQueue = require('pipe-queue');
var PipeMatrix = require('pipe-matrix');

var $queue1 = new PipeQueue();
$queue1.when(...).then(...)....

var $matrix = new PipeMatrix();

$matrix.when($queue1).then(function(next){
	var $queue2 = new PipeQueue();
	$queue2.when(...).then(...)...
		.end(next);
}).then(function(next){
	var $queue3 = ...
	...
})
...
.end(function(){
	console.log('matrix end.')
});
```

#### .when(queue)

The first queue to run, after this queue ended, the next then callback function will be run.

Don't call `.end()` of `$queue1`, `end()` of `$queue1` will be nouse. In fact, `when` will override the `end` callback functon of `$queue1`.

#### .then(function(next))

`function` will be added to a list which pipe-matrix will run one by one.

In the function, you **must** run a `next()`, or next then callback function will not run util you run `next()`.

`next` is an alias of `$matrix`, so you can use `$matrix.next()` anywhere.

#### .end(function)

In this function, you can put code which you want to run after all queues finished.

## Development

git clone from [here](https://github.com/tangshuang/pipe-matrix)

Source code is written by ES6, run 

```
npm install
npm run babel
```

after you change the source code.