# Weatheria

Weatheria is a simple weather dashboard application that allows users to add multiple cities and view their current weather conditions as well as forecasts for the next few days. The app is built with Angular and styled using Tailwind CSS, featuring smooth animations for an enhanced user experience.

## Live Demo

Check out the live application: [Weatheria on Netlify](https://weatheriaapp.netlify.app/)

## Features

- Add multiple cities to your personal weather dashboard
- View current weather conditions for each city, including:
  - City name
  - Current temperature
  - Weather condition (e.g., sunny, rainy)
- Remove cities from the dashboard
- Persist city list across page refreshes using local storage
- View weather forecasts for the next few days
- Responsive design for various screen sizes
- Loading indicators during data fetching
- Error handling for city not found scenarios
- Fancy animations to enhance user experience

## Technologies Used

- Node.js (v20.16.0)
- npm (v10.8.1)
- Angular (v18.2.8)
- RxJS (v7.8.1)
- TypeScript (v5.5.4)
- Zone.js (v0.14.10)
- Tailwind CSS
- Angular Animations

## Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/weatheria.git
   cd weatheria
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Testing

Run unit tests using Jasmine and Karma:

```
ng test
```

## Building for Production

To build the application for production, run:

```
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

The project follows a feature-based structure, with each major feature having its own module and components. Key directories include:

- `src/app/components`: Reusable UI components
- `src/app/services`: API and data management services
- `src/app/models`: TypeScript interfaces and models
- `src/app/pages`: Main pages

## Version Control

This project uses Git for version control, with the following branching strategy:

- Each feature is developed in a separate branch named after the feature
- Commits follow a detailed structure based on Trello card descriptions
- The project board can be found here: [Weatheria Trello Board](https://trello.com/invite/b/670d2d6fcbf7fb2a95236700/ATTIf88e57f897f22395caed6b53d6953189187538AE/project-management)

## API Key Management

For the GitHub repository, the API key is included to facilitate easy setup and testing. However, in the production environment (Netlify), environment variables are used to securely manage the API key.

**Note**: In a real-world scenario, it's crucial to keep API keys and other sensitive information out of version control. The inclusion of the key in this repository is solely for demonstration purposes.

## Performance Optimization

Efforts have been made to enhance performance, accessibility, SEO, and adhere to best practices based on Lighthouse reports. Some key optimizations include:

- Image optimization
- Accessibility
- SEO best practices

**Note**: I made this project client side rendring despite that I used angular universal(SSR) at the beginning in order to use local storage
