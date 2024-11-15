import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

function ServerDay(props) {
  const { day, outsideCurrentMonth, highlightedDays, ...other } = props;
  const isSelected = !outsideCurrentMonth && highlightedDays.includes(day.date());

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '😊' : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
    
        sx={{backgroundColor:isSelected?"rgb(100,163,13)":""}}
      />
    </Badge>
  );
}

export default function Calendar({ orderDate = [] }) {
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [currMonth, setCurrMonth] = React.useState(new Date().getMonth() + 1);
  const [currYear, setCurrYear] = React.useState(new Date().getFullYear());
  const requestAbortController = React.useRef(null);
 
  const highlightDays = () => {
    const days = orderDate
      .filter((date) => {
        const month = parseInt(date.substring(5, 7), 10);
        const year = date.substring(0, 4);
        return year == currYear && month == currMonth;
      })
      .map((date) => parseInt(date.substring(8, 10), 10)); 

    setHighlightedDays(days);
  };

  const handleMonthChange = async (date) => {
    if (requestAbortController.current) {
        requestAbortController.current.abort();
    }
    setCurrMonth(date.$M + 1);
    setCurrYear(date.$y);

    setHighlightedDays([]);
    highlightDays();
  };

  React.useEffect(() => {
    highlightDays();
  }, [orderDate, currMonth, currYear]); 

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
    
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        onMonthChange={handleMonthChange}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}
