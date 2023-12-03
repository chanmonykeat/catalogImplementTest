import * as React from 'react';
import styles from '../../styles/Home.module.css';
import {
  Slide,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Grid,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailModal(props) {
  const {
    open,
    index,
    openIndex,
    handleClose,
    detail
  } = props;
  return (
    <React.Fragment>
      <Dialog
        open={open && index === openIndex}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby={`modal-${detail.cca3}`}
      >
        <DialogTitle className={styles.modalTitle}>{'Detail'}</DialogTitle>
        <DialogContent>
          <Grid container style={{ borderBottom: '2px solid gray' }}>
            <Grid item>
              <img
                src={detail.flags.png}
                className={styles.modalImage}
              />
            </Grid>
            <Grid item style={{borderLeft: '2px solid gray'}} xs={5}>
              <Grid container style={{paddingLeft: '10px'}}>
                <Grid item xs={12}>
                  {`Trivia: `}
                </Grid>
                <Grid item xs={12}>
                  {`UN Member: ${detail.unMember ? 'YES' : 'NO'}`}
                </Grid>
                <Grid item xs={12}>
                  {`Independent: ${detail.independent ? 'YES' : 'NO'}`}
                </Grid>
                <Grid item xs={12}>
                  {`Landlocked: ${detail.landlocked ? 'YES' : 'NO'}`}
                </Grid>
                <Grid item xs={12}>
                  {`Population: ${detail.population}`}
                </Grid>
                <Grid item xs={12}>
                  {`Latitude: ${detail.latlng[0]}`}
                </Grid>
                <Grid item xs={12}>
                  {`Longitude: ${detail.latlng[1]}`}
                </Grid>
                <Grid item xs={12}>
                  {`Timezone: ${detail.timezones[0]}`}
                </Grid>
                <Grid item xs={12}>
                  {`Status: ${detail.status}`}
                </Grid>
              </Grid>
            </Grid>
            <DialogContentText style={{ borderTop: '2px solid gray', width: '600px' }}>
              <Grid item xs={12}>
                {`Country: ${detail.name.common}`}
              </Grid>
              <Grid item xs={12}>
                {`Official Name: ${detail.officialName}`}
              </Grid>
              <Grid item xs={12}>
                {`Continent: ${detail.continents[0]}`}
              </Grid>
              <Grid item xs={12}>
                {`Region: ${detail.region}`}
              </Grid>
              <Grid item xs={12}>
                {`Sub Region: ${detail.subregion}`}
              </Grid>
              <Grid item xs={12}>
                {`Capital: ${detail.capital}`}
              </Grid>
              <Grid item xs={12}>
                <span>
                  Map :
                  <a href={detail.maps.googleMaps} target="_blank">
                    {` ${detail.maps.googleMaps}`}
                  </a>
                </span>
              </Grid>
            </DialogContentText>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
