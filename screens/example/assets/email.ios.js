import * as React from 'react';
import { Svg, Path } from 'react-native-svg';

export default props => (
	<Svg viewBox='0 0 24 16' height='16' width='24' {...props}>
		<Path
			d='M12,7.16676923 L1.242,0.318769231 C1.5864,0.123076923 1.9776,0 2.4,0 L21.6,0 C22.0224,0 22.4136,0.123076923 22.758,0.318769231 L12,7.16676923 Z M12.6324,9.66153846 L23.9964,2.42830769 C23.9964,2.43938462 24,2.45046154 24,2.46153846 L24,13.5384615 C24,14.896 22.9236,16 21.6,16 L2.4,16 C1.0764,16 0,14.896 0,13.5384615 L0,2.46153846 C0,2.45046154 0.0036,2.43938462 0.0036,2.42953846 L11.3676,9.66153846 C11.5608,9.78461538 11.7804,9.84615385 12,9.84615385 C12.2196,9.84615385 12.4392,9.78461538 12.6324,9.66153846 Z'
			fill={props.tintColor}
		/>
	</Svg>
);
