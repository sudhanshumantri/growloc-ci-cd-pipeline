import React from 'react';
import { Backdrop, CircularProgress, Typography } from "@mui/material/";
export default function Loader({ title, }) {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
            {title && (
                <Typography className="header-title" position='absolute'>{title}</Typography>
            )}
        </Backdrop>
    );
}