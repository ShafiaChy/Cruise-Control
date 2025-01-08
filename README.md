<div align="center">
  <h1>Car Rental Service Website </h1>
</div>
---

## Introduction

A Car Rental Service Website that provides car rental process, offering an easy-to-use platform for booking and managing rentals. It offers features like user authentication, Car management, and rental processing, with a clean and responsive design.

[Live Demo](https://cruise-control-rho.vercel.app/)

## Features

- User Authentication (Sign Up, Login, Logout).
- User Profile Management.
- Car Listing with advanced filtering and search functionality.
- Detailed Car View with booking options.
- Rental Management with payment processing.
- Admin Dashboard for Car, user, and coupon management.
- Responsive design for all devices.
- Additional features like coupons, side-by-side Car comparison, and dark mode.

## Technology Stack

- **Frontend:** React, Redux, TailwindCSS
- **Image Hosting:** Cloudinary
- **Payment:** Stripe
- **Hosting:** Vercel

## Installation Guideline

### Prerequisites

- Node.js installed on your machine.
- Backend service for the API.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NusratParvin/Car-Rental-Service-Client
   cd Car-rental-service-frontend
   ```

### Install dependencies:

````bash
npm install


### Set up environment variables:

1. Create a `.env` file in the root directory.
2. Add the following environment variables:

```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

### Run the application:

```bash
npm start

## Usage

### User Journey

#### Sign Up or Login:

- Users can sign up with their details or log in to access the dashboard.

#### Browse Cars:

- Use the home page search bar to find available Cars.
- Filter Cars by brand, model, or availability.

#### Book a Car:

- View detailed Car information and book a Car by choosing a start time and proceeding to payment.

#### Manage Rentals:

- Access the "My Rentals" page to manage current rentals, make payments, or view past rentals.

#### Admin Access:

- Admin users can manage Cars, users, and coupons through the Admin Dashboard.

## Screenshots

_Screenshots of the application go here._

## Error Handling

- **API Failures:** Displayed via toast notifications.
- **Form Validation Errors:** Shown next to the respective fields.
- **No Data Handling:** Friendly messages when no Cars or rentals are available.
- **404 Page:** Custom-designed for unmatched routes.

## UI/UX

- **Design:** Clean, modern, and user-friendly.
- **Responsiveness:** Fully responsive across mobile, tablet, and desktop.
- **Dark Mode:** Toggle between light and dark mode.

## Bonus Features

- **Coupon Functionality:** Users can apply discount coupons during checkout.
- **Side-by-Side Comparison:** Compare multiple Cars.
- **Micro-Animations:** Enhance user experience with subtle animations.

## Deliverables

- Fully functional frontend integrated with the backend.
- Responsive design for all pages.
- User and Admin dashboards with described features.
- Clean, well-organized, and documented code.


````
