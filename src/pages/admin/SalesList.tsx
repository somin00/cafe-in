import React from 'react';
import withAuth from '../../components/adminMode/WithAuth';

function SalesList() {
	return (
		<div>
			<h1>매출 내역 조회</h1>
		</div>
	);
}

export default withAuth(SalesList);
