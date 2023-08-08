import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { SelectedColorType } from '../../style/theme';
import { selectedColorState } from '../../state/ColorState';
import { useSelectedColor } from '../../hooks/useSelectedColor';

type ColorProps = {
	$selectedColor: SelectedColorType;
};

function MinusSVG() {
	const selectedColor = useRecoilValue<SelectedColorType>(selectedColorState);
	useSelectedColor();

	return (
		<Minus
			$selectedColor={selectedColor}
			width="75"
			height="91"
			viewBox="0 0 75 91"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="37.5" cy="53.5" r="37.5" fill="#FFC26F" />
			<path d="M51.1001 49.5341V58H24.907V49.5341H51.1001Z" fill="white" />
		</Minus>
	);
}

function PlusSVG() {
	const selectedColor = useRecoilValue<SelectedColorType>(selectedColorState);
	useSelectedColor();
	return (
		<Plus
			$selectedColor={selectedColor}
			width="75"
			height="92"
			viewBox="0 0 75 92"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="37.5" cy="54.5" r="37.5" fill="#FFC26F" />
			<path
				d="M33.5291 74.5625V35.2443H42.4496V74.5625H33.5291ZM18.3303 59.3636V50.4432H57.6484V59.3636H18.3303Z"
				fill="white"
			/>
		</Plus>
	);
}

const Minus = styled.svg<ColorProps>`
	circle {
		fill: ${({ theme, $selectedColor }) => (theme.lightColor ? theme.lightColor[$selectedColor].main : '#ffc26f')};
	}
`;

const Plus = styled.svg<ColorProps>`
	circle {
		fill: ${({ theme, $selectedColor }) => (theme.lightColor ? theme.lightColor[$selectedColor].main : '#ffc26f')};
	}
`;

export { MinusSVG, PlusSVG };
