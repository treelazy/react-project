import React, { useState } from "react";
import { Form, DatePicker, TimePicker } from "antd";
import moment from "moment";

export default function DateTimePicker({ value, onChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // this state is an old version, not in used anymore
  const [data, setData] = useState([
    { date: null, time: null },
    { date: null, time: null },
  ]);

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
    setStartDate(newDate);
    setStartTime(moment());
  }

  function handleEndDateChange(newDate) {
    setEndDate(newDate);
    setEndTime(moment());
  }

  function handleStartTimeChange(newTime) {
    if (newTime == null) {
      newTime = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    }

    setStartTime(newTime);
  }

  function handleEndTimeChange(newTime) {
    if (newTime == null) {
      newTime = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    }

    setEndTime(newTime);
  }

  return (
    <Form.Item>
      <DatePicker
        disabledDate={disabledStartDate}
        value={startDate}
        onChange={handleStartDateChange}
      />
      <TimePicker value={startTime} onChange={handleStartTimeChange} />
      <DatePicker
        disabledDate={disabledEndDate}
        value={endDate}
        onChange={handleEndDateChange}
      />
      <TimePicker value={endTime} onChange={handleEndTimeChange} />
    </Form.Item>
  );
}
