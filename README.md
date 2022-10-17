# se-2022-09-OfficeQueueManager

## Technologies
- Frontend: React.js
- Backend: Node.js, SQLite



## DataBase Description



- Table `Ticket`
    - TicketId
    - CreateTime
    - ServiceId
    - Status(issued/closed)
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

## UI core API

### `Input.Field` component
|Prop|Type|Description|Required|
|---|---|---|---|
|id|String|The id attribute for the input tag |Recommended|
|type|String|The type attribute for the input tag (e.g. Email, Password, Text)|Recommended|
|name|String|The name attribute for the input tag|Recommended|
|placeholder|String|The placeholder attribute for the input tag|Recommended|
|label|String|The label for the input field, shown above the field|Recommended|
|className|String|The class attribute for the inside wrapper of the component|No|
|children|Any|Text muted for a description or a message, shown below the field|No|

### `Input.Select` component
|Prop|Type|Description|Required|
|---|---|---|---|
|id|String|The id attribute for the select tag |Recommended|
|name|String|The name attribute for the select tag|Recommended|
|defaultValue|String|The label for the default option|Recommended|
|options|Array[{value: String, label: String}]|The array of options, where each option is an object with keys value (value attribute of the option tag) and label (label of the option tag that is shown to the user)|Yes|
|label|String|The label for the select, shown above the field|Recommended|
|className|String|The class attribute for the inside wrapper of the component|No|
|children|Any|Text muted for a description or a message, shown below the field|No|

### `Display` component
|Prop|Type|Description|Required|
|---|---|---|---|
|service|{name: String, queue: Array[{code: Number or String, counter: Number or String}]}|Service data that have to be shown.|Yes|