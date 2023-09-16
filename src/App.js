import React, { useState, useEffect } from "react";

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

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Origin": "*"
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
      <header className="App-header">
        <h1>NOTES 데이터 생성/조회</h1>
      </header>
      <div>
        {JSON.stringify(notes)}
        <form className="noteForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="button" onClick={() => handleEdit()}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
