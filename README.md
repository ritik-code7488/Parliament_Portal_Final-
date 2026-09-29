# Parliament Portal

Digital Parliament Information System built using React + Vite, Django REST Framework and Microsoft SQL Server.

## Project Overview

Parliament Portal is a web-based parliamentary information system that provides a centralized platform to view parliamentary members, bills, questions, committees, proceedings, attendance, notifications and documents.

## Technologies Used

Frontend:
- React
- Vite
- React Router
- CSS

Backend:
- Python
- Django
- Django REST Framework

Database:
- Microsoft SQL Server
- SQL Server Instance: .\SQLEXPRESS
- Database Name: ParliamentPortalDB

## Main Modules

- Home
- Members
- Member Profile
- Bills & Acts
- Questions
- Committees
- Proceedings
- Attendance
- Notifications
- Documents
- Login
- Dashboard

## Project Structure

Parliament_Portal_Final/
    backend/
    frontend/
    database/
        ParliamentPortalDB.bak
    documentation/
    .gitignore
    README.md

## Database Backup

SQL Server database backup is included in the database folder.

Backup file:
ParliamentPortalDB.bak

Database Name:
ParliamentPortalDB

SQL Server Instance:
.\SQLEXPRESS

## Backend Setup

Open PowerShell in the backend folder:

C:\Users\91748\Desktop\Parliament_Portal_Final\backend

Activate the Python virtual environment if required.

Check Django:

python manage.py check

Start Django:

python manage.py runserver

Backend URL:
http://127.0.0.1:8000/

## Frontend Setup

Open another terminal in:

C:\Users\91748\Desktop\Parliament_Portal_Final\frontend

Install dependencies:

npm install

Start React/Vite:

npm run dev

Frontend URL:
http://localhost:5173/

## Production Build

To create the frontend production build:

npm run build

## Database Restore

Open SQL Server Management Studio (SSMS).

Server:
.\SQLEXPRESS

Authentication:
Windows Authentication

Restore the database backup file:

database\ParliamentPortalDB.bak

Restore the database with the name:

ParliamentPortalDB

After restoring the database, verify that the Django backend database configuration points to the correct SQL Server instance and database.

## Demo Login

Current demo frontend login:

User ID:
MP001

Password:
12345

Successful login opens the Member Dashboard.

## Important URLs

Frontend:
http://localhost:5173/

Backend:
http://127.0.0.1:8000/

Django Admin:
http://127.0.0.1:8000/admin/

Members API:
http://127.0.0.1:8000/api/members/members/

Bills API:
http://127.0.0.1:8000/api/bills/bills/

Questions API:
http://127.0.0.1:8000/api/questions/questions/

Committees API:
http://127.0.0.1:8000/api/committees/committees/

Proceedings API:
http://127.0.0.1:8000/api/proceedings/proceedings/

Attendance API:
http://127.0.0.1:8000/api/attendance/attendance/

Notifications API:
http://127.0.0.1:8000/api/notifications/notifications/

Documents API:
http://127.0.0.1:8000/api/documents/documents/

## Testing Completed

The following project areas have been tested:

- Home navigation
- Members
- Member Profile
- Bills & Acts
- Questions
- Committees
- Proceedings
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
- Database Connection
- Database Migrations
- Frontend Production Build

## Current Project Status

Main development and functional testing are complete.

Database backup has been created successfully.

The project is currently prepared for final handover and deployment work.

## Handover Notes

For another computer:

1. Copy the complete Parliament_Portal_Final folder.
2. Install Python.
3. Install Node.js.
4. Install Microsoft SQL Server / SQL Server Express.
5. Install SQL Server Management Studio (SSMS).
6. Restore ParliamentPortalDB.bak.
7. Configure the backend database connection.
8. Install backend Python dependencies.
9. Install frontend npm dependencies.
10. Start the Django backend.
11. Start the React frontend.
12. Open the frontend URL.

## Local Development URLs

Frontend:
http://localhost:5173/

Backend:
http://127.0.0.1:8000/

## Deployment Requirement

The current URLs use localhost and 127.0.0.1, so they are local development URLs.

For a public/shareable link, the frontend and backend must be deployed to an accessible server or hosting service.

The final deployed version must also be tested by opening a page directly and using browser refresh/F5.

For example, a route such as /members must continue to work after browser refresh and must not show a 404 error.

## Final Handover Checklist

- Source code
- Backend
- Frontend
- Database backup
- Documentation
- README
- Demo login details
- Database restore instructions
- Project run instructions
- Public deployment
- Refresh/F5 testing