![Untitled_Artwork 2](https://user-images.githubusercontent.com/8869516/131231889-cf42e8a9-5457-49ce-bb0a-9f306151847d.png)




# University List App

In the project directory, you can run:

### `yarn`
To install necessary dependencies

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn run lint`
Runs the eslint script.

### `yarn run storybook` 
Runs the storybook for UI components.

# Storybook for UI Components
<img width="2555" alt="Screen Shot 2021-08-28 at 10 01 46 PM" src="https://user-images.githubusercontent.com/8869516/131220429-9997373e-d56a-4219-818f-aae9597377b5.png">

It shows the UI components used in this project and how it can be used across other components as well. 

# Login User Interface 

<img width="2560" alt="Screen Shot 2021-08-28 at 7 13 02 AM" src="https://user-images.githubusercontent.com/8869516/131197127-153e362b-0501-4707-95ab-f0fdb92c9d48.png">


Login Credentials: 
 - Email: Any Valid Email
 - Password: Any Valid Password

Both are required to logged in the app. 

# Registration User Interface 
<img width="2553" alt="Screen Shot 2021-08-28 at 7 12 31 AM" src="https://user-images.githubusercontent.com/8869516/131197136-2712d5a9-09fd-4bd3-a368-c235da010bc7.png">

Note: Registered User's information will be stored in local storage for now. 

# Dashboard User Interface
<img width="2555" alt="Screen Shot 2021-08-29 at 4 02 44 AM" src="https://user-images.githubusercontent.com/8869516/131229682-5c12abc5-3b48-406c-b275-d68a31639384.png">


The universities data is grouped by number of universities per country,  to better visualize the ratio of universities in each country. Charts using recharts powered by D3 is also used to better understand the data. 

# All Universities User Interface

<img width="2560" alt="Screen Shot 2021-08-29 at 1 45 42 AM" src="https://user-images.githubusercontent.com/8869516/131226458-16224a52-d48c-45d3-b9bf-00a5ff475ad0.png">


This will show all the universities list. 
The user can also search by name and country and subscribed in the current list they have selected.
The user can also sort by country, name and website. 

# Subscriptions User Interface

<img width="2557" alt="Screen Shot 2021-08-29 at 1 46 34 AM" src="https://user-images.githubusercontent.com/8869516/131226454-c713c8d3-82fd-48bf-b59f-5037129a4b37.png">


This will show the current list that the user has subscribed. This data is stored in the local storage as of now. 

# Not Found Page User Interface

<img width="2299" alt="Screen Shot 2021-08-28 at 10 35 13 PM" src="https://user-images.githubusercontent.com/8869516/131221487-e1b3bfb8-1c63-44bd-aebf-ac113ce0fcfe.png">

This page is expected to show when a user is unable to find a page in the web app. 


# Design Process
- Branding an application started from idealizing what the app will be for. (i.e. University Students)
- The design of the logo is based on Xendit's website and branding. 
The logo itself is the reverse logo of Xendit, with tweaks to make it look like a book. 
- The background on sign in and registration is also the reverse background of Xendit's website. 
- This decision was made solely for the purpose of creating an application based on what Xendit could produce.
- Assets such as logos were created using a software called ProCreate

# Technical Decisions
Given that the project or application building will only take 3-4 days for completion below are the decisions made technically:

- Third-party libraries for other UI components were used to speed up development of features.
- Tasks for this small project were delegated on a 4-day timeline. 2 days were spent for designing and building
and 2 days more were spent for linting, testing and refactoring.
- UI/UX were designed on the fly, there were no researches made for the demographics of the users. 
- Started to have storybook paired with the web app itself for future development. 

# Areas of Improvement
Given an ample time these are the areas I want to improve on the application: 

- Replace stored data in local storage into databases.
- Have a dedicated backend service for all requests. 
- Unit Testing.
- Refined Design.
- Dedicated design system for the app.


