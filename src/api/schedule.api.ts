import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types";
import {
  CreateSchedulePayload,
  Schedule,
  ScheduleParams,
} from "@/types/schedule.type";

export const createSchedule = (payload: CreateSchedulePayload) => {
  return apiClient<ApiResponse<Schedule>>("/schedule/create-schedule", {
    method: "POST",
    body: payload,
  });
};

export const getMySchedules = (params: ScheduleParams) => {
  return apiClient<ApiResponse<Schedule[]>>("/schedule/my-schedules", {
    params,
  });
};

export function publishSchedule(scheduleId: string) {
  return apiClient<ApiResponse<Schedule>>(
    `/schedule/publish-schedule/${scheduleId}`,
    { method: "PATCH" },
  );
}

export function deleteSchedule(scheduleId: string) {
  return apiClient<ApiResponse<Schedule>>(`/schedule/${scheduleId}`, {
    method: "DELETE",
  });
}

export function getTodayScheduleByDoctor(params: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) {
  return apiClient<ApiResponse<Schedule[]>>("/schedule/todays-schedule", {
    params,
  });
}
