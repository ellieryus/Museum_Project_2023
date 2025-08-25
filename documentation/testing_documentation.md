Testing is a compulsory part of any successful development and deployment of software. To ensure that these processes can operate as smoothly as possible, it is necessary to document what functionality ought to be tested, and furthermore documentation of each test case, including their expected results, actual results, and the various bugs that may or may not occur.

This document is dedicated to documenting all manual tests that we have run and their status. With this document, it is now easier to see and look for any functionality and test cases, properly ensuring that the software can run successfully.

There are four test cases for the Login and Register service:

| Test Case 1                          |                   |                          |                                                                                 |             |           |
|--------------------------------------|-------------------|--------------------------|---------------------------------------------------------------------------------|-------------|-----------|
| Description                          | Test Steps        | Test Data                | Expected Results                                                                | Results     | Pass/Fail |
| Check Employee Login with valid Data | Go to site /login | Username = nguyenhuy2002 | The Client should be logged in to the application and directed to employee page | As Expected | Pass      |
|                                      | Enter UserName    | Password = 23102002      |                                                                                 |             |           |
|                                      | Enter Password    |                          |                                                                                 |             |           |
|                                      | Click Login/Enter |                          |                                                                                 |             |           |
|                                      |                   |                          |                                                                                 |             |           |

| Test Case 2                          |                   |                      |                                                                                 |             |           |
|--------------------------------------|-------------------|----------------------|---------------------------------------------------------------------------------|-------------|-----------|
| Description                          | Test Steps        | Test Data            | Expected Results                                                                | Results     | Pass/Fail |
| Check Customer Login with valid Data | Go to site /login | Username = huynhhieu | The Client should be logged in to the application and directed to customer page | As Expected | Pass      |
|                                      | Enter UserName    | Password = huynhhieu |                                                                                 |             |           |
|                                      | Enter Password    |                      |                                                                                 |             |           |
|                                      | Click Login/Enter |                      |                                                                                 |             |           |
|                                      |                   |                      |                                                                                 |             |           |

| Test Case 3                            |                      |                           |                                           |             |           |
|----------------------------------------|----------------------|---------------------------|-------------------------------------------|-------------|-----------|
| Description                            | Test Steps           | Test Data                 | Expected Results                          | Results     | Pass/Fail |
| Check Clients Register with valid Data | Go to site /register | Username = user           | The Client should register unsuccessfully | As Expected | Pass      |
|                                        | Enter UserName       | Password = 123456789      |                                           |             |           |
|                                        | Enter Password       | Phone number = 0956147532 |                                           |             |           |
|                                        | Enter phone number   |                           |                                           |             |           |
|                                        | Click Register/Enter |                           |                                           |             |           |
|                                        |                      |                           |                                           |             |           |

| Test Case 4                                   |                      |                           |                                                                              |             |           |
|-----------------------------------------------|----------------------|---------------------------|------------------------------------------------------------------------------|-------------|-----------|
| Description                                   | Test Steps           | Test Data                 | Expected Results                                                             | Results     | Pass/Fail |
| Check Clients Register with unregistered Data | Go to site /register | Username = user           | The Client should register successfully and should be directed to login page | As Expected | Pass      |
|                                               | Enter UserName       | Password = 123456789      |                                                                              |             |           |
|                                               | Enter Password       | Phone number = 0956147532 |                                                                              |             |           |
|                                               | Enter phone number   |                           |                                                                              |             |           |
|                                               | Click Register/Enter |                           |                                                                              |             |           |
|                                               |                      |                           |                                                                              |             |           |

The next test case is for the Buy Souvenir service. This service has 2 test cases: 

| Test Case 1                                	|                                                                       	|                                      	|                                                                                          	|             	|           	|
|--------------------------------------------	|-----------------------------------------------------------------------	|--------------------------------------	|------------------------------------------------------------------------------------------	|-------------	|-----------	|
| Description                                	| Test Steps                                                            	| Test Data                            	| Expected Results                                                                         	| Results     	| Pass/Fail 	|
| Check cart of the Clients with valid Items 	| Log in into website                                                   	| item = Museum Book, amount = 1       	| The number on top the cart button is changed based on the number of items.               	| As Expected 	| Pass      	|
|                                            	| Go to giftshop site                                                   	| item = Picasso Tote Bag, amount = 2  	| After clicking cart button, the information of the items with their amount are displayed 	|             	|           	|
|                                            	| Select the items to add to cart                                       	| item = Monolisa Tote Bag, amount = 1 	|                                                                                          	|             	|           	|
|                                            	| The amount of the items is determined the the number of mouse's click 	|                                      	|                                                                                          	|             	|           	|
|                                            	| Click Cart button                                                     	|                                      	|                                                                                          	|             	|           	|
|                                            	|                                                                       	|                                      	|                                                                                          	|             	|           	|

