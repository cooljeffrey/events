import React, { useEffect, useState, useRef } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useQuery, gql } from '@apollo/client';
import { Event } from '../../common/model/Event';
import EventView from './EventView';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  })
);

const LIST_ALL_EVENTS = gql`
  query {
    listEvents {
      Title
      Time
      Location {
        City
        State
        Country
      }
      AvailableSeats {
        id
      }
    }
  }
`;

export default function EventLIst() {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const [details, setDetails] = useState<Event>({} as Event);

  const { loading, data, error } = useQuery<{ listEvents: Event[] }, any>(
    LIST_ALL_EVENTS,
    { variables: {} }
  );

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: Event
  ) => {
    setDetails(data);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setDetails({} as Event);
  };

  console.log('data : ', data);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;
  if (!data) return <h1> not found</h1>;

  const list =
    data && data.listEvents
      ? data.listEvents.map((event, idx) => {
          return (
            <React.Fragment>
              <ListItem
                key={event.Title}
                alignItems="flex-start"
                onClick={(evt: any) => handleListItemClick(evt, event)}
              >
                <ListItemAvatar>
                  <Avatar alt={event.Title} src={event.Image} />
                </ListItemAvatar>
                <ListItemText
                  primary={event.Title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {event.Time}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {idx === data.listEvents.length - 1 ? null : (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          );
        })
      : null;
  return (
    <React.Fragment>
      <List className={classes.root}>{list}</List>
      <EventView open={open} details={details} onClose={() => close()} />
    </React.Fragment>
  );
}
