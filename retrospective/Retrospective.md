TEMPLATE FOR RETROSPECTIVE (Team ##)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done 
  
  -  Number of stories committed: 2
  -  Number of stories done: 2
- Total points committed vs. done 
  - Total of stories committed: 11
  - Total of stories done: 11
- Nr of hours planned vs. spent (as a team)
  - Nr of hours planned: 38 hours 45 minutes
  - Nr of hours spent: 40 hours

**Remember**a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    7     |       |   12 hours 15 minutes     |      11 hours 45 minutes          |
| 1     |     5    |     3   |     14 hours       |      8 hours 30 minutes           |
| 2    |     5    |     8   |    11 hours 30 minutes         |     10 hours 10 minutes           |
   

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
 ### Estimate:
  -  Average Hours per task: 39.75 /17 = 2.33 hours
   - Standard deviation per task: 0.47
  ### Actual:
  - Average Hours per task: 30.33 /17 = 1.78 hours
  - Standard deviation per task: 1.29
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
  - Total task estimation error ratio: 39.75 / 30.33 - 1 =0.31 

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 4h
  - Total hours spent: 4h 20m
  - Nr of automated unit test cases: 12

- Coverage:

| File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line |
|-----------------------|---------|----------|---------|---------|-----------------------------|
| All files              |   73.72 |     52.5 |   81.33 |   76.72 | |
| controllers           |   70.45 |    56.52 |      75 |   70.58 | |
|  CounterManager.js    |   76.19 |     62.5 |   83.33 |   76.19 | 30,74-83 |
|  ServiceManager.js    |   60.71 |    41.66 |   71.42 |   60.71 | 16,33,70,84-108 |
|  TicketManager.js     |   72.28 |    61.53 |   74.07 |   72.85 | 26,47,81,102-103,145-160    |
| dao                   |   73.07 |    47.05 |   87.09 |   79.78 | |
|  PersistentManager.js |   73.07 |    47.05 |   87.09 |   79.78 | 37-38,44-45,115,124-140,153 |
| dao/model             |     100 |      100 |     100 |     100 | |
|  Counter.js           |     100 |      100 |     100 |     100 | |
|  Service.js           |     100 |      100 |     100 |     100 | |
|  Ticket.js            |     100 |      100 |     100 |     100 | |
| test                  |     100 |      100 |     100 |     100 | |
|  utils.js             |     100 |      100 |     100 |     100 | |
| |
| Test Suites: | 3 passed, 3 total |
| Tests:      | 12 passed, 12 total |
| Time:       | 1.702 s, estimated 2 s |

- E2E testing:
  - Total hours estimated: 4h
  - Total hours spent: 4h 15m
- Code review
  - Total hours estimated: ?
  - Total hours spent: ?

  


## ASSESSMENT

- What caused your errors in estimation (if any)?

    -  Incomplete tracking of all the activities (especially code review)


- What lessons did you learn (both positive and negative) in this sprint?

  - To be more organized in the further projects

- Which improvement goals set in the previous retrospective were you able to achieve? 

  
- Which ones you were not able to achieve? Why?


- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - Using the github feature for the reviewing coding part to have better feedback from other teammates

> Propose one or two

- One thing you are proud of as a Team!!
- We managed to finish all the stories that we intended to do at the begining of the project.
- We are searching for the better technologies to help us complete tasks better and efficiency in the future .