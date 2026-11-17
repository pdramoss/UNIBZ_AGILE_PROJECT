# Client source structure

- `App.jsx` — application shell, navigation, shared state and page selection.
- `pages/` — one file per main page (`Home`, `University`, `Guide`, `Housing`, `Profile`).
- `components/auth/` — sign-in prompt and authentication modal.
- `components/layout/` — reusable page layout elements.
- `constants/` — navigation and authentication constants.
- `data/` — campus catalog data.
- `utils/` — shared formatting helpers.

Each page/component is imported by `App.jsx`; the existing API client and stylesheet remain in place.
