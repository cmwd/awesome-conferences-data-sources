export const getEvents = state => state.events;

export const getEvent = uuid => state =>
    getEvents(state).find(e => e.uuid === uuid);

export const getTalks = uuid => state =>
    getEvent(uuid)(state).talks;
