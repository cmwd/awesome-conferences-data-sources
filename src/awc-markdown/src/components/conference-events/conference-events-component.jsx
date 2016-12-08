import React from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';

import { ConferenceEventDetails } from 'components';
import { LayoutSection } from 'layouts';

function ConferenceEvent(props) {
  return (
    <LayoutSection name="events" header="Events">
      <Grid.Row>
        <Grid.Column width="16">
          <Button size="mini" floated="right" content="Add event" positive
            onClick={() => props.createEvent()}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="16">
          { 
            props.events.map((event, index) =>
              (
                <ConferenceEventDetails key={event.uuid} {...event}
                  updateEventDescription={props.updateEventDescription}
                  updateTalk={props.updateTalk}
                  last={index === props.events.length - 1}
                />
              ))
          }
        </Grid.Column>
      </Grid.Row>
    </LayoutSection>
  );
}

export default ConferenceEvent;
