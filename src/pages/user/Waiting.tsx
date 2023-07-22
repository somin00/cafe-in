import React from 'react';
import { styled } from 'styled-components';

function Waiting() {
	return (
		<WaitingWrapper>
			<WaitingHeaderText>
				649 팀이 <p> 대기중이에요</p>
			</WaitingHeaderText>
			<ApplicationBox>
				<ApplicationHeaderText>대기를 원하시면 번호를 입력해주세요.</ApplicationHeaderText>
				<NumCheckBox>
					<img src={process.env.PUBLIC_URL + '/assets/user/minusIcon_light.svg'} alt="1 빼기 버튼" />1
					<img src={process.env.PUBLIC_URL + '/assets/user/plusIcon_light.svg'} alt="1 더하기 버튼" />
				</NumCheckBox>
				<InputBoxWrapper>
					<InputBox>이름을 입력해주세요.</InputBox>
					<InputBox>전화 번호를 입력해주세요.</InputBox>
				</InputBoxWrapper>
				<ApplicationButtnoWrapper>
					<ApplicationBtn>신청</ApplicationBtn>
					<ApplicationBtn>취소</ApplicationBtn>
				</ApplicationButtnoWrapper>
			</ApplicationBox>
		</WaitingWrapper>
	);
}

export default Waiting;

const WaitingWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => theme.lightColor?.yellow.background};
	user-select: none;
	display: flex;
	align-items: center;
	flex-flow: column nowrap;
`;

const WaitingHeaderText = styled.h1`
	width: 208px;
	height: 96px;
	margin-top: 56px;
	margin-bottom: 26px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	font-size: ${({ theme }) => theme.fontSize['5xl']};
`;

const ApplicationBox = styled.div`
	width: 628px;
	height: 582px;
	border-radius: 10px;
	border: 1px solid ${({ theme }) => theme.textColor.lightgray};
	background-color: ${({ theme }) => theme.textColor.white};
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: space-around;
`;

const ApplicationHeaderText = styled.h2`
	width: 420px;
	height: 32px;
	margin-top: 20px;
	font-size: ${({ theme }) => theme.fontSize['3xl']};
`;

const NumCheckBox = styled.div`
	width: 327px;
	height: 96px;
	background-color: #8c8c;
	font-size: ${({ theme }) => theme.fontSize['6xl']};
`;

const InputBoxWrapper = styled.div`
	width: 400px;
`;
const InputBox = styled.div`
	width: 400px;
	height: 70px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.textColor.lightbrown};
	margin-bottom: 26px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
`;

const ApplicationButtnoWrapper = styled.div`
	width: 359px;
	height: 64px;
	display: flex;
	justify-content: space-between;
	background-color: aquamarine;
	margin-bottom: 20px;
`;

const ApplicationBtn = styled.button`
	width: 168px;
	height: 64px;
	border-radius: 10px;
	color: ${({ theme }) => theme.textColor.white};

	background-color: ${({ theme }) => theme.textColor.darkbrown};
`;
