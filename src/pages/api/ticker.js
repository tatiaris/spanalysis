import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
const { BASE_URL, ALPACA_KEY_ID, ALPACA_SECRET_KEY, NEWS_API_KEY, ALPHAVANTAGE_API_KEY } = process.env

const handler = nextConnect();
handler.use(middleware);

const getOverview = async (tkr) => {
  let overviewData = {}
  const apiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${tkr}&apikey=${ALPHAVANTAGE_API_KEY}`

  await fetch(apiUrl, {
    method: 'get'
  }).then (
    response => response.json()
  ).then ( data => {
    overviewData = data
  }).catch((e) => console.log(e));

  return Promise.resolve(overviewData)
}

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

const getNews = async (tkr) => {
  let newsData = []

  let weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const url = `http://newsapi.org/v2/everything?domains=marketwatch.com&q=${tkr}&sortBy=publishedAt&apiKey=97fb971e21c041b486ebcec3ff01b3e9`;
  //  `domains=marketwatch.com&q=${tkr}&from=${weekAgo.getFullYear()}-${weekAgo.getMonth() + 1}-${weekAgo.getDate()}&sortBy=publishedAt&apiKey=97fb971e21c041b486ebcec3ff01b3e9`;

  await fetch(url, {
    method: 'get'}
  ).then(response => {
    newsData = response.json();
  }).catch(e => console.log(e))

  return Promise.resolve(newsData)
}

handler.get(async (req, res) => {
  let doc = {}

  await getOverview(req.query.symbol).then(d => {
    doc.overview = d
  }).catch(e => console.log(e))

  await getData(req.query.symbol).then(d => {
    doc.data = d
  }).catch(e => console.log(e))

  await getData('SPY').then(d => {
    doc.spyData = d
  }).catch(e => console.log(e))

  await getNews(req.query.symbol).then(d => {
    doc.news = d
  }).catch(e => console.log(e))

  res.json(doc);
});

export default handler;