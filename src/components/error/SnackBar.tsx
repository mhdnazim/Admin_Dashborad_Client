import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props {
    open : boolean,
    setOpen : any,
    errorMessage : string
}

export default function CustomizedSnackBars({ open, setOpen, errorMessage}: Props) {

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickAway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Please Fill Every Required Field 
        </Alert>
      </Snackbar>
    </div>
  );
}