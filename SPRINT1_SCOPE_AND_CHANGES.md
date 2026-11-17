# Sprint 1 — Scope and implemented refinements

This update is limited to the five Sprint 1 stories in Deliverable 02: US-01 to US-05 (18 SP).

## US-01 — User Registration and Login
- Added live email-format feedback and client-side validation.
- Added show/hide controls for password and confirmation password.
- Kept clear API error messages, student-only public registration, hashed passwords and admin provisioning through the seed process.
- Logout removes the stored token; the existing token is restored and validated after a page refresh.
- Private profile access requires authentication; admin API access is checked by the backend role middleware.

## US-02 — Platform Navigation
- Added responsive navigation behavior and active-page styling.
- Navigation reflects authentication state; signed-in users see their profile and Logout.
- Added browser hash navigation, breadcrumbs and a custom 404 page.

## US-03 — Manage Student Profile
- Profile fields are loaded from the authenticated user's database record.
- Added/retained edit, validation, Save and Cancel behavior and save confirmation.
- The API only reads and updates the user identified by the verified token; email is displayed as account information, not editable profile data.

## US-04 — Browse University Information
- Organised university information into faculty and campus sections.
- Added multilingual context, international-student guidance, student-service information and official resource links.
- Information remains read-only in Sprint 1; content management is not included.

## US-05 — Browse Accommodation Listings
- Listings are loaded from the backend/database.
- Improved listing cards with title, location, price, type and description.
- Added a clear empty state and demo-data warning.
- No accommodation detail page, search, filters, favourites, booking or administration features were added.

## Explicitly outside this update
Sprint 2 and Sprint 3 stories remain out of scope: administrator content management, accommodation detail pages, search/filter, favourites, inquiries and notifications.

## Validation
The edited JSX files passed syntax parsing with Babel, and the backend JavaScript files passed `node --check`. A full Vite build could not be completed in this environment because the uploaded dependency tree does not contain the Linux Rollup optional binary. On the target Windows machine, run `npm install` in both `server` and `client`, then follow the README startup steps.
