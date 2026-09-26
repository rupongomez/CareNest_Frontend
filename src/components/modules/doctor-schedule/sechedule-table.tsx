import { SearchX } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import type { DoctorParams } from "@/types";
import { getMySchedules } from "@/api/schedule.api";
import { useMySchedules } from "@/hooks/schedule.hook";
import { format } from "date-fns";
import ScheduleActions from "./schedule-actions";

interface Props extends DoctorParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function ScheduleTable({ handlePageChange, ...params }: Props) {
  const { data } = useMySchedules(params);

  const schedules = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;

  if (schedules.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
        No schedules found. Create your first schedule to start accepting
        appointments.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border w-full table-fixed">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-1/5 text-center">Date & Time</TableHead>
              <TableHead className="w-1/6 text-center">Slots</TableHead>
              <TableHead className="w-1/6 text-center">Status</TableHead>
              <TableHead className="w-1/3 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell className="font-medium text-center">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold">
                      {format(schedule.startDateTime, "PPP")} to{" "}
                    </span>
                    <span className="text-muted-foreground">
                      {format(schedule.endDateTime, "PPP")}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs text-center">
                  {schedule.totalSlots - schedule.availableSlots}/
                  {schedule.totalSlots} booked
                </TableCell>
                <TableCell
                  className="max-w-55 truncate text-muted-foreground text-center"
                  title={schedule.status}
                >
                  {schedule.status === "PUBLISHED" ? (
                    <span className="text-primary font-semibold">
                      {schedule.status}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      {schedule.status}
                    </span>
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <ScheduleActions schedule={schedule} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="my-5">
          <TablePagination
            page={params.page ?? 1}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
