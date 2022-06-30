import { useEffect, useState, useMemo } from "react";
import { CssBaseline, Container, Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";

import Navbar from "./Navbar";
import PostsList from "./PostsList";
import PostDetail from "./PostDetail";
import Search from "./Search";

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});
  const [mode, setMode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextId, setNextId] = useState(101);

  const { enqueueSnackbar } = useSnackbar();

  const handleEditOnClick = (post) => {
    setPost(post);
    setMode("edit");
    setOpen(true);
  }

  const handleAddOnClick = () => {
    setMode('create');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const fetchPosts = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        setPosts(res.data);
      }).catch((err) => {
        alert(err);
      })
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPost = {
      ...post,
      userId: parseInt(post.userId)
    }

    if (mode === "create") {
      setLoading(true);
      axios.post("https://jsonplaceholder.typicode.com/posts", formattedPost)
        .then((res) => {
          const newPost = {
            ...res.data,
            id: nextId
          }
          const newPosts = [newPost, ...posts];
          setPosts(newPosts);
          setOpen(false);
          setPost({});
          enqueueSnackbar("Post created");
          setLoading(false);
          setNextId((prevState) => prevState + 1);
        }).catch((err) => {
          alert(err);
          setLoading(false);
        })
      return;
    }
    if (mode === "edit") {
      setLoading(true);
      axios.patch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        // When we integrate with an actual API, we usually don't have to pass in the id of the record, we are passing in here because we are using jsonplaceholder
        id: formattedPost.id,
        title: formattedPost.title,
        body: formattedPost.body,
        userId: formattedPost.userId
      }).then((res) => {
        const newPosts = posts.map((p) => {
          if (p.id === post.id) {
            return res.data;
          }
          return p;
        });
        setPosts(newPosts);
        setOpen(false);
        setPost({});
        enqueueSnackbar("Post updated");
        setLoading(false);
      }).catch((err) => {
        alert(err);
        setLoading(false);
      })
    }

  }

  const handleDeletePost = (id) => {
    setLoading(true);
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        const newPosts = posts.filter((p) => {
          if (p.id === id) {
            return false;
          }
          return true;
        })
        setPosts(newPosts);
        enqueueSnackbar("Post deleted");
        setLoading(false);
      }).catch((err) => {
        alert(err);
        setLoading(false);
      })
  }

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (!searchQuery) {
        return true;
      }
      return p.title.includes(searchQuery) || p.body.includes(searchQuery)
    })
  }, [posts, searchQuery])

  return (
    <div>
      <CssBaseline />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar />
      <Container>
        <PostDetail handleSubmit={handleSubmit} post={post} setPost={setPost} open={open} handleAddOnClick={handleAddOnClick} handleClose={handleClose} />
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <PostsList handleDeletePost={handleDeletePost} posts={filteredPosts} handleEditOnClick={handleEditOnClick} />
      </Container>

    </div>
  );
}

export default App;
