const mongoose = require("mongoose");
const Team = require("./models/Team");
require("dotenv").config();

const teams = [
  {
    name: "Flamengo",
    state: "RJ",
    founded: 1895,
    stadium: "Maracanã",
    capacity: 78838,
  },
  {
    name: "Palmeiras",
    state: "SP",
    founded: 1914,
    stadium: "Allianz Parque",
    capacity: 43000,
  },
  {
    name: "Corinthians",
    state: "SP",
    founded: 1910,
    stadium: "Neo Química Arena",
    capacity: 49205,
  },
  {
    name: "São Paulo",
    state: "SP",
    founded: 1930,
    stadium: "Morumbi",
    capacity: 66795,
  },
  {
    name: "Santos",
    state: "SP",
    founded: 1912,
    stadium: "Vila Belmiro",
    capacity: 16068,
  },
  {
    name: "Atlético Mineiro",
    state: "MG",
    founded: 1908,
    stadium: "Arena MRV",
    capacity: 46000,
  },
  {
    name: "Grêmio",
    state: "RS",
    founded: 1903,
    stadium: "Arena do Grêmio",
    capacity: 55662,
  },
  {
    name: "Internacional",
    state: "RS",
    founded: 1909,
    stadium: "Beira-Rio",
    capacity: 50000,
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Team.deleteMany({});
    console.log("Coleção limpa!");

    await Team.insertMany(teams);
    console.log("Times brasileiros inseridos com sucesso!");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seedDB();
