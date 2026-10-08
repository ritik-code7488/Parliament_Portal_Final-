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

  return (
    <div className="profile-page">
      <div className="profile-container">
        <Link to="/members" className="profile-back-button">
          ← Back to Members
        </Link>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-photo">
              {member.photo ? (
                <img src={member.photo} alt={member.name} />
              ) : (
                <div className="profile-photo-placeholder">
                  {member.name ? member.name.charAt(0).toUpperCase() : "M"}
                </div>
              )}
            </div>

            <div className="profile-title">
              <h1>{member.name}</h1>

              {member.member_id && (
                <p className="profile-member-id">
                  Member ID: {member.member_id}
                </p>
              )}
            </div>
          </div>

          <div className="profile-details">
            {Object.entries(member).map(([key, value]) => {
              if (
                key === "photo" ||
                key === "id" ||
                value === null ||
                value === ""
              ) {
                return null
              }

              return (
                <div className="profile-detail-row" key={key}>
                  <strong>
                    {key
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (letter) => letter.toUpperCase())}
                  </strong>

                  <span>
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : String(value)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberProfile