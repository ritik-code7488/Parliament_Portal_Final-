# Parliament Portal

Parliament Portal is a web-based digital parliament information system. It provides a central place to browse members, bills, questions, committees, proceedings, attendance records, notifications, and parliamentary documents.

This README is based on the current source code in this repository. It also identifies the difference between implemented functionality and planned or production-ready functionality.

## 1. Technology Stack

### Frontend

- React 19
- Vite 8 as the development server and build tool
- React Router DOM 7 for client-side routing
- JavaScript with JSX
- CSS for styling and responsive layouts
- Native browser `fetch` for API communication
- `sessionStorage` for the current demo login state
- Oxlint for linting

### Backend

- Python
- Django
- Django REST Framework
- Django REST Framework Simple JWT for JWT token generation and authentication support
- `django-cors-headers` for frontend-to-backend cross-origin requests
- Django ORM for database access
- Django Admin for administrative data management

### Database

- Microsoft SQL Server
- SQL Server Express instance: `./SQLEXPRESS`
- Database name: `ParliamentPortalDB`
- SQL Server driver: ODBC Driver 18 for SQL Server
- Windows trusted connection is configured in Django settings
- `database/ParliamentPortalDB.bak` contains a SQL Server backup

### Development and deployment technologies

- Vite development server: port `5173`
- Django development server: port `8000`
- WSGI and ASGI entry points are included for deployment integration
- CORS is configured for local frontend ports `5173` and `5174`

## 2. Project Architecture

The application follows a three-layer web architecture:

```text
React frontend
    |
    | HTTP/JSON API requests
    v
Django REST Framework backend
    |
    | Django ORM
    v
Microsoft SQL Server database
```

The frontend is responsible for screens, navigation, search, filters, forms, and displaying API data. The backend exposes REST endpoints, serializes database records into JSON, and provides authentication and administrative APIs. SQL Server stores the application data.

## 3. Repository Structure

```text
Parliament_Portal_Final/
|-- frontend/                  React and Vite application
|   |-- src/
|   |   |-- App.jsx             Main routes, header, login and dashboard
|   |   |-- pages/              Feature pages and detail pages
|   |   |-- assets/             Frontend assets
|   |   `-- *.css               Application styles
|   `-- package.json            Frontend packages and scripts
|
|-- backend/                   Django project
|   |-- manage.py               Django command-line entry point
|   |-- parliament_project/     Django settings and root URLs
|   |-- accounts/               Login and protected test endpoint
|   |-- apps/members/           Member module
|   |-- apps/bills/             Bills module
|   |-- apps/questions/         Questions module
|   |-- apps/committees/        Committees module
|   |-- proceedings/            Proceedings module
|   |-- attendance/             Attendance module
|   |-- notifications/          Notifications module
|   `-- documents/              Documents module
|
|-- database/                  SQL Server backup
|-- documentation/             Handover documentation
`-- README.md                  Project documentation
```

Each backend business module generally contains `models.py` for database tables, `serializers.py` for JSON conversion, `views.py` for REST viewsets, `urls.py` for endpoint registration, `admin.py` for Django Admin registration, `migrations/` for schema history, and `tests.py` for tests.

## 4. Frontend Packages

### Runtime dependencies

| Package | Purpose |
|---|---|
| `react` | Component-based user interface development |
| `react-dom` | Mounts the React application into the browser DOM |
| `react-router-dom` | Client-side navigation and URL-based page rendering |

### Development dependencies

| Package | Purpose |
|---|---|
| `vite` | Fast local development server and production bundler |
| `@vitejs/plugin-react` | React support in Vite |
| `@types/react` | React type definitions supplied by the tooling |
| `@types/react-dom` | React DOM type definitions supplied by the tooling |
| `oxlint` | JavaScript and JSX linting |

The frontend currently uses native `fetch`; no Axios or other HTTP client package is installed.

## 5. Backend Packages and Framework Components

| Package or component | Purpose |
|---|---|
| `Django` | Web framework, ORM, routing, sessions, admin and authentication |
| `djangorestframework` | REST API views, serializers, routers and responses |
| `djangorestframework-simplejwt` | Creates access and refresh JWT tokens during API login |
| `django-cors-headers` | Allows the local React frontend to call the Django API |
| `mssql-django` | Django database backend for Microsoft SQL Server |
| `pyodbc` | ODBC connectivity between Python/Django and SQL Server |
| Django ORM | Defines models and performs database queries |
| Django Admin | Provides administrative CRUD screens for registered models |

