import DoctorApprovalTabs from "@/components/modules/doctor-approval/doctor-approval-tabs";
import React from "react";

function page() {
  return (
    <section className="p-5">
      <div>
        <h1>Doctor Approval</h1>
        <p>
          Please review the following doctor information and approve or reject
          the application.
        </p>
      </div>
      <DoctorApprovalTabs />
    </section>
  );
}

export default page;
