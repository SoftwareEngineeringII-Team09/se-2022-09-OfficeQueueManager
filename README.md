# se-2022-09-OfficeQueueManager

## Technologies
- Frontend: React.js
- Backend: Node.js, SQLite



## DataBase Description



- Table `Ticket`
    - TicketId
    - CreateTime
    - ServiceId
    - Status
    - CounterId
    
- Table `Service`
  - ServiceId
  - ServiceName
  - ServiceTime

- Table `Counter`
  - CounterId
  - ServiceId


### Service
####  Preload Data :

|ServiceId|ServiceName|ServiceTime|
|---|---|---|
|1|s1Name|10|
|2|s2Name|20|

### Counter

|CounterId|ServiceId|
|---|---|
|1|1|
|1|2|
|2|2|


## HTTP APIs

- GET `/api/v1/tickets/next/:counterId` 
  - **Description**: Get next customer in line for services provided by a counter.
  <!-- - Requires authentication: yes, User must be an Officer -->
  - **Request parameters**:
    - `counterId`: {number} The id of the counter for which to call the next customer.
  - **Request body**: _None_.
  - **Response**: `200 OK` (success).
  - **Response body**: A Ticket object, the ticket associated to the next customer to be served //TODO: add response body example.
  - **Error responses**: `422 Unprocessable entity` (validation of counterId failed, it should be a positive integer), `404 Not Found` - //TODO ..., `500 Internal Server Error` (generic error).

- POST `/api/v1/tickets/new`
  - **Description**: Issues a new ticket for a selected service.
  - **Request parameters**: _None_.
  - **Request body**: 
    ```
        {
            "serviceName": "s1Name"
        }
    ```
  - **Response**: `201 Created` (success).
  - **Response body**: 
    ```
        {
            "ticketId": 5
        }
    ```
  - **Error responses**: `503 Service Unavailable` (generic error), `422 Unprocessable entity` (validation of body failed).