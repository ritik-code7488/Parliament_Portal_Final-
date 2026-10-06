import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import "./Documents.css"
import API_BASE_URL from "../api"


function Documents() {
  const [documents, setDocuments] = useState([])
  const [searchText, setSearchText] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  useEffect(() => {
    fetch(`${API_BASE_URL}/api/documents/documents/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load documents")
        }

        return response.json()
      })
      .then((data) => {
        setDocuments(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Documents API error:", err)
        setError("Unable to load documents.")
        setLoading(false)
      })
  }, [])


  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const search = searchText.toLowerCase().trim()

      const matchesSearch =
        document.document_id?.toLowerCase().includes(search) ||
        document.title?.toLowerCase().includes(search) ||
        document.description?.toLowerCase().includes(search) ||
        document.house?.toLowerCase().includes(search)

      const matchesType =
        typeFilter === "All" ||
        document.document_type === typeFilter

      const matchesStatus =
        statusFilter === "All" ||
        document.status === statusFilter

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      )
    })
  }, [
    documents,
    searchText,
    typeFilter,
    statusFilter,
  ])


  const documentTypes = [
    "All",
    "Bill",
    "Question",
    "Proceeding",
    "Committee",
    "Report",
    "Other",
  ]


  const statusOptions = [
    "All",
    "Available",
    "Archived",
  ]


  const totalDocuments = documents.length

  const availableDocuments = documents.filter(
    (document) => document.status === "Available"
  ).length

  const archivedDocuments = documents.filter(
    (document) => document.status === "Archived"
  ).length


  if (loading) {
    return (
      <div className="documents-page">

        <div className="documents-loading">
          Loading documents...
        </div>

      </div>
    )
  }


  if (error) {
    return (
      <div className="documents-page">

        <div className="documents-error">
          {error}
        </div>

      </div>
    )
  }


  return (
    <div className="documents-page">

      <div className="documents-hero">

        <div className="documents-hero-content">

          <span className="documents-eyebrow">
            PARLIAMENTARY DOCUMENTS
          </span>

          <h1>
            Documents
          </h1>

          <p>
            Access parliamentary documents, reports,
            proceedings, questions and committee records
            through one centralized digital library.
          </p>

        </div>

      </div>


      <div className="documents-container">

        <div className="documents-stat-grid">

          <div className="documents-stat-card">

            <span className="documents-stat-label">
              Total Documents
            </span>

            <strong>
              {totalDocuments}
            </strong>

          </div>


          <div className="documents-stat-card">

            <span className="documents-stat-label">
              Available
            </span>

            <strong>
              {availableDocuments}
            </strong>

          </div>


          <div className="documents-stat-card">

            <span className="documents-stat-label">
              Archived
            </span>

            <strong>
              {archivedDocuments}
            </strong>

          </div>

        </div>


        <div className="documents-filter-panel">

          <div className="documents-search-box">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search documents..."
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
            />

          </div>


          <div className="documents-filter-group">

            <label>
              Document Type
            </label>

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
            >
              {documentTypes.map((type) => (

                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>

              ))}
            </select>

          </div>


          <div className="documents-filter-group">

            <label>
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              {statusOptions.map((status) => (

                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>

              ))}
            </select>

          </div>

        </div>


        <div className="documents-result-heading">

          <div>

            <span>
              DOCUMENT LIBRARY
            </span>

            <h2>
              Parliamentary Records
            </h2>

          </div>

          <strong>
            {filteredDocuments.length} Records
          </strong>

        </div>


        {filteredDocuments.length === 0 ? (

          <div className="documents-empty">

            <div className="documents-empty-icon">
              📄
            </div>

            <h3>
              No Documents Found
            </h3>

            <p>
              Try changing your search or filter.
            </p>

          </div>

        ) : (

          <div className="documents-grid">

            {filteredDocuments.map((document) => (

              <div
                className="document-card"
                key={document.id}
              >

                <div className="document-card-top">

                  <div className="document-icon">
                    📄
                  </div>

                  <span
                    className={`document-type-badge document-type-${document.document_type.toLowerCase()}`}
                  >
                    {document.document_type}
                  </span>

                </div>


                <div className="document-card-body">

                  <span className="document-id">
                    {document.document_id}
                  </span>

                  <h3>
                    {document.title}
                  </h3>

                  <p>
                    {document.description}
                  </p>


                  <div className="document-meta">

                    <div>

                      <span>
                        House
                      </span>

                      <strong>
                        {document.house || "-"}
                      </strong>

                    </div>


                    <div>

                      <span>
                        Date
                      </span>

                      <strong>
                        {document.document_date || "-"}
                      </strong>

                    </div>


                    <div>

                      <span>
                        Status
                      </span>

                      <strong
                        className={
                          document.status === "Available"
                            ? "document-status-available"
                            : "document-status-archived"
                        }
                      >
                        {document.status}
                      </strong>

                    </div>

                  </div>

                </div>


                <div className="document-card-footer">

                  <span>
                    {document.file_name}
                  </span>


                  <Link
                    to={`/document-details?document=${document.id}`}
                    className="document-view-button"
                  >
                    View Document →
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  )
}


export default Documents