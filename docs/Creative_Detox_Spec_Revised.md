**Creative Detox**

*Art for Your Mental Escape.*

Senior Project Specification

Revised Scope — 10-Day Local Build Plan

# **Project Overview**

Creative Detox is a full-stack web platform that encourages people to disconnect from daily stress through art. The platform combines an online art marketplace, workshop registration, a customized gypsum ordering flow, and a lightweight AI-powered recommendation feature.

This version of the specification reflects a scope that has been deliberately trimmed to be realistic for a 10-day development timeline, while still demonstrating full-stack engineering, authentication, database design, and AI integration.

*Note: The application (frontend + backend) will be developed and presented on localhost. No app hosting, deployment, or production configuration is in scope. The database is the one exception: it runs on a MongoDB Atlas free-tier cluster rather than a local MongoDB instance, so the same data is reachable from any machine (development machine and presentation laptop) without reseeding.*

## **Roles**

- User

- Administrator

## **Technology Stack**

- Frontend: React.js, React Router, Axios, Tailwind CSS / CSS

- Backend: Node.js, Express.js

- Database: MongoDB Atlas (cloud-hosted, free-tier M0 cluster), Mongoose ODM

- Authentication: JWT, bcrypt

- AI Integration: OpenAI API (single-purpose call, described below)

# **Objectives**

- Build a complete full-stack web application, run and presented locally.

- Allow users to browse and add artworks to a cart and place a simulated order.

- Allow users to register for upcoming art workshops.

- Allow users to order customized Arabic gypsum carvings.

- Provide administrators with management tools for artworks, workshops, registrations, and gypsum orders.

- Integrate a simple AI feature that recommends workshops based on the user's emotional state.

- Demonstrate authentication, REST API design, database modeling, role-based authorization, and AI integration.

# **Target Users**

## **Regular Users**

- Explore available artwork.

- Add artwork to a cart and place a simulated order.

- Register for workshops.

- Request a customized Arabic gypsum carving.

- Receive workshop recommendations based on their emotional state.

## **Administrator**

- Manage artworks.

- Manage workshops.

- View workshop registrations.

- Manage customized gypsum orders.

# **User Features**

## **Authentication**

- Register

- Login

- Logout

- Secure password hashing (bcrypt)

- JWT-based authentication

- Protected routes based on role (user / admin)

## **Home Page**

- Hero section

- Featured paintings

- Upcoming workshops

- Featured customized gypsum pieces

- About Creative Detox

- Call-to-action sections

## **Art Gallery**

Each artwork includes an image, title, description, artist, price, and availability status.

- Browse artwork

- View artwork details

- Add artwork to cart

## **Shopping Cart & Simplified Checkout**

This flow has been intentionally simplified for the project timeline.

- Each artwork is one-of-a-kind: quantity is always 1, no quantity selector is needed.

- Users can add or remove paintings from the cart.

- Users can view the cart subtotal.

- Clicking "Checkout" immediately displays an "Order Placed" confirmation and clears the cart.

- No payment gateway, shipping details, or order status tracking is implemented.

*Note: The cart can be kept entirely in frontend state (React state or localStorage) since nothing needs to persist past checkout. A minimal Orders record can optionally be saved for demo purposes, but is not required.*

## **Customized Gypsum Section**

Users can request personalized gypsum artwork by entering:

- Arabic name or word

- Optional notes

- Preferred size

- Preferred color (optional)

The order is saved and sent to the administrator for review and production.

## **Workshop Registration**

Each workshop includes a title, description, date, time, location, available seats, and price (if applicable).

- Browse upcoming workshops

- Register directly through the platform

- Registrations are stored in the database

# **Artificial Intelligence Feature**

## **Emotion-Based Workshop Recommendation**

The AI feature has been simplified to a single, focused OpenAI API call rather than a full recommendation engine across paintings, workshops, and gypsum ideas.

- The user is asked: "How are you feeling today?"

- The user selects a predefined emotion (e.g. Stressed, Anxious, Happy, Lonely, Burned Out, Creative, Calm, Motivated) or types a free-text description.

- The backend sends the user's input, along with the list of current workshops (titles and short descriptions) from MongoDB, to the OpenAI API.

- The API is prompted to return only the names of the workshops that best match the user's emotional state.

- The frontend displays the recommended workshop names to the user.

*Note: No emotion-classification model, taxonomy, or separate recommendation database is required. One API call handles both interpreting the emotion and matching it to existing workshops.*

# **Administrator Dashboard**

## **Artwork Management**

- Add artwork

- Edit artwork

- Delete artwork

- Upload / set image (URL or file)

- Update prices

- Mark artwork as sold / available

## **Workshop Management**

- Create workshops

- Edit workshops

- Delete workshops

- Change available seats

- Update dates

## **Registration Management**

- View all workshop registrations

- Filter by workshop

- View participant information

## **Gypsum Orders Management**

- View customized orders

- Read customer notes

- Update order status

- Mark orders as completed

# **Database Collections (MongoDB)**

- Users — personal information, authentication data, role

- Artworks — title, description, image, price, category, availability

- Workshops — title, description, date, time, capacity, remaining seats

- Workshop Registrations — user, workshop, registration date

- Gypsum Orders — customer, Arabic text, notes, size, color, status

*Note: The Cart and Orders collections are optional given the simplified checkout flow. If used, Cart can simply track a user's currently selected artworks, and Orders can log a basic "placed" record for demo purposes.*

# **REST API**

- Authentication — register, login, logout

- Users — profile, update profile

- Artworks — create, read, update, delete

- Cart / Checkout — add item, remove item, place order (clears cart)

- Gypsum Orders — create order, view orders, update status

- Workshops — CRUD operations

- Workshop Registration — register, cancel registration

- AI Recommendation — send emotion / text, return matching workshop names

# **Presentation & Deployment Scope**

- The application itself still runs locally: React dev server for the frontend, Express server for the backend, on whichever laptop is presenting. Only the database is cloud-hosted, on a MongoDB Atlas free-tier (M0) cluster, so it stays consistent across machines without reseeding.

- No app hosting/deployment, no CI/CD, and no production build configuration are required — that scope is unchanged. MongoDB Atlas is used solely as a hosted database, not as a deployment platform for the app itself.

- CORS and environment variables only need to support a localhost frontend/backend talking to a remote MongoDB Atlas connection string.

# **Expected Outcome**

Creative Detox remains a full-stack platform that combines art e-commerce browsing, workshop registration, custom gypsum orders, and a focused AI feature into a single application. By simplifying checkout and narrowing the AI feature to a single recommendation call, the project stays achievable within a 10-day timeline while still demonstrating authentication, REST API design, MongoDB schema design, role-based administration, and practical AI integration.
