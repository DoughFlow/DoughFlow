# DoughFlow

## Main Title

![DoughFlow Icon](url/to/doughflow-icon.png)

Welcome to DoughFlow, a collaborative project that integrates Django and NextJS to create a powerful web application for managing time-series data related to financial transactions.

### Django Stack

#### Django Rest API

Our Django backend serves as a robust REST API, providing seamless communication between the frontend and the database.

#### Django Python Object Interaction

Utilizing Django's ORM, we ensure efficient interaction with the database, supporting both SQL and NoSQL data models.

### NextJS Stack

#### ECMA Standards and Components Used

In the NextJS frontend, we adhere to ECMA standards, employing components for modularity and maintainability.

#### Use of Node.js and Other Services

Node.js powers our NextJS application, enabling server-side rendering and enhancing overall performance. Additional services enhance the user experience.

#### Overall Statement of NextJS as a Frontend Stack

NextJS, chosen as our frontend stack, excels in building dynamic, high-performance web applications. It complements our Django backend without being used as a full-stack solution.

### Time-Series Dataset and Database

We are currently exploring options for our time-series dataset and database. The choice between PostgreSQL and MongoDB is under consideration, and we welcome community input.

### Database: PostgreSQL or MongoDB

#### Time-Series Data Format and Usage

Our time-series data involves the recording of financial transactions over time, capturing essential information like datetime, stock ticker, open, close, and volume.

#### Connection and Maintenance

The connection between the Django backend API and the chosen database (PostgreSQL or MongoDB) is carefully established and maintained to ensure data integrity and reliability.

#### Example Schema

##### SQL (Time-Series Structure)

```sql
CREATE TABLE financial_data (
    id SERIAL PRIMARY KEY,
    datetime TIMESTAMP,
    stock_ticker VARCHAR(10),
    open DECIMAL,
    close DECIMAL,
    volume INT
);

