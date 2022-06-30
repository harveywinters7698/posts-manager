import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function PostsList(props) {
    const { posts = [], handleEditOnClick, handleDeletePost } = props;

    return (
        <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Post ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Body</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.title}</TableCell>
                            <TableCell align="right">{row.body}</TableCell>
                            <TableCell align="right">{row.userId}</TableCell>
                            <TableCell align="right" sx={{
                                minWidth: "120px"
                            }}>
                                <IconButton onClick={() => {
                                    handleEditOnClick(row)
                                }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => {
                                    handleDeletePost(row.id)
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
