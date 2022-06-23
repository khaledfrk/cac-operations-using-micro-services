import React from "react";
import Kalend, { CalendarView } from "kalend";
import "kalend/dist/styles/index.css";
import "./styles.css";

const CustomCalendar = ({
  setDate,
  setNewAppointmentVisible,
  events,
  setDeleteAppointmentVisible,
  setAppointmentIdDelete,
}) => {
  function onNewEventClick(data) {
    setNewAppointmentVisible(true);
    const date = new Date(data.startAt);
    setDate(date);
  }

  function onEventClick(data) {
    setDeleteAppointmentVisible(true);
    setAppointmentIdDelete(data.id);
  }

  return (
    <Kalend 
      style={{
        primaryColor: "#F678A7",
        baseColor: "#F678A7",
        inverseBaseColor: "#f2ecec",
      }}
      onEventClick={onEventClick}
      onNewEventClick={onNewEventClick}
      events={events}
      initialDate={"2019-11-21T18:00:00.000Z"}
      hourHeight={60}
      initialView={CalendarView.WEEK}
      disabledViews={[CalendarView.AGENDA, CalendarView.THREE_DAYS]}
      timeFormat={"24"}
      weekDayStart={"Monday"}
      calendarIDsHidden={["work"]}
      language={"en"}
      
    />
  );
};

export default CustomCalendar;
