<<<<<<< HEAD
=======
import { atom } from 'recoil';

>>>>>>> c08ba48d68d30c994c0b606f18f127e324718c4f
export interface Item {
	id: number;
	name: string;
	price: number;
<<<<<<< HEAD
	imageName: string;
	imageUrl: string;
	category: string;
	soldOut: boolean;
}

=======
	img: string;
	category: string;
}

export const selectedCategoryState = atom<string>({
	key: 'selectedCategoryState',
	default: '',
});

>>>>>>> c08ba48d68d30c994c0b606f18f127e324718c4f
export interface Category {
	id: string;
	category: string;
}
<<<<<<< HEAD
=======

export interface MenuItem {
	id: number;
	name: string;
	price: number;
	img: string;
	category: string;
}
>>>>>>> c08ba48d68d30c994c0b606f18f127e324718c4f
