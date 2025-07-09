# URL Shortener - Client

This is the client-side application for the URL Shortener project, built with Next.js, TypeScript, and Tailwind CSS. It provides a user-friendly interface for shortening URLs, managing shortened links, and viewing analytics.

## ✨ Features

- **User Authentication:** Secure user registration and login functionality.
- **URL Shortening:** Quickly shorten long URLs with the option to create custom aliases.
- **Dashboard:** View and manage all your shortened URLs in one place.
- **Analytics:** Track the performance of your shortened links with detailed analytics, including:
  - **Clicks Chart:** Visualize the number of clicks over time.
  - **Devices Chart:** See which devices are used to access your links.
  - **Geo Chart:** Understand the geographical distribution of your audience.
- **Responsive Design:** A fully responsive layout that works on all devices.
- **Theme Toggle:** Switch between light and dark themes for a personalized experience.

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/url-shortener.git
    ```
2.  Navigate to the client directory:
    ```bash
    cd url-shortener/client
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env.local` file in the root of the client directory and add the following environment variables:
    ```env
    NEXT_PUBLIC_API_URL = http://localhost:5080
    NEXT_PUBLIC_COOKIES_EXPIRES = 2592000
    CLIENT_URL = http://localhost:3000
    ```
5.  Start the development server:
    ```bash
    npm run dev
    ```
6.  Open your browser and navigate to `http://localhost:3000`.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - The React framework for production.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- [Radix UI](https://www.radix-ui.com/) - A collection of unstyled, accessible, and customizable UI components.
- [Recharts](https://recharts.org/) - A composable charting library built on React components.
- [Axios](https://axios-http.com/) - A promise-based HTTP client for the browser and Node.js.
- [Zod](https://zod.dev/) - A TypeScript-first schema declaration and validation library.
- [React Hook Form](https://react-hook-form.com/) - A performant, flexible, and extensible forms library for React.

## 🔗 Links

- 🔗 **Live Preview**: [Preview](https://url-shortener-client-app.vercel.app/)
- 📂 **Backend Repository**: [GitHub Repository](https://github.com/md-rejoyan-islam/URL-Shortener-backend.git)
- 📂 **Source Code**: [GitHub Repository](https://github.com/md-rejoyan-islam/URL-Shortener-frontend/)

## 📬 Contact

If you have any questions, suggestions, or just want to connect, feel free to reach out:

- **Author**: Md Rejoyan Islam
- **GitHub**: [md-rejoyan-islam](https://github.com/md-rejoyan-islam)
- **LinkedIn**: [Md Rejoyan Islam](https://www.linkedin.com/in/md-rejoyan-islam/)
- **Portfolio**: [https://md-rejoyan-islam.github.io](https://md-rejoyan-islam.github.io)
- **Email**: [rejoyanislam0014@gmail.com](mailto:rejoyanislam0014@gmail.com)
