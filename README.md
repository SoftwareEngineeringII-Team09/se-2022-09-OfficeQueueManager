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
