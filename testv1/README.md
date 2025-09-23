# Hub-City Transit Bus Tracket

## Description

This is my rendition of a transit web app, built from scratch to improve the UI/UX experience. While still in progress, the core functionalities are operational, demonstrating a fresh approach to a transit app by prioritizing essential features and user-friendly design. My goal is to create a more intuitive and visually appealing app that helps users navigate their city's public transportation with ease.

---

## Status and Features

This project is still under active development, but the essential features are functional. I'm currently working on adding more features and refining the user experience.

### Key Features

* **Next Stop Display:** Calculates and shows the upcoming stop on the route.
* **Time of Arrival (ETA):** Estimates the arrival time for the next stop.
* **Bus Course Display:** Renders the bus's route on the map.
* **Interactive Pop-ups:** Provides quick information about stops and the bus's status.
* **"Fly-to" Feature:** Automatically pans the map to the next stop for a seamless viewing experience.
* **Bus Progression System:** A unique feature that visually represents the bus's progress along the route, proportional to the actual distance covered.

---

### Prerequisites

Before you begin, make sure you have **Node.js** installed on your computer. You can download it from the official Node.js website. Node.js comes with **npm** (Node Package Manager), which you'll need to install the project's dependencies.

### API

To ensure the application works correctly, you'll need to configure the API key for the live-transit data. This project uses the Tomtom Routing API to retrieve real-time traffic data to calculate the eta.


### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/HimnshuSh/hub-city-transit-v2.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd hub-city-transit-v2/testv1
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App

After installation is complete, start the development server:

```bash
npm run dev