The repository does not currently contain a `requirements.txt` file, so exact Python package versions cannot be confirmed from the source tree. The package names above are verified from imports and Django configuration; versions should be pinned before production deployment.

## 6. Application Modules

### Members

Stores member ID, name, house, state, constituency, party, status, personal details, contact details, joining date and photo reference. The frontend supports member listing, searching, filtering and profile details. Committees have a many-to-many relationship with members.

API base path: `/api/members/`

### Bills and Acts

Stores bill number, title, description, house, introducer, introduction date and status. Supported statuses include `Introduced`, `Under Discussion`, `Passed`, `Rejected` and `Withdrawn`. The frontend provides list, search/filter and detail pages.

API base path: `/api/bills/`

### Questions

Stores question number, subject, question text, member who asked it, house, starred/unstarred type, date, status and answer. The frontend provides list and detail pages.

API base path: `/api/questions/`

### Committees

Stores committee name, chairperson, department, house, description, members, member count, active/inactive status and established date. Committee members are related to the `Member` model using a many-to-many relationship.

API base path: `/api/committees/`

### Proceedings

Stores proceeding title, house, date, type, description, publication status and optional document URL.

API base path: `/api/proceedings/`

### Attendance

Stores member ID, member name, house, attendance date, status and remarks. Attendance statuses are `Present`, `Absent` and `Leave`.

API base path: `/api/attendance/`

### Documents

Stores document ID, title, document type, description, house, date, file name, file URL and availability status. The frontend supports listing, searching, filtering, details and file-link access.

API base path: `/api/documents/`

### Notifications

Stores member association, title, message, notification type, priority, read state and creation time. Types include general, attendance, bill, question and proceeding notifications. The module also exposes a custom `mark_read` action.

API base path: `/api/notifications/`

### Accounts and Authentication

The backend uses Django's built-in user model. The login API accepts username and password, authenticates through Django, rejects missing/invalid/inactive accounts, and returns access and refresh JWT tokens plus basic user information.

Authentication endpoints:

- `POST /api/auth/login/`
- `GET /api/auth/protected/`

The protected endpoint requires a valid JWT through the configured DRF authentication class.

## 7. API Design

The content modules use Django REST Framework `ModelViewSet` classes with `DefaultRouter`. This produces standard REST operations:

| HTTP method | Typical endpoint | Purpose |
|---|---|---|
| `GET` | `/api/members/members/` | List records |
| `GET` | `/api/members/members/<id>/` | Retrieve one record |
| `POST` | `/api/members/members/` | Create a record |
| `PUT` or `PATCH` | `/api/members/members/<id>/` | Update a record |
| `DELETE` | `/api/members/members/<id>/` | Delete a record |

The same router pattern is used for bills, questions, committees, proceedings, attendance, notifications and documents. Notifications additionally provide:

```text
PATCH /api/notifications/notifications/<id>/mark_read/
```

## 8. Frontend Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/members` | Member list |
| `/member-profile` | Member profile |
| `/bills` | Bills and Acts |
| `/bill-details` | Bill details |
| `/questions` | Questions |
| `/question-details` | Question details |
| `/committees` | Committees |
| `/committee-details` | Committee details |
| `/proceedings` | Proceedings |
| `/proceeding-details` | Proceeding details |
| `/attendance` | Attendance |
| `/documents` | Documents |
| `/document-details` | Document details |
| `/login` | Member login |
| `/dashboard` | Member dashboard |

The common header provides navigation links and a member search that loads the members API and searches by name, member ID, state and constituency.

## 9. Application Flow by Role

### Public visitor

1. Opens the React home page.
2. Uses the header to visit members, bills, questions, committees, proceedings, attendance or documents.
3. The selected page calls the matching Django REST endpoint.
4. Django retrieves records through the ORM from SQL Server.
5. DRF serializers convert records to JSON.
6. React renders the list, filters, search results or detail page.

### Parliamentary member

1. Opens the login page from the header.
2. Enters the current demo credentials: user ID `MP001` and password `12345`.
3. The frontend validates these credentials locally and stores `memberLoggedIn=true` in `sessionStorage`.
4. The member is redirected to `/dashboard`.
5. The dashboard checks the session flag; users without it are redirected to login.
6. The dashboard requests notifications from the notifications API.
7. The frontend filters the response for member ID `MP001` and displays the matching notifications.
8. Logout removes the session flag and redirects to login.

### Administrator or data manager

