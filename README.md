# E-Commerce Application

A modern, responsive e-commerce web application built with React and Vite, featuring user authentication, product browsing, shopping cart, and checkout functionality.

## Features

- **User Authentication**: Login, register, and password recovery
- **Product Browsing**: View products by categories and brands
- **Product Details**: Detailed view of individual products
- **Shopping Cart**: Add, remove, and manage cart items
- **Checkout Process**: Address selection and cash payment options
- **Order Management**: View all orders
- **Responsive Design**: Optimized for desktop and mobile devices
- **Protected Routes**: Secure access to user-specific features

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Data Fetching**: TanStack React Query
- **Forms**: Formik with Yup validation
- **Styling**: Tailwind CSS
- **Icons**: FontAwesome
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Carousels**: React Slick

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code linting

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Home/           # Home page component
│   ├── Cart/           # Shopping cart component
│   ├── Products/       # Products listing
│   ├── ProductDetails/ # Individual product view
│   ├── Login/          # Authentication components
│   └── ...
├── Context/            # React Context providers
├── Hooks/              # Custom React hooks
├── assets/             # Static assets (images, icons)
└── ...
```

## API Integration

This application integrates with a backend API for data fetching. Ensure the API endpoints are properly configured in the Axios instances used throughout the components.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
