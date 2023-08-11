import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { darkTheme, defaultTheme } from '../../style/theme';
import { Category } from '../../state/Category';
import { db } from '../../firebase/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';
import { selectedCategoryState } from '../../state/CategoryList';

function MenuListHeader() {
	const setCategory = useSetRecoilState(selectedCategoryState);
	const [activeBtn] = useState<string>('');
	const [categories, setCategories] = useState<Category[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const loadCategories = async () => {
			const querySnapshot = await getDocs(collection(db, 'categoryList'));
			const loadedCategories = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				category: doc.data().category,
			}));
			setCategories(loadedCategories);
		};
		loadCategories();
	}, []);
	const onCategoryClick = (category: string) => {
		setCategory(category);
	};
	return (
		<Layout>
			<li>
				<h1>
					<img src="/assets/logo.png" alt="cafe-in" width={90} />
				</h1>
			</li>
			{categories.map((category) => (
				<TabButton
					key={category.id}
					$isActive={activeBtn === category.category}
					onClick={() => onCategoryClick(category.category)}
				>
					{category.category}
				</TabButton>
			))}
			<li>
				<button>
					<img src="/assets/user/home_light.svg" alt="Home" width={30} onClick={() => navigate('/')} />
				</button>
			</li>
		</Layout>
	);
}
//prettier-ignore
const TabButton = styled.button<{ $isActive: boolean }>`
	background-color: ${({ $isActive, theme }) => 
		$isActive 
			? (theme.mode === 'dark' 
				? theme.textColor.lightgray 
				: 'ghostwhite') 
			: 'transparent'
	};
	color: ${({ $isActive, theme }) => 
		$isActive 
			? (theme.mode === 'dark' 
				? theme.darkColor?.sub 
				: theme.lightColor?.yellow.sub) 
			: 'black'
	};
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	padding: 10px 30px;
	width: fit-content;
	border: none;
	border-radius: 10px;
	cursor: pointer;
`;
const Layout = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 83px;
	padding: 0 30px;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
	background-color: ${({ theme }) =>
		theme === defaultTheme ? defaultTheme.textColor.white : darkTheme.textColor.black};
`;

export default MenuListHeader;
