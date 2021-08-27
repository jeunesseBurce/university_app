import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Modal = (props) =>  {
    const { dialogLabel, children, handleClose, secondaryButton, primaryButton, open, handleClickPrimary } = props;

    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{dialogLabel}</DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {secondaryButton}
            </Button>
            <Button onClick={handleClickPrimary} color="primary">
              {primaryButton}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
export default Modal;