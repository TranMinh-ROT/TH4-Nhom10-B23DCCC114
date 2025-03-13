import { Table, Button, Tag } from "antd";

const AppointmentTable = ({ appointments, onUpdate }) => {
  const handleStatusChange = (id, status) => {
    onUpdate(id, status);
  };

  const columns = [
    { title: "Ngày", dataIndex: "date", key: "date" },
    { title: "Giờ", dataIndex: "time", key: "time" },
    { title: "Nhân viên", dataIndex: "employee", key: "employee" },
    { 
      title: "Trạng thái", 
      dataIndex: "status", 
      key: "status", 
      render: (status) => <Tag color={status === "Hoàn thành" ? "green" : "blue"}>{status}</Tag> 
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button onClick={() => handleStatusChange(record.id, "Xác nhận")}>Xác nhận</Button>
          <Button onClick={() => handleStatusChange(record.id, "Hoàn thành")} className="ml-2">Hoàn thành</Button>
          <Button onClick={() => handleStatusChange(record.id, "Hủy")} danger className="ml-2">Hủy</Button>
        </div>
      ),
    },
  ];

  return <Table dataSource={appointments} columns={columns} rowKey="id" />;
};

export default AppointmentTable;
