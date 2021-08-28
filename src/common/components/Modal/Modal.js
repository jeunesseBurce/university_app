import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
  
Modal.propTypes = {
  dialogLabel: PropTypes.string,
  children: PropTypes.element,
  handleClose: PropTypes.func,
  secondaryButton: PropTypes.node,
  primaryButton: PropTypes.node,
  open: PropTypes.bool,
  handleClickPrimary: PropTypes.func
}
  
export default Modal;