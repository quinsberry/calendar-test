import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Layout, Modal, Row } from 'antd';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Event } from '../models/Event';
import { assertNonNull } from '../utils/type-guards';
import { EventCalendar } from '../components/EventCalendar';
import { EventForm } from '../components/EventForm';

export const EventPage: FunctionComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { fetchGuests, createEvent, fetchEvents } = useActions();
    const { guests, events } = useTypedSelector(state => state.event);
    const { user } = useTypedSelector(state => state.auth);

    useEffect(() => {
        fetchGuests();
        assertNonNull(user);
        fetchEvents(user.username);
    }, []);

    const addNewEvent = (event: Event) => {
        setModalVisible(false);
        console.log(event)
        createEvent(event);
    };

    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify="center">
                <Button
                    onClick={() => setModalVisible(true)}
                >
                    Add event
                </Button>
            </Row>
            <Modal
                title="Добавить событие"
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    );
};
