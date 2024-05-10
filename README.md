# DoughFlow

Welcome to DoughFlow, a collaborative project that integrates Django, PostgreSQL and NextJS to create a powerful web application for managing time-series data related to financial transactions. Explore a vast array of historical stock data with access to **over** 3500 tickers, empowering you to make valuable insights to inform your investment strategies.

### Django Stack

#### Django Rest API

Our Django backend will serve as a robust REST API, providing seamless communication between the frontend and the database.

#### Django Python Object Interaction

Utilizing Django's ORM, we will ensure efficient interaction with the database, allowing for a slightly abstracted (SQL or NoSQL) approach to data management.

```python
class StockMarketData(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    timestamp = models.DateField()
    ticker = models.CharField(max_length=8)
    open_price = models.DecimalField(max_digits=10, decimal_places=2)
    high_price = models.DecimalField(max_digits=10, decimal_places=2)
    low_price = models.DecimalField(max_digits=10, decimal_places=2)
    close_price = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.IntegerField()
    candle_time = models.IntegerField(null=True, blank=True)

class Meta:
    db_table = 'stock_data'
    unique_together = (('timestamp', 'ticker'),)
```

### NextJS Stack

#### ECMA Standards and Components Used

In the NextJS frontend, we adhere to ECMA standards, employing components for modularity and maintainability.

#### UI|UX focused application

With a focus on creating a responsive and highly-customized UI we will use many of the features of both NextJS and node.js to optimize and bundle our application efficiently and effectively. Our UX will explore industry trends in component styles, coloring, and human-computer interaction.

#### Overall Goals of Frontend Stack using NextJS

Create a plug-and-play frontend that can be easily integrated into an extensive django rest API with straightforward and organized components.

### Time-Series Dataset and Database

We are currently exploring options for our time-series dataset and database.(PostgreSQL and MongoDB or OracleDB)  
### Database: PostgreSQL

#### Time-Series Data Format and Usage

Our time-series data involves the recording of financial transactions over time, capturing information like datetime, stock ticker, open, close, and volume as well as indicators. 

#### Connection and Maintenance

The connection between the Django backend API and the PostgreSQL database will be carefully established and maintained to ensure data integrity and reliability.  

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
```
