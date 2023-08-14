import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface WrappedPropsType {
	setIsDarkMode?: () => Element;
	isDarkmode?: boolean;
}

export default function withAuth<P extends WrappedPropsType>(Component: React.ComponentType<P>) {
	return function WithAuthComponent({ ...props }) {
		const navigate = useNavigate();
		useEffect(() => {
			const isAdminMode = localStorage.getItem('mode') === 'admin';
			if (!isAdminMode) navigate('/');
		}, [navigate]);
		return <Component {...(props as P)} />;
	};
}
