const getJSON = async (URL, date = new Date().toISOString().slice(0, 10)) => {
  let response = await fetch(URL + date);
  let json = await response.json();
  return json;
};

const dataOut = (URL, date) => {
  console.log('odota');
  return getJSON(URL, date).then(data => data);
};
// getJSON('https://www.sodexo.fi/ruokalistat/output/daily_json/152/').then(data => console.log(data));


const JSONModule = {dataOut};

export default JSONModule;
