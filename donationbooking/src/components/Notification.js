import React from 'react'
import { makeStyles } from '@mui/styles';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { spacing } from "@mui/system";
const useStyles = makeStyles(theme => ({
    root: {
        top: spacing(9)
    }
}))

export default function Notification(props) {

    const { notify, setNotify, message } = props;
    const classes = useStyles()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert
                severity= {notify.type || "info"}
                onClose={handleClose}>
                {notify.message}
                {/* {notify.show()} */}
            </Alert>
        </Snackbar>
    )
}
