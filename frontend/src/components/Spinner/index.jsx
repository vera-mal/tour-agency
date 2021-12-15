import React from 'react';
import {Backdrop, CircularProgress} from "@mui/material";

const Spinner = ({isVisible = false}) => {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isVisible}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

export default Spinner;
