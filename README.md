Simplified Trello App
=========

Overview
--------

This project is a simple Trello application which is an application to store lists of notes. Built using **Angular 18** for the frontend and **Spring Boot** with **JDBC** and **PostgreSQL** for the backend. The app allows users to create boards, add lists within boards, and manage cards inside those lists, helping users organize their notes effectively.

Technologies Used
-----------------

### Frontend

-   **Angular 18**
-   **Angular Material** for UI components

### Backend

-   **Spring Boot**
-   **Spring JDBC** for database interaction
-   **PostgreSQL** as the database

Getting Started
---------------

### Prerequisites

Ensure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/) (for frontend)
-   [Angular CLI](https://angular.io/cli) (version compatible with Angular 18)
-   [Java 21+](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)
-   [PostgreSQL](https://www.postgresql.org/) database instance

### Installation Steps

1.  **Clone the Repository**

    ```
    git clone https://github.com/IvanMarusic105/ENT.git

    ```

2.  **Set Up the Database**

    
3.  **Start the Frontend**

    ```
    cd .\angular-frontend\
    ng s

    ```

    The frontend will run on `http://localhost:4200`.

4.  **Start the Backend**

    ```
    cd backend
    ./mvnw spring-boot:run

    ```

    The backend will run on `http://localhost:8080`.

### API Endpoints

Once the backend is running, the available API endpoints can be accessed via:

-   `http://localhost:8080/boards` - Manage boards
-   `http://localhost:8080/lists` - Manage lists
-   `http://localhost:8080/cards` - Manage cards

Features
--------

-   **Boards:** Users can create and manage multiple boards.
-   **Lists:** Each board can have multiple lists to categorize notes.
-   **Cards:** Lists contain cards that store note details.
-   **Responsive UI:** Built with Angular Material to provide a smooth user experience.

License
-------

This project is licensed under the MIT License.

Contact
-------

For any queries or suggestions, please reach out to me on https://github.com/IvanMarusic105
