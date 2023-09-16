import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import './App.css';
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const API_URL = process.env.REACT_APP_AWS_NOTE_API;
  const USER_ID = process.env.REACT_APP_AWS_NOTE_USER_ID;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${API_URL}notes?userId=${USER_ID}`);
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  const handleEdit = () => {
    const createNote = async () => {
      try {
        const requestBody = {
          userId: USER_ID,
          title: title,
          content: content,
        };
        console.log(requestBody);
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "*",
          },
          body: JSON.stringify(requestBody),
        };

        const response = await fetch(`${API_URL + "note"}`, requestOptions);

        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    createNote();
  };

  return (
    <div className="App">
      <Header />
      <main>
        <section className="note-list">
          <ul>
            {notes.map(note => (
              <li key={note.noteId}>
                <article className="p-15px">
                  <Typography variant="subtitle1" display="block" lineHeight={1.5} gutterBottom className="fc-blue">
                    {note.title === "" ? "제목없음" : note.title}
                  </Typography>
                  <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
                    {note.userId}
                  </Typography>
                  <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
                    {note.noteId}
                  </Typography>
                  <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
                    3 days ago
                  </Typography>
                  <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
                    {note.content.length ? note.content.substring(0, 15) + "..." : "컨텐츠 없음"}
                  </Typography>
                </article>
              </li>
            ))}
          </ul>
        </section>
        <section className="note-detail">
          <form className="noteForm" onSubmit={(e) => e.preventDefault()}>
            <TextField
              required
              fullWidth
              error={false}
              id="standard-required"
              label="Required"
              defaultValue="Hello World"
              variant="standard"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="outlined-multiline-static"
              label="Content"
              multiline
              fullWidth
              rows={4}
              defaultValue="Note"
              onChange={(e) => setContent(e.target.value)}
            />
            <Button variant = "contained" type="button" onClick={() => handleEdit()}>
              추가하기
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
