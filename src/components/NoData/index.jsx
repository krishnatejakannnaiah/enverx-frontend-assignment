import React from 'react';
import { Typography, Box } from '@mui/material';

const NoData = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h6">No expenses found.</Typography>
      <Typography variant="body2">Add some expenses to see them here!</Typography>
    </Box>
  );
};

export default NoData;
