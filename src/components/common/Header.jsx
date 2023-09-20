import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import './Header.scss';

const menus = [
  { menuId: 1, menuName: "LOGS" },
  { menuId: 2, menuName: "MY INFO"}
]

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 100.0),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 100.0),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0.5),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "14px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 0, 0, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
    paddingRight: `calc(1em + ${theme.spacing(2.5)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  return (
    <header>
      <section className="header-top-section">
        <div className="header-aside">
          <div className="header-logo">
            <Typography variant="overline" fontSize={"10px"} fontWeight={500} lineHeight={2} textTransform={"none"}>
              {"Sp"}
            </Typography>
          </div>
        </div>
        <div className="header-info">
          <ul>
            {menus.map(menu => (
              <li key={menu.menuId}>
                <Typography variant="overline" paddingLeft={2}>{menu.menuName}</Typography>
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
      <section className="header-search-section">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </section>
      <section className="header-filter-section">
        <ul>
          <li>전체</li>
          <li>아이방</li>
          <li>서재</li>
          <li>주방</li>
        </ul>
      </section>
    </header>
  )
}

export default Header
