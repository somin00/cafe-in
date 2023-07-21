import styled from 'styled-components';

export const Head = styled.header`
	height: 80px;
	display: flex;
	align-items: center;

	h1 {
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		margin: 0 227px 0 449px;
	}

	button {
		width: 140px;
		height: 56px;
		background-color: ${({ theme }) => theme.lightColor?.yellow.point};
		border-radius: 10px;
		font-size: ${({ theme }) => theme.fontSize['xl']};
		color: ${({ theme }) => theme.textColor.white};
		&:first-child {
			margin-right: 6px;
		}
	}
`;

export const ImageContainer = styled.div`
	margin-left: 33px;
	width: 60px;
`;
