# Parliament Portal - Project Handover Document

## 1. Project Name

Parliament Portal  
Digital Parliament Information System

## 2. Project Purpose

Parliament Portal is a web-based system for viewing and managing parliamentary information through a centralized digital platform.

The portal contains information related to Members, Bills & Acts, Questions, Committees, Proceedings, Attendance, Notifications and Documents.

## 3. Technology Stack

### Frontend
- React
- Vite
- React Router
- CSS

### Backend
- Python
- Django
- Django REST Framework

### Database
- Microsoft SQL Server
- SQL Server Instance: .\SQLEXPRESS
- Database Name: ParliamentPortalDB

## 4. Main Modules

1. Home
2. Members
3. Member Profile
4. Bills & Acts
5. Questions
6. Committees
7. Proceedings
8. Attendance
9. Notifications
10. Documents
11. Login
12. Dashboard

## 5. Project Architecture

User
→ React Frontend
→ REST API
→ Django REST Framework
→ Microsoft SQL Server
→ JSON Response
→ React Frontend

## 6. Project Folder Structure

Parliament_Portal_Final/

- backend/
- frontend/
- database/
  - ParliamentPortalDB.bak
- documentation/
  - PROJECT_HANDOVER.md
- .gitignore
- README.md
- START_ALL.bat (1-Click Master Launcher)

## 6.1 Quick Start (Recommended - 1-Click)

Double-click `START_ALL.bat` in the project root directory.
This automatically:
1. Launches the Django backend on `http://127.0.0.1:8000/`
2. Launches the React Vite frontend on `http://localhost:5173/`
3. Automatically opens the portal in your default web browser!

## 7. Manual Backend Setup

Open PowerShell in:

C:\Users\91748\Desktop\Parliament_Portal_Final\backend

Activate the Python virtual environment if required.

Check the Django project:

python manage.py check

Expected result:

System check identified no issues (0 silenced).

Start backend server:

python manage.py runserver

Backend URL:

http://127.0.0.1:8000/

## 8. Frontend Setup

Open another terminal in:

C:\Users\91748\Desktop\Parliament_Portal_Final\frontend

Install dependencies:

npm install

Start the frontend:

```powershell
npm.cmd run dev
# (or 'npm run dev')
```

Frontend URL:

http://localhost:5173/

## 9. Production Build

Create the production build using:

npm run build

The production build was tested successfully during final project testing.

## 10. Database

Database Name:

ParliamentPortalDB

SQL Server:

.\SQLEXPRESS

Authentication:

Windows Authentication

Database backup file:

database\ParliamentPortalDB.bak

The backup file should be restored using SQL Server Management Studio (SSMS).

## 11. Database Restore

Open SSMS.

Connect using:

Server:
.\SQLEXPRESS

Authentication:
Windows Authentication

Restore the file:

database\ParliamentPortalDB.bak

Database name:

ParliamentPortalDB

After restoring the database, verify the Django database configuration.

## 12. Demo Login

Frontend demo login:

User ID:
MP001

Password:
12345

Successful login opens the Member Dashboard.

## 13. Important Backend APIs

Members:
http://127.0.0.1:8000/api/members/members/

Bills:
http://127.0.0.1:8000/api/bills/bills/

Questions:
http://127.0.0.1:8000/api/questions/questions/

Committees:
http://127.0.0.1:8000/api/committees/committees/

Proceedings:
http://127.0.0.1:8000/api/proceedings/proceedings/

Attendance:
http://127.0.0.1:8000/api/attendance/attendance/

Notifications:
http://127.0.0.1:8000/api/notifications/notifications/

Documents:
http://127.0.0.1:8000/api/documents/documents/

## 14. Frontend Routes

Home:
/ 

Members:
/members

Member Profile:
/member-profile

Bills:
/bills

Bill Details:
/bill-details

Questions:
/questions

Question Details:
/question-details

Committees:
/committees

