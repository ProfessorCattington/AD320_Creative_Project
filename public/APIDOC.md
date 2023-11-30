# *Pokedex* API Documentation
*These API Endpoints provide the client with information about pokemon universe related topics.*

## */Trainers*
**Request Format:** */Trainers/:name*

**Request Type:** *trainer's name as a string*

**Returned Data Format**: *JSON*

**Description:** *JSON data with information about the trainer such as their name and pokemon roster *


**Example Request:** */Trainers/Misty*

**Example Response:**

```json
'Name': "Misty",
        'Roster':{
            'Starmie' : 121,
            'Psyduck' : 54,
            'Vaporeon' : 134,
            },
        'Info': "Misty is the Gym Leader of Cerulean City's Gym, known officially as the Cerulean Gym. She gives the Cascade Badge to Trainers who defeat her in battle. She specializes in Water-type Pokémon. ",
        'ImageRef' : "https://archives.bulbagarden.net/media/upload/d/db/Red_Blue_Misty.png"
```

**Error Handling:**
*"message" : "No trainer info available for that trainer" *

## */Badges*
**Request Format:** */Badges/:name*

**Request Type:** *badge name as a string*

**Returned Data Format**: Text

**Description:** *string array with info about the badge such as the city where the trainer can go to acquire it*

**Example Request:** */Badges/Thunder*

**Example Response:**
*Fill in example response in the {}*

```text
{
[
        'Thunder Badge',
        'Vermillian City',
        'Surge',
        'Electric',
        "https://archives.bulbagarden.net/media/upload/a/a6/Thunder_Badge.png"
    ],
}
```

**Error Handling:**
*"message" : "No info available for that badge!"*
