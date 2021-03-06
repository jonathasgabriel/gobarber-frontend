import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import en from 'date-fns/locale/en-US';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);

  const [date, setDate] = useState(new Date());

  const formattedDate = useMemo(() => format(date, 'MMMM d', { locale: en }), [
    date,
  ]);

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map(hour => {
        const dateOnlyDay = setMilliseconds(
          setSeconds(setMinutes(setHours(date, hour), 0), 0),
          0
        );
        const compareDate = utcToZonedTime(dateOnlyDay, timezone);
        console.tron.log(dateOnlyDay);
        console.tron.log(compareDate);
        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(appointment => {
            console.tron.log({ appointment: appointment.date, compareDate });
            return isEqual(parseISO(appointment.date), compareDate);
          }),
        };
      });

      setSchedule(data);
    }
    loadSchedule();
  }, [date]);

  function handlePreviousDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePreviousDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{formattedDate}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        {schedule.map(time => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time} </strong>
            <span>
              {time.appointment
                ? time.appointment.user.name
                : 'Open for booking'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
