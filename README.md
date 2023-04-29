# Lives do Grêmio
GremioLives is a web application that displays information about upcoming and past live events of the Grêmio FBPA football team. This project was developed using Angular and Spring Boot frameworks.

## Features
- Displays a list of upcoming and past live events with information such as the name of the event, date, channel name, and a link to the live video.
- Allows users to create new live events, edit existing ones, and delete them.
- Users can also share the link to a live event.
- Implements user authentication to protect sensitive operations such as creating, editing, and deleting live events.

# Getting Started
## Prerequisites
- Node.js
- Angular CLI
- Java
- Maven
- MySQL

## Installation
1. Clone the repository:
`git clone https://github.com/renatocomaru/GremioLives.git`
2. Navigate to the project folder:
`cd GremioLives`
3. Install the dependencies:
`npm install`
4. Start the Angular development server:
`ng serve`
5. In another terminal window, navigate to the backend folder:
`cd backend`
6. Build the project:
`mvn clean install`
7. Start the Spring Boot server:
`java -jar target/backend-0.0.1-SNAPSHOT.jar`
8. Create a MySQL database named gremiolives and configure the application.properties file with the correct database credentials.

## Usage
To access the application, open a web browser and go to http://localhost:4200.

You can view a list of upcoming and past live events on the homepage. To create a new live event, click the "Adicionar Live" button and fill out the form. To edit an existing live event, click the edit icon next to the event. To delete an event, click the delete icon.

To share the link to a live event, click the share icon and copy the link to your clipboard.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/seu_usuario/seu_repositorio/blob/main/LICENSE).

