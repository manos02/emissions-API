<br />
<p align="center">
  <h1 align="center">Web Engineering 2023-24</h1>

  <p align="center">
    Manos , Cezar, Josefine
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Running](#running)
* [Technologies](#technologies)
* [Requirement Fulfillment](#requirement fulfillment)
* [Evaluation](#evaluation)
* [Roles](#roles)

## About The Project

<!-- Add short description about the project here -->
This project is about a web application that displays, updates, deletes data from a large dataset which can be found here, https://github.com/owid/co2-data.
We used java for the backend, react for the front-end and mysql as a database to store the data. 


## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) or higher
* [Maven 3.6](https://maven.apache.org/download.cgi) or higher
* Docker

### Installation

1. Navigate to the `group-25-project` directory
2. Open the Docker application.
3. Run the following command:
```sh
docker compose up -d --build
```

## Running

<!--
Describe how to run your program here. These should be a few very simple steps.
-->

When the containers are running, navigate to http://localhost:3000/ for the complete web application. If you want to just view the backend navigate to
http://localhost:51417/.

## Technologies

For this web app we used java with spring boot framework for the backend of our application. Since we have prior knowledge of java
we thought that the development would be much smoother and easier, rather than using a language that we never used before.
Spring boot has good documentation available that helped us to create an app that fulfills all the requirements of a REST Api. For the front-end of our application
we used Javascript with React library. The reason we chose javascript and React is that currently they are very popular in developing front end and large
companies also use them. So we thought it would be a valuable learning experience. For our database we use mysql which is one of the most popular ones and easy to use.


## Requirement Fulfillment

We believe our application meets all the requirements and even more. Firstly, we have a country endpoint and a continent endpoint that can display data summaries for all countries or continents,
including their name and ISO code (if available). Then the user has an option as a query parameter to filter based on name or iso, an order of the data (ascending or descending), a limit and an offset.
Then we have another endpoint that can retrieve all or specific data for a particular country or continent. The same query parameters as above apply, with the addition that
allows the user to select a range of years for the data to be displayed. This endpoint also allows the user to create new general data for a particular year, which will be added to our database.
We also have another endpoint for a country's data for a particular year, which can display the same information as above, just for one year. For this endpoint, the user can update data using the PUT request
and also delete data specified for a particular year and country. Our final endpoint is for the data for all countries for a given year and the above query parameters can also be applied. For all these endpoints we have
almost the same ones for continents, so the user can navigate between continents and countries. For the GET requests, the user can also specify the format of returned data using HTTP headers. So the retrieval can be done in both
JSON and csv format. In summary, our backend supports more functionalities than asked in the requirements because we can apply all query parameters for all data and also for both countries and continents. Then for the
frontend we support all these operations in different ways. The user can click on a particular country or continent and view all the data for that country/continent. Then they have the option of clicking on a particular year,
which will isolate only the data for the year selected.
They can select different query parameters using the buttons displayed on the page, and also have the option to search for countries/continents using a search bar instead of selecting from the list. For the documentation of the API we have a
yml file called design.yml. This file was created using openapi and reflects our web application. It is linked to our backend, so all the functionality of our backend can be tested using this file. Finally, to deploy our
app we used docker with different containers for the frontend, backend and database.


## Evaluation

We believe that our application follows the basic characteristics of a RESTful API and is considered Level 2 using the Richardson Maturity Model. Firstly
Our API handles resource representation using JSON and ensures statelessness. Secondly, resources are uniquely identifiable by URIs such as /countries /countries/{ISO} etc. Interactions through requests
target these resources, and data is found in the message body. In our application, we use HTTP verbs such as GET, POST, PUT, DELETE for various
operations that interact with our resources. All responses, even errors, are handled by response codes such as 200 for successful retrieval of data
and 400 for a bad request (a user entering the wrong request parameter in the URL). As there are no hypermedia controls to dynamically tell the client what actions can be performed next, our API is not at level 3.
On the other hand, there are some things we could improve in the future in our web app. One
is error handling. While we have implemented some error handling for edge cases like wrong input, wrong query parameters, etc., there are still bad operations that need to be handled.
An example would be a wrong PUT request from the user when they want to update some data. These kinds of situations can lead to
unhandled errors that should not occur. Although we include Javadoc in our codebase, we could add even more comments to make our code more self-explanatory and
easier to modify in the future.


## Roles

We mostly worked together for this project. We did the starting API design together, later Manos worked on the implementation of the database and the trimming of data while Josefine and Cezar
focused on the backend. When the backend was finished Manos and Cezar worked on the backend and docker deployment and Josefine worked on the front-end.

