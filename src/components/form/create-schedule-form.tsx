import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { scheduleValidationSchema } from "@/validation/schedule.validation";
import { useCreateSchedule } from "@/hooks/schedule.hook";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

export default function CreateScheduleForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { mutate: createSchedule, isPending } = useCreateSchedule();
  const form = useForm({
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
      meetingLink: "https://meet.google.com/wit-nkcw-sqz",
    },
    validators: {
      onSubmit: scheduleValidationSchema,
    },

    onSubmit: ({ value }) => {
      const scheduleValue = {
        startDateTime: new Date(
          `${value.date}T${value.startTime}`,
        ).toISOString(),
        endDateTime: new Date(`${value.date}T${value.endTime}`).toISOString(),
        meetingLink: value.meetingLink,
      };

      createSchedule(scheduleValue, {
        onSuccess: (res) => {
          if (res.success) {
            toast.add({
              title: " Schedule Created",
              description: "Your schedule has been created successfully.",
              type: "success",
            });
          }
          setOpen(false);
        },
        onError: (err) => {
          toast.add({
            title: "Schedule Creation Failed",
            description:
              err.message || "Please check your input and try again.",
            type: "error",
          });
          setOpen(false);
        },
      });
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e);
      }}
    >
      <FieldGroup>
        <form.Field name="date">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const selected = field.state.value
              ? new Date(`${field.state.value}T00:00:00`)
              : undefined;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                <Popover>
                  <PopoverTrigger render={<Button variant="outline" />}>
                    Select Date
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={selected}
                      onSelect={(date) => {
                        if (date) {
                          field.handleChange(format(date, "yyyy-MM-dd"));
                          field.handleBlur();
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <div className="grid grid-cols-2 gap-3">
          <form.Field name="startTime">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Start Time</FieldLabel>
                  <Input
                    type="time"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    // className="appearance-none bg-background [&::-webkit-calendar-picker-indicator] [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="endTime">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>End Time</FieldLabel>
                  <Input
                    type="time"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    // className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>
        <form.Field name="meetingLink">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Meeting Link</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  autoComplete="false"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit">
          {isPending ? (
            <>
              <Spinner className="animate-spin" />
              Submit...
            </>
          ) : (
            "Submit"
          )}{" "}
        </Button>
      </FieldGroup>
    </form>
  );
}
