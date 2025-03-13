import { useState } from "react";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentTable from "../components/AppointmentTable";

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(
      appointments.map((appt) => 
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý lịch hẹn</h2>
      <AppointmentForm onAdd={addAppointment} />
      <AppointmentTable appointments={appointments} onUpdate={updateAppointmentStatus} />
    </div>
  );
};

export default AppointmentPage;
