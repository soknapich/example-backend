# Project Name

This is my api backend project that include basic libraries, JWT, express server...

## Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (v23.8.0 or later recommended)
* [npm](https://www.npmjs.com/) (comes with Node.js)

You can check your versions:

```bash
node -v
npm -v
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/soknapich/example-backend
cd example-backend
```

2. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env.development` file in the root of the project. Example:

```env
APP_PORT=3000
APP_API='/api/v1'
DB_HOST_NAME='localhost'
DB_NAME='dev-database'
```

## Running the Application

### Development

```bash
npm run dev
```

This usually starts the server with **nodemon** for auto-reloading.

### Production

```bash
npm start
```

The server will run using the default Node.js process.

## Scripts

| Command       | Description                      |
| ------------- | -------------------------------- |
| `npm run dev` | Start server in development mode |
| `npm start`   | Start server in production mode  |


## License

This project is licensed under the MIT License.

---

You can expand this with **API endpoints**, **contributing guide**, or **known issues** as needed.

---
