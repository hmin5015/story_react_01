import { useState } from 'react'
import Typography from "@mui/material/Typography"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Header.scss';

const menus = [
  { menuId: 1, menuName: "LOGS", url: '/logs' },
  { menuId: 2, menuName: "MY INFO", url: '/my-info' }
]

const locales = {
  en: { title: 'English' },
  ko: { title: '한국어' },
};

const Header = () => {
  const { t, i18n } = useTranslation()
  const [locale, setShowLocale] = useState(false)

  return (
    <header>
      <section className="header-top-section">
        <div className="header-aside">
          <div className="header-logo">
            <Link to={"/"}>
              <Typography variant="overline" fontSize={"20px"} fontWeight={900} color={"#000"} lineHeight={2} letterSpacing={"-.01rem"} textTransform={"none"}>
                {t('header.logo.first')}
              </Typography>
              <Typography variant="overline" fontSize={"20px"} fontWeight={500} color={"#333"} lineHeight={2} letterSpacing={"-.01rem"} textTransform={"none"} paddingLeft={"3px"}>
                {t('header.logo.second')}
              </Typography>
            </Link>
          </div>
        </div>
        <div className="header-info">
          <ul>
            {menus.map(menu => (
              <li key={menu.menuId}>
                <Link to={menu.url}>
                  <Typography variant="overline" paddingLeft={1.5}>{t(`header.menu.${menu.menuId}`)}</Typography>
                </Link>
              </li>
            ))}        
            <li>
              <article style={{ position: "relative", display: "inline-flex" }}>
                <Typography variant="overline" paddingLeft={1.5} onClick={() => setShowLocale(!locale)}>
                  {i18n.resolvedLanguage === "ko" ? "한국어" : "English"}
                </Typography>
                {locale &&
                  <div style={{ position: "absolute", top: "30px", border: "1px solid #CCC", borderRadius: "5px", right: "0px", padding: "10px", background: "#FFF", width: "max-content" }}>
                    <ul style={{ display: "flex", flexDirection: "column" }}>
                      {Object.keys(locales).map((locale) => (
                        <li key={locale} style={{ justifyContent: "flex-start", padding: "5px 0px", borderRadius: "5px", backgroundColor: i18n.resolvedLanguage === locale ? '#F2F2F2' : '#FFF' }}>
                          <button 
                            style={{ fontWeight: i18n.resolvedLanguage === locale ? '600px' : '300px', border: "none", backgroundColor: "transparent" }} 
                            type="submit" 
                            onClick={() => i18n.changeLanguage(locale)}
                          >
                            {locales[locale].title}
                          </button></li>
                      ))}
                    </ul>
                  </div>
                }
              </article>
            </li>
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
