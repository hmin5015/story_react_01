import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRecoilValue } from 'recoil'
import { NoteAtom } from '../recoil/NoteAtom'
import FloatingActionButtons from "./common/FloatingButton";
import DateRangeIcon from '@mui/icons-material/DateRange';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Face5Icon from '@mui/icons-material/Face5';
import { formatDistance } from 'date-fns'
import { es, ru, enUS } from 'date-fns/locale'
import './NoteDetail.css'

const NoteDetail = ({ handleAddNote }) => {
  let noteItem = useRecoilValue(NoteAtom)

  const FormatDate = (dateString) => {
    if (dateString!== undefined) {
      const date = new Date(dateString);
      return formatDistance(new Date(), date, { addSuffix: true, locale: enUS })
    }
    return "미정"
  }

  return (
    <>
      {noteItem === undefined 
        ? <div>노트를 선택해 주세요.</div> 
        :
          <>
            <Typography variant={"h5"} display={"block"} marginBottom={0} gutterBottom>
              {noteItem.title === "" ? "제목없음" : noteItem.title}
            </Typography>
            <Typography variant={"overline"} display={"block"} textTransform={"none"} color={"#555"} gutterBottom>
              <span>모바일게임 · 150 Likes · 5,000 Views</span>
            </Typography>
            <Typography variant={"overline"} display={"block"} gutterBottom>
              <div className="item-icons-wrapper">
                <DateRangeIcon fontSize="medium" htmlColor="#555" />
                <span style={{ paddingLeft: "5px" }}>{FormatDate(noteItem?.createdAt)}</span>
              </div>
            </Typography>
            <Typography variant={"overline"} display={"block"} gutterBottom>
              <div className="item-icons-wrapper">
                <EditCalendarIcon fontSize="medium" htmlColor="#555" />
                <span style={{ paddingLeft: "5px" }}>{FormatDate(noteItem?.updatedAt)}</span>
              </div>
            </Typography>
            <Typography variant={"overline"} display={"block"} gutterBottom>
              <div className="item-icons-wrapper">
                <Face5Icon fontSize="medium" htmlColor="#555" />
                <span style={{ paddingLeft: "5px" }}>{noteItem?.userId}</span>
              </div>
            </Typography>
            <section style={{ display: "flex", margin: "15px 0px" }}>
              <Button 
                style={{
                  borderRadius: 25,
                  textTransform: "none",
                  border: "1px solid #0a66c2",
                }}
                variant="contained" 
                type="button"
              >
                {"저장하기"}
              </Button>
              <Button 
                style={{
                  borderRadius: 25,
                  textTransform: "none",
                  backgroundColor: "#FFF",
                  color: "#0a66c2",
                  border: "1px solid #0a66c2",
                  marginLeft: "7px"
                }}
                variant="contained" 
                type="button"
              >
                {"취소하기"}
              </Button>
            </section>
            <div>
              <Typography variant={"subtitle1"} display={"block"} gutterBottom>
                {"Note"}
              </Typography>
              <Typography variant={"overline"} display={"block"} gutterBottom>
                <div className="note">
                  {noteItem?.content}
                </div>
              </Typography>
            </div>
          </>
      }
      <FloatingActionButtons 
        style={{
          position: "absolute",
          top: "25px",
          right: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
        handleAddNote={handleAddNote}
      />
    </>
  )
}

export default NoteDetail
