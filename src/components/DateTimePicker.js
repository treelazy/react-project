import React from "react";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

const inline = { display: "inline-block" };
const pushRight = { marginRight: "0.25rem" };

export default function DateTimePicker({ value, onChange, onBlur }) {
  const { startDate, endDate, startTime, endTime } = value;

  // user can't select start dates which are later than the end date
  function disabledStartDate(current) {
    if (endDate == null) {
      return false;
    } else {
      return current > endDate;
    }
  }

  // user can't select end dates which are earlier than the start date
  function disabledEndDate(current) {
    if (startDate == null) {
      return false;
    } else {
      return current < startDate;
    }
  }

  function handleStartDateChange(newDate) {
    //when datePicker is selected, set timePicker to current time
    onChange({ ...value, startDate: newDate, startTime: moment() });
  }

  function handleEndDateChange(newDate) {
    //when datePicker is selected, set timePicker to current time
    onChange({ ...value, endDate: newDate, endTime: moment() });
  }

  function handleStartTimeChange(newTime) {
    // when timePicker is cleared, set time value to 00:00:00
    if (newTime == null) {
      newTime = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    }
    onChange({ ...value, startTime: newTime });
  }

  function handleEndTimeChange(newTime) {
    // when timePicker is cleared, set time value to 00:00:00
    if (newTime == null) {
      newTime = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    }

    onChange({ ...value, endTime: newTime });
  }

  function handleOnBlur(isOpen) {
    // when a picker's popup is closed, trigger the onBlur
    if (!isOpen) {
      onBlur();
    }
  }

  return (
    <>
      <DatePicker
        style={{ ...inline, ...pushRight }}
        disabledDate={disabledStartDate}
        value={startDate}
        onChange={handleStartDateChange}
        onOpenChange={handleOnBlur}
      />
      <TimePicker
        style={{ ...inline }}
        value={startTime}
        onChange={handleStartTimeChange}
        onOpenChange={handleOnBlur}
      />
      {` ~ `}
      <DatePicker
        style={{ ...inline, ...pushRight }}
        disabledDate={disabledEndDate}
        value={endDate}
        onChange={handleEndDateChange}
        onOpenChange={handleOnBlur}
      />
      <TimePicker
        style={{ ...inline }}
        value={endTime}
        onChange={handleEndTimeChange}
        onOpenChange={handleOnBlur}
      />
    </>
  );
}
