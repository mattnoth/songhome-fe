
# Description 

Beatbay Alpha is the first version of a song specific task management web application. It should be used for listening ToDos on songs, storing song metadata, and storing other useful information about a track. It handles file uploads of audio and images. Main features include a status list of songs in a user's enviornment, and a dashboard for each song where users can edit information about a song and post notes / tasks about the song. Originally, the idea was a web-app for myself to manage my song / beat catalog. I wanted to be able to upload a song, attach meta data to it, listen to it. For works in progress, the ability to write notes attached the song (stretch goal is to have the note jump to a point in the song).

In order to use, one must assign their own S3 buckets and database in the backend repo. 

## User Stories 

As with any application, there are infinite ideas, with constrained time. Originally had planned for many more features to be built within the MVP which slowly got trimmed down. There are still many features I would like to implement, including user authentication so anyone can use it without connecting their own database. 

- As a user I want to be able to create a song 
- As a user, I want to post information for a song, meta data, lyrics, tags 
- As a user I want to be able to edit a song
- As a user, I want to write notes about a song and have them save to one song 
- As a user, I want to delete a note or mark a note as complete. 
- As a user, I want to upload a song to the dB / webserver 
- As a user, I want to interact with a player for that song 
- As a user, I want to add notes to a song (stretch- associated with a particular timestamp in the song) 
- As a user, I want to be able to delete a song.  

## Stretch

- As a user, I want to be able to login and have my own song lists 
- As a user, I want to group songs into album/project group 
- As a user, I want to be able to export song data as a CSV file 
- As a user, I want to search through my catalog / filter based on song data 
- As a user I want to be able to add Many tags to songs, and find songs with the same tag name. 


# Technologies Used 
## Front End

Songhome / Beatbay has a front-end built using Reactjs, implemented with create-react-app. It uses 

- Material UI Core Components & Icons, as well as fontsource-roboto (standard for material UI),
- Axios for http requests to the server 
- react router dom for front end routing,
- react player is used as a simple player for audio 

to run, first clone this application, and then run npm install 


## Backend 

The backend serverside for this application was written using Django Rest Framework & Python. It uses a
- PostgreSQL database, 
- Psycopg2-binary database adapter for Python, 
- DjangoRestFramework serializers, 
- Django-Cors-Headers, 
- Gunicorn for easy set up with Heroku deployment, 
- Whitenoise for static file collection, 
- Pillow for file mgmt, 
- Django-storages & boto3 for file mgmt and upload to Amazon S3 servers. 


## Install / Use
-- To create a clean slate environment, one will have to fork & clone both the backend and front-end repositories, but recreate some steps of Django setup; set up their own local database and connect their AWS accounts. Pip install, and then rename database, create local superuser, re route AWS upload locations to your preference -- in the audio file and image file of the song model. 

 
