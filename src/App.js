import React, { Suspense, lazy, useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { NoteAtom } from "./recoil/NoteAtom"
import "./App.css"

const Header = lazy(() => import('./components/common/Header'))
const NoteList = lazy(() => import('./components/NoteList'))
const NoteModal = lazy(() => import('./components/NoteModal'))
const NoteDetail = lazy(() => import('./components/NoteDetail'))

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAddNote, setIsAddNote] = useState(false)
  const [, setNoteItem] = useRecoilState(NoteAtom);

  const API_URL = process.env.REACT_APP_AWS_NOTE_API;
  const USER_ID = process.env.REACT_APP_AWS_NOTE_USER_ID;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${API_URL}notes?userId=${USER_ID}`);
        if (response.ok) {
          const data = await response.json()
          setNotes(data)
          setNoteItem(data[0])      
        }
      } catch (error) {
        console.log(error)
      }
    };
    fetchNotes();
  }, []);

  const handleSubmit = () => {
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

        const response = await fetch(`${API_URL}note`, requestOptions);

        if (response.ok) {
          const newNote = await response.json();
          setNotes((prevNotes) => [...prevNotes, newNote]);
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
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <main>
          <NoteList notes={notes} />
          {/* <section className="note-detail">
            {
              isAddNote && (
                <NoteModal
                  setTitle={setTitle}
                  setContent={setContent}
                  handleSubmit={handleSubmit}
                  handleCancel={() => setIsAddNote(false)}
                />
              )
            }
            {!isAddNote && <NoteDetail handleAddNote={() => setIsAddNote(true)} />}
          </section> */}
        </main>
     </Suspense>
    </div>
  );
}

export default App;
