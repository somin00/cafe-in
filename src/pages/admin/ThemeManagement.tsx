import React from 'react';
import { styled } from 'styled-components';
import ManagementHeader from '../../components/adminMode/ManagementHeader';
import { url } from 'inspector';

function ThemeManagement() {
	return (
		<ThemeManagementWrapper>
			<ManagementHeader headerText="테마 및 색상 설정" />
			<ThemeMain>
				<ColorWrapper>
					<h2>색상 변경</h2>
					<Colors>
						<button>
							<img src={process.env.PUBLIC_URL + '/assets/admin/yellowColor.svg'} alt="노랑색" />
						</button>
						<button>
							<img src={process.env.PUBLIC_URL + '/assets/admin/pinkColor.svg'} alt="분홍색" />
						</button>
						<button>
							<img src={process.env.PUBLIC_URL + '/assets/admin/blueColor.svg'} alt="파랑색" />
						</button>
						<button>
							<img src={process.env.PUBLIC_URL + '/assets/admin/greenColor.svg'} alt="초록색" />
						</button>
						<button>
							<img src={process.env.PUBLIC_URL + '/assets/admin/navyColor.svg'} alt="남색" />
						</button>
					</Colors>
				</ColorWrapper>
				<ModeWrapper>
					<ModeHeader>
						<h2>라이트 모드</h2>
						<h2>다크 모드</h2>
					</ModeHeader>
					<ModeBox>
						<LightMode>
							<img alt="라이트 모드" />
						</LightMode>
						<DarkMode>
							<img alt="다크 모드" />
						</DarkMode>
					</ModeBox>
				</ModeWrapper>
				<p>*다크 모드 선택 시, 색상 변경은 불가능합니다.</p>
			</ThemeMain>
		</ThemeManagementWrapper>
	);
}

export default ThemeManagement;

const ThemeManagementWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	user-select: none;
`;

const ThemeMain = styled.div`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;

	h2 {
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		font-weight: ${({ theme }) => theme.fontWeight.bold};
		font-size: ${({ theme }) => theme.fontSize['3xl']};
	}

	p {
		margin-top: 100px;
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		font-size: ${({ theme }) => theme.fontSize['2xl']};
	}
`;

const ColorWrapper = styled.div`
	width: 590px;
	height: 190px;
	margin-top: 65px;
`;
const Colors = styled.div`
	width: 600px;
	height: 91px;
	display: flex;
	justify-content: space-between;
	margin-top: 63px;
`;

const ModeWrapper = styled.div`
	width: 624px;
	height: 246px;
	margin-top: 100px;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
`;

const ModeHeader = styled.div`
	width: 570px;
	height: 35px;
	display: flex;
	justify-content: space-between;
`;

const ModeBox = styled.div`
	width: 624px;
	height: 160px;
	display: flex;
	justify-content: space-between;
	margin-top: 50px;
`;
const LightMode = styled.button`
	img {
		content: ${({ theme }) =>
			theme.lightColor ? 'url(/assets/admin/sun-selected_light.svg)' : 'url(/assets/admin/sun-selected_dark.svg)'};
	}
`;
const DarkMode = styled.button`
	img {
		content: ${({ theme }) =>
			theme.lightColor ? 'url(/assets/admin/moon_light.svg)' : 'url(/assets/admin/moon_dark.svg)'};
	}
`;
