import React, { lazy, useEffect, useMemo, useReducer } from "react"
import { useRecoilState } from "recoil"
import { NoteAtom } from "../recoil/NoteAtom"
import axios from 'axios';

const NoteList = lazy(() => import('./NoteList'))

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
}

const Home = () => {
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

  // const createUserActivityLog = useMemo(() => {
  //   return async () => {
  //     try {
  //       const requestBody = {
  //         logDate: "2023-09-23T23:55:24.959Z",
  //         deviceInfo: {
  //             deviceBrand: "Apple",
  //             deviceModel: "iPhone X",
  //             deviceType: "Mobile"
  //         },
  //         country: "United States",
  //         logType: 2000,
  //         content: "태스트트",
  //         ipAddress: "104.109.0.3",
  //         userName: "현우우"
  //       }
        
  //       // const requestOptions = {
  //       //   method: "POST",
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //     Origin: ['http://localhost:3000', 'https://story-react-01.vercel.app/'],
  //       //   },
  //       //   body: JSON.stringify(requestBody),
  //       // }

  //       // const response = await fetch(`${API_URL}useractivitylogs`, requestOptions)
  //       //   .then((res) => res.json())
  //       //   .then((data) => {
  //       //     console.log({ responseMessage: data.message })
  //       //   })
  //       //   .catch((error) => {
  //       //     console.error('Error', error)
  //       //   })

  //       // const requestBody = {
  //       //   userId: "ed18a094-0589-47bf-be16-6b2754421aed",
  //       //   noteId: "3",
  //       //   title: "TEST",
  //       //   content: "TEST"
  //       // }

  //       const response = await axios.post(`${API_URL}useractivitylogs`, requestBody);

  //       if (response.ok) {
  //         await response.json();
  //       } else {
  //         console.error('Failed to create user activity log');
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }, [API_URL])

  useEffect(() => {
    fetchNotes()
    // createUserActivityLog()
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
    <main>
      <NoteList notes={state.notes} />
      {/* <section className="note-detail">
        {
          state.isAddNote && (
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
  )
}

export default Home