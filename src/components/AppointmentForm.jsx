import { useState } from "react";
import { DatePicker, Select, Button } from "antd";

const AppointmentForm = ({ onAdd }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [employee, setEmployee] = useState("");

  const handleSubmit = () => {
    if (!date || !time || !employee) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    onAdd({ id: Date.now(), date, time, employee, status: "Chờ duyệt" });
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold">Đặt lịch hẹn</h3>
      <DatePicker onChange={(value) => setDate(value.format("YYYY-MM-DD"))} />
      <Select onChange={setTime} placeholder="Chọn giờ" className="w-full my-2">
        {["09:00", "10:00", "11:00", "14:00", "15:00"].map((t) => (
          <Select.Option key={t} value={t}>{t}</Select.Option>
        ))}
      </Select>
      <Select onChange={setEmployee} placeholder="Chọn nhân viên" className="w-full my-2">
        {["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"].map((e) => (
          <Select.Option key={e} value={e}>{e}</Select.Option>
        ))}
      </Select>
      <Button type="primary" onClick={handleSubmit}>Đặt lịch</Button>
    </div>
  );
};

export default AppointmentForm;
