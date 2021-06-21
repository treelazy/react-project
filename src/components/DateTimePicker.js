import React from "react";
import { Form, DatePicker, TimePicker } from "antd";
import moment from "moment";

const inline = { display: "inline-block" };
const pushRight = { marginRight: "0.25rem" };

export default function DateTimePicker({ value, onChange }) {
  const { startDate, endDate, startTime, endTime } = value;

  function disabledStartDate(current) {
    if (endDate == null) {
      return false;
    } else {
      return current > endDate;
    }
  }

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

  return (
    <Form.Item>
      <DatePicker
        style={{ ...inline, ...pushRight }}
        disabledDate={disabledStartDate}
        value={startDate}
        onChange={handleStartDateChange}
      />
      <TimePicker
        style={{ ...inline }}
        value={startTime}
        onChange={handleStartTimeChange}
      />
      {` ~ `}
      <DatePicker
        style={{ ...inline, ...pushRight }}
        disabledDate={disabledEndDate}
        value={endDate}
        onChange={handleEndDateChange}
      />
      <TimePicker
        style={{ ...inline }}
        value={endTime}
        onChange={handleEndTimeChange}
      />
    </Form.Item>
  );
}
