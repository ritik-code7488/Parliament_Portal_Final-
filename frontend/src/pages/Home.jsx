import { Link } from "react-router-dom"
import "./Home.css"

function Home() {
  return (
    <div className="home-page">

      {/* ==================== HERO ==================== */}

      <section className="home-hero">

        <div className="home-hero-overlay"></div>

        <div className="home-hero-content">

          <div className="home-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <strong>Parliament Portal</strong>
          </div>

          <div className="home-eyebrow">
            DIGITAL PARLIAMENT INFORMATION SYSTEM
          </div>

          <h1>
            Parliament
            <br />
            <span>Information Portal</span>
          </h1>

          <p>
            Explore Members of Parliament, Bills & Acts, Questions,
            Committees and Parliamentary Proceedings through one
            unified digital platform.
          </p>

          <div className="home-hero-buttons">

            <Link
              to="/members"
              className="home-primary-button"
            >
              Explore Members
              <span>→</span>
            </Link>

            <Link
              to="/bills"
              className="home-secondary-button"
            >
              View Bills & Acts
            </Link>

          </div>

        </div>


        {/* ==================== STATS ==================== */}

        <div className="home-stats">

          <div className="home-stat">
            <strong>41+</strong>
            <span>Members</span>
          </div>

          <div className="home-stat">
            <strong>2</strong>
            <span>Houses</span>
          </div>

          <div className="home-stat">
            <strong>24/7</strong>
            <span>Digital Access</span>
          </div>

        </div>

      </section>


      {/* ==================== PORTAL MODULES ==================== */}

      <section className="home-modules">

        <div className="home-section-heading">

          <span>
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


        <div className="home-module-grid">


          {/* MEMBERS */}

          <Link
            to="/members"
            className="home-module-card"
          >

            <div className="home-module-number">
              01
            </div>

            <div className="home-module-icon">
              👤
            </div>

            <h3>
              Members
            </h3>

            <p>
              Explore Member profiles, constituencies,
              political parties and parliamentary information.
            </p>

            <span className="home-module-arrow">
              View Members →
            </span>

          </Link>


          {/* BILLS */}

          <Link
            to="/bills"
            className="home-module-card"
          >

            <div className="home-module-number">
              02
            </div>

            <div className="home-module-icon">
              📜
            </div>

            <h3>
              Bills & Acts
            </h3>

            <p>
              Explore legislative bills, their status,
              introduction details and parliamentary information.
            </p>

            <span className="home-module-arrow">
              View Bills →
            </span>

          </Link>


          {/* QUESTIONS */}

          <Link
            to="/questions"
            className="home-module-card"
          >

            <div className="home-module-number">
              03
            </div>

            <div className="home-module-icon">
              ?
            </div>

            <h3>
              Questions
            </h3>

            <p>
              Explore questions submitted by Members
              and their parliamentary responses.
            </p>

            <span className="home-module-arrow">
              View Questions →
            </span>

          </Link>


          {/* COMMITTEES */}

          <Link
            to="/committees"
            className="home-module-card"
          >

            <div className="home-module-number">
              04
            </div>

            <div className="home-module-icon">
              🏛
            </div>

            <h3>
              Committees
            </h3>

            <p>
              Explore parliamentary committees,
              departments and committee information.
            </p>

            <span className="home-module-arrow">
              View Committees →
            </span>

          </Link>


          {/* PROCEEDINGS */}

          <Link
            to="/proceedings"
            className="home-module-card"
          >

            <div className="home-module-number">
              05
            </div>

            <div className="home-module-icon">
              ▤
            </div>

            <h3>
              Proceedings
            </h3>

            <p>
              Access parliamentary proceedings,
              debates and official records.
            </p>

            <span className="home-module-arrow">
              View Proceedings →
            </span>

          </Link>


          {/* DIGITAL ACCESS */}

          <div className="home-module-card">

            <div className="home-module-number">
              06
            </div>

            <div className="home-module-icon">
              ✓
            </div>

            <h3>
              Digital Access
            </h3>

            <p>
              Access parliamentary information
              anytime through the digital portal.
            </p>

            <span className="home-module-arrow">
              Available 24/7
            </span>

          </div>


        </div>

      </section>


      {/* ==================== FOOTER STRIP ==================== */}

      <section className="home-bottom-strip">

        <div>
          <strong>
            Parliament Portal
          </strong>

          <span>
            Digital Parliament Information System
          </span>
        </div>

        <div>
          Government Information • Parliamentary Services
        </div>

      </section>

    </div>
  )
}

export default Home