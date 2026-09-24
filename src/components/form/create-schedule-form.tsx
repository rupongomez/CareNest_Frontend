import React from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

export default function CreateScheduleForm() {
  const form = useForm({
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
      meetingLink: "",
    },

    onSubmit: ({ value }) => {
      //   console.log(value);
      const scheduleValue = {
        startDateTime: `${value.date}T${value.startTime}:00.000Z`,
        endDateTime: `${value.date}T${value.endTime}:00.000Z`,
        meetingLink: value.meetingLink,
      };

      console.log(scheduleValue);
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
            console.log(selected);
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

        <Button type="submit">Submit </Button>
      </FieldGroup>
    </form>
  );
}
