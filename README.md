# Product Sorting and Filtering App

This project is a simple **Product Sorting and Filtering** application built with **Next.js App Router** and deployed on **Vercel**. It enables users to filter and sort a list of products by rating, category, and tag. The app is developed using **TypeScript, TanStack React Query** for data fetching, **TailwindCSS** for styling, **Material UI (MUI)** components for the user interface, and **Jest** for unit testing.

## Features

- Product listing with filtering and sorting
- Sorting by rating, category, and tag
- Search functionality with debouncing
- Responsive design using **TailwindCSS**
- Data fetching and caching using **TanStack React Query**
- Unit tests with **Jest**
- Deployed on **Vercel**

## Technologies

- **Next.js App Router** - For server-rendered and statically generated pages
- **TypeScript** - For static typing
- **TanStack React Query** - For efficient data fetching and caching
- **TailwindCSS** - For responsive and utility-first CSS styling
- **MUI (Material UI)** - For pre-built UI components
- **Jest** - For unit testing
- **Vercel** - For deployment

## Getting Started

#### Prerequisites

- Node.js >= 18
- npm or yarn

#### Installation

1. Clone the repository:

```bash
  git clone https://github.com/Zub04ek/nextjs-project.git
  cd nextjs-project
```

2. Install dependencies:

```bash
  npm install
  # or
  yarn install
```

3. Run the development server:

```bash
  npm run dev
  # or
  yarn dev
```

The application will run on http://localhost:3000.

#### Environment Variables

Create a `.env` file in the root of the project to configure environment variables:

```bash
  PRODUCTSBASE_URL=https://dummyjson.com
```

#### Running Tests

To run unit tests:

```bash
  npm run test
  # or
  yarn test
```

### Deployment

To deploy on **Vercel**:

1. Push the repository to GitHub.
2. Login to **Vercel** and connect the GitHub repository.
3. Vercel will automatically detect the **Next.js** app and handle the deployment process.

### Future Enhancements

- **Pagination**: Add pagination to the product list for better user experience with larger datasets.
- **Additional Filters**: Add more advanced filters such as rating, brand, or price range sliders.
- **Animations**: Add smooth animations for better user engagement.
