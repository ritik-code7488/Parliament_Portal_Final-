import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"


function DocumentDetails() {
  const [searchParams] = useSearchParams()
  const documentId = searchParams.get("document")

  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  useEffect(() => {
    if (!documentId) {
      setError("Document ID is missing.")
      setLoading(false)
      return
    }

    fetch(
      `http://127.0.0.1:8000/api/documents/documents/${documentId}/`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load document details.")
        }

        return response.json()
      })
      .then((data) => {
        setDocument(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Document details error:", err)
        setError("Unable to load document details.")
        setLoading(false)
      })
  }, [documentId])


  if (loading) {
    return (
      <div className="document-details-page">

        <style>{documentDetailsStyles}</style>

        <div className="document-details-shell">

          <div className="document-details-message">
            Loading document details...
          </div>

        </div>

      </div>
    )
  }


  if (error || !document) {
    return (
      <div className="document-details-page">

        <style>{documentDetailsStyles}</style>

        <div className="document-details-shell">

          <div className="document-details-message">

            <div className="document-error-icon">
              !
            </div>

            <h1>
              Document Not Found
            </h1>

            <p>
              {error || "The requested document could not be found."}
            </p>

            <Link
              to="/documents"
              className="document-back-button"
            >
              ← Back to Documents
            </Link>

          </div>

        </div>

      </div>
    )
  }


  const localFileUrl = document.file_name
    ? `/documents/${document.file_name}`
    : ""


  return (
    <div className="document-details-page">

      <style>{documentDetailsStyles}</style>


      <section className="document-details-hero">

        <div className="document-details-hero-inner">

          <div className="document-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>
              ›
            </span>

            <Link to="/documents">
              Documents
            </Link>

            <span>
              ›
            </span>

            <span>
              Details
            </span>

          </div>


          <span className="document-details-eyebrow">
            PARLIAMENTARY DOCUMENT
          </span>


          <h1>
            {document.title}
          </h1>


          <p>
            {document.description}
          </p>

        </div>

      </section>


      <main className="document-details-shell">

        <div className="document-details-actions">

          <Link
            to="/documents"
            className="document-back-link"
          >
            ← Back to Documents
          </Link>

        </div>


        <div className="document-details-grid">


          <section className="document-details-card">

            <div className="document-heading">

              <div className="document-heading-icon">
                📄
              </div>

              <div>

                <span className="document-small-label">
                  DOCUMENT RECORD
                </span>

                <h2>
                  Document Information
                </h2>

              </div>

            </div>


            <div className="document-info-grid">

              <div className="document-info-item">

                <span>
                  Document ID
                </span>

                <strong>
                  {document.document_id || "-"}
                </strong>

              </div>


              <div className="document-info-item">

                <span>
                  Document Type
                </span>

                <strong>
                  {document.document_type || "-"}
                </strong>

              </div>


              <div className="document-info-item">

                <span>
                  House
                </span>

                <strong>
                  {document.house || "-"}
                </strong>

              </div>


              <div className="document-info-item">

                <span>
                  Document Date
                </span>

                <strong>
                  {document.document_date || "-"}
                </strong>

              </div>


              <div className="document-info-item">

                <span>
                  Status
                </span>

                <strong className="document-available">
                  {document.status || "-"}
                </strong>

              </div>


              <div className="document-info-item">

                <span>
                  File Name
                </span>

                <strong>
                  {document.file_name || "-"}
                </strong>

              </div>

            </div>


            <div className="document-description">

              <span>
                DESCRIPTION
              </span>

              <p>
                {document.description ||
                  "No description is available for this document."}
              </p>

            </div>


            <div className="document-file-section">

              <span>
                DOCUMENT FILE
              </span>

              <div className="document-file-box">

                <div>

                  <strong>
                    {document.file_name || "Document file"}
                  </strong>

                  <small>
                    {document.document_type || "Document"}
                  </small>

                </div>


                {localFileUrl ? (

                  <a
                    href={localFileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="document-open-button"
                  >
                    Open File ↗
                  </a>

                ) : (

                  <span className="document-unavailable">
                    File unavailable
                  </span>

                )}

              </div>

            </div>

          </section>


          <aside className="document-side-card">

            <div className="document-side-icon">
              🏛
            </div>

            <span className="document-small-label">
              PARLIAMENTARY DATABASE
            </span>

            <h3>
              Document Record
            </h3>

            <p>
              This page displays the document information
              retrieved from the Parliament Portal database.
            </p>


            <div className="document-side-divider"></div>


            <div className="document-side-row">

              <span>
                Document ID
              </span>

              <strong>
                {document.document_id || "-"}
              </strong>

            </div>


            <div className="document-side-row">

              <span>
                Type
              </span>

              <strong>
                {document.document_type || "-"}
              </strong>

            </div>


            <div className="document-side-row">

              <span>
                House
              </span>

              <strong>
                {document.house || "-"}
              </strong>

            </div>


            <div className="document-side-row">

              <span>
                Status
              </span>

              <strong>
                {document.status || "-"}
              </strong>

            </div>


            <Link
              to="/documents"
              className="document-side-back"
            >
              View All Documents →
            </Link>

          </aside>

        </div>

      </main>

    </div>
  )
}


