import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom'
import './Header.scss';

const menus = [
  { menuId: 1, menuName: "LOGS", url: '/logs' },
  { menuId: 2, menuName: "MY INFO", url: '/my-info' }
]

const Header = () => {
  return (
    <header>
      <section className="header-top-section">
        <div className="header-aside">
          <div className="header-logo">
            <Link to={"/"}>
              <Typography variant="overline" fontSize={"20px"} fontWeight={900} color={"#000"} lineHeight={2} letterSpacing={"-.01rem"} textTransform={"none"}>
                {"SPACE"}
              </Typography>
              <Typography variant="overline" fontSize={"20px"} fontWeight={500} color={"#333"} lineHeight={2} letterSpacing={"-.01rem"} textTransform={"none"} paddingLeft={"3px"}>
                {"Note"}
              </Typography>
            </Link>
          </div>
        </div>
        <div className="header-info">
          <ul>
            {menus.map(menu => (
              <li key={menu.menuId}>
                <Link to={menu.url}>
                  <Typography variant="overline" paddingLeft={2}>{menu.menuName}</Typography>
                </Link>
              </li>
            ))}
          </ul>
          <div className="header-user-info">
            <Typography variant="overline" fontSize={"15px"} fontWeight={700} lineHeight={2} textTransform={"none"} letterSpacing={-0.5}>
              {"Jm"}
            </Typography>
          </div>
        </div>
      </section>
    </header>
  )
}

export default Header
