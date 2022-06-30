import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import GroupIcon from "@mui/icons-material/Group";

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <GroupIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, alignItems: "center" }}>
                        Posts Manager
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
