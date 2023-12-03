import * as React from 'react';
import { Grid } from '@mui/material';

export default function Footer() {
  return (
    <React.Fragment>
      <footer>
        <Grid container spacing={2}>
          <Grid item align="center" xs={12}>
            <span>
              Test for Techbodia
              <img
                src={'./logo.png'}
                height="24px"
              />
              Powered by Chanmony KEAT
            </span>
          </Grid>
        </Grid>
      </footer>
      <style jsx>{`
  footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
}
  footer p {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: inherit;
}
  footer img {
  position: relative;
  bottom: -5px;
  margin: 0 10px;
}
  `}
      </style>
    </React.Fragment>
  );
}
