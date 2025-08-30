# **Cloudxi Museum - Documentation**

### Team member

- Tran Minh Hoang - 17401 - @JimHoth - Project Manager
- Huynh Nguyen Chi Hieu - 17523 - @CheeseHu
- Ha Cam Tu - 17362 - @ellieryus
- Nguyen Bao Hoang Chuong - 17098 - @DyzilestarHorches
- Nguyen Quoc Huy - 17409 - @nguyenhuy200258

### About our project

When visiting a museum, it is really frustrating for many people to navigate around and get detailed information about the masterpieces they see. Some of the people even can not get tickets to enter the museum. That’s when we are questioning: “What if there is a Museum Management System that will be in charge and solve all of these problems?”. We see that if we can build a Museum Management System, that will be a great supporter not only for the Museum Managers themselves but also for the visitors.

Now instead of getting frustrated because of not being able to navigate around the museum, by using our system, navigating to your favorite artwork is no more a hassle. Now instead of wandering around not knowing anything about the fascinating artwork, it is easy to search for detailed information about the masterpieces by accessing the database.

By using the Museum Management System (MMS), instead of selling goods and tickets offline, the Museum can also sell goods or souvenirs and tickets online to customers using our products.

To do that, we can develop an MMS that will have some special features in order to support Museum Staff in management and visitor experience.

## Table of contents

<!-- TOC -->

