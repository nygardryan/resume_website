# Resume Website Frontend

A modern, responsive React application built with Material-UI for showcasing professional portfolios and resumes.

## Features

- **Responsive Design**: Mobile-first approach with Material-UI components
- **Modern UI**: Clean, professional design following Material Design principles
- **Navigation**: Smooth routing between different sections
- **Customizable Theme**: Easy-to-modify theme configuration
- **Contact Form**: Interactive contact form with validation
- **Resume Display**: Professional resume layout with downloadable PDF option

## Pages

- **Home**: Landing page with hero section and quick navigation
- **About**: Personal information, skills, and experience overview
- **Resume**: Detailed professional experience and education
- **Contact**: Contact form and information

## Tech Stack

- React 19
- Material-UI (MUI) v7
- React Router v7
- Vite (build tool)
- Emotion (CSS-in-JS)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (package manager)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   └── Layout/
│       └── Layout.jsx          # Main layout with navigation
├── pages/
│   ├── Home/
│   │   └── Home.jsx            # Landing page
│   ├── About/
│   │   └── About.jsx           # About page
│   ├── Resume/
│   │   └── Resume.jsx          # Resume page
│   └── Contact/
│       └── Contact.jsx         # Contact page
├── styles/
│   └── globalStyles.js         # Reusable styled components
├── theme/
│   └── theme.js                # MUI theme configuration
├── App.jsx                     # Main app component
└── main.jsx                    # Entry point
```

## Customization

### Theme Customization

The theme is configured in `src/theme/theme.js`. You can easily modify:

- Colors (primary, secondary, background, text)
- Typography (fonts, sizes, weights)
- Component styles (buttons, cards, etc.)
- Spacing and border radius

### Styling

Global styles and reusable components are in `src/styles/globalStyles.js`. These include:

- `PageContainer` - Main page wrapper
- `MainContent` - Content area with responsive padding
- `SectionContainer` - Styled section wrapper
- `FlexContainer` - Responsive flex layout
- `GridContainer` - Responsive grid layout

### Adding New Pages

1. Create a new component in `src/pages/YourPage/YourPage.jsx`
2. Add the route to `src/App.jsx`
3. Add navigation item to `src/components/Layout/Layout.jsx`

## Deployment

Build the application for production:

```bash
pnpm build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Contributing

1. Follow the existing code structure and naming conventions
2. Use Material-UI components and theme consistently
3. Ensure responsive design for all screen sizes
4. Test on different browsers and devices