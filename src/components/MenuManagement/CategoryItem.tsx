import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { categoryListState } from '../../state/CategoryList';
import { db } from '../../firebase/firebaseConfig';
import { deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';

function CategoryItem() {
	const categoryListRef = collection(db, 'categoryList');
	const [categoryList] = useRecoilState(categoryListState);

	const handleDeleteCategory = useCallback(
		async (id: number) => {
			const data = await getDocs(query(categoryListRef, where('id', '==', id)));
			if (data.docs.length !== 0) {
				await deleteDoc(data.docs[0].ref);
			}
		},
		[categoryListRef],
	);
	return (
		<>
			{categoryList.map(({ id, category }) => (
				<CategoryItemWrapper key={id}>
					<input type="text" placeholder={category} />
					<AddCategoryButton type="button">수정</AddCategoryButton>
					<button
						type="button"
						onClick={() => {
							handleDeleteCategory(id);
						}}
					>
						삭제
					</button>
				</CategoryItemWrapper>
			))}
		</>
	);
}

export default CategoryItem;

const CategoryItemWrapper = styled.li`
	display: flex;

	input {
		width: 191px;
		height: 57px;
		background-color: ${({ theme }) => theme.textColor.white};
		margin-right: 16px;
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		border-radius: 10px;
		padding-left: 10px;
		border: none;
	}

	button {
		width: 83px;
		height: 57px;
		/* 색상 코드 추가되면 수정 */
		background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.main : '#068FFF')};
		color: ${({ theme }) => theme.textColor.white};
		border-radius: 10px;
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
	}
`;

const AddCategoryButton = styled.button`
	margin-right: 3px;
`;
