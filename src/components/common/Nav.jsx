import { useState, useEffect } from 'react'
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import { styled, alpha } from "@mui/material/styles"
import { useTranslation } from 'react-i18next'
import './Nav.scss'

const hashTags = [
  { id: 1, hashTag: '#전체' },
  { id: 2, hashTag: '#노트' },
  { id: 3, hashTag: '#알림' },
  { id: 4, hashTag: '#할일' }
]

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: alpha(theme.palette.common.white, 0.90),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.90),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.1),
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
      width: "38ch",
    },
  },
}));

const Nav = () => {
  const { t, i18n } = useTranslation()
  const [activeHashTag, setActiveHashTag] = useState(0)
  const [isHeaderFixed, setIsHeaderFixed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`header ${isHeaderFixed ? 'sticky' : ''}`}>
      <section style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "15px" }}>
        <article style={{ fontSize: "15px", margin: "5px 0px", fontWeight: "300" }}>
          {t('header.nav.info.message.first')}
          <span style={{ fontSize: "22px", fontWeight: "600", color: "#00754A" }}>250</span>
          {t('header.nav.info.message.second')}
        </article>
        <article style={{ fontSize: "13px", fontWeight: "300" }}>
          {t('header.nav.info.subMessage.first')}
          <span style={{ fontSize: "15px", fontWeight: "600" }}>#{t('header.nav.info.subMessage.search')}</span>
          {t('header.nav.info.subMessage.second')}
        </article>
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
      <section className="header-filter-section" style={{ marginTop: "10px" }}>
        <ul>
          {hashTags.map((hashTag, index) => (
            <li 
              key={hashTag.id}
              style={{ 
                fontSize: "14px", 
                border: "1px solid #333", 
                borderRadius: "25px", 
                margin: "0px 5px", 
                padding: "7px 12px", 
                backgroundColor: activeHashTag === index ? "#000" : "#FFF", 
                color: activeHashTag === index ? "#FFF" : "#000"
              }}
              onClick={() => setActiveHashTag(index)}
            >
              #{t(`header.nav.hashtag.${index}`)}
            </li>
          ))}
        </ul>
      </section>
    </nav>
  )
}

export default Nav
