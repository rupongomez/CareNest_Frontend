import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import DoctorReviewSheet from "./doctor-review-sheet";
import { useSuspenseGetAllDoctors } from "@/hooks";

export default function DoctorApprovalTable() {
  const { data } = useSuspenseGetAllDoctors();
  const doctors = data?.data;

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors?.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{doctor?.name}</TableCell>
              <TableCell>{doctor?.licenseNumber}</TableCell>
              <TableCell>{doctor?.email}</TableCell>
              <TableCell>
                {doctor?.contactNumber ? doctor.contactNumber : "-"}
              </TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell className="text-right">
                <DoctorReviewSheet />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
