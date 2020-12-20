Desc 

A web-app for myself to manage my song / beat catalog. I want to be able to upload a song, attach meta data to it, listen to it. For works in progress, the ability to write notes attached the song (stretch goal is to have the note jump to a point in the song).

I realize I’m stretching big time on how comprehensive I would like the database to be, so going to have to play around with Django before I can get an idea of how far I can get it to be like this. Stretch goal for other people to be able to use it (user auth).

Your tech stack (frontend, backend, database)
React
Python/Django
Postgresql

List of backend models and their properties
Song: name, file, image, release date, Lyrics, Notes, ISRC Code (Stretch: Tags, Team, Album/Group Foreign Key)
Notes: song_id, song_position (or jump to point), Text
Stretch
Tags: Name
Album/Group: songs, name
Stretch: Lyrics and Team have their own models, so I can associate Tags with lyrics (maybe) and so writers on the song can have a “name” property and a “percent pub owned” property

User Stories in Readme. 