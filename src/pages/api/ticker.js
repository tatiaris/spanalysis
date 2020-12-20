import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
const { BASE_URL, ALPACA_KEY_ID, ALPACA_SECRET_KEY } = process.env

const handler = nextConnect();
handler.use(middleware);

const getData = async (tkr) => {
  let tickerData = []
  const apiUrl = `https://data.alpaca.markets/v1/bars/day?symbols=${tkr}&limit=253`
  await fetch(apiUrl, {
    method: 'get',
    headers: {
      'APCA-API-KEY-ID': ALPACA_KEY_ID,
      'APCA-API-SECRET-KEY': ALPACA_SECRET_KEY
    }
  }).then (
    response => response.json()
  ).then ( data => {
    tickerData = data[tkr]
  }).catch((e) => console.log(e));

  return Promise.resolve(tickerData)
}

handler.get(async (req, res) => {
  let doc = {}
  await getData(req.query.symbol).then(d => {
    doc.data = d
  }).catch(e => console.log(e))
  res.json(doc);
});

export default handler;