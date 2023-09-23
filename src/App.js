import React, { Suspense, useEffect, useMemo, useReducer, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { NoteAtom } from "./recoil/NoteAtom";
import "./App.scss";

const Layout = React.lazy(() => import("./components/common/Layout"));
const Home = lazy(() => import("./components/Home"));
const Logs = lazy(() => import("./components/Logs"));
const Missing = lazy(() => import("./components/Missing"));

const ACTION = {
  NOTES: "note",
  TITLE: "title",
  CONTENT: "content",
  IS_ADD_NOTE: "is_add_note",
  SEARCH: "search",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.NOTES:
      return { ...state, notes: action.payload };
    case ACTION.TITLE:
      return { ...state, title: state.title };
    case ACTION.CONTENT:
      return { ...state, content: state.content };
    case ACTION.IS_ADD_NOTE:
      return { ...state, isAddNote: state.isAddNote };
    case ACTION.SEARCH:
      return { ...state, search: action.payload };
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    notes: [],
    title: "",
    content: "",
    isAddNote: false,
    search: "",
  });
  const [, setNoteItem] = useRecoilState(NoteAtom);

  const API_URL = process.env.REACT_APP_AWS_API;
  const USER_ID = process.env.REACT_APP_AWS_USER_ID;

  const fetchNotes = useMemo(() => {
    return async () => {
      try {
        const response = await fetch(`${API_URL}notes?userId=${USER_ID}`);
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: ACTION.NOTES, payload: data });
          setNoteItem(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, [API_URL, USER_ID, setNoteItem]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSubmit = () => {
    const createNote = async () => {
      try {
        const requestBody = {
          userId: USER_ID,
          title: state.title,
          content: state.content,
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
          dispatch({
            type: ACTION.NOTES,
            payload: (prevNotes) => [...prevNotes, newNote],
          });
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
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home notes={state.notes} />} />
            <Route path="logs" element={<Logs />} />
            <Route path="*" element={<Missing />} />
          </Route>
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
