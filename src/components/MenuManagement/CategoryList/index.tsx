import React from 'react';
import { Nav } from './styles';
function CategoryList() {
	return (
		<Nav>
			<ul>
				<li>
					<button>커피</button>
				</li>
				<li>
					<button>음료</button>
				</li>
				<li>
					<button>티</button>
				</li>
			</ul>
		</Nav>
	);
}

export default CategoryList;
