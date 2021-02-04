// const getJSON = async (URL, date = new Date().toISOString().slice(0, 10)) => {
//   let response = await fetch(URL + date);
//   let json = await response.json();
//   return json;
// };
//
//
//
//
// // getJSON('https://www.sodexo.fi/ruokalistat/output/daily_json/152/').then(data => console.log(data));
//
//
// const JSONModule = {getJSON};
//
// export default JSONModule;


const getJSON = async (url) => {
  let response;
  try{
     response = await fetch(url);
     if (!response.ok){
       throw new Error(`HTTP ERROR ${response.status} ${response.statusText}`);
     }
  }catch (e){
    console.error('getJSON-module: getJSON error ', e.message);
  }
  const JSONResponse = await response.json();
  return JSONResponse;
};



export {getJSON};
