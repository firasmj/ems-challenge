import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'

type Timesheet = {
    id: number
    full_name: string
    employee_id: number
    start_time: string
    end_time: string
    summary: string
}

function CalendarApp({ timesheets }: { timesheets: Timesheet[] }) {
    const eventsService = useState(() => createEventsServicePlugin())[0];

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
                .getHours()
                .toString()
                .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    };

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],

        events: timesheets.map((timesheet) => ({
            id: timesheet.id.toString(),
            title: timesheet.summary,
            people: [timesheet.full_name],
            start: timesheet.start_time.replace('T', ' ').slice(0, 16),
            end: timesheet.end_time.replace('T', ' ').slice(0, 16),
            description: timesheet.summary
        })),
        plugins: [eventsService]
    })

    useEffect(() => {
        // get all events
        eventsService.getAll()
    }, [])

    return (
        <div
            className='container p-5'
        >
            {calendar && <ScheduleXCalendar calendarApp={calendar} />}
        </div>
    )
}

export default CalendarApp;