| Test Case 2                                                   	|                                                        	|                                                	|                                                                                                                     	|             	|           	|
|---------------------------------------------------------------	|--------------------------------------------------------	|------------------------------------------------	|---------------------------------------------------------------------------------------------------------------------	|-------------	|-----------	|
| Description                                                   	| Test Steps                                             	| Test Data (Based on the first test case)       	| Expected Results                                                                                                    	| Results     	| Pass/Fail 	|
| Check data in database after changing amount of items in cart 	| Log in into website                                    	| item = Museum Book, amount = 2                 	| The number on top the cart button is changed based on the number of items.                                          	| As Expected 	| Pass      	|
|                                                               	| go to /cart site                                       	| item = Monolisa Tote Bag, amount = 1           	| The previous data of the cart is deleted and the new cart's information is inserted into the database again.        	|             	|           	|
|                                                               	| change number of items, delete an items and add 1 item 	| item = Museum Book Limited Edition, amount = 2 	| After clicking place order button, the information of the items with their amount and the bill number are displayed 	|             	|           	|
|                                                               	| Click place order button                               	|                                                	|                                                                                                                     	|             	|           	|
|                                                               	|                                                        	|                                                	|                                                                                                                     	|             	|           	|

Then we have the test case for the booking ticket service:

| Test Case 1                         	|                                                      	|                       	|                                                                                              	|             	|           	|
|-------------------------------------	|------------------------------------------------------	|-----------------------	|----------------------------------------------------------------------------------------------	|-------------	|-----------	|
| Description                         	| Test Steps                                           	| Test Data             	| Expected Results                                                                             	| Results     	| Pass/Fail 	|
| Check booked Tickets of the Clients 	| Log in into website                                  	| TDate = 2023-05-18    	| The message "Booked successfully" and three tickets with different code number are displayed 	| As Expected 	| Pass      	|
|                                     	| Go to Booking site                                   	| TTime = 13:00         	|                                                                                              	|             	|           	|
|                                     	| Select a valid ticket bsed on the provided timetable 	| Number of tickets = 3 	|                                                                                              	|             	|           	|
|                                     	| Select the amount of tickets                         	|                       	|                                                                                              	|             	|           	|
|                                     	| Click Book button                                    	|                       	|                                                                                              	|             	|           	|
|                                     	|                                                      	|                       	|                                                                                              	|             	|           	|

We also have three test cases for the Modifying Database service:

| Test Case 1                                	|                                        	|                    	|                                                                                                                           	|             	|           	|
|--------------------------------------------	|----------------------------------------	|--------------------	|---------------------------------------------------------------------------------------------------------------------------	|-------------	|-----------	|
| Description                                	| Test Steps                             	| Test Data          	| Expected Results                                                                                                          	| Results     	| Pass/Fail 	|
| Check the data in database after inserting 	| Log in into website with admin account 	| tableName = tokens 	| The message 'Insert successfully' is displayed and the information of the table is updated, which will contains new data  	| As Expected 	| Pass      	|
|                                            	| go to /modify                          	| UID = 1            	|                                                                                                                           	|             	|           	|
|                                            	| Select table tokens                    	| Role = employee    	|                                                                                                                           	|             	|           	|
|                                            	| Select insert option                   	| Token = ABCDEF     	|                                                                                                                           	|             	|           	|
|                                            	| Enter data into given fields           	|                    	|                                                                                                                           	|             	|           	|
|                                            	| Click Insert                           	|                    	|                                                                                                                           	|             	|           	|
|                                            	|                                        	|                    	|                                                                                                                           	|             	|           	|

| Test Case 2                               	|                                        	|                    	|                                                                                                                           	|             	|           	|
|-------------------------------------------	|----------------------------------------	|--------------------	|---------------------------------------------------------------------------------------------------------------------------	|-------------	|-----------	|
| Description                               	| Test Steps                             	| Test Data          	| Expected Results                                                                                                          	| Results     	| Pass/Fail 	|
| Check the data in database after deleting 	| Log in into website with admin account 	| tableName = tokens 	| The message 'Delete successfully' is displayed and the information of the table is updated, which will contains new data  	| As Expected 	| Pass      	|
|                                           	| go to /modify                          	| UID = 1            	|                                                                                                                           	|             	|           	|
|                                           	| Select table tokens                    	| Role = employee    	|                                                                                                                           	|             	|           	|
|                                           	| Select delete option                   	| Token = ABCDEF     	|                                                                                                                           	|             	|           	|
|                                           	| Select tuples to delete                	|                    	|                                                                                                                           	|             	|           	|
|                                           	| Click Insert                           	|                    	|                                                                                                                           	|             	|           	|
|                                           	|                                        	|                    	|                                                                                                                           	|             	|           	|

