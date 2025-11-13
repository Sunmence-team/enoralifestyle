# Enora Lifestyle Spa & Wellness

## Overview
Enora Lifestyle is a modern React web application designed to provide a comprehensive online presence for a spa and wellness center. It features a customer-facing interface for browsing services, packages, and blog content, along with a robust administrative dashboard for managing business operations. The application leverages a cutting-edge frontend stack to deliver a seamless and engaging user experience. 🌿✨

## Features
*   **Spa Services & Packages**: Explore a wide range of wellness services and curated packages with detailed descriptions and pricing.
*   **Shopping Cart**: Add multiple services and packages to a dynamic cart before proceeding to reservation.
*   **Online Reservation System**: Book appointments by providing personal details, preferred date, and time.
*   **Flexible Payment Options**: Secure online payment processing (via Paystack) for deposits and manual bank transfer with proof upload.
*   **Blog Section**: Discover insightful articles, beauty tips, and wellness advice. Supports date filtering and commenting.
*   **Contact Form**: Easily send inquiries to the spa directly through the website.
*   **Ebook Purchase**: Purchase a specialized wellness ebook with online payment.
*   **User Authentication**: Secure login/registration for administrative staff.
*   **Admin Dashboard**: A protected area for administrators to:
    *   **Manage Services**: Add, edit, and delete spa services.
    *   **Manage Packages**: Create, update, and remove bundled packages, linking them to existing services.
    *   **Upload & Manage Blogs**: Create, edit, and delete blog posts; manage comments.
    *   **Manage Testimonials**: Upload, edit, and delete client testimonials.
    *   **Manage Contacts**: View and respond to customer inquiries.
    *   **Manage Appointments**: View, filter, and update the status of client bookings.
*   **Responsive Design**: Optimized for a seamless experience across all devices, from desktop to mobile.

## Getting Started

### Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file:

`VITE_API_BASE_URL` - The base URL of your backend API (e.g., `https://api.enoralifestyle.com/api/v1`)
`VITE_IMAGE_BASE_URL` - The base URL for images served by the backend (e.g., `https://api.enoralifestyle.com`)

## Usage

Enora Lifestyle provides a dual interface: a public-facing website for clients and a secure dashboard for administrators.

### Client-Facing Website

1.  **Browse Services & Packages**: Navigate to the "Services" or "Packages" sections from the main navigation bar. You can view details, prices, and descriptions.
2.  **Add to Cart**: Click the "Add to Cart" button on any service or package card to add it to your reservation list. The cart icon in the navigation will update with the item count.
3.  **Initiate Reservation**: Click the shopping cart icon, then select "Proceed to Reservation."
4.  **Fill Booking Form**: Provide your contact details, preferred booking date, and time. You will see a summary of your selected items.
5.  **Choose Payment Method**: Select "Pay Online Now" for an instant deposit via Paystack, or "Pay Manually (Upload Proof)" to upload a screenshot of your bank transfer.
6.  **Payment Status**: After payment, you will be redirected to a payment status page confirming your booking or ebook purchase.
7.  **Explore Blog**: Visit the "Blog" section to read articles. You can filter blogs by date and leave comments.
8.  **Contact Us**: Use the "Contact Us" form to send messages and inquiries directly to the spa.
9.  **Buy Ebook**: On the homepage, locate the Ebook section and click "Buy Now" to make a purchase.

### Admin Dashboard

Access the dashboard by navigating to `/login` and logging in with administrator credentials.

1.  **Overview**: View key statistics regarding total, pending, completed, and cancelled appointments.
2.  **Manage Services**:
    *   Go to `/dashboard/services`.
    *   **Add New Service**: Fill in the service name, price, description, and upload an image.
    *   **Edit Service**: Click the 'Edit' icon next to a service in the table, update details in the form, and save.
    *   **Delete Service**: Click the 'Delete' icon and confirm to remove a service.
3.  **Manage Packages**:
    *   Go to `/dashboard/package`.
    *   **Create Package**: Provide package name, price, description, select associated services (from a multi-select list), and upload an image.
    *   **Update Package**: Edit an existing package's details, including its associated services.
    *   **Delete Package**: Remove a package from the system.
4.  **Upload & Manage Blogs**:
    *   Go to `/dashboard/blogUpload`.
    *   **Upload Blog Post**: Enter a title, short description, main content, and upload a cover image.
    *   **Edit Blog Post**: Select a blog from the table to populate the form for editing.
    *   **Manage Comments**: View comments on a blog post, edit them, or delete inappropriate ones.
5.  **Manage Testimonials**:
    *   Go to `/dashboard/testimonial`.
    *   **Upload Testimonial**: Add full name, occupation, comment, and an image for a new testimonial.
    *   **Edit Testimonial**: Update the details of an existing testimonial.
    *   **Delete Testimonial**: Remove a testimonial.
6.  **Manage Contacts**:
    *   Go to `/dashboard/contacts`.
    *   View all contact messages received from clients.
    *   **View Details**: See the full message content.
    *   **Delete Contact**: Remove old or resolved inquiries.
7.  **Appointments**:
    *   Go to `/dashboard/appointments`.
    *   View all client reservations.
    *   **Filter Appointments**: Search by name, email, phone, or filter by status and date range.
    *   **Edit Appointment Status**: Update an appointment's status (e.g., pending, confirmed, attended, cancelled).
    *   **Delete Appointment**: Remove a booking.

## Technologies Used

| Category        | Technology          | Description                                    |
| :-------------- | :------------------ | :--------------------------------------------- |
| **Frontend**    | React 19            | UI library for building dynamic user interfaces |
|                 | Vite                | Fast build tool and development server         |
|                 | TypeScript          | Type-safe JavaScript superset                  |
|                 | Tailwind CSS        | Utility-first CSS framework for styling        |
|                 | Framer Motion       | Animation library for smooth UI transitions    |
|                 | React Router DOM    | Declarative routing for React                  |
|                 | Zustand             | Fast and scalable state management solution    |
|                 | Axios               | Promise-based HTTP client for API calls        |
|                 | Formik & Yup        | Form building and validation                   |
|                 | Sonner              | Accessible toast library for notifications     |
|                 | Lucide React        | Modern icon library                            |
|                 | date-fns            | Utility library for date manipulation          |

## Author

**[Your Name Here]**
*   LinkedIn: [@YourLinkedInUsername](https://linkedin.com/in/YourLinkedInUsername)
*   Twitter: [@YourTwitterHandle](https://twitter.com/YourTwitterHandle)
*   Portfolio: [YourWebsite.com](https://YourWebsite.com)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)