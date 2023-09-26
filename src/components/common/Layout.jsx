import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { UserInfoAtom } from '../../recoil/UserInfoAtom'
import Header from './Header'
import Nav from './Nav'
import Typography from "@mui/material/Typography"
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import './Layout.scss'

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
        <section className="user-info-section">
          <article className="user-info-top">
            <button className="back-button" onClick={() => setIsUserInfoOpen(false)}>
              <ArrowBackIosNewOutlinedIcon fontSize="small" htmlColor="#777" />
            </button>
            <Typography variant="overline" fontSize={"18px"} fontWeight={900} textTransform={"none"} lineHeight={1.5}>
              Account
            </Typography>
          </article>
          <article className="user-info-content">
            <div className="action-button-wrapper">
              <button className="join-now-button">Join now</button>
              <button className="sign-in-button">Sign in</button>
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
