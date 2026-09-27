import AppointmentList from "@/components/modules/my-appointments/appointment-list";
import React from "react";

export default function page() {
  return (
    <div>
      <h1 className="m-10">My Appointments</h1>
      <AppointmentList />
    </div>
  );
}
