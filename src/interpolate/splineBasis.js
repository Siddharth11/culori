import identity from '../util/identity';

/*

	Basis spline
	------------

	Given control points V0...Vn (our values)

		S0 = V0
		...
		Si = 1/6 * Vi-1 + 2/3 * Vi + 1/6 * Vi+1
		...
		Sn = Vn

	The Bézier curve has control points:

		Bi = Si-1, 2/3 * Vi-1 + 1/3 * Vi, 1/3 * Vi-1 + 2/3 * Vi, Si

	Which we can then factor into the Bezier's explicit form:
	
		B(t) = (1-t)^3 * P0 + 3 * (1-t)^2 * t * P1 + (1-t) * t^2 * P2 + t^3 * P3 

 */

const bspline = (Vim2, Vim1, Vi, Vip1, t) => {
	let t2 = t * t;
	let t3 = t2 * t;
	return (
		((1 - 3 * t + 3 * t2 - t3) * Vim2 +
			(4 - 6 * t2 + 3 * t3) * Vim1 +
			(1 + 3 * t + 3 * t2 - 3 * t3) * Vi +
			t3 * Vip1) /
		6
	);
};

export default (
	normalize = identity,
	type = 'default',
	γ = 1
) => original_arr => {
	let arr = (normalize || identity)(original_arr);

	return t => {
		t = Math.pow(t, γ);

		let classes = arr.length - 1;
		let i = t === 1 ? classes - 1 : Math.floor(t * classes);

		switch (type) {
			case 'default':
				return bspline(
					i > 0 ? arr[i - 1] : 2 * arr[i] - arr[i + 1],
					arr[i],
					arr[i + 1],
					i < classes - 1 ? arr[i + 2] : 2 * arr[i + 1] - arr[i],
					(t - i / classes) * classes
				);
			case 'closed':
				return bspline(
					arr[(i - 1 + arr.length) % arr.length],
					arr[i],
					arr[(i + 1) % arr.length],
					arr[(i + 2) % arr.length],
					(t - i / classes) * classes
				);
			case 'open':
				throw new Error('open basis spline is not yet implemented');
		}
	};
};