- [**Cloudxi Museum - Documentation**](#cloudxi-museum---documentation) - [Team member](#team-member) - [About our project](#about-our-project)

  - [Table of contents](#table-of-contents)

  1. [Introduction](#introduction)

  - [Project Overview](#project-overview)
  - [Purpose](#purpose)
  - [Scope](#scope)
  - [Goals and Objectives](#goals-and-objectives)

  2. [System Analysis](#system-analysis)

  - [Stakeholders](#stakeholders)
  - [Business Requirements](#business-requirements)
  - [User Requirements](#user-requirements)
  - [Functional Requirements](#functional-requirements)
  - [Non-Functional Requirements](#non-functional-requirements)

  3. [System Design](#system-design)

  - [System Architecture](#system-architecture)
  - [Data Model](#data-model)
  - [Components Design](#components-design)
  - [Structure and Relationships](#structure-and-relationships)
  - [GUI](#gui)
  - [Functionality Design](#functionality-design)

  4. [Implementation](#implementation)

  - [Development Environment](#development-environment)
  - [Technology Stack](#technology-stack)
  - [Coding Standards](#coding-standards)
  - [File Structure](#file-structure)
  - [Key features](#key-features)
  - [Testing Plan](#testing-plan)

  5. [Deployment](#deployment)

  - [Deployment Environment](#deployment-environment)
  - [Installation Instructions](#installation-instructions)

  6. [User Guide](#user-guide)

  - [Getting Started](#getting-started)

  7. [Maintanance and Support](#maintanance-and-Support)

  - [Testing](#testing)
  - [Disaster Recovery Plan](#disaster-recovery-plan)

  8. [Conclusion](#conclusion)

  - [Summary of Project](#summary-of-project)
  - [Future Work](#future-work)
  - [Acquired Knowledge](#acquired-knowledge)

<!-- /TOC -->

## **1. Introduction**

_Let's take a closer look to our project_

### **Project Overview**

The Museum Application is a software project designed to provide a comprehensive platform for visitors to explore and interact with exhibits at a museum. The application will be available for use on personal computers and mobile devices such as smartphones and tablets.
The primary purpose of the Museum Application is to enhance the visitor experience by providing access to relevant information and media about museum exhibits. The application will also provide a user-friendly interface for visitors to find information related to the museum and the artwork itself.

> **Key features of the Museum Application include:**

> - Booking information: The application will provide information for the visitor to book online tickets for entering the museum or upcoming events which will lead to a time-saving check-in.
> - Artwork information: By scanning the QR code next to the artworks, visitors now can gain more information related to the masterpieces they want to discover including author, year of publication, description, etc.
> - Augmented Reality: The application will use augmented reality to enhance the visitor experience by providing immersive and interactive exhibits.
> - Online-Shopping: The application also provides an online shopping platform for customers to look for and book the goods, souvenirs or accessories they crave for.
>   The Museum Application will be developed using a modern technology stack that includes ReactJs, Typescript, JavaScript, SCSS. The application will be designed with a responsive user interface that adapts to different screen sizes and devices.

The target audience for the Museum Application is museum visitors of all ages who are interested in learning about the exhibits and history of the museum. The application will be available for free on website.

The goal of the Museum Application project is to provide a user-friendly and engaging platform for visitors to explore and learn about the exhibits at the museum, and to enhance the overall visitor experience.

### **Purpose**

There are several benefits why a museum might want to develop a management system:

- Enhancing the Visitor Experience: A Museum Management System (MMS) can offer an interactive and immersive experience for visitors. It can provide information about exhibits, artifacts, and the museum's history, and can offer multimedia content, such as audio guides, videos, and interactive maps. Visitors can also use the web app to plan their visit, including buying tickets, reserving parking, and finding the best routes to navigate the museum.

- Engaging Visitors: MMS can help museums engage visitors before, during, and after their visit. Museums can use the system to send notifications and alerts about upcoming events, new exhibits, and other special offers. Visitors can also use the web app to connect with the museum's social media platforms and share their experiences.

- Improving Accessibility: Museums can use apps to improve accessibility for visitors with disabilities. The app can offer features such as audio descriptions, captioning, and sign language interpretation to enhance the visitor experience for people with different abilities.

- Management Supporting: A MMS can help visitors to book online tickets for entering the museum or upcoming events which will lead to a time-saving check-in. Moreover, visitors can go shopping online for museum goods and souvenirs.

Overall, our Museum Management System with many renovated features can help museums to offer a more engaging and interactive visitor experience, improve accessibility, and collect valuable data to improve their operations.

### **Scope**

A Museum Application is a software application that helps museums to manage their collections, exhibitions, and visitor information. The scope of a Museum Management System project typically includes the following components:

- Collection Management: This module is responsible for managing the museum's collection of artifacts, artworks, documents and other objects. It includes cataloging, tracking, and storing the collection, as well as managing conservation and preservation activies.

- Visitor Management: This module is responsible for managing the museum's visitors, including tracking visitor information, managing admission fees and ticket sales, and managing group tours.

- Administration and Reporting: This module is responsible for managing the museum's administrative tasks, including add or delete employees and modify layout.

- Social Features: This module is responsible for providing social features to visitors, such as the ability to like photos or comments about their experience and provide feedback or reviews of the museum.

The scope of our project may also include additional modules, such as ticketing and membership management, marketing and communication tools. The specific features and functionalities of a Museum Application will vary depending on the needs of the museum and the demand of visitor experience.

### **Goals and Objectives**

The goals and objectives of a Museum Application are to enhance visitor experience and provide an easier way to access the information about the museum's masterpieces. To clarify, specific goals and objectives may include:

- **Providing easier way to access the information:** The Application provide visitors with easy access to information about the museum's exhibits and collections by scanning QR Code or using searching tools that is available on app. This could include details about specific artifacts, artworks or documents.

- **Enhancing social interaction:** This Museum Application should provide the visitors with opportunities to share their experiences on social media. This could also include features like the ability to like photos, comments and read comments, and write feedbacks or reviews of the museum.

- **Increasing revenue:** The Museum Application could also help increase revenue for the museum by providing visitors with the ability to purchase online tickets, or book to buy museum merchandise through the application.

## **2. System Analysis**

### **Stakeholders**

The stakeholders of a museum website software can vary depending on the organization and project. Here are some potential stakeholders involved in the development and operation of a museum website software:

| List of Stakeholders             | Definition                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Museum Administrator             | The museum administration, including directors, curators, and other staff members, are key stakeholders. They provide input on the website's content, design, and overall goals. They may also be involved in decision-making processes related to the website's functionality, integration with other systems, and strategic direction.                   |
| IT Department                    | The IT department plays a crucial role in implementing and maintaining the museum website software. They are responsible for server configuration, software installation, security measures, and technical support. The IT team ensures that the website operates smoothly and addresses any technical issues that arise.                                  |
| Web Developers                   | Web developers are responsible for building and customizing the museum website software. They work closely with other stakeholders to translate requirements into functional website features. Web developers may also contribute to ongoing enhancements and updates to the software.                                                                     |
| Designers and UX/ UI Researchers | Designers are responsible for creating an appealing and user-friendly interface for the museum website together with UX/UI Researchers. They collaborate with other stakeholders to ensure that the website's visual design aligns with the museum's branding and provides an engaging user experience.                                                    |
| Content Creators                 | Content creators, such as writers, photographers, and videographers, play a critical role in producing and updating the content displayed on the museum website. They work closely with the museum administration to ensure that the content is accurate, informative, and engaging for website visitors.                                                  |
| Visitors and Users               | Ultimately, the visitors and users of the museum website are end users and also important stakeholders. Their feedback and user experience contribute to the continuous improvement of the website software. User feedback and analytics can provide valuable insights for enhancing the website's usability and meeting the needs of the target audience. |

### **Business Requirements**

Business requirements for a museum website can vary depending on the specific goals and objectives of the museum. However, below are some common business requirements that could be considered:

1. **Visitor Experience:** The website should enhance the visitor experience by providing relevant and engaging content, including exhibit information, maps, and multimedia presentations.

2. **Ticketing and Reservation:** The website should allow visitors to purchase tickets, make reservations for the visiting the museum.

3. **Exhibits and Collections:** The website should showcase information about the museum’s exhibits, collections, and artifacts. It should include detailed descriptions of images, videos, authors, and interactive elements to educate and engage visitors.

4. **Social Media Experience and Feedback:** The website may provide options for visitors to connect with each other by sharing and rate their experiences, using the platform to like photos and add feedback to the museum.

5. **Online-Shopping:** The website should provide an online shopping platform for customers to look for and book the goods, souvenirs, or accessories.

6. **Analytics and Reporting:** It should include analytics capabilities to track visitor engagement, app usage, and other relevant metrics. This data can help the museum make data-driven decisions, optimize the visitor experience, and measure the application's effectiveness.

These are some key business requirements to consider when developing a museum website. It is important to align these requirements with the specific goals, budget, and resources of the museum to create a tailored solution that meets its unique needs.

### **User Requirements**

User requirements for a museum website can vary depending on the target audience and the specific goals of the museum. However, below are some common user requirements to consider:

1. **Comprehensive information:** Users will expect to find detailed information about the museum, including its history, mission, collections, exhibitions, events, and programs. Each exhibition or collection should have its own dedicated page with descriptions, images, and relevant details.

2. **Online ticketing and reservations:** If the museum offers online ticketing or reservations, users should be able to easily book tickets or make reservations through the website. This can include options for number of tickets with time they want to visit.

3. **Social media:** The website should be provided with social media platforms can allow users to easily add likes, add comment, or feedbacks to the museum after the visiting.

4. **Security:** Users will expect their personal information to be confidential when registering the account on the website.

5. **Contact information and support:** User should be able to find contact information for the museum, including address, phone number, and email so that the Customer Services Team can help users which will bring a better experience for the visitors when visiting.

6. **Mobile responsiveness:** With the increasing use of mobile devices, the website should be responsive and optimized for different screen sizes. It should provide a seamless experience across desktop, tablets, and smartphones.

### **Functional Requirements**

There are ten functional requirements for this system:

1. The system must allow users to register for the account and login by registered account.
2. The system must allow users to view souvenirs, place orders and buy souvenirs in gift shops.
3. The system must allow users to book ticket, view available time slots and remaining tickets
4. The system must allow users to search for the artworks, view location and the information of the artworks.
5. The system must provide the location and information of the artworks when users scan QR code next to them.
6. The system must allow employees and administrators to view databases.
7. The system must allow administrators to modify databases and employees to modify databases except for the users and tokens table.
8. The system must allow employees and administrators to check in and check out the ticket for the customers.
9. The system must allow administrators to modify building layout.
10. The system must allow users to give likes to the artworks.

### **Non-Functional Requirements**

There are 8 non-functional requirements for this system:

1. The system must work on all mobile and tablet devices. User interface must be consistent on all devices.
2. The users should use a real phone number to register for the account
3. In case the database crashes, a backup of the database must be used to maintain the operation.
4. The system shall run 24/7, providing clients with services whenever they want
5. The system shall make sure that the information about the users cannot be obtained when traveling through the internet.
6. The system would ensure basic privacy and security for users’ password
7. The user interface shall load and respond in under 2 seconds under decent network situations.
8. The system can serve at least 100 users at a time.

## System Design

### **System Architecture**

#### **_Two-tier architecture for web development_**

The system will be implemented with the Two-tier architecture, with the separation between the client and the server, thus fulfilling the requirements that the system operates on the Internet and provides services for multiple end-point users at the same time.

The two tiers are defined based on the functionalities, with each tier serving independent purposes. on a different infrastructure, with:

> - The Presentation Tier (or the Client) provides a user-friendly GUI for users where user can interact with the website, which displays the information the customers require.
> - The Server Tier (or the backend server) is where the main logic of the whole project is hosted, which is used to provide services for the clients, including:
>   - Booking tickets
>   - Viewing the gallery database
>   - Modifying (including adding and removing) items in the database
>   - And more functionalities
> - The Server Tier also contains the database, in which information about the museum is stored, managed, and processed.

Here is the illustration of the architectural design of the system:

<img src="../diagrams/Images/Two-tier%20architecture.png" alt="Two-tier Architecture" width="700">

With this Two-tier architecture, the typical topological data flow goes as follows:

1. Client requests data from the server
2. The request arrives at the backend server, where it will be directed to the correct API endpoint that performs the service
3. The service processes the requested function
4. Server queries the database for some data
5. Database returns the queried data back to the server
6. The server processes the data and sends the data back to the client
7. This process repeats

By subdividing the project into a number of separate tiers, the project will undergo a number of advantages in the development stage, including:

- Faster development, as the tier can be implemented independently and simultaneously, thus also helping work scheduling and distribution.
- Mobile web application development, as the tier handles different purposes, to develop a mobile application for the system, it is now only required to rewrite the Presentation Tier for the application when operating on a phone, instead of having to build the application from scratch.

#### **_Interfaces_**

According to the System Analysis provided above, the system is designed to be used by 3 different groups of users, including customers, employees, and administrators, each with its own functionalities. Thus, the project will provide 3 different interfaces for different roles operating in the museum, including:

**1. Customer interface:** _The interface for the customers who are visiting the museum._

- Book/ buy tickets
- Search for pictures
- Buy museum goods
- Add likes to the artworks
- Add comment to review/ give feedback to the museum

**2. Employee interface:** _The interface for the employees of the museum to manage the inventory of the museum._

- Modify information about the pictures
- Inventory management
- View information about time blocks
- Check-in-out

**3. Administrator interface:** _The interface for the administrator of the museum to monitor and manage the museum as a whole._

- Add or remove artworks from the museum database.
- Add or remove users from the museum database.

> **_Note that this Interface Design only accounts for the required interfaces, thus does not restraint how the system is implemented, as long as the three groups of users have the appropriate functionality._**

#### **_Microservices Architecture_**

For each interface, different procedures (_middleware_) need to be passed before the interface can be reached when making the request. Thus, for the Backend server, the Microservices Architecture will be implemented to realize the interfaces needed in the Interface section.

With the Microservices Architecture, the Backend Server will then be further divided into smaller chunks, each with different functionalities, serving a different interface. Most importantly, to actually use the three interfaces, the request **needs to pass the appropriate middleware** assigned to the interface.

The use of Microservices Architecture will further improve the development speed of the project, also improving the scalability of the projects, as new and innovative features will be easily integrated into the project at a later stage.

<img src="../diagrams/Images/Microservices%20Architecture.png" alt="Microservices Architecture" width="550">

### **Data Model**

<img src="../diagrams/Images/ER%20model.png" alt="ER Model" width="700">

To add more information about the model, hereafter is the complete schema of each table that is stored in the database:

- users(UID, UName, Password, Phone, Role DEFAULT 'Customer');

- goods (GID, GName, GCategory, GPrice, GAmount);

- artworks (ArtID, ArtName, AuthorID, ArtYear, ArtCharacteristics, ArtPosition, ImgLink, Description, Likes);

- authors (AuthorID, AuthorName, AuthorBirthYear, AuthorDeathYear, AuthorNationality);

- timeslots (TDate, TTime, Count)
  reviews (RID, UID, RText, RRatings)
  buys (UID, GID, GQuantity, BTime, BDate, BillNum, BStatus);

- books (TicketNo, UID, TDate, TTime, TicketCode, TStatus);

- likes (UID, ArtID)

### **Components Design**

#### **_Customer Interface:_**

The landing page should be visually appealing and user-friendly. It should provide easy navigation to all the features on the website. The design should be fully responsive to work well on all devices. The following features should be included:

**1. View and Search Artwork:** A search function should be available to allow customers to find specific artworks they are interested in. The search results should be presented in a clear and organized manner. Customers should be able to view artwork details and express their concerns by leaving reactions.
Additionally, there is a top 10 Gallery: A small gallery of the top 10 artworks to visit in the museum should be included. This gallery should be collected based on the number of reactions.

**2. Booking Tickets:** A page should be dedicated to booking tickets with a time table of available time slots for visiting the museum. Customers should be able to modify the quantity and type of tickets in just one booking.

**3. Shopping Souvenirs:** A page should be dedicated to selling museum-related goods such as books, souvenirs, and other merchandise. Page should be dedicated to shopping souvenirs with a filter feature to view items based on their category. Customers should be able to modify the quantity and type of items in just one booking.

#### **_Employee & Admin Interface:_**

The landing page for the employee interface should be clear, minimal, and easy to use. It should only be accessible on desktop devices. The following features should be included:

**1. View Database:** An interface should be provided to allow employees to view selected databases of the system.

**2. Modify Database:** An interface should be provided to allow employees and admins to manage data of customers, employees, goods, artworks, tickets, and more.

**3. Check In-Out:** An interface should be provided for employees to insert ticket codes for checking in and out.

**4. Manage Inventory:** An interface should be provided to modify the mechanism for admin, which is synchronized with the database.

#### **_Authentication Interface:_**

It is a mechanism that allows users to log in to a website or application to access content or features that are restricted to specific users or user roles.
Authentication is the process of verifying the identity of a user and determining whether they have the appropriate permissions to access the content or features they are requesting.
In the context of a museum website, an authentication interface can be used to direct users to either the **customer interface** or **employee interface** based on their roles.

### **Structure and Relationships**

<img src="../diagrams/Images/Structure%20and%20Relationship.png" alt="Structure and Relationship" width="700">

### **GUI**

**Overview:** Our landing page contains 4 sections: **Homepage**, **AboutSection**, **VisitSection**, **GiftSection**. Each section will have buttons to navigate to specific features of customers’ features.

**Wireframes and interactions:**

**1. Homepage:** Contains logo of the museum and buttons for navigating to Authentication interfaces
<img src="../diagrams/Images/Home%20page.png" alt="Home page" width="700">

**2. AboutSection:** Contains a brief overview about our museum and button for navigating to View and Search Artwork Feature.
<img src="../diagrams/Images/About%20us.png" alt="About Us" width="700">

**3.VisitSection:** Contains a brief overview about time to visit the museum and button for navigating to Booking Ticket Feature.
<img src="../diagrams/Images/Visit.png" alt="Visit" width="700">

**4.GiftSection:** Contains a brief overview about shopping in the museum and button for navigating to Shopping Souvenirs Feature.
<img src="../diagrams/Images/Gifts%26Souvenirs.png" alt="Gifts & Souvenirs" width="700">

**Style guide:**

Primary font: prata

Secondary font: Inter

Color pallet:

#FFFFFF rgb(255,255,255)
<img src="../diagrams/Images/Color%20pallet%201.png" alt="Color Pallet 1" width="75">

#303030 rgb(48,48,48)
<img src="../diagrams/Images/Color%20pallet%202.png" alt="Color Pallet 2" width="75">

#000000 rgb(0,0,0)
<img src="../diagrams/Images/Color%20pallet%203.png" alt="Color Pallet 3" width="75">

**Gradient map:**
linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));

### **Functionality Design**

**Requirement 1: Log in**

Description: The clients use their registered information to log in to use the services of the website

1. The clients send a request to log into the server, with the information including:

   - Username
   - Password

2. The server retrieves the data from the database to check if the user’s username and password exists and is correct or not.

3. Return the message “Log in successfully” and direct the clients to the Home page if the client’s information is valid and correct. Otherwise, the message on the screen will be “Login unsuccessfully”.

<img src="../diagrams/Use%20case/UD%201%20-%20Log%20in.png" alt="UD 1 - Log in" width="450">

<img src="../diagrams/Sequence%20Diagram/SD%201%20-%20Log%20in.png" alt="SD 1 - Log in" width="500">

**Requirement 2: Register**

Description: The clients use their private information to register an account to use the services of the website.

1. The clients send a request to register an account to the server, with the information including:

   - Username
   - Password
   - Phone number

2. The Authentication System checks if the inputted information is in correct format or not

3. The server retrieves the data from the database to check if the Username already exists or not.

4. If the username already exists, the clients receive the message “Register unsuccessfully”. Otherwise, the client will be directed to the Login page with the message “Register successfully”.

<img src="../diagrams/Use%20case/UD%202%20-%20Register.png" alt="UD 2 - Register" width="450">

<img src="../diagrams/Sequence%20Diagram/SD%202%20-%20Register.png" alt="SD 2 - Register" width="500">

**Requirement 3: Buy Good**

Description: The clients choose their desired souvenirs to place an order and give payment for it.

1. The clients send a request to buy the item to the server, with the following information:

   - The name of the items
   - The quantity of the chosen items
   - The server inserts the buying data into the database and return the message to the clients

2. Display “Buy successfully” and direct clients to the Payment page if the clients place orders successfully. Otherwise, the message will be “Buy unsuccessfully”

<img src="../diagrams/Use%20case/UD%203%20-%20Buy%20Good.jpg" alt="UD 3 - Buy good" width="450">

<img src="../diagrams/Sequence%20Diagram/SD%203%20-Buy%20Good.jpg" alt="SD 3 - Buy good" width="500">

**Requirement 4: Booking**

Description: The clients select their desired tickets based on the timetable provided to book.

1. The clients send a request to book the tickets to the server, with the following information:

   - The timeframe of the ticket
   - The quantity of tickets

2. The server retrieves the ticket’s data in the database and sends it to the client with a private ticket code.

3. Return the message “Booking successfully” and display the tickets.

<img src="../diagrams/Use%20case/UD%204%20-%20Booking.png" alt="UD 4 - Booking" width="450">

<img src="../diagrams/Sequence%20Diagram/SD%204%20-%20Booking.png" alt="SD 4 - Booking" width="500">

**Requirement 5: View Information**

Description: The clients view the information about the website containing the information about the museum

1. The clients enter the URL link to the website

2. The information about the museum is displayed for the visitors

<img src="../diagrams/Use%20case/UD%205%20-%20View%20Information.png" alt="UD 5 - View Information" width="450">

<img src="../diagrams/Sequence%20Diagram/SD%205-View%20information.png" alt="SD 5 - View Information" width="500">

**Requirement 6: Search**

Description: The clients enter the keywords about the artworks they want to find to look up for them.

1. The clients send a request to search for an artwork, with one or more of the following information:

   - Artist name
   - Genre
   - Artwork name

2. The server retrieves the artwork’s data in the database to find the artwork, based on the keywords provided.

3. Return the name and link to the website containing the information about the artwork. Otherwise, the message “No Results found” is displayed.

<img src="../diagrams/Use%20case/UD%206%20-%20Search.png" alt="UD 6 - Search" width="450">

<img src="../diagrams/Sequence%20Diagram/SD%206%20-%20Searching.png" alt="SD 6 - Search" width="500">

**Requirement 7: Scan QR code**

Description: The clients use their mobile device to scan the QR code to look up for the information about the artworks.

1. The clients scan the QR code provided by the system

2. The server retrieves the information about the artwork in the database and sends it to the clients.

3. The clients are directed to the website containing the information about the artwork.

<img src="../diagrams/Use%20case/UD%207%20-%20Scan%20QR.png" alt="UD 7 - Scan QR" width="450">

<img src="../diagrams/Sequence%20Diagram/SD%207%20-%20Scan%20QR.png" alt="SD 7 - Scan QR" width="500">

**Requirement 8: View Artwork**

Description: The clients enter the keywords about the artworks they want to find to look up for them and a link to the artwork will be provided.

1. The clients send a request to search for an artwork, with one or more of the following information:

   - Artist name
   - Genre
   - Artwork name

2. The server retrieves the artwork’s data in the database to find the artwork, based on the keywords provided.

3. Return the name and link to the website containing the information about the artwork. Otherwise, the message “No Results found” is displayed.

4. The link will direct the clients to the page containing the information they are looking for.

<img src="../diagrams/Use%20case/UD%208%20-%20View%20Artwork.png" alt="UD 8 - View Artwork" width="450">

<img src="../diagrams/Sequence%20Diagram/SD%208%20-%20View%20Artwork.png" alt="SD 8 - View Artwork" width="500">

**Requirement 9: Review Museum**

Description: The clients want to send feedback to the services of the museum

1. The clients send a request to evaluate the museum to the server, with the following information:

   - Number of stars
   - Description / Comment

2. The server inserts the new data provided by the clients
   into the database

3. The server retrieves new data from the database and displays the new ratings about the museum

<img src="../diagrams/Use%20case/UD%209%20-%20Review%20Museum.png" alt="UD 9 - Review Museum" width="450">

<img src="../diagrams/Sequence%20Diagram/SD%209%20-%20Review%20Museum.png" alt="SD 9 - Review Museum" width="500">

**Requirement 10: View database**

Description: The clients want to view information in the database for a specific table.

1. The clients send a request to retrieve the information about the table in the database to the server, with the following information:

- Table name

2. The server retrieves the data of the table based on the information provided.

3. The information about the table will be displayed.

<img src="../diagrams/Use%20case/UD%2011%20-%20View_database.png" alt="UD 10 - View_database" width="450">

<img src="../diagrams/Sequence%20Diagram/SD%2011%20-%20View_database.png" alt="SD 10 - View_database" width="500">

**Requirement 11: Modify database**

Description: The clients want to modify information in the database for a specific table.

1. The clients send a request to retrieve the information about the table in the database to the server, with the following information:
   Table name

2. The server retrieves the data of the table based on the information provided.

3. The information about the table will be displayed.

4. The clients send a request to modify data in the database to the server with the correct format of the information.

5. The server updates the data in the database.

6. Return message “Modify successfully” and reload the page if the process is successful. Otherwise, the message “Modify unsuccessfully” will be displayed.

<img src="../diagrams/Use%20case/UD%2012%20-%20Modify.png" alt="UD 11 - Modify" width="500">

<img src="../diagrams/Sequence%20Diagram/SD%2012%20-%20Modify.png" alt="SD 11 - Modify" width="500">

**Requirement 13: Check in/ Check out**

Description: The clients want to change the status of the tickets into check in or check out for the customer

1. The clients send a request to retrieve the ticket’s information, with the following information:

   - Ticket Code

2. The server retrieves the data about the ticket and sends the information to the clients.

3. The information of the ticket is displayed if the ticket is valid. Otherwise, the message “Invalid Ticket” will be printed.

4. The clients send a request to check in or check out based on the status of the ticket to the server.

5. The server updates the status of the ticket in the database.

6. Return turn message “Check in successfully” or “Check out successfully” based on the client’s request.

<img src="../diagrams/Use%20case/UD%2014%20-%20Check_in_out.png" alt="UD 13 - Check_in_out" width="500">

<img src="../diagrams/Sequence%20Diagram/SD%2014%20-%20Check_in_out.png" alt="SD 13 - Check_in_out" width="500">

**Requirement 14: Insert**

Description: The clients want to insert new information into the database for a specific table.

1. The clients send a request to retrieve the information about the table in the database to the server, with the following information:

   - Table name

2. The server retrieves the data of the table based on the information provided.

3. The information about the table will be displayed.

4. The clients send a request to insert data into the database to the server with the correct format of the information.

5. The server inserts the data into the database.

6. Return message “Insert successfully” and reload the page if the process is successful. Otherwise, the message “Insert unsuccessfully” will be displayed.

<img src="../diagrams/Use%20case/UD%2015%20-%20Insert.png" alt="UD 14 - Insert" width="500">

<img src="../diagrams/Sequence%20Diagram/SD%2015%20-%20Insert.png" alt="SD 14 - Insert" width="500">

**Requirement 15: Delete**

Description: The clients want to delete information from the database for a specific table.

1. The clients send a request to retrieve the information about the table in the database to the server, with the following information:

   - Table name

2. The server retrieves the data of the table based on the information provided.

3. The information about the table will be displayed.

4. The clients send a request to delete information from the database to the server with the correct format of the information.

5. The server deletes the data from the database.

6. Return message “Delete successfully” and reload the page if the process is successful. Otherwise, the message “Delete unsuccessfully” will be displayed.

<img src="../diagrams/Use%20case/UD%2016%20-%20Delete.png" alt="UD 15 - Delete" width="450">

<img src="../diagrams/Sequence%20Diagram/SD%2016%20-%20Delete.png" alt="SD 15 - Delete" width="500">

<img src="../diagrams/Use%20case/UD%2017%20-%20Modify%20Buildin%20Layout.jpg" alt="UD 16 - Modify Building Layout" width="450">

<img src="../diagrams/Sequence%20Diagram/SD%2017%20-%20Modify%20Building%20Layout.jpg" alt="SD 16 - Modify Building Layout" width="500">

## **4. Implementation**

### **Development Environment**

The development stage consists of writing code, testing and debugging, building production, and collaboration. For writing code, **Microsoft Visual Studio Code** (VS Code) was used by all team members for front-end and back-end due to its lightweight, flexible extensions and full-fledged support.

For front-end development, **Node Package Manager** (NPM) is used to manage source code and dependencies. The NPM is also used to run development servers for testing and debugging on browsers. Moreover, the building of front-end production is also powered by NPM.

For the back-end development, code is written in the team member’s personal computer with VS Code and then sent to the **remote server**, where the database resides, by using **FileZilla** through FTP for testing and debugging. The building of NodeJS apps is not required.

Team members use **git technology** and **gitlab** for coding collaboration. The process of working was SCRUM and

### **Technology Stack**

The core technology stack of **React** for front-end, **Node** and **Express** for back-end, **MySQL** for database management are used in this project. The modern technology stack provides strong support to realize the idea of the project. Front-end and back-end have a robust connection since both are written in **Javascript**.

For front-end development, **Sass** and **Nginx** are additionally used. Sass is a preprocessor scripting language, which was used instead of traditional CSS. Sass provides systematic organization with global variables and scripting structure. With Sass, styling is faster, reusable, and more maintainable. Nginx is used as a webserver to host the front-end application.

### **Coding Standards**

#### **_Common Coding Conventions throughout the project_**

Coding conventions are used to style guidelines for programming, thus it secures the quality of code and also offers other benefits such as improving code readability and making code maintenance easier.

Herein is the coding conventions that the developers in this projects will follow,

- **Naming conventions:**
  - **Variable** and **function names** written as **camelCase**.
  - **Global variables** and **functions** written in **UPPERCASE**.
  - **Constants** (like PI) written in **UPPERCASE**.
  - Specifically, for Front-end:
    Components written with the **first letter** in **UPPERCASE**.
  - And lastly, for Back-end:
    **API endpoints** written in **hyp-hens**.
- **File extensions:**
  - Css files should have the **.scss** extension.
  - Typescript files should have the **.tsx** extension.
  - And Javascript files should have the **.js** extension.
- **Indentation:**
  - All files should have the same indentation of 2 spaces, with codes of the same level having the same priority.
- **Line Length < 80:**
  - All lines in the code should not exceed the maximum length of 80 characters.

#### **_File Structure_**

_Moreover, to make maintaining the files easier for further development, there is a need for a clear, precise, and easy to understand file structure. This Online Museum Management System will implement the introduced file structure that has been tested and in use for numerous projects, thus making sure an easy development journey._

**File Structure - Frontend**

The Frontend will be separated into a number of folders, each containing files serving the same purpose. All the code related files will be stored inside the src folder right under the frontend folder for ease of maintenance.

Here is the main structure of the frontend coding interface for the developers:

src/

|

| - components/

| | - Button

| | | - Button.tsx

| | | - Button.scss

| | - …

|

| - hooks/

| | - useLogout.tsx

| | - …

|

| - pages/

| | - Home

| | | - Home.tsx

| | | - Home.scss

| | - …

|

| - Style/

| | - \_globalStyle.scss

| | - …

|

| - App.tsx

| - index.js

First, let’s explain what each folder does:

- The components folder contains subfolders, each contains a single organized component (i.e Button, Form) that other developers can integrate into their own websites
- The hooks folder contains every single custom hook (pre-defined functions that could be used across the project).
  - Inside the folder will be directly .tsx files declaring what the hook is
- The pages folder contains one folder for each page, inside each folder there will be files that will either for the functionality of the pages, or the styles used inside the page
- The Style folder contains all global styles that the whole project can used, maintains a singular look on the project

And lastly, the **App.tsx** file contains the main application of the project, in which declaring the Routes to each pages and other related things

**File Structure - Backend**

The Backend is separated into numerous folders, each containing different files and organized based on their role and functionality. All the code-related files will be stored inside the server folder, which is the backend folder, for ease of maintenance.

Here is the main structure of the backend coding interface for the developers:

server/

|

| - \_test/

| | - artworks-review/

| | | - …

| | - …/

| | | - …

| | - app.js

|

| - config/

| | - connect_mysql.js

|
| - middleware/

| | - access_level.js

|

| - node_modules/

| | - …

|

| - routes/

| | - administrator/

| | | - get-data

| | | - …

| | | - index.js

| | - customer/

| | | - booking.js

| | | - …

| | | - index.js

| | - default/

| | | - artworks.js

| | | - …

| | | - index.js

| | - employee/

| | | - check-in-out.js

| | | - …

| | | - index.js

| - scheduler/

| | - cron.js

|

| - utils/

| | - core_function.js

|

| - app.js

| - index.js

To begin with, let’s explain what the usage of each folder is:

- The **\_test** folder contains subfolders, each containing different files that provide us with different functions for the clients to make use of the services. Mainly, this folder is used for testing and debugging if there is an error in the main system.
- The **config** folder contains a file **.js** that helps us to create a connection to the database.
- The **middleware** folder contains the access_level.js file that protects the API end-point in the backend, which means that the clients can not access the services without satisfying the given conditions.
- The **node_modules** folder contains dependencies and library files that help run our application.
- The **routes** folder contains subfolders, each containing files providing different services which are organized based on different role (i.e. Employee, Customer, Administrator, Default). Each subfolder has its own index.js file to export all the service files.
- The **scheduler** folder contains a cron.js file that automatically runs at a specific time.
- The **utils** folder contains a core_function.js file that helps us to interact with the database indirectly. Moreover, the encrypt.js and decrypt.js files help to secure the data and connection between the clients, server, and the database
- The **app.js** file contains the main application of the project, which declares the location of each Routes

And lastly, the **index.js** files runs initially once the node.js code is executed. It is responsible for the application’s start up, routing, and other functions.

The File Structure for the application is straightforward by grouping multiple files with the same uses together, thus making it easier for developers to maintain and improve the project. Implementing this File Structure ensures that the development process can proceed smoothly without confusion about where files should be in or what a certain file is supposed to do.

#### **_Code Documentation_**

To ensure that the development process can be incorporated seamlessly, it is important to have and maintain a code documentation system, in which all functions and API endpoints are documented properly, easily accessible, and easy-to-understand.

The documentation will only cover the Backend Server, since it is the Interface on which the Frontend will communicate with. Please refer to the [Code Documentation file](./code_documentation.md) for more information about the documented API endpoints, as well as other functionalities

### **Key features**

Developing process is not a short one, thus it is hard to report what we did and how we did it, as well as problems encountered on the journey to get the project done. Therefore, herein we will only include the main functionalities that has been cooperated into the project:

**1. Authentication**
A management website always needs an authentication system to manage the user and their roles, therefore, we develop an authentication system that allows users to login or register.

To make it more user-friendly, we also implemented login by Google account using OAuth.

**2. Booking**
The website can be used to book tickets for your visit before entering the museum, note that on Monday there won’t be any tickets to book since Monday is reserved for maintenance.

**3. Buying goods**
Our website also has a shopping site where you can browse through all the merchandise available to book, and thus can easily buy what you want

**4. Review and Like**
Fascinated by an artwork and want to recommend it to others, well you can always press like to convey your feelings. Artworks then will be ranked based on likes, which means whichever has the most likes will be more likely to appear on others’ search bars.

Moreover, you can also write a review about your visit to the museum in the Review Section at the end of your landing page.

**5. Gallery and Artworks**
Hosting a database that contains information about all our artworks, you can see the recommended artworks that ought to be visited at the museum, also search for an artwork that specifically fits your taste

**6. Profile**
On the Customer page, clients are given access to their own profiles pages, which will allow them to change their passwords, as well as to access their information about booked tickets, booked goods, and also merchandise that they have purchased.

**7. Check in and Check out**
The website also has a dedicated system that is for use by the employees to manage the museum, and Check in & Check out is one of them. With the help of this functionality, the employee can check in and check out visitors easily

**8. Inventory Management**
Just like Check in & Check out, the employees also has the access to the Inventory Management, which is used to retrieve the shopping order of customers, to then deliver them with the goods they desired

**9. Modify and View Database**
Another functionality that is only for the employees and the administrators is Modify and View Database. This feature allows them to modify layout of the website, add or delete information related to the artworks, view data about the visitors including their tickets, feedbacks and booked accessories which will bring many benefits to analyze data for bettering the museum’s services. Administrators themselves can manage, add or remove other employee roles.

**10. Scheduling task**
The system also has a scheduling subsystem to do two tasks, including:
Delete old time slots and Insert new time slots into the timeslots table, this will ensure that the database only has the available time slots for users to book.
Backup database, this will ensure that the system has a collection of backup databases that they can revert into.

**11. Animation and Transition**
To make the user’s experience enjoyable while browsing through the website, the system also includes some animation and transitions that not just look great but are eye-catching so that the users can have fun looking at.

**12. Data encryption**
User’s data is something that is personal to each user, therefore it is crucial to ensure that no third-party can interfere with the sent data and can sniff out the personal information about the user. To make sure that this scenario does not happen, the system implements an encryption and decryption system, and information sent on the internet will be secret.

**13. Hash password**
For the purpose of security, to minimize the damage of server attacks, prevent hackers from stealing users’ passwords for future attack, users’ passwords are stored in our database only after hashing.

### **Testing Plan**

Before the application is officially put into operation, a testing phase will be conducted to test the functionality and performance of the application. This phase will make sure that the system operates properly and does not have bugs anymore.

For this application, we manually test and debug any errors that we may encounter during the implementation phase. There are some test cases that we plan to test and debug:

- Login and Register
- Booking
- Buying goods
- Review and Like
- Gallery
- Profile
- Check in and Check out
- Modify and View database

## **5. Deployment**

### **Deployment Environment**

Both front-end and back-end are deployed using Docker, each in a different container, database is deployed using MySQL service without using Docker.

<img src="../diagrams/Images/Deployement%20.png" alt="Deployment Environment" width="450">

As for the scale of the project, both frontend and backend are deployed on the same physical server. They interact with clients through different ports (80 for front-end web server and 3001 for back-end web server). The two web servers do not interact with each other.

The server runs Ubuntu 20.04, with CPU standard B1 (Azure offer), and 1 GiB RAM. The server is a virtual machine provided by Azure.

To specify the deployment process, the two Dockerfile for front-end React app, and back-end Node Js app would be illustrated below:

> \# get the base node image
> FROM node:alpine as builder
>
> \# set the working dir for container
> WORKDIR /frontend
>
> \# copy the json file first
> COPY package-lock.json package.json .
>
> \# install npm dependencies
> RUN npm ci
>
> COPY . .
> \# build the folder
> RUN npm run build
>
> \# Handle Nginx
> FROM nginx:alpine as production
> COPY --from=builder /build /usr/share/nginx/html
> COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
>
> EXPOSE 80
> CMD ["nginx", "-g", "daemon off;"]

Dockerfile for front-end app

> FROM node:16-alpine
>
> WORKDIR /usr/src/app
>
> COPY package.json package-lock.json .
>
> RUN npm ci
>
> COPY . .
>
> EXPOSE 3001
> CMD [ "node", "index.js" ]

### **Installation Instructions**

**User Instructions**
For end users, the application can be accessed directly using any browser on any device through the domain name or public IP of the server.

**Developer Instructions**
For developers, the installation instructions would be about how to deploy source code to the server. First part is to clone data and pre-instal. That is to clone the source code to the server using git, and to install the docker engine to the server. For production deployment, we work on the /deployment directory.

**1. Build the database**

- install the mysql server
- use the /database/mms_default.sql to recreate the database
  restart the mysql service
- cronjob for backup using crobtab -e, and copy the content of database/crontab.txt.

**2. Run docker in folder /server**

- docker build . -t server
- docker compose up -d
- Change database address in /config/connect_mysql.js.

**3. Run docker in folder /client**

- docker build . -t client
- docker run -p 80:80 -d client

For testing on personal computer we work on the root directory, we need to build backend and frontend as above, but not the database, since it is install and is running on the server.

## **6. User Guide**

### **Getting Started**

Below is a user guide for the Museum Application:

**1. Launch the website:** search for the museum website online and then access it using your device.

**2. Explore the Museum:** The Museum Application will provide you with a map of the museum and information about the different exhibits and collections. Use the map to navigate to different exhibits or collections that interest you.

**3. Connect on Social Media:** The Museum Application may allow you to connect with other visitors and share your experiences on social media. Use the platform to like or add comments about your experience and connect with other museum-goers.

**4. Purchase Tickets and Goods:** The Museum Application may also allow you to book tickets, goods, and souvenirs.

**5. Provide Feedback:** The Museum Application may include a feedback or review feature. Use this feature to provide feedback to the museum and share your thoughts about your experience.

## **7. Maintanance and Support**

### **Testing**

After the Implementation process, it is necessary to test the application before actually deploying it or simply to turn it in to the professor. The plan for testing includes manual testing of all functionalities defined in the documentation.

To follow which functionality is tested and with which input, output, and bugs, please refer to the Testing Documentation also attached [here](./testing_documentation.md).

### **Disaster Recovery Plan**

Since the system requirements stated that users can access the system 24/7, to recover from a disaster that make the system unavailable for users, here is the plans for when disaster struck.

Plans for minimizing the probability of disaster occuring
All API endpoints implement the try and catch pattern, so that if the services are down or cannot function properly, the user is responded with an error message that states that the service is currently unavailable.

Furthermore, the clients also has a built in notification that can recognise these error message that the server sent back, thus displaying only the available information, minimizing the probability of a crash on the client side.

However, there is always a chance that something wrong happens to the server which can result in a sudden stop of operations, which is rather inconvenient for all users. If such a disaster happens, the administrator will restart the server as soon as possible, including disabling the faulty service.

**_Backup Database_**

We provide solutions for software errors (including wrong values, wrong order of execution, …), that we have database backups stored in the same hardware server. In case of hard disk destruction data would be lost.

The plan for backup databases includes a set of database dumps that will automatically be saved, and also automatically delete out-dated backups. The system will auto save a backup database at the start of each day and store backup databases that date up to 30 days, thus when an error occurs, we can have plenty of options to choose which database to revert back to.

## **8. Conclusion**

In conclusion, the museum website software documentation provides a comprehensive overview of the features, functionalities, and technical aspects of the museum website software. It serves as a valuable resource for developers, administrators, and stakeholders involved in the design, development, and maintenance of the museum website.

### **Summary of Project**

Throughout the documentation, we have covered various aspects of the software, including its architecture, installation process, user management, content management, and integration with external systems. We have outlined the requirements and prerequisites for deploying the software, along with step-by-step instructions for installation and configuration.

The documentation also highlights the key features of the museum website software, such as a user-friendly interface, responsive design, multimedia support, search functionality, etc. It provides detailed explanations of each feature and guidance on how to leverage them effectively.

Overall, the museum website software documentation serves as a comprehensive guide for anyone involved in the museum website project. It equips users with the knowledge and understanding required to successfully deploy, manage, and enhance the museum website software. By following the guidelines and recommendations provided in the documentation, stakeholders can ensure a smooth and successful implementation of the software, resulting in an engaging and informative online presence for the museum.

We strongly recommend that users utilize this documentation as a point of reference throughout the entire duration of the museum website project. If any concerns or inquiries arise, users have the option to consult the documentation for troubleshooting instructions or reach out to the support team for assistance.

We hope that this documentation serves as an invaluable asset and actively contributes to the prosperous development and smooth operation of the museum website software.

### **Future Work**

While the current museum website software documentation provides a comprehensive overview of the software's feature and functionalities, there are several areas that could be expanded in order to develop and update in the future. Here are some suggestions for future work:

**1. Integration with Emerging Technologies:** As technology continues to evolve, there may be opportunities to integrate emerging technologies into the museum website software. Future work could involve researching and documenting integration possibilities with technologies such as augmented reality, virtual reality, or artificial intelligence to create immersive and interactive experiences for visitors.

**2. Accessibility Considerations:** Inclusivity and accessibility are important aspects of any website, especially for a museum that aims to reach a diverse audience. Future iterations of the documentation could provide guidance and recommendations on ensuring the museum website software meets accessibility standards, including guidelines for designing accessible user interfaces and implementing assistive technologies.

**3. Community and User Contributions:** Encouraging community participation and user contributions to the documentation can enhance its usefulness and breadth of knowledge. Future work could involve implementing mechanisms for users to provide feedback, suggest improvements, and contribute their own insights, tips, and use cases to enrich the documentation.

**4. Social Media Integration:** Social media integration acts as a marketing tool that uses social media platforms to improve branding and customer engagement. With that, the museum social media marketing can be supported by providing options to redirect to a business website from social media accounts and enabling social media accoung links on the website.

### **Acquired Knowlegde:**

After the development and implementation of the museum website software, several valuable knowledge and insights have been gained. These include:

**1. Technical Expertise:** The development process of the museum website software has provided the development our team with an enhanced understanding of web technologies, frameworks, and best practices. We have gained expertise in areas such as server configuration, software installation, security measures, and performance optimization.

**2. User Experience (UX) Design:** The process of creating the museum website software has deepened the understanding of user experience design principles. We have gained insights into designing intuitive interfaces, optimizing navigation, and creating engaging and interactive experiences for website visitors.

**3. Coding language and Technology:** The process of developing a museum website has improved our knowledge in IT field including approach new coding languages such as: Typescript, JavaScript, React Js, Node Js, etc. Moreover, we have gained experience in build up Docker File, Middleware, Frontend and Backend Development, Google Identity Services, etc. In which, I believe would help us a lot in the future.

**4. Teamwork:** Also, we have learnt how to work as a team and how good teamwork affects the final project. Working together helps us to recognize others’ strengths and weaknesses in order to divide the work appropriately and suitably. We all feel very grateful for all of the effort our team members had put in to complete this Zicke Zacke project.

Overall, the development and operation of the museum website software have resulted in a wealth of knowledge and experience in various domains, including technology, user experience, content management, integration, maintenance, and collaboration. This knowledge will serve as a foundation for future projects and contribute to the continuous improvement and success of museum websites.
