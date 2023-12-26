import { ChangeEvent, useState } from 'react';

function useInput<T>(initialValue: T): [T, any, () => void] {
	const [input, setInput] = useState<T>(initialValue);

	const reset = () => {
		setInput(initialValue);
	};

	const bind = {
		input,
		onChangeNumber: (id: T) => {
			setInput(id);
		},
		onChangeBoolean: (e: ChangeEvent<any>) => {
			setInput(e.currentTarget.checked);
		},
		onChangeString: (e: ChangeEvent<any>) => {
			setInput(e.target.value);
		},
		onChangeObject: (e: ChangeEvent<any>) => {
			const { name, value } = e.target;
			setInput({
				...input,
				[name]: value,
			});
		},
	};

	return [input, bind, reset];
}

export default useInput;
