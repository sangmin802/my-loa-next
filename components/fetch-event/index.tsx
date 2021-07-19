import React from "react";
import { useEvent } from "hooks/use-event";
import { Event } from "components/";
import * as Styled from "styles/home.style";

const FetchEvent = ({ initialData }) => {
  const eventData = useEvent(initialData);

  return (
    <Styled.Content type="event">
      {eventData.events.map((event, index) => (
        <Styled.Event key={`event${index}`}>
          <Event event={event} />
        </Styled.Event>
      ))}
    </Styled.Content>
  );
};

export default FetchEvent;
