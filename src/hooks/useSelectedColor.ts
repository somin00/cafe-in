import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { SelectedColorType } from '../style/theme';
import { selectedColorState } from '../state/ColorState';

export function useSelectedColor() {
	const setSelectedColor = useSetRecoilState<SelectedColorType>(selectedColorState);

	useEffect(() => {
		const storedColor: string | null = localStorage.getItem('selectedColor');
		if (storedColor) {
			setSelectedColor(storedColor as SelectedColorType);
		} else {
			setSelectedColor('yellow');
		}
	}, []);
}
