const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');

const TRAINERS = {
    "Gary" : 0,
    "Red" : 1,
    "Misty" : 2,
    "Brock" : 3,
};
const BADGES = {
    "Boulder" : 0,
    "Cascade" : 1,
    "Thunder" : 2,
    "Rainbow" : 3,
}

const TRAINER_INFO = [
    {
        'Name': "Gary",
        'Roster':{
            'Pidgeot' : 18,
            'Alakazam' : 65,
            'Rhydon' : 112,
            'Arcanine': 59,
            'Gyarados': 130,
            'Venusaur': 3
            },
        'Info': "Gary is a Pokémon Researcher from Pallet Town and grandson of Professor Oak.",
    },
    {
        'Name': "Red",
        'Roster':{
            'Charizard' : 6,
            'Pikachu' : 25,
            'Snorlax' : 143,
            'Butterfree': 12,
            'Fearow': 22,
            'Lapras': 131
            },
        'Info': "Red is known throughout the Pokémon world as the Champion from Pallet Town, as well as a living legend for his defeat of Team Rocket in Kanto during his quest.",
    },
    {
        'Name': "Misty",
        'Roster':{
            'Starmie' : 121,
            'Psyduck' : 54,
            'Vaporeon' : 134,
            },
        'Info': "Misty is the Gym Leader of Cerulean City's Gym, known officially as the Cerulean Gym. She gives the Cascade Badge to Trainers who defeat her in battle. She specializes in Water-type Pokémon. ",
    },
    {
        'Name': "Brock",
        'Roster':{
            'Onix' : 95,
            'Tyranitar' : 248,
            },
        'Info': "Brock is the Gym Leader of Pewter City's Gym, known officially as the Pewter Gym. He gives the Boulder Badge to Trainers who defeat him in battle. He specializes in Rock-type Pokémon. ",
    }
];

const BADGE_INFO = [
    {
        'Badge Name' : 'Boulder Badge',
        'Gym Name': 'Pewter City',
        'Leader Name': 'Brock',
        'Type' : 'Rock',
    },
    {
        'Badge Name' : 'Cascade Badge',
        'Gym Name': 'Cerulean City',
        'Leader Name': 'Misty',
        'Type' : 'Water',
    },
    {
        'Badge Name' : 'Thunder Badge',
        'Gym Name': 'Vermillian City',
        'Leader Name': 'Surge',
        'Type' : 'Electric',
    },
    {
        'Badge Name' : 'Rainbow Badge',
        'Gym Name': 'Celadon City',
        'Leader Name': 'Erika',
        'Type' : 'Grass',
    },
];

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.get("/Trainers/:name", getTrainerInfo);
app.get("/Badges/:name", getBadgeInfo);

function getTrainerInfo(req, res){

    let trainerName = req.params.name;
    if (!(trainerName in TRAINERS)) {
        res.status(400).json({ error: "No trainer info available for that trainer" });
    }
    else{
        let trainerInfo = TRAINER_INFO[TRAINERS[trainerName]];
        res.json(trainerInfo);
    }
}
function getBadgeInfo(req,res){

    let badgeName = req.params.name;
    if (!(badgeName in BADGES)) {
        res.status(400).json({ error: "No info available for that badge!" });
    }
    else{
        let badgeInfo = BADGE_INFO[BADGES[badgeName]];
        res.json(badgeInfo);
    }
}

app.listen(
    PORT,
    () => console.log("Listening on port: " + PORT)
);