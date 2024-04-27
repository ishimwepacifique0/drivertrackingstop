# React Google Maps Navigation App

This is a simple React application that demonstrates real-time navigation using Google Maps API. It allows driver  to visualize a route with multiple stops and calculates the estimated time of arrival (ETA) for each stop based on constant average speed.

## Features

- Real-time navigation using Google Maps API
- Visualization of route with multiple stops
- Calculation of ETA for each stop based on constant average speed
- Responsive design for desktop and mobile devices

## Technologies Used

- React.js
- Chakra UI
- @react-google-maps/api

## Setup Instructions

To run this application locally, follow these steps:

1. Clone this repository to your local machine:
   
   git clone https://github.com/ishimwepacifique0/drivertrackingstop.git
   

2. Navigate to the project directory:

   cd drivertrackingstop


3. Install dependencies using npm or yarn:

   yarn install

4. Obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/).
   
5. Create a `.env` file in the project root directory and add your Google Maps API key:

   REACT_APP_GOOGLE_MAPS_API_KEY=your-api-key

6. Start the development server:

   yarn start
   

7. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Upon loading the application, you will see a map displaying the route from the starting point to the destination, with markers indicating each stop along the way.
- The sidebar displays information about the current route, including the next stop, distance, and estimated time of arrival.
- Clicking the "Move to Next Stop" button will update the route to navigate to the next stop and recalculate the ETA.
