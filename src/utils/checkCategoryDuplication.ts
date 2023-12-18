import { CategoryType } from '../types/menuMangementType';
export const checkDuplicate = (categoryList: CategoryType[], categoryName: string) => {
	let isDuplicate = false;
	const categoryNameList = categoryList.map((category) => category.category);
	if (categoryNameList.includes(categoryName)) {
		isDuplicate = true;
	}
	return isDuplicate;
};
