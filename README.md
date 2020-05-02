# contactFormReact
Code for a sample contact form made with react and hosted on AWS S3.
[Link to page](http://static-site-adnan-1.s3-website-us-west-2.amazonaws.com/)

## Demo Video
[Link to demo video](https://youtu.be/fnlLvpihGLI)

## Description
The sequence of events are divided in 3 steps reflected in 3 screens/pages:
1. Login via Google (Couldn't intergate Facebook as their [individual verification](https://developers.facebook.com/blog/post/2020/03/24/pausing-individual-verification/) is paused so I couldn't get the unqiue Client).
2. Fill in name, email, message in contact form. At this point field level validation occurs. Click on submit. At this point page level validation occurs and alerts are shown if a field is left empty or the text is invalid.
3. A success screen is shown with an option to go back and fill another response.