const documentDetailsStyles = `
.document-details-page{
  min-height:calc(100vh - 78px);
  background:#f4f7fb;
  color:#172d4d;
  font-family:Arial,Helvetica,sans-serif;
  padding-bottom:70px;
}

.document-details-hero{
  background:linear-gradient(120deg,#082b5d,#124d88);
  color:white;
}

.document-details-hero-inner{
  max-width:1180px;
  margin:0 auto;
  padding:42px 25px 48px;
}

.document-breadcrumb{
  display:flex;
  align-items:center;
  gap:9px;
  margin-bottom:28px;
  color:rgba(255,255,255,.7);
  font-size:13px;
}

.document-breadcrumb a{
  color:white;
  text-decoration:none;
}

.document-details-eyebrow{
  display:block;
  margin-bottom:12px;
  color:#b9d7fb;
  font-size:10px;
  font-weight:800;
  letter-spacing:2px;
}

.document-details-hero h1{
  margin:0;
  max-width:850px;
  color:white;
  font-size:clamp(34px,5vw,54px);
  line-height:1.08;
}

.document-details-hero p{
  max-width:760px;
  margin:16px 0 0;
  color:rgba(255,255,255,.8);
  font-size:15px;
  line-height:1.7;
}

.document-details-shell{
  max-width:1180px;
  margin:0 auto;
  padding:30px 25px 0;
}

.document-details-actions{
  margin-bottom:20px;
}

.document-back-link{
  color:#195797;
  text-decoration:none;
  font-size:13px;
  font-weight:800;
}

.document-details-grid{
  display:grid;
  grid-template-columns:minmax(0,1fr) 330px;
  gap:22px;
  align-items:start;
}

.document-details-card,
.document-side-card,
.document-details-message{
  border:1px solid #dfe7f1;
  border-radius:16px;
  background:white;
  box-shadow:0 10px 30px rgba(16,45,80,.07);
}

.document-details-card{
  padding:30px;
}

.document-heading{
  display:flex;
  align-items:center;
  gap:14px;
  padding-bottom:23px;
  border-bottom:1px solid #e8edf4;
}

.document-heading-icon{
  width:48px;
  height:48px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:12px;
  background:#edf4ff;
  font-size:21px;
}

.document-small-label{
  display:block;
  color:#4d78ad;
  font-size:10px;
  font-weight:800;
  letter-spacing:1.8px;
}

.document-heading h2{
  margin:5px 0 0;
  color:#172e4f;
  font-size:24px;
}

.document-info-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
}

.document-info-item{
  padding:19px 15px 19px 0;
  border-bottom:1px solid #edf1f6;
}

.document-info-item span{
  display:block;
  margin-bottom:7px;
  color:#8493a6;
  font-size:10px;
  font-weight:800;
  letter-spacing:1.1px;
  text-transform:uppercase;
}

.document-info-item strong{
  display:block;
  color:#23415f;
  font-size:13px;
  line-height:1.5;
  word-break:break-word;
}

.document-available{
  color:#2f885d !important;
}

.document-description{
  padding-top:27px;
}

.document-description > span,
.document-file-section > span{
  display:block;
  margin-bottom:10px;
  color:#8493a6;
  font-size:10px;
  font-weight:800;
  letter-spacing:1.2px;
}

.document-description p{
  margin:0;
  color:#617287;
  font-size:14px;
  line-height:1.8;
}

.document-file-section{
  margin-top:28px;
  padding-top:24px;
  border-top:1px solid #edf1f6;
}

.document-file-box{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding:17px;
  border:1px solid #e2e9f1;
  border-radius:11px;
  background:#f9fbfd;
}

.document-file-box strong{
  display:block;
  color:#203b5b;
  font-size:13px;
}

.document-file-box small{
  display:block;
  margin-top:5px;
  color:#8291a4;
  font-size:10px;
}

.document-open-button{
  flex-shrink:0;
  display:inline-flex;
  align-items:center;
  min-height:40px;
  padding:0 16px;
  border-radius:8px;
  background:#195797;
  color:white;
  text-decoration:none;
  font-size:11px;
  font-weight:800;
}

.document-unavailable{
  color:#a0acba;
  font-size:11px;
  font-weight:700;
}

.document-side-card{
  padding:27px;
}

.document-side-icon{
  width:52px;
  height:52px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:18px;
  border-radius:14px;
  background:#edf4ff;
  font-size:23px;
}

.document-side-card h3{
  margin:7px 0 10px;
  color:#172e4f;
  font-size:22px;
}

.document-side-card p{
  margin:0;
  color:#6b7b90;
  font-size:13px;
  line-height:1.7;
}

.document-side-divider{
  height:1px;
  margin:23px 0 8px;
  background:#e8edf4;
}

.document-side-row{
  display:flex;
  justify-content:space-between;
  gap:14px;
  padding:12px 0;
  font-size:12px;
}

.document-side-row span{
  color:#8291a4;
}

.document-side-row strong{
  color:#244662;
  text-align:right;
}

.document-side-back{
  display:block;
  margin-top:18px;
  padding-top:18px;
  border-top:1px solid #e8edf4;
  color:#195797;
  text-decoration:none;
  font-size:12px;
  font-weight:800;
}

.document-details-message{
  padding:60px 30px;
  text-align:center;
}

.document-error-icon{
  width:46px;
  height:46px;
  margin:0 auto 15px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  background:#fff1f1;
  color:#c43d3d;
  font-size:22px;
  font-weight:800;
}

.document-details-message h1{
  margin:0 0 10px;
  color:#172e4f;
  font-size:27px;
}

.document-details-message p{
  margin:0 0 22px;
  color:#6b7b90;
}

.document-back-button{
  display:inline-flex;
  align-items:center;
  min-height:42px;
  padding:0 18px;
  border-radius:8px;
  background:#195797;
  color:white;
  text-decoration:none;
  font-size:12px;
  font-weight:800;
}

@media(max-width:850px){
  .document-details-grid{
    grid-template-columns:1fr;
  }

  .document-info-grid{
    grid-template-columns:1fr;
  }
}

@media(max-width:600px){
  .document-details-hero-inner{
    padding-left:20px;
    padding-right:20px;
  }

  .document-details-shell{
    padding-left:20px;
    padding-right:20px;
  }

  .document-file-box{
    align-items:flex-start;
    flex-direction:column;
  }

  .document-open-button{
    width:100%;
    justify-content:center;
  }
}
`


export default DocumentDetails