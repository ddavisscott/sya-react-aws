# List of Known Bugs/Unintended Behavior
The following is an ongoing list of known bugs/unintended behavior of the application.

### Multiple Review Requests (Unintended Behavior)
* **Description:** An artist can make multiple review requests to the same business with the same image multiple times.

* **Reason:** This is because each review is made with a uuid 
which the database treats as two seperate requests, even
though the content of the reviews are the same. 

### Uploading Large Images May Fail (Bug)
* **Description:** Large files take the longest to show up on an artists dashboard, and they may fail to upload entirely. 

* **Reason:** We're not sure how to approach fixing this bug since this seems to be an issue with AWS S3's file upload process. 

### Updating Business Profile Information (Bug)
* **Description** The first time you edit a business profile, if you dont change the information in every field, when you try and update the account information it wont successfully post to the database. It gives a 502 Server error.

* **Reason:** This is a strange bug. The state of the class contains a string for every field the first time you edit a business account. So even if a user doesnt change a field, it should still be sent to the database.
