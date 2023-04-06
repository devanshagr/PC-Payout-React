import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function NoDataAlert({ noDataAlertData, onNoDataAlertClick }) {

    const { initialLoad, showAlert } = noDataAlertData
    const open = !initialLoad && showAlert

  return (
    <Box sx={{ width: '100%' }}>
        <Collapse in={open}>
            <Alert
                severity="warning"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        onNoDataAlertClick();
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                No Data for the selected year!
            </Alert>
        </Collapse>
    </Box>
  )
}
