import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import "./Bills.css"
import API_BASE_URL from "../api"

const demoBills = [
  {
    id: 1,
    bill_number: "BILL-001",
    title: "Education Reform Bill",
    description:
      "A comprehensive proposal focused on improving education infrastructure, accessibility and digital learning.",
    house: "Lok Sabha",
    introduced_by: "Demo Member One",
    introduction_date: "2026-09-01",
    status: "Introduced",
  },
  {
    id: 2,
    bill_number: "BILL-002",
    title: "Digital India Bill",
    description:
      "A legislative proposal focused on digital governance, technology services and citizen access.",
    house: "Rajya Sabha",
    introduced_by: "Demo Member Two",
    introduction_date: "2026-08-28",
    status: "Under Discussion",
  },
  {
    id: 3,
    bill_number: "BILL-003",
    title: "Public Health Infrastructure Bill",
    description:
      "A proposal supporting modern public healthcare infrastructure and improved medical services.",
    house: "Lok Sabha",
    introduced_by: "Demo Member Three",
    introduction_date: "2026-08-22",
    status: "Passed",
  },
  {
    id: 4,
    bill_number: "BILL-004",
    title: "National Skill Development Bill",
    description:
      "A proposed framework for expanding vocational training and employment-oriented skill development.",
    house: "Lok Sabha",
    introduced_by: "Demo Member Four",
    introduction_date: "2026-08-18",
    status: "Under Discussion",
  },
  {
    id: 5,
    bill_number: "BILL-005",
    title: "Environmental Protection Bill",
    description:
      "A legislative proposal addressing environmental conservation, sustainability and ecological protection.",
    house: "Rajya Sabha",
    introduced_by: "Demo Member Five",
    introduction_date: "2026-08-12",
    status: "Introduced",
  },
  {
    id: 6,
    bill_number: "BILL-006",
    title: "Digital Governance Bill",
    description:
      "A proposal aimed at strengthening digital public services and transparent government processes.",
    house: "Rajya Sabha",
    introduced_by: "Demo Member Six",
    introduction_date: "2026-08-05",
    status: "Introduced",
  },
]

