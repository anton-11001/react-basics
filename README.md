# React Basics

React Basics is a small learning project built with React 17. It demonstrates common React application patterns such as routing, protected pages, reusable UI components, forms, filtering, sorting, pagination, lazy loading, modal dialogs, and API data fetching.

The app uses the JSONPlaceholder API to load posts and comments. It includes two post browsing modes: classic pagination and lazy loading with an intersection observer.

## Features

- Fake authentication with `localStorage`
- Protected and public routes
- Posts list with search and sorting
- Lazy-loaded posts page
- Paginated posts page
- Post details page with comments
- Create and delete posts locally
- Reusable UI components:
  - Button
  - Input
  - Select
  - Modal
  - Loader
  - Navbar
  - Pagination
- CSS Modules for component styling
- List animations with `react-transition-group`

## Tech Stack

- React 17
- React Router DOM 5
- Axios
- React Transition Group
- CSS Modules
- Create React App

## Routes

- `/login` - sign in page
- `/posts` - lazy-loaded posts
- `/posts-pagination` - paginated posts
- `/posts/:id` - post details and comments

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Notes

Authentication is intentionally simple and exists only for learning routing and protected pages. Any non-empty username and password will sign in the user and save an `auth` flag in `localStorage`.

Post creation and deletion are local UI updates only. The remote JSONPlaceholder API is used for fetching demo data, but it does not persist changes.
