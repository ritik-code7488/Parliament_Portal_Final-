import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import API_BASE_URL from "../api"
import "./MemberProfile.css"

function MemberProfile() {
  const [searchParams] = useSearchParams()
  const memberId = searchParams.get("member")

  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!memberId) {
      setError("Member ID is missing.")
      setLoading(false)
      return
    }

    fetch(`${API_BASE_URL}/api/members/members/${memberId}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Member not found")
        }
        return response.json()
      })
      .then((data) => {
        console.log("Member Profile API:", data)
        setMember(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Member profile error:", error)
        setError("Unable to load member profile.")
        setLoading(false)
      })
  }, [memberId])

  const getInitials = (name) => {
    if (!name) return "MP"
    const words = name.trim().split(" ")
    if (words.length === 1) return words[0].charAt(0).toUpperCase()
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
  }

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-message">
          <div className="profile-spinner"></div>
          <h2>Loading Parliamentary Dossier...</h2>
          <p>Please wait while the official member profile is securely retrieved.</p>
        </div>
      </div>
    )
  }

  if (error || !member) {
    return (
      <div className="profile-page">
        <div className="profile-message profile-error">
          <div className="profile-error-icon">⚠</div>
          <h2>Member Profile Error</h2>
          <p>{error || "Member record could not be found."}</p>
          <div style={{ marginTop: "20px" }}>
            <Link to="/members" className="profile-back-button">
              ← Back to Members Directory
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isMpActive = member.status ? member.status.toLowerCase() === "active" : true
  const officialEmail = member.email || (member.member_id ? `${member.member_id.toLowerCase()}@sansad.nic.in` : "mp.sansad@nic.in")
  const officialPhone = member.phone || member.contact || "+91 (011) 2303-4000"
  const constituencyAddr = member.address || member.permanent_address || `${member.constituency || 'Constituency'}, ${member.state || 'India'}`
  const delhiAddr = member.delhi_address || "Sansad Marg, Official Residence, New Delhi - 110001"

  return (
    <div className="profile-page">

      {/* Hero Section */}
      <section className="profile-hero">
        <div className="profile-hero-content">

          <div className="profile-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/members">Members</Link>
            <span>›</span>
            <strong>{member.name}</strong>
          </div>

          <div className="profile-hero-label">
            OFFICIAL PARLIAMENTARY DOSSIER
          </div>

          <h1>
            {member.name} <span>(Hon'ble MP)</span>
          </h1>

          <p>
            Official parliamentary mandate, representation for{" "}
            <strong>{member.constituency || "General"}</strong>,{" "}
            <strong>{member.state || "National"}</strong> in the{" "}
            <strong>{member.house || "Lok Sabha"}</strong>.
          </p>

        </div>
      </section>

      {/* Main Container */}
      <div className="profile-container">

        <div style={{ marginBottom: "22px" }}>
          <Link to="/members" className="profile-back-button">
            ← Return to Members Directory
          </Link>
        </div>

        {/* Master Profile Card */}
        <div className="profile-main-card">

          {/* Profile Header */}
          <div className="profile-main-header">
            <div className="profile-photo-area">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="profile-photo"
                />
              ) : (
                <div className="profile-avatar">
                  {getInitials(member.name)}
                </div>
              )}
              <span
                className={`profile-status-dot ${isMpActive ? "active" : ""}`}
                title={isMpActive ? "Active Serving Member" : "Inactive"}
              ></span>
            </div>

            <div className="profile-member-info">
              <div className="profile-badges">
                <span className="profile-house-badge">
                  🏛️ {member.house || "Lok Sabha"}
                </span>

                <span
                  className={
                    isMpActive
                      ? "profile-active-badge"
                      : "profile-inactive-badge"
                  }
                >
                  {member.status || "Active Member"}
                </span>

                {member.party && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "750",
                      background: "#fffbeb",
                      color: "#b45309",
                      border: "1px solid #fde68a",
                    }}
                  >
                    🚩 {member.party}
                  </span>
                )}
              </div>

              <h2>{member.name}</h2>

              <p className="profile-member-id">
                Parliamentary Identification: <strong>{member.member_id || `MP-${member.id}`}</strong>
              </p>

              <p className="profile-party">
                Political Party: <strong>{member.party || "Independent / Unaffiliated"}</strong>
              </p>
            </div>
          </div>

          <div className="profile-divider"></div>

          {/* Parliamentary Representation Grid */}
          <div className="profile-section-heading">
            <div className="profile-section-icon">
              🏛️
            </div>
            <div>
              <span>REPRESENTATION & MANDATE</span>
              <h3>Parliamentary Credentials</h3>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-item">
              <span>Constituency</span>
              <strong>{member.constituency || "General"}</strong>
            </div>

            <div className="profile-item">
              <span>State / Union Territory</span>
              <strong>{member.state || "National"}</strong>
            </div>

            <div className="profile-item">
              <span>House of Parliament</span>
              <strong>{member.house || "Lok Sabha"}</strong>
            </div>

            <div className="profile-item">
              <span>Party Affiliation</span>
              <strong>{member.party || "Independent"}</strong>
            </div>

            <div className="profile-item">
              <span>Membership Status</span>
              <strong style={{ color: isMpActive ? "#059669" : "#64748b" }}>
                {isMpActive ? "✓ Active Serving MP" : "Inactive / Retired"}
              </strong>
            </div>

            <div className="profile-item">
              <span>Gender / Category</span>
              <strong>{member.gender || "General Category"}</strong>
            </div>
          </div>

          <div className="profile-divider"></div>

          {/* Contact & Secretariat Info */}
          <div className="profile-section-heading">
            <div className="profile-section-icon">
              📞
            </div>
            <div>
              <span>SECRETARIAT & COMMUNICATION</span>
              <h3>Official Contact & Addresses</h3>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-item">
              <span>Official Sansad Email</span>
              <strong>{officialEmail}</strong>
            </div>

            <div className="profile-item">
              <span>Secretariat Telephone</span>
              <strong>{officialPhone}</strong>
            </div>

            <div className="profile-item profile-address">
              <span>Permanent Constituency Address</span>
              <strong>{constituencyAddr}</strong>
            </div>

            <div className="profile-item profile-address">
              <span>Delhi Official Residence</span>
              <strong>{delhiAddr}</strong>
            </div>
          </div>

          {/* Action Row */}
          <div className="profile-actions">
            <Link to="/members" className="profile-back-button">
              ← Return to Members Directory
            </Link>
          </div>

        </div>

      </div>

    </div>
  )
}

export default MemberProfile
