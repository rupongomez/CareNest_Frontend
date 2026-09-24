"use client";

import { Suspense, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleParams, ScheduleStatus } from "@/types/schedule.type";
import ScheduleListLoading from "./doctor-schedule-table-loading";
import ScheduleCreateDialog from "./schedule-create-dialog";
import ScheduleTable from "./sechedule-table";

const statuses: ["ALL" | ScheduleStatus, string][] = [
  ["ALL", "All"],
  ["DRAFT", "Draft"],
  ["PUBLISHED", "Published"],
];

export default function ScheduleList() {
  const [tab, setTab] = useState<"ALL" | ScheduleStatus>("ALL");

  const queryParams: ScheduleParams = {
    page: 1,
    limit: 10,
    // sortBy: "startDateTime",
    sortOrder: "asc",
    ...(tab === "ALL" ? {} : { status: tab }),
  };

  return (
    <>
      <div className="my-5 flex justify-between gap-3">
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            {statuses.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ScheduleCreateDialog />
      </div>

      <Suspense fallback={<ScheduleListLoading />}>
        <ScheduleTable {...queryParams} />
      </Suspense>
    </>
  );
}
