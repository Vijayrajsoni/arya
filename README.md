# 🌱 ARYA Agriculture

ARYA Agriculture is a web-based agriculture platform built with **Node.js, Express.js, EJS, and MongoDB**. The application provides an agriculture-focused website with product, services, news, contact, registration, login, cart, and admin functionality.

## 🚀 Live Demo

**Live Website:** https://aryaagriculture.duckdns.org/

## ✨ Features

- 🏠 Agriculture-focused home page
- 👤 User registration and login
- 🔐 Admin login
- 🔑 Forgot/reset password functionality
- 🛒 Cart page
- 🌾 Product section
- 🧑‍🌾 Agriculture services section
- 📰 News section
- 📞 Contact form
- 💾 Contact and user data stored in MongoDB
- 🔒 Session-based login state
- 📱 Static assets served from the `public` directory
- ☁️ Deployed on Render

## 🛠️ Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- EJS (Embedded JavaScript Templates)

### Backend
- Node.js
- Express.js
- Express Session

### Database
- MongoDB
- Mongoose

### Deployment
- GitHub
- Render

## 📁 Project Structure

```text
arya/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── ...
│
├── views/
│   ├── admin/
│   │   └── adminhome.ejs
│   │
│   ├── home/
│   │   ├── about.ejs
│   │   ├── cart.ejs
│   │   ├── contact.ejs
│   │   ├── footer.ejs
│   │   ├── header.ejs
│   │   ├── home.ejs
│   │   ├── news.ejs
│   │   ├── product.ejs
│   │   └── services.ejs
│   │
│   └── login/
│       ├── forgotpassword.ejs
│       ├── invalid.ejs
│       ├── login.ejs
│       └── register.ejs
│
├── .env
├── .gitignore
├── dbconnect.js
├── index.js
├── package.json
└── package-lock.json
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Vijayrajsoni/arya.git
cd arya
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=your_session_secret
```

Do **not** upload `.env` to GitHub.

### 4. Start the application

For development:

```bash
node index.js
```

The application will run on:

```text
http://localhost:3000
```

When deployed on Render, the application automatically uses the `PORT` environment variable.

## 🗄️ MongoDB

The application uses MongoDB for storing application data.

Current collections used by the application include:

- `admin1` — user registration/login information
- `farmers` — contact/submitted farmer-related records

The MongoDB connection is handled through `dbconnect.js`.

## 🔗 Main Routes

| Route | Purpose |
|---|---|
| `/` | Home page |
| `/home` | Home page |
| `/login` | Login page |
| `/register` | Registration page |
| `/forgotpassword` | Forgot password page |
| `/about` | About page |
| `/product` | Product page |
| `/services` | Services page |
| `/news` | News page |
| `/contact` | Contact page |
| `/cart` | Cart page |
| `/loginres` | Login processing |
| `/registers` | Registration processing |
| `/contacts` | Contact form processing |
| `/forgotpasswords` | Password update processing |

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `SESSION_SECRET` | Secret used for Express sessions |
| `PORT` | Server port; provided automatically by Render |

## ☁️ Deployment on Render

The project can be deployed as a **Web Service** on Render.

Recommended settings:

```text
Build Command: npm install
Start Command: npm start
Branch: main
```

Add the required environment variables in the Render dashboard:

```text
MONGO_URI
SESSION_SECRET
```

The application listens on:

```js
const PORT = process.env.PORT || 3000;
```

so it works both locally and on Render.

## 📦 Important Files

### `index.js`

Contains:

- Express server
- Routes
- Session configuration
- EJS configuration
- Form handling
- Authentication logic
- Server startup

### `dbconnect.js`

Handles the MongoDB connection using Mongoose.

### `package.json`

Contains project dependencies and the start script.

## 🔒 Security Notes

- Never commit `.env` to GitHub.
- Do not expose your MongoDB username/password publicly.
- Use a strong `SESSION_SECRET` in production.
- Passwords should ideally be hashed using a password-hashing library such as bcrypt before storing them in MongoDB.
- For production, use a persistent session store instead of Express's default `MemoryStore`.

## 🔮 Future Improvements

- Password hashing with bcrypt
- Persistent MongoDB session store
- User authentication middleware
- Role-based authorization
- Complete shopping cart functionality
- Product CRUD operations
- Admin dashboard improvements
- Image upload functionality
- Order management
- Form validation
- Better error handling
- Responsive UI improvements
- Search and product filtering

## 👨‍💻 Author

**Vijay Raj Soni**

## 📄 License

This project is intended for educational and project-development purposes.
