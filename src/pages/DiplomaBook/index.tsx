import React, { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { Table, Button, Spin, message } from 'antd';

const DiplomaBookPage: React.FC = () => {
  // Lấy dữ liệu từ model diplomaBook
  const { diplomaBooks, fetchDiplomaBooks, removeDiplomaBook, loading } = useModel('diplomaBook');

  // Gọi API lấy danh sách văn bằng khi component mount
  useEffect(() => {
    fetchDiplomaBooks();
  }, []);

  // Xử lý sự kiện xóa văn bằng
  const handleRemove = (id: string) => {
    removeDiplomaBook(id);
    message.success('Xóa văn bằng thành công!');
  };

  // Cấu hình cột cho bảng hiển thị
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên văn bằng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="primary" danger onClick={() => handleRemove(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý Sổ Văn Bằng</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={diplomaBooks} columns={columns} rowKey="id" />
      )}
    </div>
  );
};

export default DiplomaBookPage;
