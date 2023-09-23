import React, { useEffect, useMemo, useReducer } from 'react'

const ACTION = {
  LOGS: "logs"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOGS:
      return { ...state, logs: action.payload };
    default:
      throw new Error();
  }
};

const Logs = () => {
  const [state, dispatch] = useReducer(reducer, {
    logs: []
  });

  const API_URL = process.env.REACT_APP_AWS_API;
  const USER_NAME = process.env.REACT_APP_AWS_USER_NAME;

  const fetchNotes = useMemo(() => {
    return async () => {
      try {
        const response = await fetch(`${API_URL}useractivitylogs?UserName=${USER_NAME}`);
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: ACTION.LOGS, payload: data });
          // setNoteItem(data[0]);
          console.log(data)
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, [API_URL, USER_NAME]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <main>
      <section>
        <ul>
          {state.logs.map((log) => (
            <li>
              <span>{log.UserActivityLogId}</span>
              <span>{log.UserName}</span>
              <span>{log.Content}</span>
              <span>{log.Content}</span>
              <span>{JSON.stringify(log.DeviceInfo)}</span>
              <span>{log.IpAddress}</span>
              <span>{log.LogDate}</span>
              <span>{log.LogType}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Logs
