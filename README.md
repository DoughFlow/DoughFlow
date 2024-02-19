# DoughFlow

Welcome to DoughFlow, a collaborative project that integrates Django, {insert DB choice once made here} and NextJS to create a powerful web application for managing time-series data related to financial transactions.

### Django Stack

#### Django Rest API

Our Django backend will serve as a robust REST API, providing seamless communication between the frontend and the database.

#### Django Python Object Interaction

Utilizing Django's ORM, we will ensure efficient interaction with the database, allowing for a slightly abstracted (SQL or NoSQL) approach to data management.

### NextJS Stack

#### ECMA Standards and Components Used

In the NextJS frontend, we adhere to ECMA standards, employing components for modularity and maintainability.

#### UI|UX focused application

With a focus on creating a responsive and highly-customized UI we will use many of the features of both NextJS and node.js to optimize and bundle our application efficiently and effectively. Our UX will explore industry trends in component styles, coloring, and human-computer interaction.

#### Overall Goals of Frontend Stack using NextJS

Create a plug-and-play frontend that can be easily integrated into an extensive django rest API with straightforward and organized components.

### Time-Series Dataset and Database

We are currently exploring options for our time-series dataset and database.(PostgreSQL and MongoDB or OracleDB)  
### Database: (PostgreSQL, MongoDB, or some Oracle DB)

#### Time-Series Data Format and Usage

Our time-series data involves the recording of financial transactions over time, capturing information like datetime, stock ticker, open, close, and volume.

#### Connection and Maintenance

The connection between the Django backend API and the chosen database (PostgreSQL or MongoDB) will be carefully established and maintained to ensure data integrity and reliability.  

#### Example Schema

##### SQL (Time-Series Structure)

```sql
TABLE financial_data (
    id _ID PRIMARY KEY,
    datetime TIMESTAMP,
    stock_ticker VARCHAR(10),
    open DECIMAL,
    close DECIMAL,
    volume INT
);  

##### NoSQL (Time-Series Structure)

{
    "_id": ObjectId("5f43a7d8c9e77c4e3b3f36c4"),  
    "datetime": ISODate("2024-02-18T12:00:00Z"),  
    "open": 150.0,  
    "high": 155.0,  
    "low": 145.0,  
    "close": 152.0,  
    "volume": 1000000  
}
