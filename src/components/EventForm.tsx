import React, { FunctionComponent, useState } from 'react';
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { rules } from '../utils/rules';
import { User } from '../models/User';
import { Event } from '../models/Event';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { assertNonNull } from '../utils/type-guards';

interface EventFormProps {
    guests: User[],
    submit: (event: Event) => void
}

export const EventForm: FunctionComponent<EventFormProps> = ({ guests, submit }) => {
    const [event, setEvent] = useState<Event>({
        author: '',
        date: '',
        description: '',
        guest: '',
    } as Event);
    const { user } = useTypedSelector(state => state.auth);

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({ ...event, date: formatDate(date.toDate()) });
        }
    };

    const submitForm = () => {
        assertNonNull(user);
        submit({ ...event, author: user.username });
    };

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Event description"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setEvent({ ...event, description: e.target.value })}
                    value={event.description}
                />
            </Form.Item>
            <Form.Item
                label="Event date"
                name="date"
                rules={[rules.required(), rules.isDateAfter('Invalid event')]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label="Choose a guest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
                    {guests.map(guest =>
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>,
                    )}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};
