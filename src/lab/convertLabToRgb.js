import convertLabToXyz from './convertLabToXyz';
import convertXyzToRgb from './convertXyzToRgb';

export default lab => {
	let res = convertXyzToRgb(convertLabToXyz(lab));
	res.mode = 'rgb';
	if (lab.alpha !== undefined) res.alpha = lab.alpha;
	return res;
};