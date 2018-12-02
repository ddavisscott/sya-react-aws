## List of Known Bugs
The following is an ongoing list of known bugs/unintended behavior of the application.

## Multiple Review Requests
An artist can make multiple review requests to the same business with the same image multiple times.
This is because each review is made with a uuid which the database treats as two seperate requests, even
though the content of the reviews are the same. 

## 