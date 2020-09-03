import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Event } from '../../common/model/Event';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const containerStyle = {
  width: '100%',
  height: '100%',
};

export default function EventView(props: {
  open: boolean;
  details?: Event;
  onClose?: (closed: boolean) => any;
}) {
  const classes = useStyles();
  const { open, details, onClose } = props;

  const handleClose = () => {
    if (onClose) {
      onClose(true);
    }
  };

  const [map, setMap] = React.useState(null);

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode(
      {
        address:
          details && details.Location && details.Location.City
            ? details.Location.City
            : '',
      },
      (results, status) => {
        if (status === 'OK') {
          center.lat = results[0].geometry.location.lat();
          center.lng = results[0].geometry.location.lng();
        }
      }
    );
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {details ? details.Title : ''}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Back
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button key="details.time">
            <ListItemText
              primary="Time"
              secondary={details ? details.Time : ''}
            />
          </ListItem>
          <Divider />
          <ListItem button key="details.location">
            <ListItemText
              primary="Location"
              secondary={
                details && details.Location
                  ? `${details.Location.City}, ${details.Location.State}, ${details.Location.Country}`
                  : ''
              }
            />
          </ListItem>
          <ListItem button key="details.seats">
            <ListItemText
              primary="Available Seats"
              secondary={
                details && details.AvailableSeats
                  ? `${details.AvailableSeats.map((seat) => seat.id).join(
                      ', '
                    )}`
                  : ''
              }
            />
          </ListItem>
        </List>
        <LoadScript googleMapsApiKey="AIzaSyD-mjmbgO23VvLOBcip_YoaV3x68MYfjc8">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          ></GoogleMap>
        </LoadScript>
      </Dialog>
    </div>
  );
}
