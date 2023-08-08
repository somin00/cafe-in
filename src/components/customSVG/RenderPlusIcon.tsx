import { PlusSVG } from './WaitingSVG';
import { DefaultTheme } from 'styled-components/dist/types';

interface RenderMinusIconProps {
	theme: DefaultTheme;
}

function RenderPlusIcon({ theme }: RenderMinusIconProps) {
	const renderIcon = () => {
		if (theme.lightColor) {
			return <PlusSVG />;
		} else {
			return (
				<img alt="1 빼기 버튼" aria-label="1 빼기" src={process.env.PUBLIC_URL + '/assets/user/minusIcon_dark.svg'} />
			);
		}
	};

	return <div>{renderIcon()}</div>;
}

export default RenderPlusIcon;
