# Resume Website Frontend

A modern, responsive personal portfolio website built with React and Material UI.

## Features

- 🎨 **Modern Design**: Beautiful dark theme with gradient accents
- 📱 **Responsive**: Works perfectly on all devices
- ⚡ **Fast**: Built with Vite for optimal performance
- 🎭 **Animations**: Smooth animations with Framer Motion
- 🧭 **Navigation**: React Router for seamless page transitions
- 📧 **Contact Form**: Interactive contact form with validation
- 🎯 **SEO Ready**: Optimized for search engines

## Tech Stack

- **React 19** - Latest React with concurrent features
- **Material UI 7** - Modern component library
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
├── public/            # Static assets
├── index.html         # HTML template
└── vite.config.js     # Vite configuration
```

## Pages

- **Home** - Hero section with featured projects
- **About** - Skills, experience, and education
- **Projects** - Portfolio showcase with filtering
- **Contact** - Contact form and social links

## Customization

The website is fully customizable:

1. **Colors**: Update the theme in `src/main.jsx`
2. **Content**: Modify page components in `src/pages/`
3. **Projects**: Add your projects in `src/pages/Projects.jsx`
4. **Contact Info**: Update contact details in `src/pages/Contact.jsx`

## Deployment

The website can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

```bash
# Build the project
pnpm build

# Deploy the dist/ folder to your hosting service
```

## License

MIT License - feel free to use this template for your own portfolio!

