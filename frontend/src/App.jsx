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


      <nav className="main-navigation">

        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/members">
          Members
        </NavLink>

        <NavLink to="/bills">
          Bills & Acts
        </NavLink>

        <NavLink to="/questions">
          Questions
        </NavLink>

        <NavLink to="/committees">
          Committees
        </NavLink>

        <NavLink to="/proceedings">
          Proceedings
        </NavLink>

        <NavLink to="/attendance">
          Attendance
        </NavLink>

        <NavLink to="/documents">
          Documents
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


        <Link
          to="/login"
          className="login-button"
        >
          👤
        </Link>

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
            url("https://upload.wikimedia.org/wikipedia/commons/9/95/Indian_national_Flag_waving_under_clear_blue_sky_on_Red_Fort%2C_Delhi.jpg");

          background-size: cover;
          background-position: center center;

          transform: scale(1.02);
        }

        .portal-hero-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              90deg,
              rgba(3, 18, 45, 0.98) 0%,
              rgba(5, 28, 62, 0.94) 28%,
              rgba(7, 39, 79, 0.78) 52%,
              rgba(7, 39, 79, 0.38) 78%,
              rgba(2, 15, 35, 0.58) 100%
            );
        }

        .portal-hero::after {
          content: "";

          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;

          height: 130px;

          background:
            linear-gradient(
              transparent,
              rgba(3, 18, 45, 0.78)
            );

          pointer-events: none;
        }

        .portal-chakra {
          position: absolute;

          width: 300px;
          height: 300px;

          right: 12%;
          top: 50%;

          transform:
            translateY(-50%);

          border-radius: 50%;

          border:
            9px solid
            rgba(255,255,255,0.45);

          opacity: 0.28;

          box-shadow:
            0 0 0 12px
            rgba(255,255,255,0.05),

            0 0 55px
            rgba(255,255,255,0.12);
        }

        .portal-chakra::before {
          content: "";

          position: absolute;

          inset: 22px;

          border-radius: 50%;

          border:
            4px solid
            rgba(255,255,255,0.5);
        }

        .portal-chakra::after {
          content: "";

          position: absolute;

          width: 28px;
          height: 28px;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            rgba(255,255,255,0.75);

          box-shadow:

            0 -105px 0 -9px
            rgba(255,255,255,0.65),

            0 105px 0 -9px
            rgba(255,255,255,0.65),

            105px 0 0 -9px
            rgba(255,255,255,0.65),

            -105px 0 0 -9px
            rgba(255,255,255,0.65);
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

          gap: 18px;

          min-height: 225px;

          padding: 26px;

          overflow: hidden;

          border:
            1px solid #e2e8f1;

          border-radius: 14px;

          background: white;

          box-shadow:
            0 8px 25px
            rgba(16,45,80,0.055);

          text-decoration: none;

          transition:
            all 0.22s ease;
        }

        .portal-module-card::after {

          content: "";

          position: absolute;

          width: 110px;
          height: 110px;

          right: -45px;
          bottom: -45px;

          border-radius: 50%;

          background: #edf4ff;

          transition:
            transform 0.25s ease;
        }

        .portal-module-card:hover {

          transform:
            translateY(-5px);

          border-color:
            #c7d9f0;

          box-shadow:
            0 18px 38px
            rgba(16,45,80,0.12);
        }

        .portal-module-card:hover::after {

          transform:
            scale(1.4);
        }

        .portal-module-icon {

          position: relative;

          z-index: 2;

          flex-shrink: 0;

          width: 48px;
          height: 48px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 12px;

          background: #edf4ff;

          color: #195797;

          font-size: 21px;
        }

        .portal-module-content {

          position: relative;

          z-index: 2;

          min-width: 0;
        }

        .portal-card-number {

          display: block;

          margin-bottom: 8px;

          color: #9baac0;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 1px;
        }

        .portal-module-content h3 {

          margin: 0;

          color: #162b49;

          font-size: 21px;

          font-weight: 800;
        }

        .portal-module-content p {

          margin:
            12px 0 18px;

          color: #68778c;

          font-size: 13px;

          line-height: 1.65;
        }

        .portal-card-link {

          color: #1d5d9e;

          font-size: 12px;

          font-weight: 800;
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


          <Link
            to="/members"
            className="portal-module-card"
          >

            <div className="portal-module-icon">
              👤
            </div>


            <div className="portal-module-content">

              <span className="portal-card-number">
                01
              </span>


              <h3>
                Members
              </h3>


              <p>

                Explore Member profiles, constituencies,
                political parties and parliamentary information.

              </p>


              <span className="portal-card-link">
                View Members →
              </span>

            </div>

          </Link>


          <Link
            to="/bills"
            className="portal-module-card"
          >

            <div className="portal-module-icon">
              📜
            </div>


            <div className="portal-module-content">

              <span className="portal-card-number">
                02
              </span>


              <h3>
                Bills & Acts
              </h3>


              <p>

                Explore legislative bills, their status,
                introduction details and parliamentary information.

              </p>


              <span className="portal-card-link">
                View Bills →
              </span>

            </div>

          </Link>


          <Link
            to="/questions"
            className="portal-module-card"
          >

            <div className="portal-module-icon">
              ?
            </div>


            <div className="portal-module-content">

              <span className="portal-card-number">
                03
              </span>


              <h3>
                Questions
              </h3>


              <p>

                Explore questions submitted by Members
                and their parliamentary responses.

              </p>


              <span className="portal-card-link">
                View Questions →
              </span>

            </div>

          </Link>


          <Link
            to="/committees"
            className="portal-module-card"
          >

            <div className="portal-module-icon">
              🏛
            </div>


            <div className="portal-module-content">

              <span className="portal-card-number">
                04
              </span>


              <h3>
                Committees
              </h3>


              <p>

                Explore parliamentary committees,
                departments, chairpersons and members.

              </p>


              <span className="portal-card-link">
                View Committees →
              </span>

            </div>

          </Link>


          <Link
            to="/proceedings"
            className="portal-module-card"
          >

            <div className="portal-module-icon">
              🗂
            </div>


            <div className="portal-module-content">

              <span className="portal-card-number">
                05
              </span>


              <h3>
                Proceedings
              </h3>


              <p>

                Access parliamentary proceedings,
                sitting information and official records.

              </p>


              <span className="portal-card-link">
                View Proceedings →
              </span>

            </div>

          </Link>


          <div className="portal-module-card">

            <div className="portal-module-icon">
              🌐
            </div>


            <div className="portal-module-content">

              <span className="portal-card-number">
                06
              </span>


              <h3>
                Digital Access
              </h3>


              <p>

                Parliamentary information available
                through a unified digital platform.

              </p>


              <span className="portal-card-link">
                Digital Parliament
              </span>

            </div>

          </div>


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

  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  const handleLogin = (event) => {

    event.preventDefault()

    setError("")


    if (
      userId === "MP001" &&
      password === "12345"
    ) {

      sessionStorage.setItem(
        "memberLoggedIn",
        "true"
      )

      navigate(
        "/dashboard",
        { replace: true }
      )

    } else {

      setError(
        "Invalid User ID or Password"
      )

    }

  }


  return (

    <div className="simple-page">


      <div className="login-card">


        <h1>
          Member Login
        </h1>


        <p>
          Login to access your parliamentary dashboard.
        </p>


        <form
          onSubmit={handleLogin}
        >


          <label>
            User ID
          </label>


          <input
            type="text"
            value={userId}
            onChange={(event) =>
              setUserId(event.target.value)
            }
            placeholder="Enter User ID"
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
          />


          {error && (

            <div className="login-error">
              {error}
            </div>

          )}


          <button
            type="submit"
            className="primary-button"
          >

            Login

          </button>


        </form>


      </div>


    </div>

  )
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard() {

  const navigate = useNavigate()

  const [notifications, setNotifications] = useState([])
  const [notificationLoading, setNotificationLoading] = useState(true)
  const [notificationError, setNotificationError] = useState("")


  useEffect(() => {

    const loggedIn = sessionStorage.getItem(
      "memberLoggedIn"
    )

    if (loggedIn !== "true") {

      navigate(
        "/login",
        { replace: true }
      )

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


        const memberNotifications = Array.isArray(data)
          ? data.filter(
              (notification) =>
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

    sessionStorage.removeItem(
      "memberLoggedIn"
    )

    navigate(
      "/login",
      { replace: true }
    )

  }


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

        @media (max-width: 600px) {

          .dashboard-notification-card-top {
            flex-direction: column;
          }

        }

      `}</style>


      <div className="dashboard-container">


        <span className="hero-label">
          MEMBER AREA
        </span>


        <h1>
          Member Dashboard
        </h1>


        <p>
          Welcome, Demo Member One
        </p>


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


          <div>
            Notifications
          </div>


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