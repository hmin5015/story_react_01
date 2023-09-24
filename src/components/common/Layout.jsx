import { Outlet } from 'react-router-dom'
import Header from './Header'
import Nav from './Nav'
import Typography from "@mui/material/Typography"
import { useRecoilState } from 'recoil'
import { UserInfoAtom } from '../../recoil/UserInfoAtom'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'

const Layout = () => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useRecoilState(UserInfoAtom)

  return (
    <>
      {!isUserInfoOpen && 
      <>
        <Header />
        <Nav />
        <Outlet />
        </>
      }
      {isUserInfoOpen && 
        <section>
          <article style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #E5E5E5", padding: "10px" }}>
            <button style={{ border: "none", backgroundColor: "#FFF", textAlign: "left", padding: "10px 0px" }} onClick={() => setIsUserInfoOpen(false)}>
              <ArrowBackIosNewOutlinedIcon fontSize="small" htmlColor="#777" />
            </button>
            <Typography variant="overline" fontSize={"18px"} fontWeight={900} textTransform={"none"} lineHeight={1.5}>
              Account
            </Typography>
          </article>
          <article style={{ display: "flex", flexDirection: "column", backgroundColor: "#F2F2F2", padding: "10px" }}>
            <div>
              <button style={{ backgroundColor: "#00754A", border: "1px solid #00754A", borderRadius: "25px", padding: "10px", color: "#FFF" }}>Join now</button>
              <button style={{ backgroundColor: "#FFF", border: "1px solid #FFF", borderRadius: "25px", padding: "10px", color: "#00754A" }}>Sign in</button>
            </div>
            <div>
              <div>Notification preference</div>
              <div>
                <div>Inbox messages</div>
                <div></div>
              </div> 
            </div>
            <div>
              <p>v1.05</p>
            </div>
          </article>
        </section>
      }
    </>
  )
}

export default Layout
