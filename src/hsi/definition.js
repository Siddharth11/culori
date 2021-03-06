import convertHsiToRgb from './convertHsiToRgb';
import convertRgbToHsi from './convertRgbToHsi';
import interpolateHue from '../interpolate/hue';
import interpolateAlpha from '../interpolate/alpha';
import interpolateLinear from '../interpolate/linear';

export default {
	mode: 'hsi',
	output: {
		rgb: convertHsiToRgb
	},
	input: {
		rgb: convertRgbToHsi
	},
	channels: ['h', 's', 'i', 'alpha'],
	interpolate: {
		h: interpolateLinear(interpolateHue),
		s: interpolateLinear(),
		i: interpolateLinear(),
		alpha: interpolateLinear(interpolateAlpha)
	}
};
