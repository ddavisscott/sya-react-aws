# List of Known Bugs
The following is an ongoing list of known bugs/unintended behavior of the application.

## Multiple Review Requests
An artist can make multiple review requests to the same business with the same image multiple times.
This is because each review is made with a uuid which the database treats as two seperate requests, even
though the content of the reviews are the same. 

## Uploading large images may fail
Large files take the longest to show up on an artists dashboard, and they 
may fail to upload entirely. We're not sure how to approach fixing this
bug since this seems to be an issue with AWS S3's file upload process. 