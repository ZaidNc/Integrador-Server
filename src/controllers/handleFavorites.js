let myFavorites = [];

const postFav = (req, res) => {
  myFavorites.push(req.body);
  return res.json(myFavorites);
};

const deleteFav = (req, res) => {
  const { id } = req.params;
  const favsFiltered = myFavorites.filter((char) => {
    return char.id !== Number(id);
  });
  myFavorites = favsFiltered;
  return res.json(myFavorites);
};

module.exports = { postFav, deleteFav };