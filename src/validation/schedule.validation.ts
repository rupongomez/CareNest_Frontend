import z from "zod";

const MINimum_SLOT_MINUTE = 20;

const GOOGLE_MEET_REGEX =
  /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;

function slotMinutes(startTime: string, endTime: string) {
  const [startHour, startMin] = startTime
    .split(":")
    .map((item) => Number(item));
  const [endHour, endMin] = endTime.split(":").map((item) => Number(item));

  return endHour * 60 + endMin - (startHour * 60 + startMin);
}

export const scheduleValidationSchema = z
  .object({
    date: z.string().nonempty("Date is required"),
    startTime: z.string().nonempty("Start time is required"),
    endTime: z.string().nonempty("End time is required"),
    meetingLink: z
      .string()
      .trim()
      .min(1, "Meeting link is required")
      .regex(
        GOOGLE_MEET_REGEX,
        "Please enter a valid Google Meet link (e.g., https://meet.google.com/abc-defg-hij )",
      ),
  })
  .refine((value) => value.startTime < value.endTime, {
    message: "Start time must be before end time",
    path: ["endTime"],
  })
  .refine(
    (value) =>
      slotMinutes(value.startTime, value.endTime) >= MINimum_SLOT_MINUTE,
    {
      message: `Slot time must be at least ${MINimum_SLOT_MINUTE} min`,
      path: ["endTime"],
    },
  );
