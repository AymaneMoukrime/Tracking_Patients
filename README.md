# Hospital Patient Tracking System
## Overview 
This project is a microservices-based application for tracking patients in a hospital. It includes services for managing doctors and patients, real-time tracking of patients, and alerting when patients go beyond a safe zone.
## Software architecture
<img width="833" alt="image" src="https://github.com/user-attachments/assets/1d694f56-11cf-4d7a-a4d6-8933293da1ec" />

The system consists of the following microservices: 

- **Doctor Service**: Handles CRUD operations for doctor-related data.
  
- **Patient Service**: Manages CRUD operations for patient-related data.
  
- **Eureka Server**: Acts as a service registry for microservices.
  
- **API Gateway**: Routes requests to the appropriate microservice and handles cross-cutting concerns.
  
- **Tracking Service**: Uses WebSockets to track patients in real-time and sends data to a map. Alerts when a patient goes beyond a safe zone.
  
- **FeignClient Communication**: Facilitates communication between the Tracking Service and the Patient Service.

## Frontend

-  **REACT**

-  **HTML**

-  **CSS**

## Backend

- **Spring Boot**
  
- **Spring Cloud Netflix Eureka**
  
- **Spring Cloud Gateway**
  
- **Spring Data JPA**
  
- **WebSockets**
  
- **FeignClient**

## Getting Started

Here are step-by-step instructions to set up and run this project locally:

## Prerequisites:
- **Git**: Version control system to clone the repository and manage code changes.
  
- **Java 11 or higher**: Ensure you have Java Development Kit (JDK) installed.
  
- **Maven**: Use Maven for building and managing your Java projects.
  
- **Node.js**: Install Node.js for any JavaScript-based services or tools.
  
- **Python**: Install Python for any Python-based services or scripts.
  
- **IDE**: An Integrated Development Environment (IDE) like IntelliJ IDEA, Eclipse, Visual Studio Code, or PyCharm for development.

## Backend Setup

1.Clone the Project: 

- bash git clone <repository_url> cd <project_folder>

2.Open each MicroServices and install Dependencies:

- Run the following commands: bash mvn clean install

3.Run Backend:

- Start by Running Eureka Server 

- Run each microservice and make sure to run also the Gateway 

- check if the microservices are dispalyed in [http://localhost:8761/](http://localhost:8761/),you need to be able to see something like this :

 <img width="1280" alt="image" src="https://github.com/user-attachments/assets/06c76161-ed65-4d64-9bdb-745fca251748" />

- you will not need any database since the project uses **H2 database** for development.

## Frontend Setup 

-Open the terminal and Run the Frontend by ths **npm start**

-The Front End will be accessible in [http://localhost:3000/](http://localhost:3000/)

Now,the project should be running locally.f you encounter any issues during setup, check the console logs for error messages and ensure that all dependencies and prerequisites are correctly installed.

## Simulation of Tracking and alerting 

To simulate you will need a device that sends the location of the patient , but to do this localy you will find 4 python files in the simulation folder that you can use. you can simulate the two possible scenarios which are the patient is in a save zone or note.

**steps for this to work**

- Open the simulation folder in termial

- Run the **simulation_with_gateway** to simulate a normal scenario where everything is good and the patient is only moving withing his safe zone.

- You can run the pyton file by this commande: **py [name of the python file].py**

- The simualtion will create 4 patients and intialize thier location in thier rooms based on the blueprint i used just for testing. and will make their movement realy small so that they don't go beyond their safe zone.

- You will be able to see their movement in reel time with their Safe zone, if this is not happened then most likely the backend is not running correctly chech the logs in the backend.

- You can close the script by preccing **CTRL+C**

- You can also try the other scenario where the patient moves out of his safe zone by running the **Out_zone_Simulation_Gateway.py**.

- You will be able the patient john doe Slowly moving out of his safezone and the moment he moved out you will be alerted.

- This was possible because of the use of websocket so that each time the location of patient is update it will be checked if his withing the safe range and will be sent through the websocket so that it can be displayed.

## Video Demonstration of the tracking
https://drive.google.com/file/d/1ZyMUX8lk0IGkCEaKaQHGTSR2gzSBIhy0/view?usp=sharing
