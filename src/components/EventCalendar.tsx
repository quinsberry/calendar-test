import React, { FunctionComponent } from 'react';
import { Calendar } from 'antd';
import { Event } from '../models/Event';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';

interface EventCalendarProps {
    events: Event[];
}

export const EventCalendar: FunctionComponent<EventCalendarProps> = ({ events }) => {

    function dateCellRender(value: Moment) {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = events.filter(ev => ev.date === formatedDate);
        return (
            <div>
                {currentDayEvents.map((ev, index) =>
                    <div key={index}>{ev.description}</div>,
                )}
            </div>
        );
    }

    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};