| Test Case 3                                	|                                        	|                    	|                                                                                                                          	|             	|           	|
|--------------------------------------------	|----------------------------------------	|--------------------	|--------------------------------------------------------------------------------------------------------------------------	|-------------	|-----------	|
| Description                                	| Test Steps                             	| Test Data          	| Expected Results                                                                                                         	| Results     	| Pass/Fail 	|
| Check the data in database after modifying 	| Log in into website with admin account 	| tableName = tokens 	| The message 'Modifysuccessfully' is displayed and the information of the table is updated, which will contains new data  	| As Expected 	| Pass      	|
|                                            	| go to /modify                          	| UID = 1            	|                                                                                                                          	|             	|           	|
|                                            	| Select table tokens                    	| Role = employee    	|                                                                                                                          	|             	|           	|
|                                            	| Select modify option                   	| Token = A1B2C3D4   	|                                                                                                                          	|             	|           	|
|                                            	| Enter data into given fields           	|                    	|                                                                                                                          	|             	|           	|
|                                            	| Click modify                           	|                    	|                                                                                                                          	|             	|           	|
|                                            	|                                        	|                    	|                                                                                                                          	|             	|           	|

And one test case for the View Database service:

| Test Case 1                                                     	|                                           	|                    	|                                                  	|             	|           	|
|-----------------------------------------------------------------	|-------------------------------------------	|--------------------	|--------------------------------------------------	|-------------	|-----------	|
| Description                                                     	| Test Steps                                	| Test Data          	| Expected Results                                 	| Results     	| Pass/Fail 	|
| Check the response of the server after choosing a table to view 	| Log in into website with employee account 	| tableName = tokens 	| The information of the table tokens is displayed 	| As Expected 	| Pass      	|
|                                                                 	| go to /view_database                      	|                    	|                                                  	|             	|           	|
|                                                                 	| select table tokens                       	|                    	|                                                  	|             	|           	|
|                                                                 	|                                           	|                    	|                                                  	|             	|           	|

To limit the access of the client to the website and prevent unwanted access, we have to test the middleware. There are two test cases for the middleware:

| Test Case 1                                                                              	|                                                      	|                       	|                                                                                         	|             	|           	|
|------------------------------------------------------------------------------------------	|------------------------------------------------------	|-----------------------	|-----------------------------------------------------------------------------------------	|-------------	|-----------	|
| Description                                                                              	| Test Steps                                           	| Test Data             	| Expected Results                                                                        	| Results     	| Pass/Fail 	|
| Check the response of the server if the customer tries to book ticket without logging in 	| go to booking site                                   	| TDate = 2023-05-18    	| The message "Login is required" is displayed and the clients are directed to login page 	| As Expected 	| Pass      	|
|                                                                                          	| Select a valid ticket bsed on the provided timetable 	| TTime = 13:00         	|                                                                                         	|             	|           	|
|                                                                                          	| Select the amount of tickets                         	| Number of tickets = 3 	|                                                                                         	|             	|           	|
|                                                                                          	| Click Book button                                    	|                       	|                                                                                         	|             	|           	|
|                                                                                          	|                                                      	|                       	|                                                                                         	|             	|           	|

| Test Case 2                                                                                              	|                              	|                    	|                                                                                                              	|             	|           	|
|----------------------------------------------------------------------------------------------------------	|------------------------------	|--------------------	|--------------------------------------------------------------------------------------------------------------	|-------------	|-----------	|
| Description                                                                                              	| Test Steps                   	| Test Data          	| Expected Results                                                                                             	| Results     	| Pass/Fail 	|
| Check the response of the server if the employee tries to modify table in database without suitable Role 	| go to /modify                	| tableName = tokens 	| The message "You have no admission for this role" appeared and the clients are directed to the employee page 	| As Expected 	| Pass      	|
|                                                                                                          	| Select table tokens          	| UID = 1            	|                                                                                                              	|             	|           	|
|                                                                                                          	| Select modify option         	| Role = employee    	|                                                                                                              	|             	|           	|
|                                                                                                          	| Enter data into given fields 	| Token = A1B2C3D4   	|                                                                                                              	|             	|           	|
|                                                                                                          	| Click modify                 	|                    	|                                                                                                              	|             	|           	|
|                                                                                                          	|                              	|                    	|                                                                                                              	|             	|           	|

In addition, three test cases for the transition of the website are provided to test the animation of the website when directing to another pages.

