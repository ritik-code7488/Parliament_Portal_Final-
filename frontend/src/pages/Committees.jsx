import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Committees.css"
import API_BASE_URL from "../api"


function Committees() {

  const [committees, setCommittees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  useEffect(() => {

    fetch(`${API_BASE_URL}/api/committees/committees/`)

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch committees")
        }

        return response.json()

      })

      .then((data) => {

        setCommittees(
          Array.isArray(data)
            ? data
            : []
        )

        setLoading(false)

      })

      .catch((error) => {

        console.error(
          "Committee API error:",
          error
        )

        setError(
          "Unable to load committee information."
        )

        setLoading(false)

      })

  }, [])


  return (

    <div className="committees-page">


      {/* HEADER */}

      <section className="committees-header">

        <div>

          <span className="committees-eyebrow">
            PARLIAMENTARY SERVICES
          </span>

          <h1>
            Committees
          </h1>

          <p>
            Explore parliamentary committees,
            chairpersons, departments and committee information.
          </p>

        </div>


        <div className="committees-count-card">

          <strong>
            {committees.length}
          </strong>

          <span>
            Committees
          </span>

        </div>

      </section>


      {/* CONTENT */}

      <section className="committees-content">


        {/* LOADING */}

        {loading && (

          <div className="committee-message">

            <div className="committee-loader"></div>

            <p>
              Loading committees...
            </p>

          </div>

        )}


        {/* ERROR */}

        {!loading && error && (

          <div className="committee-message error">

            <h3>
              Unable to load data
            </h3>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          committees.length === 0 && (

            <div className="committee-message">

              <h3>
                No committees found
              </h3>

              <p>
                Committee information is not available yet.
              </p>

            </div>

          )}


        {/* COMMITTEE CARDS */}

        {!loading &&
          !error &&
          committees.length > 0 && (

            <div className="committee-grid">

              {committees.map((committee) => (

                <div
                  className="committee-card"
                  key={committee.id}
                >


                  <div className="committee-card-top">

                    <span className="committee-icon">
                      ♙
                    </span>

                    <span
                      className={
                        committee.status === "Active"
                          ? "committee-status active"
                          : "committee-status"
                      }
                    >
                      {committee.status}
                    </span>

                  </div>


                  <h2>
                    {committee.name}
                  </h2>


                  <p className="committee-description">
                    {committee.description ||
                      "Committee information is available through the Parliament Portal."}
                  </p>


                  <div className="committee-details">


                    <div className="committee-detail">

                      <span>
                        Chairperson
                      </span>

                      <strong>
                        {committee.chairperson}
                      </strong>

                    </div>


                    <div className="committee-detail">

                      <span>
                        Department
                      </span>

                      <strong>
                        {committee.department}
                      </strong>

                    </div>


                    <div className="committee-detail">

                      <span>
                        House
                      </span>

                      <strong>
                        {committee.house}
                      </strong>

                    </div>


                    <div className="committee-detail">

                      <span>
                        Members
                      </span>

                      <strong>
                        {committee.member_count}
                      </strong>

                    </div>


                  </div>


                  <div className="committee-card-footer">

                    <span>
                      Established:{" "}
                      {committee.established_date || "Not specified"}
                    </span>

                    <Link
                      to={`/committee-details?committee=${committee.id}`}
                      className="committee-view-button"
                    >
                      View Details →
                    </Link>

                  </div>


                </div>

              ))}

            </div>

          )}

      </section>

    </div>

  )

}


export default Committees