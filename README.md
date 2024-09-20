

---

# IkeMarfo E-commerce Platform Documentation

## Table of Contents

1. **Introduction**
   - Overview
   - Features

2. **Getting Started**
   - Prerequisites
   - Installation
   - Project Structure

3. **Frontend**
   - Technology Stack
   - Key Components
   - State Management
   - Routing

4. **Backend**
   - Technology Stack
   - Database Schema
   - API Endpoints

5. **Payment Integration**
   - Paystack API
   - Payment Methods
     - Momo
     - Visa Card
     - Installments
     - Cash on Delivery

6. **Deployment**
   - Deployment Instructions
   - Environment Variables

7. **Testing**
   - Testing Frameworks
   - Running Tests

8. **Contributing**
   - How to Contribute
   - Code of Conduct

9. **Support**
   - FAQs
   - Contact Information

---

## 1. Introduction

### Overview
IkeMarfo is an e-commerce platform designed to provide users with a seamless shopping experience. Built with React.js and MongoDB, it allows users to browse, add items to a cart, and make payments using various methods.

### Features
- User registration and authentication
- Product browsing and filtering
- Cart functionality
- Multiple payment options: Momo, Visa Card, installments, and cash on delivery
- User-friendly interface

---

## 2. Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB instance running
- Paystack account for payment integration

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/isaac292/ikemarfo
   ```
2. Navigate to the project directory:
   ```bash
   cd ikemarfo
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Project Structure
```
ikemarfo/
├──         # React 
│   ├── src/          # Source code
│   ├── public/       # Static files
├── .env              # Environment variables
```

---

## 3. Frontend

### Technology Stack
- React.js
- Redux (for state management)
- React Router (for navigation)

### Key Components
- `ProductList`: Displays all products
- `Cart`: Manages items added to the cart
- `Checkout`: Handles payment processing

### State Management
Utilize Redux for managing the global state, especially for cart and user authentication.

### Routing
Implement React Router to navigate between different views (home, product details, cart, checkout).

---

## 4. Backend

### Technology Stack
- Node.js
- Express.js
- MongoDB

### Database Schema
- **User**
  - `_id`: ObjectId
  - `name`: String
  - `email`: String
  - `password`: String
  - `address`: String

- **Product**
  - `_id`: ObjectId
  - `name`: String
  - `description`: String
  - `price`: Number
  - `image`: String

- **Order**
  - `_id`: ObjectId
  - `userId`: ObjectId
  - `items`: Array
  - `total`: Number
  - `paymentMethod`: String

### API Endpoints
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: User login
- `GET /api/products`: Get all products
- `POST /api/orders`: Create a new order

---

## 5. Payment Integration

### Paystack API
Integrate Paystack for payment processing. Use the official Paystack documentation for guidance.

### Payment Methods
- **Momo**: Integrate mobile money API.
- **Visa Card**: Handle card payments via Paystack.
- **Installments**: Allow users to pay in parts, managed via backend logic.
- **Cash on Delivery**: Mark orders for cash payments upon delivery.

---

## 6. Deployment

### Deployment Instructions
1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the server using a service like Heroku, AWS, or DigitalOcean.

### Environment Variables
Ensure you have the following variables in your `.env` file:
```
MONGODB_URI=your_mongodb_uri
PAYSTACK_SECRET=your_paystack_secret_key
```

---

## 7. Testing

### Testing Frameworks
Utilize Jest and Supertest for testing the backend.

### Running Tests
```bash
npm test
```

---

## 8. Contributing

### How to Contribute
1. Fork the repository.
2. Create a new branch for your feature.
3. Submit a pull request.

### Code of Conduct
Please adhere to the community guidelines and maintain respectful communication.

---

## 9. Support

### FAQs
- **How to reset my password?**
- **What payment methods are accepted?**

### Contact Information
For support, please reach out to us.

---


