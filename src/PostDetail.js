import React from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material'

export default function PostDetail(props) {

  const { open, handleAddOnClick, handleClose, post, setPost, handleSubmit } = props;

  const handleUpdateTitle = (e) => {
    setPost((prevState) => {
      return {
        ...prevState,
        title: e.target.value
      }
    })
  }

  const handleUpdateBody = (e) => {
    setPost((prevState) => {
      return {
        ...prevState,
        body: e.target.value
      }
    })
  }

  const handleUpdateUserId = (e) => {
    setPost((prevState) => {
      return {
        ...prevState,
        userId: e.target.value
      }
    })
  }

  return (
    <Box>
      <Box sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 3
      }}>
        <Button variant="contained" onClick={handleAddOnClick}>
          Add New Post
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>
            Post Detail
          </DialogTitle>
          <DialogContent>
            <TextField autoFocus
              margin="dense"
              id="title"
              label="Title"
              fullWidth
              variant="standard"
              required
              value={post.title}
              onChange={handleUpdateTitle}
            />
            <TextField
              margin="dense"
              id="body"
              label="Body"
              required
              fullWidth
              variant="standard"
              multiline
              rows={4}
              value={post.body}
              onChange={handleUpdateBody}
            />
            <TextField
              margin="dense"
              id="userId"
              label="User ID"
              required
              fullWidth
              variant='standard'
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              value={post.userId}
              helperText="numbers only"
              onChange={handleUpdateUserId}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  )
}
