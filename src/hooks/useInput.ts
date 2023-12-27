import { ChangeEvent, useState } from 'react';

export type BindMenuType = {
	setId: (id: number) => void;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	onSet: <U>(key: string, newValue: U) => void;
};

type UseInputType<T> = [T, BindMenuType, () => void];

function useInput<T extends number | string | boolean | object>(initialValue: T): UseInputType<T> {
	const [input, setInput] = useState<T>(initialValue);

	const reset = () => {
		setInput(initialValue);
	};

	const bind = {
		setId: (id: number) => {
			setInput(id as T);
		},
		onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			if (typeof input === 'string') {
				setInput(e.target.value as T);
			}
			if (typeof input === 'boolean') {
				const { checked } = e.currentTarget as HTMLInputElement;
				setInput(checked as T);
			}
			if (typeof input === 'object') {
				const { name, value } = e.target;
				setInput({
					...input,
					[name]: value,
				} as T);
			}
		},
		onSet: <U>(key: string, newValue: U) => {
			if (typeof input === 'object') {
				setInput({
					...input,
					[key]: newValue,
				});
			}
		},
	};

	return [input, bind, reset];
}

export default useInput;
