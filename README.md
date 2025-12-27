# E-Commerce Application

A modern, full-featured e-commerce application built with React, Redux Toolkit, and Redux Saga for state management.

## Features

- User Authentication with JWT token storage
- Product browsing with category filters
- Pagination for products
- Shopping cart functionality
- Checkout page with cart management
- Protected routes
- Responsive design with Material-UI
- Redux Saga for async operations

## Tech Stack

- **React 19.2.0** - UI library
- **Redux Toolkit 2.11.2** - State management
- **Redux Saga 1.4.2** - Side effect management
- **React Router DOM 7.11.0** - Routing
- **Material-UI 7.3.6** - UI components
- **Vite** - Build tool

## Installation

1. Clone the repository or navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Login Credentials

**Test Account:**
- **Username:** `emilys`
- **Password:** `emilyspass`

> Note: These are test credentials from the DummyJSON API for development and testing purposes.

## Project Structure

```
src/
├── app/
│   ├── store.js          # Redux store configuration
│   └── rootSaga.js       # Root saga combining all sagas
├── components/
│   ├── Navbar.jsx        # Navigation bar with cart count
│   └── ProtectedRoute.jsx # Route protection component
├── features/
│   ├── authSlice.js      # Authentication state management
│   ├── authSaga.js       # Authentication API calls
│   ├── productSlice.js   # Products state management
│   ├── productSaga.js    # Products API calls
│   └── cartSlice.js      # Shopping cart state management
└── pages/
    ├── Login.jsx         # Login page
    ├── Home.jsx          # Products listing page
    └── Checkout.jsx      # Checkout page
```

## API Endpoints

This application uses the [DummyJSON API](https://dummyjson.com):

- **Authentication:** `https://dummyjson.com/auth/login`
- **Products:** `https://dummyjson.com/products`
- **Categories:** `https://dummyjson.com/products/categories`

## Features Overview

### Authentication
- Secure login using JWT tokens
- Token stored in localStorage
- Protected routes for authenticated users
- Automatic redirect to login for unauthenticated users

### Product Browsing
- Display all products in a responsive grid layout
- Category-based filtering
- Pagination (20 products per page)
- Product cards with images, descriptions, and prices
- Discount badges for products with discounts

### Shopping Cart
- Add products to cart
- Cart count displayed in navbar
- Persistent cart using localStorage
- Quantity management in checkout
- Remove items from cart
- Total price calculation

### Checkout
- Review all cart items
- Adjust quantities
- Remove items
- View total price
- Place order functionality

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## State Management

The application uses Redux Toolkit with Redux Saga for:
- **Auth State:** User authentication, token, and login state
- **Products State:** Product list, categories, pagination, and filters
- **Cart State:** Shopping cart items with persistence

## Routing

- `/login` - Login page (redirects to home if already authenticated)
- `/` - Home page with products (protected)
- `/checkout` - Checkout page (protected)

## Build

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Browser Support

Modern browsers that support ES6+ features.

## License

This project is for educational/demonstration purposes.

## Notes

- The application uses localStorage for token and cart persistence
- Cart data persists across page refreshes
- Authentication state is checked on app initialization
- All API calls are handled through Redux Saga middleware

