# OuterHeaven — unibz Student Hub 
Prototype for **OuterHeaven Consulting Services**, focused on helping prospective and international students discover the Free University of Bozen-Bolzano (unibz).

## Included Sprint 1 functionality

- **US-01 Registration and Login:** student self-registration, login, logout, hashed passwords, persistent browser session, live email/password validation, password visibility controls, clear error messages and separate student/admin roles. Admin accounts are provisioned by the seed script; public registration cannot create admins.
- **US-02 Platform Navigation:** responsive navigation for desktop and mobile, active-page indicator, login-aware actions, browser hash navigation, breadcrumbs and a custom 404 page.
- **US-03 Student Profile:** signed-in user can view and edit their own name, email (read-only), programme, preferred campus and short bio. The edit form supports validation, Save Changes and Cancel; the API only reads/updates the authenticated user's record.
- **US-04 University Information:** categories for five faculties and four campus locations, multilingual context, international-student guidance, student-service information and useful official links. Campus visual assets are bundled locally under `client/public/assets/campuses/`, so the UI does not depend on remote image URLs.
- **US-05 Accommodation Listings:** responsive listing cards with title, location, consistently displayed price, accommodation type and description. Listings are loaded from the backend/database; empty state and demo-data notices are provided. Seeded examples are not real or verified offers.

## Requirements

- Node.js 22 LTS recommended
- npm
- Windows PowerShell (instructions below also work on macOS/Linux with equivalent folder commands)

## Run locally (two terminals)

### 1. Backend

Open PowerShell in the extracted project folder:

```powershell
cd .\server
npm install
npm run seed
npm run dev
```

The API runs at `http://localhost:4000`.

### 2. Frontend

Open a **second** PowerShell window in the same extracted project folder:

```powershell
cd .\client
npm install
npm run dev
```

Open `http://localhost:5173`.

> Keep both terminal windows open while using the site.

## Demo administrator account

- Email: `admin@outerheaven.local`
- Password: `Admin123!`

Run `npm run seed` from the `server` folder before first login. The seed script creates the demo admin only if it does not already exist. If you changed the password, the seed script will not overwrite it.

For a normal student account, use **Create your account** on the website.

## Database reset (local development only)

Stop the backend. Delete `server\data\outerheaven.db` and its `-shm` / `-wal` files if present. Then run:

```powershell
npm run seed
npm run dev
```

This deletes local demo accounts and profile data.

## Sprint 1 Definition of Done checklist

Use this checklist during the team's actual verification. Do not mark an item Done until it has been tested and evidence has been captured.

- [ ] Each acceptance criterion for US-01 to US-05 has been tested.
- [ ] Registration rejects missing/invalid fields and duplicate email addresses.
- [ ] Student login works; invalid credentials show a clear error; logout clears the local session.
- [ ] Public registration always creates a student; admin-only endpoint rejects student accounts.
- [ ] Navigation works on desktop and mobile; all main sections can be reached.
- [ ] Profile changes persist after refresh; a user cannot request another user's profile through the profile API.
- [ ] University categories and accommodation listings render correctly; empty states are handled if data is empty.
- [ ] Code has been reviewed by another team member and integrated into the shared GitHub repository.
- [ ] No known critical bugs remain; security and role permissions have been reviewed.
- [ ] README and setup instructions are current; the team can run and demonstrate the increment.

## Acceptance-criteria test guide

| Story | Manual verification |
|---|---|
| US-01 | Register a student, sign in, sign out, try a wrong password, verify duplicate email handling. Confirm a student cannot access `/api/admin/summary`. |
| US-02 | Navigate through Overview, The University, Student Guide, Accommodation and My Profile. Repeat at a narrow/mobile viewport. |
| US-03 | Sign in, update profile fields, save and refresh. Sign in as another student and confirm the first student's private profile is not shown. |
| US-04 | Open The University and verify the five faculty cards, four campus cards and language information. |
| US-05 | Open Accommodation and verify every listing shows a title, location and price, plus the demo-data warning. |

## Notes on accuracy and scope

- University information is presented as a student-facing summary. Programme availability, admissions requirements, course language and campus details can change; use the official unibz pages to confirm current information.
- Accommodation cards seeded for the prototype are **illustrative demo records only**. They are not real offers, verified prices, live availability or booking functionality.
- This is an independent student-support prototype, not an official unibz website and not connected to unibz systems.
- The demo JWT secret is suitable only for local development. Before any public deployment, set a strong secret in `server/.env`, restrict CORS, enable HTTPS, review data protection and security, and remove demo credentials.

## Official information used as reference

- https://www.unibz.it/en/
- https://www.unibz.it/en/applicants/international/
- https://www.unibz.it/assets/Documents/2026-02-17-Fact-Sheet-unibz_25_26.pdf
- https://www.unibz.it/assets/Documents/2026-01-22-International-Students-Guide-2025.pdf


## Sprint 1 updates
- Campus visuals are bundled locally in `client/public/assets/campuses/` instead of being loaded from external image URLs. They are illustrative assets and should be replaced with licensed official photographs before public release.
- Accommodation appears before Student Guide in the main navigation.
- Registration now requires a capital-starting name, strong password (8+ characters, uppercase, number, symbol), and password confirmation.
- Profile editing formats study-programme names automatically and provides programme suggestions.
