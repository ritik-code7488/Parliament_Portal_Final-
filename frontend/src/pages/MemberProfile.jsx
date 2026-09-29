import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
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

    fetch(`http://127.0.0.1:8000/api/members/members/${memberId}/`)
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

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-message">
          <div className="profile-spinner"></div>
          <h2>Loading Member Profile...</h2>
          <p>Please wait while the member information is being loaded.</p>
        </div>
      </div>
    )
  }

  if (error || !member) {
    return (
      <div className="profile-page">
        <div className="profile-message profile-error">
          <div className="profile-error-icon">⚠</div>

          <h2>Member Profile</h2>

          <p>{error || "Member not found."}</p>

          <Link to="/members" className="profile-back-button">
            ← Back to Members
          </Link>
        </div>
      </div>
    )
  }

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

  return (
    <div className="profile-page">

      <section className="profile-hero">

        <div className="profile-hero-glow profile-glow-one"></div>
        <div className="profile-hero-glow profile-glow-two"></div>

        <div className="profile-hero-content">

          <div className="profile-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/members">Members</Link>
            <span>›</span>
            <strong>Profile</strong>
          </div>

          <div className="profile-hero-label">
            PARLIAMENTARY MEMBER
          </div>

          <h1>
            Member <span>Profile</span>
          </h1>

          <p>
            Detailed parliamentary information and official profile
            of the selected Member of Parliament.
          </p>

        </div>

      </section>

      <main className="profile-container">

        <section className="profile-main-card">

          <div className="profile-main-header">

            <div className="profile-photo-area">

              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name || "Member"}
                  className="profile-photo"
                />
              ) : (
                <div className="profile-avatar">
                  {getInitials(member.name)}
                </div>
              )}

              <span
                className={
                  member.status === "Active"
                    ? "profile-status-dot active"
                    : "profile-status-dot"
                }
              ></span>

            </div>

            <div className="profile-member-info">

              <div className="profile-badges">

                <span className="profile-house-badge">
                  {member.house || "House"}
                </span>

                <span
                  className={
                    member.status === "Active"
                      ? "profile-active-badge"
                      : "profile-inactive-badge"
                  }
                >
                  {member.status || "Unknown"}
                </span>

              </div>

              <h2>
                {member.name || "Member"}
              </h2>

              <p className="profile-member-id">
                Member ID: <strong>{member.member_id || "N/A"}</strong>
              </p>

              <p className="profile-party">
                {member.party || "Political Party not available"}
              </p>

            </div>

          </div>

          <div className="profile-divider"></div>

          <div className="profile-section-heading">
            <span className="profile-section-icon">▣</span>

            <div>
              <span>PARLIAMENTARY DETAILS</span>
              <h3>Member Information</h3>
            </div>
          </div>

          <div className="profile-grid">

            <div className="profile-item">
              <span>House</span>
              <strong>{member.house || "Not Available"}</strong>
            </div>

            <div className="profile-item">
              <span>State</span>
              <strong>{member.state || "Not Available"}</strong>
            </div>

            <div className="profile-item">
              <span>Constituency</span>
              <strong>{member.constituency || "Not Available"}</strong>
            </div>

            <div className="profile-item">
              <span>Political Party</span>
              <strong>{member.party || "Not Available"}</strong>
            </div>

            <div className="profile-item">
              <span>Date of Birth</span>
              <strong>{member.date_of_birth || "Not Available"}</strong>
            </div>

            <div className="profile-item">
              <span>Gender</span>
              <strong>{member.gender || "Not Available"}</strong>
            </div>

            <div className="profile-item">
              <span>Education</span>
              <strong>{member.education || "Not Available"}</strong>
            </div>

            <div className="profile-item">
              <span>Profession</span>
              <strong>{member.profession || "Not Available"}</strong>
            </div>

          </div>

          <div className="profile-divider"></div>

          <div className="profile-section-heading">
            <span className="profile-section-icon">✉</span>

            <div>
              <span>CONTACT INFORMATION</span>
              <h3>Official Contact Details</h3>
            </div>
          </div>

          <div className="profile-grid">

            <div className="profile-item">
              <span>Email</span>
              <strong>{member.email || "Not Available"}</strong>
            </div>

            <div className="profile-item">
              <span>Phone</span>
              <strong>{member.phone || "Not Available"}</strong>
            </div>

            <div className="profile-item">
              <span>Joining Date</span>
              <strong>{member.joining_date || "Not Available"}</strong>
            </div>

            <div className="profile-item profile-address">
              <span>Address</span>
              <strong>{member.address || "Not Available"}</strong>
            </div>

          </div>

          <div className="profile-actions">

            <Link
              to="/members"
              className="profile-back-button"
            >
              ← Back to Members
            </Link>

          </div>

        </section>

      </main>

    </div>
  )
}

export default MemberProfile