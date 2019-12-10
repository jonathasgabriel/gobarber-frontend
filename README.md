# gobarber-front
A complete application for scheduling and managing beauty services

This frontend is implemented in  **React.js** and consumes the GoBarber API available at [gobarber-backend](https://github.com/jonathasgabriel/gobarber-backend). This client is used by providers only. The react-native mobile application is used by customers and is available at [gobarber-mobile](https://github.com/jonathasgabriel/gobarber-mobile).

## features
Providers are able to:
- Sign in and sign up
- View and edit their profiles
- View notifications regarding new appoinments
- View the dashboard with all scheduled appointments by date
- Log out from the application

## some of the leveraged techs/libs/tools
- Axios
- ESLint, Prettier, EditorConfig
- Styled components
- Reactotron
- React toastify
- React redux
- Redux saga

##  demo
![](gobarber-frontend.gif)

## how to run

- You need to have the backend API running in order to be able to use this client. Please refer to [backend](https://github.com/jonathasgabriel/gobarber-backend) for further instructions
- In the root directory, run `yarn` to resolve node packages and then `yarn start` to start the application (it will be available at [gobarber-localhost](http://localhost:3000/))
