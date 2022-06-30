import React from 'react';
import TextField from "@mui/material/TextField";

export default function Search(props) {
    const { searchQuery, setSearchQuery } = props;

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    return (
        <TextField sx={{ mt: 3 }} label="Search" value={searchQuery} onChange={handleChange} fullWidth helperText="Search for posts by providing the title / body" />
    )
}
