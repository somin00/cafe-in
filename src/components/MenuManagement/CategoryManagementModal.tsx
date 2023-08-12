import React, { ChangeEvent, useCallback, useState } from 'react';
import { styled } from 'styled-components';
import CategoryItem from './CategoryItem';
import { ModalDefaultType } from '../../types/ModalOpenTypes';
import { db } from '../../firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryListState, selectedCategoryState } from '../../state/CategoryList';
function CategoryManagementModal({ onClickToggleModal }: ModalDefaultType) {
	const [categoryName, setCategoryName] = useState<string>('');
	const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
	const categoryListRef = collection(db, 'categoryList');
	const categoryList = useRecoilValue(categoryListState);
	const setSelectedCategory = useSetRecoilState(selectedCategoryState);

	const checkDuplicate = useCallback(
		(categoryName: string) => {
			setIsDuplicate(false);
			const categoryNameList = categoryList.map((category) => category.category);
			if (categoryNameList.includes(categoryName)) {
				setIsDuplicate(true);
			}
		},
		[categoryList],
	);

	const handleChangeCategoryName = (e: ChangeEvent<HTMLInputElement>) => {
		setCategoryName(e.target.value);
		checkDuplicate(e.target.value);
	};

	const handleAddCategory = useCallback(async () => {
		if (categoryName.trim()) {
			await addDoc(categoryListRef, { id: Date.now(), category: categoryName });
			setSelectedCategory(categoryName);
			setCategoryName('');
		}
	}, [categoryListRef, categoryName, setSelectedCategory]);

	return (
		<CategoryManagementWrapper>
			<CategoryModalContent>
				<GuidText>* 이미 존재하는 카테고리는 추가 불가능합니다.</GuidText>
				<AddContainer>
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<label htmlFor="categoryName">
							<input type="text" id="categoryName" value={categoryName} onChange={handleChangeCategoryName} />
						</label>
					</form>
					<button type="button" onClick={handleAddCategory} disabled={!categoryName || isDuplicate ? true : false}>
						추가
					</button>
				</AddContainer>
				<GuidText>* 메뉴가 포함된 카테고리는 삭제 불가능합니다.</GuidText>
				<ul>
					<CategoryItem />
				</ul>
				<CloseButton type="button" onClick={onClickToggleModal}>
					닫기
				</CloseButton>
			</CategoryModalContent>
		</CategoryManagementWrapper>
	);
}

export default CategoryManagementModal;

const CategoryManagementWrapper = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CategoryModalContent = styled.div`
	width: 492px;
	height: 758px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.background : theme.textColor.black)};
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: start;
	padding: 30px 0 0 58px;

	ul {
		display: flex;
		flex-direction: column;
		height: 472px;
		grid-row-gap: 26px;
		margin-bottom: 30px;
		overflow-y: auto;
	}
`;

const AddContainer = styled.div`
	display: flex;
	margin-bottom: 25px;

	input {
		width: 262px;
		height: 66px;
		background-color: ${({ theme }) => theme.textColor.white};
		border: none;
		border-radius: 10px;
		margin-right: 17px;
		padding-left: 8px;
		font-size: ${({ theme }) => theme.fontSize['2xl']};
	}

	button {
		width: 97px;
		height: 66px;
		background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.main : theme.darkColor.main)};
		color: ${({ theme }) => theme.textColor.white};
		border-radius: 10px;
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};

		&:disabled {
			cursor: not-allowed;
			background-color: ${({ theme }) => theme.textColor.darkgray};
		}
	}
`;

const CloseButton = styled.button`
	margin-left: 115px;
	width: 146px;
	height: 57px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.main : theme.darkColor.main)};
	color: ${({ theme }) => theme.textColor.white};
	border-radius: 10px;
	font-size: ${({ theme }) => theme.fontSize['3xl']};
	font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const GuidText = styled.p`
	color: ${({ theme }) => theme.textColor.black};
	margin-bottom: 10px;
`;
