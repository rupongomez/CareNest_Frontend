import z from "zod";

// {
//     "startDateTime": "2026-08-27T15:00:00.000Z",
//     "endDateTime": "2026-08-27T16:00:00.000Z",
//     "meetingLink": "https://meet.google.com/abc-defg-hij"
// }

export const scheduleValidationSchema = z.object({
  date: z.string().nonempty("Date is required"),
  startTime: z.string().nonempty("Start time is required"),
  endTime: z.string().nonempty("End time is required"),
  meetingLink: z.string().trim().min(1, "Meeting link is required"),
});