Committee Details:
/committee-details

Proceedings:
/proceedings

Proceeding Details:
/proceeding-details

Attendance:
/attendance

Documents:
/documents

Document Details:
/document-details

Login:
/login

Dashboard:
/dashboard

## 15. Authentication

The current frontend demo login uses:

User ID: MP001
Password: 12345

The login state is maintained using browser session storage.

The Dashboard is protected so that a user who is not logged in is redirected to the Login page.

Logout removes the login session and returns the user to the Login page.

## 16. Search and Filters

The portal includes member search functionality in the header.

Members page supports:
- Member search
- House filter
- Party filter

Documents page supports:
- Document search
- Document type filter
- Status filter

## 17. Notifications

The Dashboard retrieves notifications from:

http://127.0.0.1:8000/api/notifications/notifications/

Member-specific notifications are displayed for MP001.

The Dashboard displays:
- Notification title
- Message
- Priority
- Type
- Read/Unread state
- Date

## 18. Documents

The Documents module provides:
- Document listing
- Search
- Document type filter
- Status filter
- Document details
- Open File link

## 19. Final Testing Completed

The following areas were tested successfully:

- Home page
- Navigation
- Members
- Member Profile
- Bills & Acts
- Bill Details
- Questions
- Question Details
- Committees
- Committee Details
- Proceedings
- Proceeding Details
- Attendance
- Documents
- Notifications
- Login
- Logout
- Protected Dashboard
- Header Member Search
- Members Search
- Members House Filter
- Members Party Filter
- Documents Search
- Documents Filters
- Documents Open File link
- Django System Check
- Django Migrations
- Microsoft SQL Server Connection
- Frontend Production Build

## 20. Database Backup Status

Database backup has been created successfully.

Backup:

ParliamentPortalDB.bak

The backup file is included inside:

database/

## 21. Current Local Development URLs

Frontend:

http://localhost:5173/

Backend:

http://127.0.0.1:8000/

Django Admin:

http://127.0.0.1:8000/admin/

## 22. Running the Complete Project

Start the backend first:

python manage.py runserver

Then start the frontend in another terminal:

npm run dev

Open:

http://localhost:5173/

## 23. Deployment

## 23. Public Deployment Status

The Parliament Portal is fully deployed and accessible 24/7 on the public cloud:

- **Public Frontend URL:** https://parliament-portal-frontend.onrender.com/
- **Public Backend API URL:** https://parliament-portal-backend.onrender.com/
- **Local Development URL:** http://localhost:5173/ (via START_ALL.bat)
- **Local Backend API:** http://127.0.0.1:8000/

All client-side routing, deep link access, and browser refresh (F5/Reload) tests have been successfully executed with zero errors.

## 24. Final Handover Contents

The final handover package contains:

- Complete source code (Frontend React 19 + Backend Django 5/6)
- Database backup (`database/ParliamentPortalDB.bak` & local `db.sqlite3`)
- Cloud deployment configuration (Render & GitHub auto-deploy)
- Comprehensive Technical Documentation (`documentation/PROJECT_REPORT.md` & `documentation/PROJECT_REPORT_ENGLISH.md`)
- Official Print-Ready PDF Report (`Final_Submission/Parliament_Portal_Project_Report.pdf`)
- Setup and execution guides (`START_ALL.bat`)
- Demo login credentials (`MP001` / `12345`)

## 25. Final Status

Main development:
COMPLETED (100%)

Functional testing:
COMPLETED (100%)

Database backup & dual-engine failover:
COMPLETED (100%)

README & Architecture documentation:
COMPLETED (100%)

Project handover documentation:
COMPLETED (100%)

Public cloud deployment (Render):
COMPLETED (100%)

Public link and final F5/reload testing:
COMPLETED (100%)

OVERALL PROJECT COMPLETION:
100% COMPLETE & VERIFIED (READY FOR HANDOVER)