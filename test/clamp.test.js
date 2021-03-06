let tape = require('tape');
let culori = require('../');

let clamp = culori.clamp('lch');

tape('RGB', function(test) {
	test.deepEqual(clamp('red'), { mode: 'rgb', r: 1, g: 0, b: 0 });

	test.deepEqual(clamp('rgb(300, 255, 255)'), {
		mode: 'rgb',
		r: 1,
		g: 1,
		b: 1
	});

	test.end();
});

tape('LCh', function(test) {
	test.deepEqual(clamp('lch(50 120 5)'), {
		mode: 'lch',
		l: 50,
		c: 77.48291015625,
		h: 5
	});

	test.end();
});
