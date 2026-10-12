# Google Maps React

An example of Google Maps integration in React: a map of Rome with a list of accommodations
shown as markers, plus a search box to find any location.

**Live demo:** <https://google-maps-react.davidebalice.dev/>

## Features

- Google Map rendered with `@react-google-maps/api`
- Markers for a list of accommodations, each with an info window (photo, title and address)
- Side list of accommodations: clicking an item pans and zooms the map to its marker
- Location search using the Google Maps Geocoding service, with a marker on the result
- "Location not found" message when the search returns no result

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vite.dev/)
- [@react-google-maps/api](https://github.com/JustFly1984/react-google-maps-api)
- Google Maps JavaScript API

## Getting started

### Requirements

- Node.js 20 or later
- npm
- A Google Cloud API key with the Maps JavaScript API and Geocoding API enabled

### Installation

```bash
git clone https://github.com/davidebalice/google-maps-react.git
cd google-maps-react
npm install
```

### Configuration

Copy `.env.example` to `.env` and set your API key:

```bash
cp .env.example .env
```

| Variable              | Description                    |
| --------------------- | ------------------------------ |
| `VITE_GOOGLE_API_KEY` | Google Maps JavaScript API key |

### Available scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the development server             |
| `npm run build`   | Create a production build in `dist/`     |
| `npm run preview` | Preview the production build locally     |

## Project structure

```
src/
├── common/        # Header
├── components/    # Map, search box, info panel and accommodations list
├── data/          # Markers (accommodations) data
└── main.jsx       # Application entry point
```

## Author

**Davide Balice** – [davidebalice.dev](https://www.davidebalice.dev)
