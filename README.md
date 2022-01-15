# TRYGO POS-APP

TRYGO POS-APP is a point-of-sales application that handles transactions and inventory listings

## Installation
### {BACKEND}
- under backend subfolder, create a folder named "config"
- download the dev.json file from the developers 
- paste the dev.json file on the config file
- under backend subfolder, create a folder named "keys"
- download private.key and public.key from the developers
- paste the keys in said folder
- type the following in the terminal/command prompt
    ``` bash
    cd backend

    node index 
    ```
    (make the server public and open the browser)
- copy url of the browser
- paste in frontend/pos-final/src/utils/get-host.js
Please note that the url pasted shold have a "/" at the end. if there isn't one, please add "/" at the end of the url.

Example:
https://4000-blue-aphid-l57duoyx.ws-us27.gitpod.io/ (there is a "/")

### {FRONTEND}
Create another terminal/command prompt and type the following in the terminal/command prompt
```bash
cd frontend/pos-final

npm i

npm start
```
(make the server public)


## Usage
set-up-account:
This only happens when there are no users inside the database.
The first user to setup an account here will automatically be the Admin.
    - create a username and password
    - proceed to login

For Managers/Admin:
    - Has access to all the features
        - creating and editing accounts
        - adding/editing/removing inventory
        - viewing/adding transactions

    For Staff:
    - Has access to some features
        - adding/editing/removing inventory
        - viewing/adding transactions
    
    For Cashiers:
    - Has access to few features
        - viewing/adding transactions

## Test cases
Feel free to test the website for inconsistencies

{1} In the setup account page, if there are no users within the databse, the new user may not be able to login or access any other pages.

{2} The very first user to be setup an account with will be the Admin. An admin can elect another admin or delete the admin status from themselves, but there should always be one admin.

{3} If not Logged in, and there is a recorded user in the database, the user cannot access the setup account anymore since only admins can manage and register accounts

{4} Admins have access to all the pages and editing staff members' accounts

{5} Staff members cannot edit or add other members' accounts but can go to any other pages such as mentioned in the Usage section of this README

{6} Cashiers only have access to the pages mentioned in the USAGE section of the README

{7} Logout button is functioning and will lead the user to the login page

{8} All users can change their passwords on their accounts alone. The password should be atleast 8 characters.

{9} An admin or staff cannot delete products which have existing transactions already


## Contributing
Pull requests are no longer welcome.

## Authors and Acknowledgements
EARL SAMUEL R. CAPUCHINO
JULIAN C. FUERTES
REDEEMYRRH YSRAEL S. MANALO
ADRYAN PHYLLIP A. RAMOS

## License
[MIT](https://choosealicense.com/licenses/mit/)
