# ScriptApp

## Tools Used

Angular CLI 9.0.6

Node 12.16.1

MongoDB 3.4.4


## Running the App

To run the Angular app navigate to the app directory and enter the following commands in your shell
* `cd script_app`
* `npm install`
* `npm start`

You will need to run the backend in a separate shell window or tab in the same app directory.

* `npm install`
* `npm start:server`

Once the app is running you can register, login and start creating scripts. You must enter one of the following operations.

* DoThisThing(string)
* DoThatThing(integer)
* DoTheOtherThing(float)

Anything else will return an error when you try to save the script.

Once the script is created the app will calculate the result on the backend and store it in the database. When you view scripts you should be able to view the results of the operation

You can edit and delete your script. You can view other people's scripts but you cannot edit or delete them.

## Admin

Admin is functionally complete with a few caveats

* You will have to set the admin role manually in the database. There are probably better ways to do this but for now, you can use a tool like [Robomongo](https://robomongo.org/) to set it. By default all users are "normal" i.e they don't have admin rights. You have to set the role to "admin". Just register as a normal user then change your role in the database.

* When you login as an admin you should be able to see options to create users and view users. There is a bug here so you may have to refresh. I suspect its because am not subscribing to the role data correctly in that component. Also because of the same bug you may see those options as an ordinary user. Not to worry because the backend is protected from normal users. They will just get errors if they attempt anything.

Apart from that the Admin can create users, delete them and change their  login information.

## General Comments

Functionally the app works according to the instructions but there can be some improvements in the UI. For example instead of users being able to see all scripts(remember they can only edit and delete their own scripts), they should only be able to see their scripts.

The admin can be given more powers. For example to delete all scripts( They can see all scripts just like other users but they can't do anything).

A few bugs creep in here and there but because of time I have not been able to attend to all of these.  Thanks, the challenge taught me a lot.





