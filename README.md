# Netflix CBP - Content Production Dashboard

A professional React application built for Netflix's Content & Business Products Engineering team. This dashboard demonstrates enterprise-level UI engineering capabilities including drag-and-drop functionality, data visualization, and responsive design.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/MarkFeder/netflix-cbp-dashboard.git
cd netflix-cbp-dashboard

# Install dependencies
npm install

# Copy environment variables (optional)
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:3000`

### Troubleshooting

**Port already in use:**
```bash
# The dev server uses port 3000 by default
# If port 3000 is occupied, Vite will automatically try the next available port
```

**Module not found errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## 📁 Project Structure

```
netflix-cbp-dashboard/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   └── Modal/
│   │   ├── features/         # Feature-specific components
│   │   │   ├── pipeline/     # Pipeline drag-and-drop
│   │   │   ├── schedule/     # Timeline view
│   │   │   ├── localization/ # Language tracking
│   │   │   └── analytics/    # Data visualization
│   │   └── layout/           # Layout components
│   │       ├── Header/
│   │       └── Navigation/
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles and CSS modules
│   ├── utils/               # Helper functions and constants
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
├── .idea/                   # WebStorm/Rider IDE configuration
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## ✨ Key Features

### 1. **Content Pipeline Management**
- Drag-and-drop interface for moving projects between stages
- Five production stages: Pitch → Greenlight → Pre-Production → Production → Post-Production
- Real-time visual feedback and state management

### 2. **Scheduling & Timeline**
- Chronological view of all projects
- Release date tracking and visualization
- Progress indicators for each project

### 3. **Localization Workflow**
- Multi-language support tracking (35+ languages)
- Animated progress bars
- Status indicators (Completed, In Progress, Pending)

### 4. **Analytics Dashboard**
- Budget distribution by genre (Chart.js)
- Stage distribution visualization
- Real-time statistics

### 5. **Project Management**
- Modal-based project creation
- Form validation
- Instant UI updates

## 🛠 Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Chart.js** - Data visualization
- **CSS3** - Custom styling with CSS variables
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🎨 Design System

### Color Palette
```css
--netflix-red: #E50914      /* Primary brand color */
--netflix-black: #141414    /* Background */
--accent-cyan: #00D9FF      /* Interactive elements */
--accent-green: #46D369     /* Success states */
--accent-yellow: #FFD700    /* Warnings */
```

### Typography
- **Display**: Bebas Neue (headers, titles)
- **Body**: IBM Plex Mono (content, UI text)

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Building
npm run build            # Production build
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier

# Testing (when implemented)
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

### IDE Setup (WebStorm/Rider)

The project includes pre-configured WebStorm/Rider settings in `.idea/`:
- Code style configuration
- ESLint integration
- Prettier formatting
- Git integration
- Project structure

Simply open the project folder in WebStorm/Rider and everything will be configured automatically.

### Code Style

The project uses:
- **ESLint** for JavaScript linting
- **Prettier** for code formatting
- Configured for React best practices

Format on save is enabled by default in WebStorm/Rider.

## 📦 Component Library

### Common Components

#### Button
```jsx
import { Button } from '@components/common/Button';

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

#### Card
```jsx
import { Card } from '@components/common/Card';

<Card title="My Card" badge="New">
  Content goes here
</Card>
```

#### Modal
```jsx
import { Modal } from '@components/common/Modal';

<Modal isOpen={isOpen} onClose={handleClose} title="My Modal">
  Modal content
</Modal>
```

### Path Aliases

The project uses path aliases for cleaner imports:

```javascript
import { Button } from '@components/common/Button';
import { formatDate } from '@utils/helpers';
import { INITIAL_PROJECTS } from '@utils/constants';
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

Available environment variables:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_GRAPHQL_URL=http://localhost:3000/graphql

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false

# Environment
VITE_APP_ENV=development
VITE_APP_VERSION=1.0.0
```

**Note:** All environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

### Vite Configuration

The `vite.config.js` file includes:
- Path aliases configuration
- Build optimization
- Code splitting strategy
- Development server settings

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deployment Options

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist` folder
- **AWS S3**: Upload `dist` contents to S3 bucket
- **Docker**: Build container with production build

## 🎯 Skills Demonstrated

This project showcases skills required for Netflix CBP Engineering:

✅ **UI Engineering Excellence**
- Complex React component architecture
- Modern JavaScript (ES6+)
- CSS3 with custom design system

✅ **Component Architecture**
- Reusable component patterns
- Proper separation of concerns
- Scalable folder structure

✅ **Drag-and-Drop Functionality**
- HTML5 Drag and Drop API
- State management during drag operations
- Visual feedback

✅ **Data Visualization**
- Chart.js integration
- Responsive charts
- Custom styling

✅ **Responsive Design**
- Mobile-first approach
- Flexible layouts
- Touch-friendly interfaces

✅ **Performance Optimization**
- Code splitting ready
- Efficient re-rendering
- Optimized asset loading

✅ **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management

## 📝 License

MIT

## 🤝 Contributing

This is a portfolio project. For questions or suggestions, please open an issue.

---

**Built for Netflix Content & Business Products Engineering**

*Demonstrating production-ready code quality, enterprise design patterns, and scalable architecture.*
