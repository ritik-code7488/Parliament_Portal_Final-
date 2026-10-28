import { useEffect, useState } from "react"
import API_BASE_URL from "./api"
import "./Header.css"
import "./App.css"

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom"

import Members from "./pages/Members"
import MemberProfile from "./pages/MemberProfile"
import Bills from "./pages/Bills"
import BillDetails from "./pages/BillDetails"
import Questions from "./pages/Questions"
import QuestionDetails from "./pages/QuestionDetails"
import Committees from "./pages/Committees"
import CommitteeDetails from "./pages/CommitteeDetails"
import Proceedings from "./pages/Proceedings"
import Attendance from "./pages/Attendance"
import Documents from "./pages/Documents"
import DocumentDetails from "./pages/DocumentDetails"
import Notifications from "./pages/Notifications"


/* =========================================================
   HEADER
   ========================================================= */

function Header() {

  const [searchText, setSearchText] = useState("")
  const [members, setMembers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [showRoleMenu, setShowRoleMenu] = useState(false)
  const navigate = useNavigate()

  const isLoggedIn = sessionStorage.getItem("memberLoggedIn") === "true"
  const userRole = sessionStorage.getItem("userRole") || "user"
  const memberId = sessionStorage.getItem("memberId") || (userRole === "admin" ? "ADMIN" : "CITIZEN")

  const handleLogout = () => {
    sessionStorage.removeItem("memberLoggedIn")
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("refreshToken")
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("memberId")
    sessionStorage.removeItem("userRole")
    setShowRoleMenu(false)
    navigate("/login")
  }


  useEffect(() => {

    fetch(`${API_BASE_URL}/api/members/members/`)

      .then((response) => {

        if (!response.ok) {
          throw new Error("Unable to load members")
        }

        return response.json()

      })

      .then((data) => {
        setMembers(data)
      })

      .catch((error) => {
        console.error(
          "Header member search error:",
          error
        )
      })

  }, [])


  const filteredMembers = members.filter((member) =>

    member.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase())

    ||

    member.member_id
      ?.toLowerCase()
      .includes(searchText.toLowerCase())

    ||

    member.state
      ?.toLowerCase()
      .includes(searchText.toLowerCase())

    ||

    member.constituency
      ?.toLowerCase()
      .includes(searchText.toLowerCase())

  )


  return (

    <header className="top-header">


      <div className="header-left">

        <Link
          to="/"
          className="logo-area"
        >

          <div className="logo-icon">
            🏛
          </div>


          <div>

            <div className="logo-title">
              Parliament Portal
            </div>


            <div className="logo-subtitle">
              Digital Parliament Information System
            </div>

          </div>

        </Link>

      </div>


      <nav className="main-navigation" aria-label="Parliamentary Navigation">

        <NavLink to="/" end className="nav-item">
          <span className="nav-icon">🏛</span>
          <span className="nav-text">Home</span>
        </NavLink>

        <NavLink to="/members" className="nav-item">
          <span className="nav-icon">👥</span>
          <span className="nav-text">Members</span>
        </NavLink>

        <NavLink to="/bills" className="nav-item">
          <span className="nav-icon">📜</span>
          <span className="nav-text">Bills & Acts</span>
        </NavLink>

        <NavLink to="/questions" className="nav-item">
          <span className="nav-icon">💬</span>
          <span className="nav-text">Questions</span>
        </NavLink>

        <NavLink to="/committees" className="nav-item">
          <span className="nav-icon">🏛️</span>
          <span className="nav-text">Committees</span>
        </NavLink>

        <NavLink to="/proceedings" className="nav-item">
          <span className="nav-icon">⚖️</span>
          <span className="nav-text">Proceedings</span>
        </NavLink>

        <NavLink to="/attendance" className="nav-item">
          <span className="nav-icon">📋</span>
          <span className="nav-text">Attendance</span>
        </NavLink>

        <NavLink to="/documents" className="nav-item">
          <span className="nav-icon">📑</span>
          <span className="nav-text">Documents</span>
        </NavLink>

        <NavLink to="/notifications" className="nav-item nav-notifications">
          <span className="nav-icon">🔔</span>
          <span className="nav-text">Notifications</span>
          <span className="notification-dot-badge">3</span>
        </NavLink>

      </nav>


      <div className="header-right">


        <div className="member-search">

          <span className="search-icon">
            🔍
          </span>


          <input
            type="text"
            placeholder="Search members..."
            value={searchText}
            onChange={(event) => {

              setSearchText(
                event.target.value
              )

              setShowResults(true)

            }}
            onFocus={() =>
              setShowResults(true)
            }
          />


          {showResults &&
            searchText && (

              <div className="search-results">

                {filteredMembers.length === 0 ? (

                  <div className="no-search-results">
                    No members found
                  </div>

                ) : (

                  filteredMembers
                    .slice(0, 5)
                    .map((member) => (

                      <Link
                        key={member.id}
                        to={`/member-profile?member=${member.id}`}
                        className="search-result-item"
                        onClick={() => {

                          setSearchText("")
                          setShowResults(false)

                        }}
                      >

                        <strong>
                          {member.name}
                        </strong>


                        <span>
                          {member.member_id}
                          {" • "}
                          {member.state}
                        </span>

                      </Link>

                    ))

                )}

              </div>

            )}

        </div>


        <div className="header-role-container">

          <button
            type="button"
            className={`header-role-btn ${isLoggedIn ? (userRole === "admin" ? "role-admin" : "role-user") : ""}`}
            onClick={() => setShowRoleMenu(!showRoleMenu)}
          >
            {isLoggedIn ? (
              userRole === "admin" ? (
                <>
                  <span>👑 Admin: {memberId}</span>
                  <span className="role-caret">▼</span>
                </>
              ) : (
                <>
                  <span>👤 Citizen: {memberId}</span>
                  <span className="role-caret">▼</span>
                </>
              )
            ) : (
              <>
                <span>🔐 Portal Login</span>
                <span className="role-caret">▼</span>
              </>
            )}
          </button>

          {showRoleMenu && (
            <div className="role-dropdown-menu">
              {isLoggedIn ? (
                <>
                  <div className="dropdown-header-label">Active Role: {userRole.toUpperCase()}</div>
                  <Link
                    to="/dashboard"
                    className="dropdown-item-btn"
                    onClick={() => setShowRoleMenu(false)}
                  >
                    <span>📊 Member Dashboard</span>
                  </Link>
                  <Link
                    to="/login"
                    className="dropdown-item-btn"
                    onClick={() => setShowRoleMenu(false)}
                  >
                    <span>🔄 Switch Portal Role</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button
                    type="button"
                    className="dropdown-logout-btn"
                    onClick={handleLogout}
                  >
                    <span>🚪 Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="dropdown-header-label">Select Portal Login</div>
                  <Link
                    to="/login?role=user"
                    className="dropdown-item-btn item-user"
                    onClick={() => setShowRoleMenu(false)}
                  >
                    <span>👤 Citizen / Public Login</span>
                  </Link>
                  <Link
                    to="/login?role=admin"
                    className="dropdown-item-btn item-admin"
                    onClick={() => setShowRoleMenu(false)}
                  >
                    <span>👑 Admin & Official Login</span>
                  </Link>
                </>
              )}
            </div>
          )}

        </div>

      </div>

    </header>

  )
}


