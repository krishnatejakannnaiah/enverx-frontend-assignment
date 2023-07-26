import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddExpenceModal = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: 600,
          width: '90%',
          borderRadius: 8,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6">{title}</Typography>
          <IconButton color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
};

export default AddExpenceModal;
