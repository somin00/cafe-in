import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Home from './pages/Home';
import MenuList from './pages/user/MenuList';
import AdminLogin from './pages/admin/AdminLogin';
import AdminMenu from './pages/admin/AdminMenu';
import WaitingManagement from './pages/admin/WaitingManagement';
import Waiting from './pages/user/Waiting';
import WaitingCheck from './pages/user/WaitingCheck';
import MenuManagement from './pages/admin/MenuManagement';
import OrderCheck from './pages/user/OrderCheck';
import NotFound from './pages/NotFound';
import { ThemeProvider } from 'styled-components';
import { defaultTheme, darkTheme } from './style/theme';
import { GlobalStyles } from './style/global';
import OrderHistory from './pages/admin/OrderHistory';

function App() {
	return (
		<RecoilRoot>
			<ThemeProvider theme={defaultTheme}>
				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						<Route path="/home/*" element={<Home />} />
						<Route path="/" element={<Navigate replace to="/home" />} />
						<Route path="/*" element={<NotFound />} />
						<Route path="/menu" element={<MenuList />} />
						<Route path="/order" element={<OrderCheck />} />
						<Route path="/waiting" element={<Waiting />} />
						<Route path="/waitingcheck" element={<WaitingCheck />} />
						<Route path="/admin/login" element={<AdminLogin />} />
						<Route path="/admin/main" element={<AdminMenu />} />
						<Route path="/admin" element={<Navigate replace to="/admin/main" />} />
						<Route path="/admin/menu" element={<MenuManagement />} />
						<Route path="/admin/waiting/*" element={<WaitingManagement />} />
						<Route path="/admin/orderhistory" element={<OrderHistory />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</RecoilRoot>
	);
}

export default App;