| Test Case 1                           	|                                                                  	|           	|                                   	|             	|           	|
|---------------------------------------	|------------------------------------------------------------------	|-----------	|-----------------------------------	|-------------	|-----------	|
| Description                           	| Test Steps                                                       	| Test Data 	| Expected Results                  	| Results     	| Pass/Fail 	|
| Animation when entering landingpage   	| open website or redirect from another site to "/" or "/customer" 	| none      	| appear zoom-in and rise animation 	| as expected 	| Pass      	|
| Animation when entering login page    	| open or redirect from another site to /login                     	| none      	| appear zoom-in and rise animation 	| as expected 	| Pass      	|
| Animation when entering Register page 	| open or redirect from another site to /signup                    	| none      	| appear zoom-in and rise animation 	| as expected 	| Pass      	|
| Animation when entering about page    	| open or redirect from another site to /gallery                   	| none      	| appear zoom-in and rise animation 	| as expected 	| Pass      	|
| Animation when entering artwork page  	| open or redirect from another site to /artwork/id                	| none      	| appear zoom-in and rise animation 	| as expected 	| Pass      	|
| Animation when entering booking page  	| open or redirect from another site to /booking                   	| none      	| appear zoom-in and rise animation 	| as expected 	| Pass      	|
| Animation when entering shopping page 	| open or redirect from another site to /shopping                  	| none      	| appear zoom-in and rise animation 	| as expected 	| Pass      	|
| Animation when entering Cart page     	| open site at /shopping/cart                                      	| none      	| appear zoom-in and rise animation 	| as expected 	| Pass      	|
|                            	|                                                                       	|           	|                       	|             	|           	|

| Test Case 2               	|                                                	|                       	|                      	|             	|           	|
|---------------------------	|------------------------------------------------	|-----------------------	|----------------------	|-------------	|-----------	|
| Description               	| Test Steps                                     	| Test Data             	| Expected Results     	| Results     	| Pass/Fail 	|
| Animation of notification 	| go to site /login                              	| username: "huynhhieu" 	| apear fade animation 	| as expected 	| pass      	|
|                           	| fill in username: "huynhhieu"                  	| password: "12345"     	|                      	|             	|           	|
|                           	| password: "12345" //this is the wrong password 	|                       	|                      	|             	|           	|
|                           	| click sign-in button to trigger notification   	|                       	|                      	|             	|           	|
|                           	|                                                	|                       	|                      	|             	|           	|

| Test Case 3                	|                                                                       	|           	|                       	|             	|           	|
|----------------------------	|-----------------------------------------------------------------------	|-----------	|-----------------------	|-------------	|-----------	|
| Description                	| Test Steps                                                            	| Test Data 	| Expected Results      	| Results     	| Pass/Fail 	|
| Animation of shopping item 	| go to site /shopping                                                  	| none      	| appear fade animation 	| as expected 	| pass      	|
|                            	| choose a random filter from filter list  to trigger fade-in animation 	|           	|                       	|             	|           	|
|                            	| click remove the item to trigger fade-out animation                   	|           	|                       	|             	|           	|
|                            	|                                                                       	|           	|                       	|             	|           	|

Besides, we have the service to give like to a picture. There is one test case for this service:

| Test Case 1  	|                    	|           	|                            	|             	|           	|
|--------------	|--------------------	|-----------	|----------------------------	|-------------	|-----------	|
| Description  	| Test Steps         	| Test Data 	| Expected Results           	| Results     	| Pass/Fail 	|
| click like   	| access /artworks/1 	|           	| filled heart turns blank   	| as expected 	| pass      	|
|              	| press like         	|           	| like increase after reload 	|             	|           	|
|              	|                    	|           	|                            	|             	|           	|
| click unlike 	| access /artworks/1 	|           	| blank heart turns filled   	| as expected 	| pass      	|
|              	| press like         	|           	| like decrease after reload 	|             	|           	|
|              	|                    	|           	|                            	|             	|           	|

And the gallery for the user to view the recommended artwork:

| Test Case 1                	|                         	|                      	|                                      	|             	|           	|
|----------------------------	|-------------------------	|----------------------	|--------------------------------------	|-------------	|-----------	|
| Description                	| Test Steps              	| Test Data            	| Expected Results                     	| Results     	| Pass/Fail 	|
| check artwork data display 	| access /gallery         	| none                 	| show 2 picture at slide              	| as expected 	| pass      	|
|                            	|                         	|                      	| show 4 picture at highlight          	|             	|           	|
|                            	|                         	|                      	|                                      	|             	|           	|
| check search artwork       	| access /gallery         	| search value = 'Mon' 	| narrow result to mona lisa and david 	| as expected 	| pass      	|
|                            	| access /artworks/:artID 	|                      	|                                      	|             	|           	|
|                            	|                         	|                      	|                                      	|             	|           	|