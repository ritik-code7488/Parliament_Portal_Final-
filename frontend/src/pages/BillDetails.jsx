import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import "./BillDetails.css"
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

function BillDetails() {
  const [searchParams] = useSearchParams()
  const billId = searchParams.get("bill")

  const [bill, setBill] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!billId) {
      setLoading(false)
      return
    }

    fetch(`${API_BASE_URL}/api/bills/${billId}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch bill")
        }

        return response.json()
      })
      .then((data) => {
        setBill(data)
      })
      .catch((error) => {
        console.error("Bill details API error:", error)

        const demoBill = demoBills.find(
          (item) => String(item.id) === String(billId)
        )

        setBill(demoBill || null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [billId])

  const formatDate = (date) => {
    if (!date) {
      return "—"
    }

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

  const getStatusClass = (status) => {
    switch (status) {
      case "Passed":
        return "detail-status-passed"

      case "Under Discussion":
        return "detail-status-discussion"

      case "Rejected":
        return "detail-status-rejected"

      case "Withdrawn":
        return "detail-status-withdrawn"

      default:
        return "detail-status-introduced"
    }
  }

  const isCurrentStatus = (status) => {
    return String(bill?.status || "").toLowerCase() ===
      String(status).toLowerCase()
  }

  if (loading) {
    return (
      <div className="bill-details-page">
        <div className="bill-details-loading">

          <div className="detail-spinner"></div>

          <h2>
            Loading Bill Details...
          </h2>

          <p>
            Fetching the selected legislative record.
          </p>

        </div>
      </div>
    )
  }

  if (!bill) {
    return (
      <div className="bill-details-page">

        <div className="bill-not-found">

          <div className="not-found-icon">
            !
          </div>

          <span>
            LEGISLATIVE RECORD
          </span>

          <h1>
            Bill Not Found
          </h1>

          <p>
            The requested bill could not be found in the Parliament Portal.
          </p>

          <Link
            to="/bills"
            className="back-to-bills"
          >
            ← Back to Bills
          </Link>

        </div>

        <footer className="bill-details-footer">

          <div className="bill-details-footer-inner">

            <div>

              <strong>
                🏛 Parliament Portal
              </strong>

              <p>
                Digital Parliament Information System
              </p>

            </div>

            <div className="details-footer-right">
              © 2026 Parliament Portal • Demo Project
            </div>

          </div>

        </footer>

      </div>
    )
  }

  return (
    <div className="bill-details-page">

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="bill-details-hero">

        <div className="bill-details-hero-content">

          <Link
            to="/bills"
            className="details-back-link"
          >
            ← Back to Bills
          </Link>

          <div className="details-eyebrow">
            <span></span>
            PARLIAMENTARY LEGISLATION
          </div>

          <div className="details-bill-number">
            {bill.bill_number || "BILL"}
          </div>

          <h1>
            {bill.title || "Bill Details"}
          </h1>

          <p>
            Detailed information about this parliamentary legislative
            proposal and its current status.
          </p>

        </div>

        <div className="details-hero-pattern"></div>

      </section>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="bill-details-main">


        {/* ===================================================
            STATUS CARD
            =================================================== */}

        <section className="bill-status-card">

          <div className="bill-status-main">

            <span className="detail-label">
              CURRENT STATUS
            </span>

            <span
              className={`detail-status ${getStatusClass(
                bill.status
              )}`}
            >
              {bill.status || "Introduced"}
            </span>

          </div>


          <div className="status-house">

            <span className="detail-label">
              HOUSE
            </span>

            <strong>
              {bill.house || "—"}
            </strong>

          </div>

        </section>


        {/* ===================================================
            INFORMATION
            =================================================== */}

        <section className="bill-information-section">

          <div className="details-section-heading">

            <span>
              LEGISLATIVE RECORD
            </span>

            <h2>
              Bill Information
            </h2>

          </div>


          <div className="bill-information-grid">

            <div className="information-card">

              <span>
                BILL NUMBER
              </span>

              <strong>
                {bill.bill_number || "—"}
              </strong>

            </div>


            <div className="information-card">

              <span>
                INTRODUCED BY
              </span>

              <strong>
                {bill.introduced_by || "—"}
              </strong>

            </div>


            <div className="information-card">

              <span>
                INTRODUCTION DATE
              </span>

              <strong>
                {formatDate(bill.introduction_date)}
              </strong>

            </div>


            <div className="information-card">

              <span>
                HOUSE
              </span>

              <strong>
                {bill.house || "—"}
              </strong>

            </div>

          </div>

        </section>


        {/* ===================================================
            DESCRIPTION
            =================================================== */}

        <section className="bill-description-section">

          <div className="details-section-heading">

            <span>
              LEGISLATIVE SUMMARY
            </span>

            <h2>
              About This Bill
            </h2>

          </div>


          <div className="description-card">

            <div className="description-icon">
              §
            </div>

            <div>

              <h3>
                {bill.title || "Bill Details"}
              </h3>

              <p>
                {bill.description ||
                  "No description is currently available for this legislative record."}
              </p>

            </div>

          </div>

        </section>


        {/* ===================================================
            TIMELINE
            =================================================== */}

        <section className="bill-timeline-section">

          <div className="details-section-heading">

            <span>
              LEGISLATIVE PROCESS
            </span>

            <h2>
              Bill Status Timeline
            </h2>

          </div>


          <div className="timeline-card">


            <div
              className={`timeline-item ${
                isCurrentStatus("Introduced") ||
                bill.status === "Under Discussion" ||
                bill.status === "Passed"
                  ? "active"
                  : ""
              }`}
            >

              <div className="timeline-dot">
                1
              </div>

              <div>

                <strong>
                  Bill Introduced
                </strong>

                <span>
                  {formatDate(bill.introduction_date)}
                </span>

              </div>

            </div>


            <div
              className={`timeline-item ${
                isCurrentStatus("Under Discussion") ||
                bill.status === "Passed"
                  ? "active"
                  : ""
              }`}
            >

              <div className="timeline-dot">
                2
              </div>

              <div>

                <strong>
                  Under Discussion
                </strong>

                <span>
                  Parliamentary consideration and discussion
                </span>

              </div>

            </div>


            <div
              className={`timeline-item ${
                isCurrentStatus("Passed")
                  ? "active"
                  : ""
              }`}
            >

              <div className="timeline-dot">
                3
              </div>

              <div>

                <strong>
                  Passed
                </strong>

                <span>
                  Legislative approval stage
                </span>

              </div>

            </div>


          </div>

        </section>


        {/* ===================================================
            BOTTOM ACTION
            =================================================== */}

        <div className="details-bottom-action">

          <Link
            to="/bills"
            className="details-back-button"
          >
            ← Back to Bills & Acts
          </Link>

        </div>

      </main>


      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="bill-details-footer">

        <div className="bill-details-footer-inner">

          <div>

            <strong>
              🏛 Parliament Portal
            </strong>

            <p>
              Digital Parliament Information System
            </p>

          </div>

          <div className="details-footer-right">
            © 2026 Parliament Portal • Demo Project
          </div>

        </div>

      </footer>

    </div>
  )
}

export default BillDetails