import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import "./Members.css"

function Members() {
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState("")
  const [house, setHouse] = useState("All")
  const [party, setParty] = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadMembers = () => {
    setLoading(true)
    setError("")

    fetch("http://127.0.0.1:8000/api/members/members/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Members API could not be loaded")
        }

        return response.json()
      })
      .then((data) => {
        console.log("Members API data:", data)

        if (Array.isArray(data)) {
          setMembers(data)
        } else if (data.results && Array.isArray(data.results)) {
          setMembers(data.results)
        } else {
          setMembers([])
        }

        setLoading(false)
      })
      .catch((error) => {
        console.error("Members loading error:", error)

        setError(
          "Unable to load members. Please make sure Django server is running."
        )

        setLoading(false)
      })
  }

  useEffect(() => {
    loadMembers()
  }, [])

  const parties = useMemo(() => {
    const uniqueParties = members
      .map((member) => member.party)
      .filter(Boolean)

    return [...new Set(uniqueParties)].sort()
  }, [members])

  const housesCount = useMemo(() => {
    return new Set(
      members.map((member) => member.house).filter(Boolean)
    ).size
  }, [members])

  const statesCount = useMemo(() => {
    return new Set(
      members.map((member) => member.state).filter(Boolean)
    ).size
  }, [members])

  const filteredMembers = members.filter((member) => {
    const searchText = search.toLowerCase().trim()

    const matchesSearch =
      member.name?.toLowerCase().includes(searchText) ||
      member.member_id?.toLowerCase().includes(searchText) ||
      member.state?.toLowerCase().includes(searchText) ||
      member.constituency?.toLowerCase().includes(searchText) ||
      member.party?.toLowerCase().includes(searchText)

    const matchesHouse =
      house === "All" || member.house === house

    const matchesParty =
      party === "All" || member.party === party

    return (
      matchesSearch &&
      matchesHouse &&
      matchesParty
    )
  })

  const getInitials = (name) => {
    if (!name) {
      return "MP"
    }

    const words = name.trim().split(" ")

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase()
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase()
  }

  const getPartyShortName = (partyName) => {
    if (!partyName) {
      return "Party"
    }

    const words = partyName
      .split(" ")
      .filter(Boolean)

    if (words.length === 1) {
      return partyName
    }

    return words
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 4)
      .toUpperCase()
  }

  return (
    <div className="members-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="members-hero">

        <div className="members-hero-background">
          <div className="members-glow glow-one"></div>
          <div className="members-glow glow-two"></div>
          <div className="members-grid-pattern"></div>
        </div>

        {/* Parliament Watermark */}
        <div className="parliament-watermark">

          <div className="building-dome">
            <div className="dome-top"></div>
            <div className="dome-main"></div>
            <div className="dome-base"></div>
          </div>

          <div className="building-roof"></div>

          <div className="building-columns">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="building-base"></div>

          <div className="indian-flag">
            <span className="flag-saffron"></span>
            <span className="flag-white">
              <i></i>
            </span>
            <span className="flag-green"></span>
          </div>

        </div>

        <div className="members-hero-content">

          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <strong>Members</strong>
          </div>

          <div className="members-hero-main">

            <div className="members-hero-left">

              <div className="members-label">
                PARLIAMENTARY INFORMATION
              </div>

              <h1>
                Members of <span>Parliament</span>
              </h1>

              <p>
                Explore member profiles, constituencies, parties and
                parliamentary information from across India.
              </p>

              {/* Search */}
              <div className="hero-search">

                <span className="hero-search-icon">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search by name, member ID, state, constituency or party..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />

                <button type="button">
                  Search
                </button>

              </div>

              {/* Filters */}
              <div className="hero-filters">

                <div className="hero-filter">

                  <span>House</span>

                  <select
                    value={house}
                    onChange={(event) =>
                      setHouse(event.target.value)
                    }
                  >
                    <option value="All">
                      All Houses
                    </option>

                    <option value="Lok Sabha">
                      Lok Sabha
                    </option>

                    <option value="Rajya Sabha">
                      Rajya Sabha
                    </option>
                  </select>

                </div>

                <div className="hero-filter">

                  <span>Party</span>

                  <select
                    value={party}
                    onChange={(event) =>
                      setParty(event.target.value)
                    }
                  >
                    <option value="All">
                      All Parties
                    </option>

                    {parties.map((partyName) => (
                      <option
                        key={partyName}
                        value={partyName}
                      >
                        {partyName}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

            </div>

            {/* Statistics */}
            <div className="members-statistics">

              <div className="stat-item">
                <div className="stat-icon">
                  ♟
                </div>

                <div>
                  <strong>
                    {members.length}
                  </strong>

                  <span>
                    Members
                  </span>
                </div>
              </div>

              <div className="stat-divider"></div>

              <div className="stat-item">
                <div className="stat-icon">
                  ♜
                </div>

                <div>
                  <strong>
                    {housesCount}
                  </strong>

                  <span>
                    Houses
                  </span>
                </div>
              </div>

              <div className="stat-divider"></div>

              <div className="stat-item">
                <div className="stat-icon">
                  ◎
                </div>

                <div>
                  <strong>
                    {statesCount}
                  </strong>

                  <span>
                    States & UTs
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="members-container">

        {/* Result Header */}

        {!loading && !error && (
          <div className="members-section-header">

            <div>
              <span className="section-eyebrow">
                DIRECTORY
              </span>

              <h2>
                Parliamentary Members
              </h2>

              <p>
                Browse and explore member information.
              </p>
            </div>

            <div className="members-count">

              <strong>
                {filteredMembers.length}
              </strong>

              <span>
                {filteredMembers.length === 1
                  ? "Member"
                  : "Members"}
              </span>

            </div>

          </div>
        )}


        {/* =========================================
            LOADING
        ========================================= */}

        {loading && (
          <div className="members-message">

            <div className="loading-spinner"></div>

            <p>
              Loading members...
            </p>

          </div>
        )}


        {/* =========================================
            ERROR
        ========================================= */}

        {error && (
          <div className="members-error">

            <div className="error-icon">
              ⚠️
            </div>

            <h3>
              Members could not be loaded
            </h3>

            <p>
              {error}
            </p>

            <button
              onClick={loadMembers}
              className="retry-button"
            >
              Retry
            </button>

          </div>
        )}


        {/* =========================================
            MEMBERS GRID
        ========================================= */}

        {!loading &&
          !error &&
          filteredMembers.length > 0 && (

            <section className="members-grid">

              {filteredMembers.map((member) => (

                <article
                  className="member-card"
                  key={member.id}
                >

                  {/* Card Top */}

                  <div className="member-card-top">

                    <div className="member-photo-wrapper">

                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name || "Member"}
                          className="member-photo"
                        />
                      ) : (
                        <div className="member-avatar">
                          {getInitials(member.name)}
                        </div>
                      )}

                      <span
                        className={
                          member.status === "Active"
                            ? "member-online active"
                            : "member-online"
                        }
                      ></span>

                    </div>

                    <div className="member-basic">

                      <div className="member-top-badges">

                        <span className="house-badge">
                          {member.house || "House"}
                        </span>

                        <span
                          className={
                            member.status === "Active"
                              ? "active-badge"
                              : "inactive-badge"
                          }
                        >
                          {member.status || "Unknown"}
                        </span>

                      </div>

                      <h2>
                        {member.name || "Member"}
                      </h2>

                      <span className="member-id">
                        {member.member_id || "N/A"}
                      </span>

                    </div>

                  </div>


                  {/* Card Details */}

                  <div className="member-details">

                    <div className="member-detail">

                      <div className="detail-icon">
                        ⌂
                      </div>

                      <div className="detail-content">

                        <span>
                          Constituency
                        </span>

                        <strong>
                          {member.constituency || "N/A"}
                        </strong>

                      </div>

                    </div>


                    <div className="member-detail">

                      <div className="detail-icon">
                        ◉
                      </div>

                      <div className="detail-content">

                        <span>
                          State
                        </span>

                        <strong>
                          {member.state || "N/A"}
                        </strong>

                      </div>

                    </div>


                    <div className="member-detail">

                      <div className="detail-icon">
                        ◆
                      </div>

                      <div className="detail-content">

                        <span>
                          Political Party
                        </span>

                        <strong>
                          {member.party || "N/A"}
                        </strong>

                      </div>

                    </div>

                  </div>


                  {/* Card Footer */}

                  <div className="member-card-footer">

                    <div className="party-mark">
                      {getPartyShortName(member.party)}
                    </div>

                    <Link
                      to={`/member-profile?member=${member.id}`}
                      className="view-profile-button"
                    >
                      View Profile
                      <span>→</span>
                    </Link>

                  </div>

                </article>

              ))}

            </section>

          )}


        {/* =========================================
            NO RESULTS
        ========================================= */}

        {!loading &&
          !error &&
          filteredMembers.length === 0 && (

            <div className="no-members">

              <div className="no-members-icon">
                🔎
              </div>

              <h3>
                No members found
              </h3>

              <p>
                Try searching with another name, member ID,
                state, constituency or party.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("")
                  setHouse("All")
                  setParty("All")
                }}
              >
                Clear Filters
              </button>

            </div>

          )}

      </main>

    </div>
  )
}

export default Members