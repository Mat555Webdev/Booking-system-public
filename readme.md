**Product name: Sleep-Well Guest-House**

**Product description: Booking System implemented with a guest house**

1. System architecture:

The app that I'll be building will be created using the MERN 
stack which is a powerful stack that is implemented with various 
Javascript frameworks as well as MongoDB. 

I will be deploying both the front and backend on the same machine.

I will be using Next.js for my react framework which is a server side
rendered(SSR) framework. I chose a SSR framework because it will give 
the user a much more pleasing experience when interacting with the site.
With SSR your server’s response to the browser is the HTML of your page 
that is ready to be rendered, that means your browser will start rendering 
the HTML from your server without having to wait for all the JavaScript 
to be downloaded and executed. Which in essence means that the user can 
start viewing the page while all the Javascript is downloading and being
executed.

MongoDB atlas will be used for the database which is a cloud solution.

2. Functional requirements:

    - Sign-up/Sign-in/logout: Which will be implemented using passport.js,
    as well as bcrypt for password security.
    
    - User bookings: Users will be required to login before being able to 
    make/cancel a booking.

    - Prices must be generated before the booking is confirmed.

    - booking confirmation: Owner should be able to confirm bookings via 
    an administrator account. 

3. Non-Functional requirements:

    - Responsive design readily available for phones, tablets, and desktops

    - Attractive and simple user interface.

4. User stories:

    * As a user 
    I want to make a booking online,
    So I can book accommodation remotely.

    * As a user 
    I want to login,
    So I can view the status of my booking

    * As an owner
    I want to view all bookings,
    So I can confirm or reject bookings

    * As a user 
    I want to login on any device,
    So I can book accommodation at anytime/any place

    * As a developer
    I want to secure all http requests and responses
    So I can have a hack free project.

5. How to use the App

    - Navigate to the apps domain/local host depending on whether it's 
       being used localy or not.

    - Sign up with a username and password of your choice

    - login with the same username and password.

    - Make a booking on the home page by choosing your desired accomodation.

    - View the status of your booking under the "bookings" tab to see whether
       the owner has confirmed or not.

6. Usage for admin account.

    - login in with admin account

    - click on "dashboard tab"

    - view user bookings/delete user

    - accept or reject user booking after viewing bookings.

7. How to use on local machine 

    **Prerequisites: Install nodejs on local machine**

    - Copy code to your machine.

    - Navigate to the root directory, then type npm install in the CLI.

    - In order to run the app, you should have:

        1. Google developers account

        2. Github account 

        3. MongoDB atlas account

    - Replace the data in 'keys.js' with your own private info which can
      be retrieved in the above mentioned accounts,keys.js file can be 
      found in '/server/config/keys.js' route.

    - NAVIGATE TO ROOT FOLDER THEN type 'npm run dev' in the CLI, then 
      navigate to http://127.0.0.1:3000

8. Security measures:

    - Helmetjs was used for securing the app

    - bcrypt was used to encrypt passwords so that they're not saved to the 
      database in plain text.

    - helmets content security policy was also used, this feature will stop hackers from           injecting evil code into the app, it will only allow code written within the app to be       executed. It prevents cross site scripting AKA 'XSS attacks'

    - helmets referrerPolicy was also used, which will not allow hackers to    see where users are coming from(previous sites)

9. Deployment: 

    - deployed using heroku.

    - Frontend and backend were deployed on the same platform because nextjs(SSR frontend) and     express restful-api(backend) is running on the same port.

    - link to app https://booking-system-v2.herokuapp.com/

    

