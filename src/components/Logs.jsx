import React, { useEffect, useMemo, useReducer } from 'react'
import { FormatDate } from '../utils/Format'

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

  const fetchLogs = useMemo(() => {
    return async () => {
      try {
        const response = await fetch(`${API_URL}useractivitylogs?UserName=${USER_NAME}`);
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: ACTION.LOGS, payload: data });
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, [API_URL, USER_NAME]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <main>
      <section>
        <ul>
          {state.logs.map((log) => (
            <li key={log.UserActivityLogId}>
              <article style={{ marginTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row"}}>
                    <div style={{ 
                      display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #333", width: "35px", height: "35px", borderRadius: "25px",
                      backgroundColor: "#E5E5E5", color: "#333", fontSize: "13px", marginRight: "7px"
                    }}>
                      옹옹
                    </div>
                    <div style={{ width: "calc(100% - 35px)" }}>
                      <div style={{ marginBottom: "3px" }}>
                        <span style={{ color: "#000", paddingRight: "7px" }}>{log.UserName}</span>
                        <span style={{ color: "#777" }}>{"관리자"} {log.DeviceInfo.DeviceType}</span>
                      </div>
                      <div style={{ marginBottom: "7px" }}>
                        <span  style={{ color: "#37B36E" }}>{"529k views "}</span>{FormatDate(log.LogDate)}
                      </div> 
                      <div style={{ marginBottom: "3px" }}>
                        {`${log.DeviceInfo.DeviceBrand} ${log.DeviceInfo.DeviceModel} `}
                      </div>
                      <div style={{ marginBottom: "3px" }}>
                        {log.Content}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              {/* <span>{log.IpAddress}</span>
              <span>{log.LogType}</span> */}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Logs