/* =========================================================
   HOME PAGE
   ========================================================= */

function Home() {

  return (

    <div className="portal-home">


      <style>{`

        .portal-home {
          width: 100%;
          min-height: 100vh;
          background: #f4f7fb;
          color: #14213d;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
          overflow-x: hidden;
        }

        .portal-hero {
          position: relative;
          min-height: 620px;
          overflow: hidden;
          display: flex;
          align-items: center;
          color: white;
          background: #061b3b;
        }

        .portal-hero-image {
          position: absolute;
          inset: 0;

          background-image:
            url("/images/parliament-hero-bg.jpg");

          background-size: cover;
          background-position: right center;

          transform: scale(1.01);
          filter: brightness(0.96) contrast(1.04);
        }

        .portal-hero-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              90deg,
              rgba(3, 18, 45, 0.97) 0%,
              rgba(5, 26, 60, 0.92) 34%,
              rgba(6, 33, 70, 0.62) 58%,
              rgba(6, 33, 70, 0.18) 78%,
              rgba(2, 14, 34, 0.35) 100%
            );
        }

        .portal-hero::after {
          content: "";

          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;

          height: 90px;

          background:
            linear-gradient(
              transparent,
              rgba(3, 18, 45, 0.65)
            );

          pointer-events: none;
        }

        @keyframes slowChakra3D {
          0% {
            transform: translateY(-50%) perspective(1200px) rotateY(-14deg) rotateX(8deg) rotateZ(0deg);
          }
          100% {
            transform: translateY(-50%) perspective(1200px) rotateY(-14deg) rotateX(8deg) rotateZ(360deg);
          }
        }

        .portal-chakra {
          position: absolute;
          width: 500px;
          height: 500px;
          right: 6%;
          top: 48%;
          transform: translateY(-50%) perspective(1200px) rotateY(-14deg) rotateX(8deg);
          border-radius: 50%;
          pointer-events: none;
          z-index: 2;
          opacity: 0.42;
          filter:
            drop-shadow(0 0 55px rgba(56, 189, 248, 0.48))
            drop-shadow(0 25px 45px rgba(0, 7, 24, 0.75));
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          animation: slowChakra3D 180s linear infinite;
          background-image: url("/images/chakra-3d.svg");
        }

        .portal-hero-content {
          position: relative;

          z-index: 5;

          width:
            min(
              1180px,
              calc(100% - 80px)
            );

          margin: 0 auto;

          padding:
            75px 0 155px;
        }

        .portal-breadcrumb {
          display: flex;

          align-items: center;

          gap: 10px;

          margin-bottom: 30px;

          color:
            rgba(255,255,255,0.7);

          font-size: 13px;
        }

        .portal-breadcrumb a {
          color: white;
          text-decoration: none;
        }

        .portal-breadcrumb a:hover {
          text-decoration: underline;
        }

        .portal-small-title {
          display: inline-block;

          padding-left: 14px;

          border-left:
            3px solid #f0a500;

          margin-bottom: 15px;

          color: #c7ddff;

          font-size: 12px;

          font-weight: 800;

          letter-spacing: 2.3px;
        }

        .portal-hero h1 {
          margin: 0;

          max-width: 760px;

          color: white;

          font-size:
            clamp(
              48px,
              6vw,
              76px
            );

          line-height: 0.99;

          letter-spacing: -2.5px;

          font-weight: 800;
        }

        .portal-hero h1 span {
          color: #72b2ff;
        }

        .portal-hero-content p {
          max-width: 680px;

          margin: 28px 0 0;

          color:
            rgba(255,255,255,0.82);

          font-size: 17px;

          line-height: 1.7;
        }

        .portal-hero-buttons {
          display: flex;

          align-items: center;

          gap: 14px;

          margin-top: 32px;
        }

        .portal-primary-button,
        .portal-outline-button {

          display: inline-flex;

          align-items: center;

          justify-content: center;

          min-height: 48px;

          padding:
            0 22px;

          border-radius: 8px;

          text-decoration: none;

          font-size: 14px;

          font-weight: 800;

          transition:
            all 0.2s ease;
        }

        .portal-primary-button {

          gap: 12px;

          background: white;

          color: #103d78;

          box-shadow:
            0 10px 28px
            rgba(0,0,0,0.18);
        }

        .portal-primary-button:hover {

          transform:
            translateY(-2px);

          box-shadow:
            0 15px 32px
            rgba(0,0,0,0.25);
        }

        .portal-primary-button span {
          font-size: 18px;
        }

        .portal-outline-button {

          border:
            1px solid
            rgba(255,255,255,0.55);

          color: white;

          background:
            rgba(255,255,255,0.06);
        }

        .portal-outline-button:hover {

          transform:
            translateY(-2px);

          background:
            rgba(255,255,255,0.14);
        }

        .portal-stats {

          position: absolute;

          z-index: 7;

          bottom: 0;

          left: 50%;

          transform:
            translateX(-50%);

          width:
            min(
              1180px,
              calc(100% - 80px)
            );

          display: flex;

          border-top:
            1px solid
            rgba(255,255,255,0.18);
        }

        .portal-stat {

          min-width: 170px;

          padding:
            20px 32px 22px 0;

          margin-right: 32px;

          border-right:
            1px solid
            rgba(255,255,255,0.18);
        }

        .portal-stat:last-child {
          border-right: none;
        }

        .portal-stat strong {

          display: block;

          color: white;

          font-size: 28px;

          line-height: 1;
        }

        .portal-stat span {

          display: block;

          margin-top: 7px;

          color:
            rgba(255,255,255,0.68);

          font-size: 12px;
        }

        .portal-modules {

          max-width: 1180px;

          margin: 0 auto;

          padding:
            80px 25px 85px;
        }

        .portal-section-label {

          display: block;

          margin-bottom: 10px;

          color: #3e6da5;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 2px;
        }

        .portal-section-heading h2 {

          margin: 0;

          color: #142a4a;

          font-size: 38px;

          line-height: 1.15;
        }

        .portal-section-heading p {

          margin:
            11px 0 34px;

          color: #6b7a90;

          font-size: 15px;
        }

        .portal-module-grid {

          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0, 1fr)
            );

          gap: 20px;
        }

        .portal-module-card {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          min-height: 225px;
          padding: 26px 24px;
          overflow: hidden;
          border: 1px solid rgba(214, 227, 245, 0.9);
          border-radius: 18px;
          background: linear-gradient(155deg, #ffffff 0%, #f9fbfe 60%, #f2f7fc 100%);
          box-shadow: 
            0 10px 30px -10px rgba(12, 38, 72, 0.08),
            0 2px 6px rgba(12, 38, 72, 0.03),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
          text-decoration: none;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .portal-module-card::after {
          content: "";
          position: absolute;
          width: 130px;
          height: 130px;
          right: -45px;
          bottom: -45px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.09) 0%, rgba(237, 244, 255, 0) 70%);
          transition: transform 0.35s ease;
          pointer-events: none;
        }

        .portal-module-card:hover {
          transform: translateY(-7px);
          box-shadow: 
            0 22px 46px -10px rgba(12, 44, 84, 0.16),
            0 0 20px rgba(56, 189, 248, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .portal-module-card:hover::after {
          transform: scale(1.6);
        }

        .portal-module-card.card-members:hover { border-color: #93c5fd; }
        .portal-module-card.card-bills:hover { border-color: #fde68a; }
        .portal-module-card.card-questions:hover { border-color: #ddd6fe; }
        .portal-module-card.card-committees:hover { border-color: #a7f3d0; }
        .portal-module-card.card-proceedings:hover { border-color: #c7d2fe; }
        .portal-module-card.card-documents:hover { border-color: #a5f3fc; }
        .portal-module-card.card-attendance:hover { border-color: #99f6e4; }
        .portal-module-card.card-notifications:hover { border-color: #fecdd3; }
        .portal-module-card.card-services:hover { border-color: #fde047; }

        .portal-module-icon {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          font-size: 23px;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease;
        }

        .portal-module-card:hover .portal-module-icon {
          transform: scale(1.12) rotate(-4deg);
        }

        .card-members .portal-module-icon { background: linear-gradient(135deg, #eff6ff, #dbeafe); color: #1d4ed8; border: 1px solid #bfdbfe; }
        .card-bills .portal-module-icon { background: linear-gradient(135deg, #fffbeb, #fef3c7); color: #b45309; border: 1px solid #fde68a; }
        .card-questions .portal-module-icon { background: linear-gradient(135deg, #faf5ff, #f3e8ff); color: #7e22ce; border: 1px solid #e9d5ff; }
        .card-committees .portal-module-icon { background: linear-gradient(135deg, #ecfdf5, #d1fae5); color: #047857; border: 1px solid #a7f3d0; }
        .card-proceedings .portal-module-icon { background: linear-gradient(135deg, #eef2ff, #e0e7ff); color: #4338ca; border: 1px solid #c7d2fe; }
        .card-documents .portal-module-icon { background: linear-gradient(135deg, #ecfeff, #cffafe); color: #0e7490; border: 1px solid #a5f3fc; }
        .card-attendance .portal-module-icon { background: linear-gradient(135deg, #f0fdfa, #ccfbf1); color: #0f766e; border: 1px solid #99f6e4; }
        .card-notifications .portal-module-icon { background: linear-gradient(135deg, #fff1f2, #ffe4e6); color: #be123c; border: 1px solid #fecdd3; }
        .card-services .portal-module-icon { background: linear-gradient(135deg, #fefce8, #fef9c3); color: #a16207; border: 1px solid #fde047; }

        .portal-module-content {
          position: relative;
          z-index: 2;
          min-width: 0;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .portal-card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .portal-card-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 2px 8px;
          border-radius: 6px;
          background: rgba(226, 232, 240, 0.65);
          border: 1px solid rgba(203, 213, 225, 0.7);
          color: #475569;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .portal-card-tag {
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 1.1px;
          text-transform: uppercase;
          color: #64748b;
        }

        .portal-module-content h3 {
          margin: 0;
          color: #0f2544;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.2px;
        }

        .portal-module-content p {
          margin: 9px 0 16px;
          color: #556987;
          font-size: 13px;
          line-height: 1.6;
          flex: 1;
        }

        .portal-card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #1e40af;
          font-size: 12.5px;
          font-weight: 800;
          letter-spacing: 0.2px;
          transition: all 0.2s ease;
        }

        .portal-module-card:hover .portal-card-link {
          gap: 10px;
          color: #2563eb;
        }

        .portal-information {

          padding:
            0 25px 75px;
        }

        .portal-information-inner {

          max-width: 1180px;

          min-height: 145px;

          margin: 0 auto;

          padding:
            30px 38px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 30px;

          border-radius: 16px;

          background:
            linear-gradient(
              100deg,
              #082650,
              #123f75
            );

          box-shadow:
            0 16px 35px
            rgba(11,42,78,0.15);
        }

        .portal-information-inner span {

          color: #a9c8ee;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 2px;
        }

        .portal-information-inner h2 {

          margin: 8px 0 0;

          color: white;

          font-size: 25px;

          line-height: 1.25;
        }

        .portal-information-button {

          flex-shrink: 0;

          padding:
            13px 20px;

          border-radius: 8px;

          background: white;

          color: #123e76;

          text-decoration: none;

          font-size: 13px;

          font-weight: 800;

          transition:
            all 0.2s ease;
        }

        .portal-information-button:hover {

          transform:
            translateY(-2px);
        }

        @media (max-width: 1050px) {

          .portal-module-grid {

            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );
          }

          .portal-chakra {

            right: 2%;

            opacity: 0.15;
          }

        }

        @media (max-width: 750px) {

          .portal-hero {

            min-height: 700px;
          }

          .portal-hero-content {

            width:
              calc(100% - 40px);

            padding:
              55px 0 175px;
          }

          .portal-hero h1 {

            font-size: 46px;

            letter-spacing: -1.5px;
          }

          .portal-hero-content p {

            font-size: 15px;
          }

          .portal-hero-buttons {

            flex-direction: column;

            align-items: flex-start;
          }

          .portal-stats {

            width:
              calc(100% - 40px);
          }

          .portal-stat {

            min-width: 95px;

            margin-right: 15px;

            padding-right: 15px;
          }

          .portal-stat strong {

            font-size: 22px;
          }

          .portal-module-grid {

            grid-template-columns: 1fr;
          }

          .portal-information-inner {

            flex-direction: column;

            align-items: flex-start;
          }

        }

        @media (max-width: 480px) {

          .portal-hero {

            min-height: 730px;
          }

          .portal-hero h1 {

            font-size: 40px;
          }

          .portal-small-title {

            font-size: 10px;

            letter-spacing: 1.5px;
          }

          .portal-stat strong {

            font-size: 19px;
          }

          .portal-stat span {

            font-size: 10px;
          }

          .portal-module-card {

            padding: 21px;
          }

          .portal-information-inner h2 {

            font-size: 21px;
          }

        }

      `}</style>


      <section className="portal-hero">

        <div className="portal-hero-image"></div>

        <div className="portal-hero-overlay"></div>

        <div className="portal-chakra"></div>

        <div className="portal-hero-content">

          <div className="portal-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>
              /
            </span>

            <span>
              Parliament Portal
            </span>

          </div>


          <div className="portal-small-title">

            DIGITAL PARLIAMENT INFORMATION SYSTEM

          </div>


          <h1>

            Parliament

            <br />

            <span>
              Information Portal
            </span>

          </h1>


          <p>

            Explore Members of Parliament, Bills & Acts,
            Questions, Committees and Parliamentary
            Proceedings through one unified digital platform.

          </p>


          <div className="portal-hero-buttons">

            <Link
              to="/members"
              className="portal-primary-button"
            >

              Explore Members

              <span>
                →
              </span>

            </Link>


            <Link
              to="/bills"
              className="portal-outline-button"
            >

              View Bills & Acts

            </Link>

          </div>


        </div>


        <div className="portal-stats">

          <div className="portal-stat">

            <strong>
              41+
            </strong>

            <span>
              Members
            </span>

          </div>


          <div className="portal-stat">

            <strong>
              2
            </strong>

            <span>
              Houses
            </span>

          </div>


          <div className="portal-stat">

            <strong>
              24/7
            </strong>

            <span>
              Digital Access
            </span>

          </div>

        </div>


      </section>


      <section className="portal-modules">

        <div className="portal-section-heading">

          <span className="portal-section-label">

            PARLIAMENTARY SERVICES

          </span>


          <h2>

            Explore Parliament Portal

          </h2>


          <p>

            Access parliamentary information and services
            from one unified platform.

          </p>

        </div>


        <div className="portal-module-grid">

          <Link to="/members" className="portal-module-card card-members">
            <div className="portal-module-icon">👥</div>
            <div className="portal-module-content">
              <div className="portal-card-top-row">
                <span className="portal-card-tag">Representatives</span>
                <span className="portal-card-number">01</span>
              </div>
              <h3>Members of Parliament</h3>
              <p>Explore Member profiles, parliamentary terms, constituencies, and political party affiliations.</p>
              <span className="portal-card-link">Explore Members →</span>
            </div>
          </Link>

          <Link to="/bills" className="portal-module-card card-bills">
            <div className="portal-module-icon">📜</div>
            <div className="portal-module-content">
              <div className="portal-card-top-row">
                <span className="portal-card-tag">Legislation</span>
                <span className="portal-card-number">02</span>
              </div>
              <h3>Bills & Acts</h3>
              <p>Track legislative bills, gazetted acts, status timelines, and legal draft texts across sessions.</p>
              <span className="portal-card-link">View Bills & Acts →</span>
            </div>
          </Link>

          <Link to="/questions" className="portal-module-card card-questions">
            <div className="portal-module-icon">💬</div>
            <div className="portal-module-content">
              <div className="portal-card-top-row">
                <span className="portal-card-tag">Inquiries</span>
                <span className="portal-card-number">03</span>
              </div>
              <h3>Questions & Replies</h3>
              <p>Search Starred and Unstarred ministerial questions, oral sessions, and verified replies.</p>
              <span className="portal-card-link">Search Questions →</span>
            </div>
          </Link>

          <Link to="/committees" className="portal-module-card card-committees">
            <div className="portal-module-icon">🏛️</div>
            <div className="portal-module-content">
              <div className="portal-card-top-row">
                <span className="portal-card-tag">Panels & Scrutiny</span>
                <span className="portal-card-number">04</span>
              </div>
              <h3>Committees</h3>
              <p>Review Standing, Select, and Joint parliamentary committees, chairpersons, and members.</p>
              <span className="portal-card-link">View Committees →</span>
            </div>
          </Link>

          <Link to="/proceedings" className="portal-module-card card-proceedings">
            <div className="portal-module-icon">⚖️</div>
            <div className="portal-module-content">
              <div className="portal-card-top-row">
                <span className="portal-card-tag">Debates & Sittings</span>
                <span className="portal-card-number">05</span>
              </div>
              <h3>House Proceedings</h3>
              <p>Access official debate transcripts, daily legislative business, and verbatim session logs.</p>
              <span className="portal-card-link">View Proceedings →</span>
            </div>
          </Link>

          <Link to="/documents" className="portal-module-card card-documents">
            <div className="portal-module-icon">📑</div>
            <div className="portal-module-content">
              <div className="portal-card-top-row">
                <span className="portal-card-tag">Digital Archive</span>
                <span className="portal-card-number">06</span>
              </div>
              <h3>Documents & Reports</h3>
              <p>Official parliamentary papers, publications, gazettes, committee reports, and public laws.</p>
              <span className="portal-card-link">Browse Documents →</span>
            </div>
          </Link>

          <Link to="/attendance" className="portal-module-card card-attendance">
            <div className="portal-module-icon">📋</div>
            <div className="portal-module-content">
              <div className="portal-card-top-row">
                <span className="portal-card-tag">Participation</span>
                <span className="portal-card-number">07</span>
              </div>
              <h3>Member Attendance</h3>
              <p>Verified parliamentary attendance logs, session roll calls, and committee participation records.</p>
              <span className="portal-card-link">Check Attendance →</span>
            </div>
          </Link>

          <Link to="/notifications" className="portal-module-card card-notifications">
            <div className="portal-module-icon">🔔</div>
            <div className="portal-module-content">
              <div className="portal-card-top-row">
                <span className="portal-card-tag">Bulletins</span>
                <span className="portal-card-number">08</span>
              </div>
              <h3>Live Notifications</h3>
              <p>Real-time official secretariat bulletins, gazette alerts, calendar notices, and press releases.</p>
              <span className="portal-card-link">View Notifications →</span>
            </div>
          </Link>

          <Link to="/login" className="portal-module-card card-services">
            <div className="portal-module-icon">🔐</div>
            <div className="portal-module-content">
              <div className="portal-card-top-row">
                <span className="portal-card-tag">Access Gateway</span>
                <span className="portal-card-number">09</span>
              </div>
              <h3>Portal Services & Login</h3>
              <p>Dedicated access portals: Citizens submit public questions, MPs and Officials manage portal operations.</p>
              <span className="portal-card-link">Launch Portal Login →</span>
            </div>
          </Link>

        </div>

      </section>


      <section className="portal-information">

        <div className="portal-information-inner">

          <div>

            <span>
              PARLIAMENT PORTAL
            </span>


            <h2>
              One Platform. Complete Parliamentary Information.
            </h2>

          </div>


          <Link
            to="/members"
            className="portal-information-button"
          >
            Explore Portal →
          </Link>


        </div>

      </section>


    </div>

  )
}


