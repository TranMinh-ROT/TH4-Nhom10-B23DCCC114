import React, { useState } from 'react';
import { Table, Button } from 'antd';

interface IDiplomaBook {
	id: number;
	year: number;
	lastEntry: number;
}

const DiplomaBook: React.FC = () => {
	const [books, setBooks] = useState<IDiplomaBook[]>([
		{
			id: 1,
			year: 2024,
			lastEntry: 10,
		},
	]);

	const addNewBook = () => {
		const newYear = books.length > 0 ? books[books.length - 1].year + 1 : new Date().getFullYear();
		const newBook: IDiplomaBook = {
			id: books.length + 1,
			year: newYear,
			lastEntry: 0,
		};
		setBooks([...books, newBook]);
	};

	const columns = [
		{ title: 'Năm', dataIndex: 'year', key: 'year' },
		{ title: 'Số vào sổ cuối', dataIndex: 'lastEntry', key: 'lastEntry' },
	];

	return (
		<div>
			<h2>Quản lý Sổ Văn Bằng</h2>
			<Button type='primary' onClick={addNewBook} style={{ marginBottom: 16 }}>
				Thêm Sổ Mới
			</Button>
			<Table columns={columns} dataSource={books} rowKey='id' />
		</div>
	);
};

export default DiplomaBook;