1. Uses Django Admin at `/admin/` after Django authentication.
2. Manages registered members, bills, questions, committees, proceedings, attendance, notifications and documents.
3. Django Admin writes changes through the ORM to SQL Server.
4. React pages display updated data through the REST APIs.

### API consumer or future integrated client

1. Sends credentials to `POST /api/auth/login/`.
2. Receives an access token and refresh token.
3. Sends the access token in the `Authorization: Bearer <token>` header to protected endpoints.
4. Uses the JSON REST endpoints to read or manage parliamentary data.

## 10. Important Current-State Notes

- A JWT login API exists in the backend, but the current React login screen does not call it. It uses a hardcoded demo credential check in the frontend.
- The current dashboard identifies the member as `MP001` and filters notifications for that value.
- The frontend stores only a session flag for the demo login; it does not currently store or attach the backend JWT access token.
- The backend configures JWT authentication for Django REST Framework, but the business viewsets do not declare per-view permission classes in their current source files.
- The backend supports standard CRUD through `ModelViewSet`, although the visible frontend mainly consumes list and detail operations.
- `DEBUG` is enabled and the SQL Server connection uses local Windows trusted authentication, which should be reviewed before production deployment.
- Python dependency versions are not pinned in a backend requirements file in the repository.

## 11. Running the Application Locally

### Prerequisites

- Python
- Node.js and npm
- Microsoft SQL Server or SQL Server Express
- ODBC Driver 18 for SQL Server
- SQL Server Management Studio if restoring the backup

### Database setup

1. Restore `database/ParliamentPortalDB.bak` in SQL Server.
2. Use database name `ParliamentPortalDB`.
3. Confirm the SQL Server instance is `./SQLEXPRESS`.
4. Confirm the Windows user running Django can access the database.

### Start the backend

```powershell
cd backend
python manage.py check
python manage.py migrate
python manage.py runserver
```

Backend URL: `http://127.0.0.1:8000/`

### Start the frontend

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173/`

### Frontend scripts

```powershell
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run lint      # Run Oxlint
npm run preview   # Preview the production build
```

## 12. Interview Explanation

### One-minute explanation

Parliament Portal is a full-stack parliamentary information system. The frontend is built with React and Vite, using React Router for navigation and native fetch calls for API communication. The backend is built with Django and Django REST Framework, where each business area is separated into a module with models, serializers, viewsets and router-based REST endpoints. The data is stored in Microsoft SQL Server through the Django ORM. The system allows users to browse members, bills, questions, committees, proceedings, attendance and documents, while authenticated members can access a dashboard containing member-specific notifications. Django Admin is used for administrative data management, and the backend also provides JWT-based authentication support.

### Technical flow explanation

When a user opens a module, the React page sends an HTTP request to the relevant Django REST endpoint. The Django viewset queries SQL Server through the ORM, the serializer converts the model or queryset into JSON, and the React component renders the response. React Router handles page navigation without a full browser reload. Authentication is supported in the backend with Simple JWT, while the current demo frontend login uses a session-storage flag and is separate from the JWT endpoint.

### Good points to highlight

- Modular Django application structure
- RESTful API design using DRF routers and viewsets
- Relational data modeling, including committee-member many-to-many relationships
- Separate frontend and backend responsibilities
- SQL Server integration through Django ORM and ODBC
- Reusable list/detail page pattern in React
- Search and filtering for parliamentary information
- Django Admin support for data maintenance
- JWT authentication foundation for future frontend integration

## 13. Main URLs

- Frontend: `http://localhost:5173/`
- Backend: `http://127.0.0.1:8000/`
- Django Admin: `http://127.0.0.1:8000/admin/`
- Members API: `http://127.0.0.1:8000/api/members/members/`
- Bills API: `http://127.0.0.1:8000/api/bills/bills/`
- Questions API: `http://127.0.0.1:8000/api/questions/questions/`
- Committees API: `http://127.0.0.1:8000/api/committees/committees/`
- Proceedings API: `http://127.0.0.1:8000/api/proceedings/proceedings/`
- Attendance API: `http://127.0.0.1:8000/api/attendance/attendance/`
- Notifications API: `http://127.0.0.1:8000/api/notifications/notifications/`
- Documents API: `http://127.0.0.1:8000/api/documents/documents/`

## 14. Project Status

The application is structured for local development and handover. The core browsing modules, detail pages, dashboard, notifications, database backup and development setup are present. Before production deployment, the project should add pinned backend dependencies, move secrets and database settings to environment variables, connect the React login screen to the JWT API, enforce permissions on write operations, and disable development settings.