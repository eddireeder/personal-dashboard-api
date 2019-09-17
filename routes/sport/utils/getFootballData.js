const csv = require('csvtojson');
const axios = require('axios');

getFootballData = async () => {
  const { data } = await axios.get('http://www.football-data.co.uk/mmz4281/1718/I1.csv');
  const csvObj = await csv().fromString(data);
  return csvObj;
}


module.exports = getFootballData;