/* =========================================================
   LOGIN
   ========================================================= */

function Login() {

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialRole = searchParams.get("role") === "admin" ? "admin" : "user"
  const [role, setRole] = useState(initialRole)

  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Keep state synced with URL search params
  useEffect(() => {
    const qRole = searchParams.get("role")
    if (qRole === "admin" || qRole === "user") {
      setRole(qRole)
    }
  }, [searchParams])

  const switchRole = (newRole) => {
    setRole(newRole)
    setSearchParams({ role: newRole })
    setError("")
    setUserId("")
    setPassword("")
  }

  const fillDemoCredentials = (u, p) => {
    setUserId(u)
    setPassword(p)
    setError("")
  }

  const handleLogin = async (event) => {

    event.preventDefault()

    setError("")
    setLoading(true)

    const cleanUser = userId.trim()
    const cleanUserUpper = cleanUser.toUpperCase()

    // 1. Attempt Real Backend JWT Authentication
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: cleanUser,
          password: password,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        sessionStorage.setItem("memberLoggedIn", "true")
        sessionStorage.setItem("userRole", role)
        sessionStorage.setItem("accessToken", data.access)
        sessionStorage.setItem("refreshToken", data.refresh)
        sessionStorage.setItem("user", JSON.stringify({
          ...data.user,
          role: role,
        }))
        sessionStorage.setItem("memberId", data.user?.username || cleanUser)

        setLoading(false)
        navigate("/dashboard", { replace: true })
        return
      }
    } catch (apiError) {
      console.warn("Backend auth unavailable, evaluating role demo login:", apiError)
    }

    // 2. Role-based fallback / demo logins
    // MP demo credentials work in both roles
    if (cleanUserUpper === "MP001" && password === "12345") {
      sessionStorage.setItem("memberLoggedIn", "true")
      sessionStorage.setItem("userRole", role)
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          username: "MP001",
          role: role,
          name: role === "admin" ? "Hon'ble MP (Admin Privileges)" : "Hon'ble MP (Citizen View)",
          email: "mp001@parliament.nic.in",
        })
      )
      sessionStorage.setItem("memberId", "MP001")
      setLoading(false)
      navigate("/dashboard", { replace: true })
      return
    }

    // Admin demo credentials
    if (role === "admin" && (cleanUserUpper === "ADMIN01" || cleanUser.toLowerCase() === "admin") && (password === "admin123" || password === "admin")) {
      sessionStorage.setItem("memberLoggedIn", "true")
      sessionStorage.setItem("userRole", "admin")
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          username: cleanUserUpper || "ADMIN01",
          role: "admin",
          name: "Parliament Secretariat Administrator",
          email: "admin@sansad.nic.in",
        })
      )
      sessionStorage.setItem("memberId", cleanUserUpper || "ADMIN01")
      setLoading(false)
      navigate("/dashboard", { replace: true })
      return
    }

    // Citizen / Public demo credentials
    if (role === "user" && (cleanUserUpper === "CITIZEN01" || cleanUser.toLowerCase() === "citizen" || cleanUser.toLowerCase() === "user") && (password === "user123" || password === "12345")) {
      sessionStorage.setItem("memberLoggedIn", "true")
      sessionStorage.setItem("userRole", "user")
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          username: cleanUserUpper || "CITIZEN01",
          role: "user",
          name: "Verified Citizen User",
          email: "citizen@india.gov.in",
        })
      )
      sessionStorage.setItem("memberId", cleanUserUpper || "CITIZEN01")
      setLoading(false)
      navigate("/dashboard", { replace: true })
      return
    }

    setError(`Invalid ${role === "admin" ? "Admin / MP" : "Citizen"} ID or Password`)
    setLoading(false)

  }


  return (

    <div className="simple-page">

      <div className="login-card">

        {/* Role Switcher Pill Tabs */}
        <div className="login-role-switch">
          <button
            type="button"
            className={`role-tab-btn ${role === "user" ? "active role-user" : ""}`}
            onClick={() => switchRole("user")}
          >
            👤 Citizen / Public
          </button>
          <button
            type="button"
            className={`role-tab-btn ${role === "admin" ? "active role-admin" : ""}`}
            onClick={() => switchRole("admin")}
          >
            👑 Admin & MP
          </button>
        </div>

        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: role === "admin" ? "rgba(245, 158, 11, 0.15)" : "rgba(37, 99, 235, 0.12)",
              color: role === "admin" ? "#d97706" : "#2563eb",
              border: `1px solid ${role === "admin" ? "rgba(245, 158, 11, 0.3)" : "rgba(37, 99, 235, 0.25)"}`,
              marginBottom: "10px",
            }}
          >
            {role === "admin" ? "Official Parliamentary Secretariat Portal" : "Democratic Public Participation Portal"}
          </div>
          <h1>{role === "admin" ? "Admin & MP Login" : "Citizen Portal Login"}</h1>
          <p>
            {role === "admin"
              ? "Authorized access for Parliament Secretariat, Officers, and Hon'ble MPs."
              : "Access public question submissions, committee hearings, and RTI portals."}
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <label>
            {role === "admin" ? "Admin / MP Official ID" : "Citizen ID or Email"}
          </label>

          <input
            type="text"
            value={userId}
            onChange={(event) =>
              setUserId(event.target.value)
            }
            placeholder={role === "admin" ? "e.g. ADMIN01 or MP001" : "e.g. CITIZEN01 or user@email.com"}
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter Password"
            required
          />

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button"
            style={{
              background: role === "admin" ? "linear-gradient(135deg, #d97706, #b45309)" : undefined,
            }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : role === "admin" ? "Login as Official / Admin" : "Login as Citizen"}
          </button>

        </form>

        {/* 1-Click Demo Credentials */}
        <div className="login-demo-helper">
          <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Quick Demo Fill:
          </span>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px" }}>
            {role === "admin" ? (
              <>
                <button
                  type="button"
                  className="demo-fill-btn"
                  onClick={() => fillDemoCredentials("ADMIN01", "admin123")}
                >
                  👑 ADMIN01 / admin123
                </button>
                <button
                  type="button"
                  className="demo-fill-btn"
                  onClick={() => fillDemoCredentials("MP001", "12345")}
                >
                  🏛 MP001 / 12345
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="demo-fill-btn"
                  onClick={() => fillDemoCredentials("CITIZEN01", "user123")}
                >
                  👤 CITIZEN01 / user123
                </button>
                <button
                  type="button"
                  className="demo-fill-btn"
                  onClick={() => fillDemoCredentials("MP001", "12345")}
                >
                  🏛 MP001 / 12345
                </button>
              </>
            )}
          </div>
        </div>

      </div>

    </div>

  )
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard() {

  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [notificationLoading, setNotificationLoading] = useState(true)
  const [notificationError, setNotificationError] = useState("")

  // Interactive Question Form State
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [questionSubject, setQuestionSubject] = useState("")
  const [questionText, setQuestionText] = useState("")
  const [questionHouse, setQuestionHouse] = useState("Lok Sabha")
  const [questionType, setQuestionType] = useState("Starred")
  const [submittingQuestion, setSubmittingQuestion] = useState(false)
  const [submissionFeedback, setSubmissionFeedback] = useState("")

  const activeRole = sessionStorage.getItem("userRole") || currentUser?.role || "user"

  useEffect(() => {

    const loggedIn = sessionStorage.getItem(
      "memberLoggedIn"
    )

    if (loggedIn !== "true") {

      navigate(
        "/login",
        { replace: true }
      )
      return

    }

    try {
      const stored = sessionStorage.getItem("user")
      if (stored) {
        setCurrentUser(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Error reading stored user:", e)
    }

  }, [navigate])


  useEffect(() => {

    const fetchNotifications = async () => {

      try {

        setNotificationLoading(true)
        setNotificationError("")

        const response = await fetch(
          `${API_BASE_URL}/api/notifications/notifications/`
        )

        if (!response.ok) {

          throw new Error(
            "Unable to load notifications"
          )

        }

        const data = await response.json()
        const currentMemberId = sessionStorage.getItem("memberId") || "MP001"

        const memberNotifications = Array.isArray(data)
          ? data.filter(
            (notification) =>
              !notification.member_id ||
              notification.member_id === currentMemberId ||
              notification.member_id === "MP001"
          )
          : []


        setNotifications(
          memberNotifications
        )

      } catch (error) {

        console.error(
          "Dashboard notifications error:",
          error
        )

        setNotificationError(
          "Unable to load notifications."
        )

      } finally {

        setNotificationLoading(false)

      }

    }


    fetchNotifications()

  }, [])


  const handleLogout = () => {

    sessionStorage.removeItem("memberLoggedIn")
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("refreshToken")
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("memberId")
    sessionStorage.removeItem("userRole")

    navigate(
      "/login",
      { replace: true }
    )

  }

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    if (!questionSubject.trim() || !questionText.trim()) {
      setSubmissionFeedback("Please enter the subject and full question.");
      return;
    }

    setSubmittingQuestion(true);
    setSubmissionFeedback("");

    const payload = {
      question_number: `Q-${Date.now()}`,
      subject: questionSubject.trim(),
      question_text: questionText.trim(),
      asked_by: currentUser?.username || "Hon'ble Member",
      house: questionHouse,
      question_type: questionType,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      answer: "",
    };

    try {
      const token = sessionStorage.getItem("accessToken");
      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await fetch(`${API_BASE_URL}/api/questions/questions/`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      let data = {};
      try { data = await response.json(); } catch { data = {}; }

      if (!response.ok) {
        const details = data.detail || data.message ||
          Object.values(data).flat().join(" ") ||
          `Server returned HTTP ${response.status}.`;
        setSubmissionFeedback(`Submission failed: ${details}`);
        return;
      }

      setSubmissionFeedback("Question submitted successfully. The server accepted the record.");
      setQuestionSubject("");
      setQuestionText("");
      setQuestionHouse("Lok Sabha");
      setQuestionType("Starred");

      window.setTimeout(() => {
        setShowQuestionModal(false);
        setSubmissionFeedback("");
      }, 2500);
    } catch (error) {
      console.error("Question submission error:", error);
      setSubmissionFeedback("Could not connect to the server. Please check your connection and try again.");
    } finally {
      setSubmittingQuestion(false);
    }
  };


  return (

    <div className="simple-page">

      <style>{`

        .dashboard-notification-section {
          margin-top: 30px;
          text-align: left;
        }

        .dashboard-notification-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 15px;
        }

        .dashboard-notification-title h2 {
          margin: 0;
          color: #172e4f;
          font-size: 22px;
        }

        .dashboard-notification-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 30px;
          height: 30px;
          padding: 0 9px;
          border-radius: 999px;
          background: #edf4ff;
          color: #195797;
          font-size: 12px;
          font-weight: 800;
        }

        .dashboard-notification-list {
          display: grid;
          gap: 12px;
        }

        .dashboard-notification-card {
          padding: 18px;
          border: 1px solid #e1e8f2;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0 7px 22px rgba(16,45,80,0.06);
        }

        .dashboard-notification-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
        }

        .dashboard-notification-card-top h3 {
          margin: 0;
          color: #172e4f;
          font-size: 15px;
          line-height: 1.4;
        }

        .dashboard-notification-priority {
          flex-shrink: 0;
          padding: 5px 9px;
          border-radius: 999px;
          background: #f0f4f8;
          color: #5d7087;
          font-size: 10px;
          font-weight: 800;
        }

        .dashboard-notification-card p {
          margin: 9px 0 12px;
          color: #68778c;
          font-size: 13px;
          line-height: 1.65;
        }

        .dashboard-notification-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          color: #8a98aa;
          font-size: 10px;
          font-weight: 700;
        }

        .dashboard-notification-message {
          padding: 14px 16px;
          border-radius: 10px;
          background: #f7f9fc;
          color: #6b7b90;
          font-size: 13px;
        }

        .dashboard-notification-error {
          padding: 14px 16px;
          border-radius: 10px;
          background: #fff4f4;
          color: #b64040;
          font-size: 13px;
        }

        .member-action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin: 20px 0;
          padding: 16px 20px;
          background: #f0f6ff;
          border: 1px solid #d4e3f8;
          border-radius: 12px;
          text-align: left;
        }

        .action-button {
          background: #195797;
          color: #fff;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }

        .action-button:hover {
          background: #124375;
        }

        .question-modal-box {
          background: #ffffff;
          border: 1px solid #d9e3f0;
          border-radius: 12px;
          padding: 22px;
          margin-bottom: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          text-align: left;
        }

        .modal-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 12px;
        }

        @media (max-width: 600px) {

          .dashboard-notification-card-top {
            flex-direction: column;
          }
          .member-action-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .modal-form-grid {
            grid-template-columns: 1fr;
          }

        }

      `}</style>


      <div className="dashboard-container">


        <span className="hero-label">
          {activeRole === "admin" ? "👑 OFFICIAL ADMINISTRATOR PORTAL" : "👤 CITIZEN MEMBER AREA"}
        </span>


        <h1>
          {activeRole === "admin" ? "Parliamentary Admin & MP Dashboard" : "Citizen Services Dashboard"}
        </h1>


        <p>
          Welcome, {currentUser?.name || currentUser?.username || (activeRole === "admin" ? "Hon'ble Administrator" : "Citizen User")}
          {currentUser?.email && ` (${currentUser.email})`}
          {activeRole === "admin" && (
            <span style={{ marginLeft: "10px", padding: "2px 10px", background: "#fef3c7", color: "#b45309", borderRadius: "12px", fontSize: "11px", fontWeight: "700", border: "1px solid #fde68a" }}>
              Admin Privileges Active
            </span>
          )}
        </p>

        {/* MP Action Banner */}
        <div className="member-action-bar">
          <div>
            <strong style={{ display: "block", color: "#14325c", fontSize: "15px" }}>
              Parliamentary Inquiry & Notices
            </strong>
            <span style={{ fontSize: "12px", color: "#607289" }}>
              Submit a formal parliamentary question or check session notifications.
            </span>
          </div>

          <button
            type="button"
            className="action-button"
            onClick={() => setShowQuestionModal(!showQuestionModal)}
          >
            {showQuestionModal ? "✕ Close Form" : "＋ Submit Question"}
          </button>
        </div>

        {/* Interactive "Ask Question" Form */}
        {showQuestionModal && (
          <form className="question-modal-box" onSubmit={handleQuestionSubmit}>
            <h3 style={{ margin: "0 0 15px", color: "#172e4f", fontSize: "17px" }}>
              Submit Question to Parliament Secretariat
            </h3>

            <div className="modal-form-grid">
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", marginBottom: "6px", color: "#475569" }}>
                  House
                </label>
                <select
                  value={questionHouse}
                  onChange={(e) => setQuestionHouse(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                >
                  <option value="Lok Sabha">Lok Sabha</option>
                  <option value="Rajya Sabha">Rajya Sabha</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", marginBottom: "6px", color: "#475569" }}>
                  Question Type
                </label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                >
                  <option value="Starred">Starred (Oral Answer)</option>
                  <option value="Unstarred">Unstarred (Written Answer)</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", marginBottom: "6px", color: "#475569" }}>
                Subject / Topic
              </label>
              <input
                type="text"
                value={questionSubject}
                onChange={(e) => setQuestionSubject(e.target.value)}
                placeholder="e.g. Facilities for Rural Healthcare & Infrastructure"
                required
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", marginBottom: "6px", color: "#475569" }}>
                Full Question Text
              </label>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="State the detailed question to be asked to the concerned ministry..."
                rows="3"
                required
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
              ></textarea>
            </div>

            {submissionFeedback && (
              <div
                role="status"
                style={{
                  padding: "10px",
                  marginBottom: "14px",
                  borderRadius: "8px",
                  background:
                    submissionFeedback.startsWith("Submission failed") ||
                      submissionFeedback.startsWith("Could not connect") ||
                      submissionFeedback.startsWith("Please enter")
                      ? "#fff1f1"
                      : "#e8f8ee",
                  color:
                    submissionFeedback.startsWith("Submission failed") ||
                      submissionFeedback.startsWith("Could not connect") ||
                      submissionFeedback.startsWith("Please enter")
                      ? "#b42318"
                      : "#166534",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {submissionFeedback}
              </div>
            )}

            <button
              type="submit"
              className="action-button"
              disabled={submittingQuestion}
              style={{ background: "#107c41" }}
            >
              {submittingQuestion ? "Submitting..." : "Submit to Secretariat ↗"}
            </button>
          </form>
        )}


        <div className="dashboard-grid">


          <Link
            to="/member-profile?member=1"
          >
            My Profile
          </Link>


          <Link to="/bills">
            Bills & Acts
          </Link>


          <Link to="/questions">
            Questions
          </Link>


          <Link to="/committees">
            Committees
          </Link>


          <Link to="/proceedings">
            Proceedings
          </Link>


          <Link to="/attendance">
            Attendance
          </Link>


          <Link to="/notifications">
            Notifications
          </Link>


          <Link to="/documents">
            Documents
          </Link>


        </div>


        <section className="dashboard-notification-section">


          <div className="dashboard-notification-title">

            <h2>
              Notifications
            </h2>

            <span className="dashboard-notification-count">
              {notifications.length}
            </span>

          </div>


          {notificationLoading && (

            <div className="dashboard-notification-message">
              Loading notifications...
            </div>

          )}


          {!notificationLoading &&
            notificationError && (

              <div className="dashboard-notification-error">
                {notificationError}
              </div>

            )}


          {!notificationLoading &&
            !notificationError &&
            notifications.length === 0 && (

              <div className="dashboard-notification-message">
                No notifications available.
              </div>

            )}


          {!notificationLoading &&
            !notificationError &&
            notifications.length > 0 && (

              <div className="dashboard-notification-list">

                {notifications.map(
                  (notification) => (

                    <div
                      key={notification.id}
                      className="dashboard-notification-card"
                    >


                      <div className="dashboard-notification-card-top">

                        <h3>
                          {notification.title}
                        </h3>


                        <span className="dashboard-notification-priority">
                          {notification.priority}
                        </span>

                      </div>


                      <p>
                        {notification.message}
                      </p>


                      <div className="dashboard-notification-meta">

                        <span>
                          Type: {notification.notification_type}
                        </span>

                        <span>
                          •
                        </span>

                        <span>
                          {notification.is_read
                            ? "Read"
                            : "Unread"}
                        </span>

                        {notification.created_at && (

                          <>
                            <span>
                              •
                            </span>

                            <span>

                              {new Date(
                                notification.created_at
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}

                            </span>

                          </>

                        )}

                      </div>


                    </div>

                  )
                )}

              </div>

            )}


        </section>


        <div style={{ marginTop: "25px" }}>

          <button
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>


      </div>


    </div>

  )
}


/* =========================================================
   PROCEEDINGS
   ========================================================= */

function ProceedingDetails() {

  const [searchParams] = useSearchParams()

  const proceedingId =
    searchParams.get("proceeding")

  const [proceeding, setProceeding] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")


  useEffect(() => {

    if (!proceedingId) {

      setError(
        "Proceeding ID is missing."
      )

      setLoading(false)

      return

    }


    fetch(
      `${API_BASE_URL}/api/proceedings/proceedings/${proceedingId}/`
    )

      .then((response) => {

        if (!response.ok) {

          throw new Error(
            "Unable to load proceeding details."
          )

        }

        return response.json()

      })

      .then((data) => {

        setProceeding(data)

        setLoading(false)

      })

      .catch((err) => {

        console.error(
          "Proceeding details error:",
          err
        )

        setError(
          "Unable to load proceeding details."
        )

        setLoading(false)

      })

  }, [proceedingId])


  if (loading) {

    return (

      <div className="proceeding-details-page">

        <style>
          {proceedingDetailsStyles}
        </style>

        <div className="details-shell">

          <div className="loading-card">
            Loading proceeding details...
          </div>

        </div>

      </div>

    )

  }


  if (error || !proceeding) {

    return (

      <div className="proceeding-details-page">

        <style>
          {proceedingDetailsStyles}
        </style>

        <div className="details-shell">

          <div className="error-card">

            <div className="error-icon">
              !
            </div>

            <h1>
              Proceeding Not Found
            </h1>

            <p>
              {error ||
                "The requested proceeding could not be found."}
            </p>

            <Link
              to="/proceedings"
              className="back-button"
            >
              ← Back to Proceedings
            </Link>

          </div>

        </div>

      </div>

    )

  }


  return (

    <div className="proceeding-details-page">

      <style>
        {proceedingDetailsStyles}
      </style>


      <div className="details-hero">

        <div className="details-hero-inner">


          <div className="breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>
              ›
            </span>

            <Link to="/proceedings">
              Proceedings
            </Link>

            <span>
              ›
            </span>

            <span>
              Details
            </span>

          </div>


          <div className="eyebrow">
            PARLIAMENTARY PROCEEDING
          </div>


          <div className="hero-title-row">

            <div>

              <h1>
                {proceeding.title}
              </h1>

              <p>
                Official parliamentary proceeding record and session information.
              </p>

            </div>


            <div className="status-pill">

              <span className="status-dot"></span>

              {proceeding.status}

            </div>

          </div>


        </div>

      </div>


      <main className="details-shell">


        <div className="top-actions">

          <Link
            to="/proceedings"
            className="back-link"
          >
            ← Back to Proceedings
          </Link>

        </div>


        <section className="details-grid">


          <div className="main-card">


            <div className="card-heading">

              <span className="heading-icon">
                ▤
              </span>


              <div>

                <span className="small-label">
                  PROCEEDING RECORD
                </span>


                <h2>
                  Proceeding Information
                </h2>

              </div>

            </div>


            <div className="info-grid">


              <div className="info-item">

                <span className="info-label">
                  Proceeding ID
                </span>

                <strong>
                  #{proceeding.id}
                </strong>

              </div>


              <div className="info-item">

                <span className="info-label">
                  House
                </span>

                <strong>
                  {proceeding.house || "—"}
                </strong>

              </div>


              <div className="info-item">

                <span className="info-label">
                  Date
                </span>

                <strong>
                  {proceeding.proceeding_date || "—"}
                </strong>

              </div>


              <div className="info-item">

                <span className="info-label">
                  Type
                </span>

                <strong>
                  {proceeding.proceeding_type || "—"}
                </strong>

              </div>


              <div className="info-item">

                <span className="info-label">
                  Status
                </span>

                <strong>
                  {proceeding.status || "—"}
                </strong>

              </div>


            </div>


            <div className="description-section">

              <span className="info-label">
                DESCRIPTION
              </span>

              <p>
                {proceeding.description ||
                  "No description is available for this proceeding."}
              </p>

            </div>


            {proceeding.document_url && (

              <div className="document-section">

                <span className="info-label">
                  OFFICIAL DOCUMENT
                </span>


                <a
                  href={proceeding.document_url}
                  target="_blank"
                  rel="noreferrer"
                  className="document-button"
                >
                  View Official Document ↗
                </a>

              </div>

            )}


          </div>


          <aside className="side-card">


            <div className="side-icon">
              🏛
            </div>


            <span className="small-label">
              PARLIAMENTARY DATABASE
            </span>


            <h3>
              Official Record
            </h3>


            <p>
              This page displays information retrieved directly from the Parliament Portal proceedings database.
            </p>


            <div className="side-line"></div>


            <div className="side-row">

              <span>
                House
              </span>

              <strong>
                {proceeding.house || "—"}
              </strong>

            </div>


            <div className="side-row">

              <span>
                Status
              </span>

              <strong>
                {proceeding.status || "—"}
              </strong>

            </div>


            <Link
              to="/proceedings"
              className="side-back"
            >
              View All Proceedings →
            </Link>


          </aside>


        </section>


      </main>


    </div>

  )
}


const proceedingDetailsStyles = `
.proceeding-details-page{min-height:calc(100vh - 80px);background:#f4f7fb;color:#142a4a;font-family:Arial,Helvetica,sans-serif}
.details-hero{background:linear-gradient(120deg,#082b5d,#124d88);color:white}
.details-hero-inner{max-width:1180px;margin:0 auto;padding:42px 25px 48px}
.breadcrumb{display:flex;align-items:center;gap:9px;margin-bottom:30px;color:rgba(255,255,255,.68);font-size:13px}
.breadcrumb a{color:white;text-decoration:none}
.eyebrow,.small-label{display:block;color:#4d78ad;font-size:10px;font-weight:800;letter-spacing:2px}
.eyebrow{margin-bottom:12px;color:#b9d7fb}
.hero-title-row{display:flex;align-items:flex-start;justify-content:space-between;gap:25px}
.hero-title-row h1{margin:0;max-width:850px;color:white;font-size:clamp(32px,5vw,52px);line-height:1.08}
.hero-title-row p{margin:15px 0 0;color:rgba(255,255,255,.78);font-size:15px;line-height:1.6}
.status-pill{flex-shrink:0;display:inline-flex;align-items:center;gap:8px;padding:9px 14px;border:1px solid rgba(255,255,255,.25);border-radius:999px;background:rgba(255,255,255,.1);color:white;font-size:12px;font-weight:800}
.status-dot{width:8px;height:8px;border-radius:50%;background:#67d391}
.details-shell{max-width:1180px;margin:0 auto;padding:30px 25px 70px}
.top-actions{margin-bottom:20px}
.back-link{color:#195797;text-decoration:none;font-size:13px;font-weight:800}
.details-grid{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:22px;align-items:start}
.main-card,.side-card,.loading-card,.error-card{background:white;border:1px solid #e1e8f2;border-radius:16px;box-shadow:0 10px 30px rgba(16,45,80,.07)}
.main-card{padding:30px}
.card-heading{display:flex;align-items:center;gap:14px;padding-bottom:23px;border-bottom:1px solid #e8edf4}
.heading-icon{width:46px;height:46px;display:flex;align-items:center;justify-content:center;border-radius:12px;background:#edf4ff;color:#195797;font-size:20px}
.card-heading h2{margin:5px 0 0;color:#172e4f;font-size:24px}
.info-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0;margin-top:5px}
.info-item{padding:20px 15px 20px 0;border-bottom:1px solid #edf1f6}
.info-label{display:block;margin-bottom:8px;color:#8090a5;font-size:10px;font-weight:800;letter-spacing:1.3px}
.info-item strong{color:#1a3355;font-size:14px}
.description-section{padding-top:27px}
.description-section p{margin:0;color:#5f7087;font-size:14px;line-height:1.8}
.document-section{margin-top:27px;padding-top:24px;border-top:1px solid #edf1f6}
.document-button{display:inline-flex;align-items:center;min-height:42px;padding:0 17px;border-radius:8px;background:#195797;color:white;text-decoration:none;font-size:12px;font-weight:800}
.side-card{padding:27px}
.side-icon{width:52px;height:52px;display:flex;align-items:center;justify-content:center;margin-bottom:18px;border-radius:14px;background:#edf4ff;font-size:23px}
.side-card h3{margin:7px 0 10px;color:#172e4f;font-size:22px}
.side-card p{margin:0;color:#6b7b90;font-size:13px;line-height:1.7}
.side-line{height:1px;margin:23px 0 8px;background:#e8edf4}
.side-row{display:flex;justify-content:space-between;gap:15px;padding:12px 0;font-size:12px}
.side-row span{color:#8090a5}.side-row strong{color:#234465}
.side-back{display:block;margin-top:18px;padding-top:18px;border-top:1px solid #e8edf4;color:#195797;text-decoration:none;font-size:12px;font-weight:800}
.loading-card,.error-card{padding:50px;text-align:center}
.error-icon{width:45px;height:45px;margin:0 auto 15px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#fff1f1;color:#c43d3d;font-size:22px;font-weight:800}
.error-card h1{margin:0 0 10px;color:#172e4f;font-size:26px}.error-card p{margin:0 0 22px;color:#6b7b90}
.back-button{display:inline-flex;min-height:42px;align-items:center;padding:0 18px;border-radius:8px;background:#195797;color:white;text-decoration:none;font-size:12px;font-weight:800}
@media(max-width:850px){.details-grid{grid-template-columns:1fr}.hero-title-row{flex-direction:column}.info-grid{grid-template-columns:1fr}}
`


/* =========================================================
   APP
   ========================================================= */

function App() {

  return (

    <BrowserRouter>


      <Header />


      <Routes>


        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/members"
          element={<Members />}
        />


        <Route
          path="/member-profile"
          element={<MemberProfile />}
        />


        <Route
          path="/bills"
          element={<Bills />}
        />


        <Route
          path="/bill-details"
          element={<BillDetails />}
        />


        <Route
          path="/questions"
          element={<Questions />}
        />


        <Route
          path="/question-details"
          element={<QuestionDetails />}
        />


        <Route
          path="/committees"
          element={<Committees />}
        />


        <Route
          path="/committee-details"
          element={<CommitteeDetails />}
        />


        <Route
          path="/proceedings"
          element={<Proceedings />}
        />


        <Route
          path="/attendance"
          element={<Attendance />}
        />


        <Route
          path="/documents"
          element={<Documents />}
        />


        <Route
          path="/notifications"
          element={<Notifications />}
        />


        <Route
          path="/document-details"
          element={<DocumentDetails />}
        />


        <Route
          path="/proceeding-details"
          element={<ProceedingDetails />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


      </Routes>


    </BrowserRouter>

  )
}


export default App