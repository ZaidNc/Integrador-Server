// const axios = require("axios");

// const getCharById = (res, id) => {
//   axios
//     .get(`https://rickandmortyapi.com/api/character/${id}`)
//     .then((response) => {
//       let { name, gender, species, origin, image, status } = response.data;
//       let char = {
//         id,
//         name,
//         gender,
//         species,
//         origin: origin.name,
//         image,
//         status,
//       };

//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify(char));
//     })
//     .catch((error) => {
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.end(error.message);
//     });
// };

// module.exports = getCharById;

const axios = require("axios");

const URL = "https://rickandmortyapi.com/api/character/";

const getCharById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios(URL + id);
    
    if (data) {
      const { name, gender, species, origin, image, status } = data;
      const character = { id, name, gender, species, origin, image, status };

      return character.name
        ? res.json(character)
        : res.status(404).send("Character not found");
    } else {
      return res.status(404).send("Character not found");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = getCharById;