function Bills() {
  const [bills, setBills] = useState([])
  const [search, setSearch] = useState("")
  const [house, setHouse] = useState("All Houses")
  const [status, setStatus] = useState("All Status")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/bills/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch bills")
        }

        return response.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBills(data)
        } else if (data?.results && data.results.length > 0) {
          setBills(data.results)
        } else {
          setBills(demoBills)
        }
      })
      .catch((error) => {
        console.error("Bills API error:", error)
        setBills(demoBills)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const searchText = search.toLowerCase().trim()

      const matchesSearch =
        !searchText ||
        bill.bill_number?.toLowerCase().includes(searchText) ||
        bill.title?.toLowerCase().includes(searchText) ||
        bill.introduced_by?.toLowerCase().includes(searchText) ||
        bill.description?.toLowerCase().includes(searchText)

      const matchesHouse =
        house === "All Houses" || bill.house === house

      const matchesStatus =
        status === "All Status" || bill.status === status

      return matchesSearch && matchesHouse && matchesStatus
    })
  }, [bills, search, house, status])

  const totalBills = bills.length

  const underDiscussion = bills.filter(
    (bill) => bill.status === "Under Discussion"
  ).length

  const passedBills = bills.filter(
    (bill) => bill.status === "Passed"
  ).length

  const getStatusClass = (billStatus) => {
    switch (billStatus) {
      case "Passed":
        return "status-passed"

      case "Under Discussion":
        return "status-discussion"

      case "Rejected":
        return "status-rejected"

      case "Withdrawn":
        return "status-withdrawn"

      case "Introduced":
      default:
        return "status-introduced"
    }
  }

  const formatDate = (date) => {
    if (!date) return "—"

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return date
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="bills-page">

      {/* HERO */}

      <section className="bills-hero">

        <div className="bills-hero-content">

          <div className="bills-eyebrow">
            <span></span>
            PARLIAMENTARY LEGISLATION
          </div>

          <h1>
            Bills & Acts
          </h1>

          <p>
            Explore parliamentary bills, legislative proposals and
            their current status across both Houses of Parliament.
          </p>

        </div>

        <div className="bills-hero-pattern"></div>

      </section>


      {/* STATISTICS */}

      <section className="bills-stats-wrapper">

        <div className="bills-stats">

          <div className="bill-stat-card">

            <div className="bill-stat-icon">
              ▤
            </div>

            <div>
              <span>
                Total Bills
              </span>

              <strong>
                {totalBills}
              </strong>
            </div>

          </div>


          <div className="bill-stat-card">

            <div className="bill-stat-icon">
              ◉
            </div>

            <div>
              <span>
                Under Discussion
              </span>

              <strong>
                {underDiscussion}
              </strong>
            </div>

          </div>


          <div className="bill-stat-card">

            <div className="bill-stat-icon">
              ✓
            </div>

            <div>
              <span>
                Passed
              </span>

              <strong>
                {passedBills}
              </strong>
            </div>

          </div>


          <div className="bill-stat-card">

            <div className="bill-stat-icon">
              #
            </div>

            <div>
              <span>
                Showing
              </span>

              <strong>
                {filteredBills.length}
              </strong>
            </div>

          </div>

        </div>

      </section>


      {/* SEARCH / FILTER */}

      <main className="bills-main">

        <section className="bills-filter-card">

          <div className="filter-heading">

            <div>

              <span>
                LEGISLATIVE DATABASE
              </span>

              <h2>
                Find a Bill
              </h2>

            </div>

            <div className="result-count">
              {filteredBills.length} results
            </div>

          </div>


          <div className="bill-filters">

            <div className="bill-search-box">

              <span>
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by bill number, title or member..."
              />

            </div>


            <select
              value={house}
              onChange={(event) =>
                setHouse(event.target.value)
              }
            >

              <option>
                All Houses
              </option>

              <option>
                Lok Sabha
              </option>

              <option>
                Rajya Sabha
              </option>

            </select>


            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >

              <option>
                All Status
              </option>

              <option>
                Introduced
              </option>

              <option>
                Under Discussion
              </option>

              <option>
                Passed
              </option>

              <option>
                Rejected
              </option>

              <option>
                Withdrawn
              </option>

            </select>

          </div>

        </section>


        {/* BILL LIST */}

        <section className="bills-records">

          <div className="records-heading">

            <div>

              <span>
                LEGISLATIVE RECORDS
              </span>

              <h2>
                Parliamentary Bills
              </h2>

            </div>

          </div>


          {loading ? (

            <div className="bills-empty-state">

              <div className="loading-spinner"></div>

              <h3>
                Loading Bills...
              </h3>

              <p>
                Fetching legislative records from the Parliament Portal.
              </p>

            </div>

          ) : filteredBills.length === 0 ? (

            <div className="bills-empty-state">

              <div className="empty-icon">
                🔎
              </div>

              <h3>
                No bills found
              </h3>

              <p>
                Try changing your search or filters.
              </p>

            </div>

          ) : (

            <div className="bill-grid">

              {filteredBills.map((bill) => (

                <article
                  className="bill-card"
                  key={bill.id || bill.bill_number}
                >

                  <div className="bill-card-top">

                    <span className="bill-number">
                      {bill.bill_number}
                    </span>

                    <span className="house-badge">
                      {bill.house}
                    </span>

                  </div>


                  <div className="bill-card-body">

                    <span
                      className={`status-badge ${getStatusClass(
                        bill.status
                      )}`}
                    >
                      {bill.status}
                    </span>


                    <h3>
                      {bill.title}
                    </h3>


                    <p className="bill-description">
                      {bill.description}
                    </p>


                    <div className="bill-meta">

                      <div>

                        <span>
                          Introduced By
                        </span>

                        <strong>
                          {bill.introduced_by || "—"}
                        </strong>

                      </div>


                      <div>

                        <span>
                          Introduction Date
                        </span>

                        <strong>
                          {formatDate(
                            bill.introduction_date
                          )}
                        </strong>

                      </div>

                    </div>

                  </div>


                  <div className="bill-card-footer">

                    <Link
                      to={`/bill-details?bill=${bill.id}`}
                      className="bill-details-button"
                    >
                      View Details
                      <span>
                        →
                      </span>
                    </Link>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>


      </main>


      {/* FOOTER */}

      <footer className="bills-footer">

        <div className="bills-footer-inner">

          <div>

            <strong>
              🏛 Parliament Portal
            </strong>

            <p>
              Digital Parliament Information System
            </p>

          </div>

          <div className="bills-footer-right">
            © 2026 Parliament Portal • Demo Project
          </div>

        </div>

      </footer>

    </div>
  )
}

export default Bills