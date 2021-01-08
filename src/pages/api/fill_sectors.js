import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import cheerio from "cheerio";
import fs from "fs"

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  let doc = {}
  // $(`span[data-reactid="21"][class="Fw(600)"]`).innerText
  // https://finance.yahoo.com/quote/AAPL/profile/

  try {
    const data = fs.readFileSync('/Users/rishabhtatia/Documents/coding/projects/spanalysis/public/data/tickers.json', 'utf8')
    doc = JSON.parse(data)
  } catch (err) {
    console.error(err)
  }

  let c = 0
  const tickers = Object.keys(doc);
  for (let i = 0; i < tickers.length; i++) {
    if (c < 25) {
      const tkr = tickers[i];
      if (doc[tkr].sector == "none") {
        const response = await fetch(`https://finance.yahoo.com/quote/${tkr}/profile/`)
        const htmlString = await response.text()
        const $ = cheerio.load(htmlString)
        let sectorName = $(`span[data-reactid="23"][class="Fw(600)"]`).text()
        if (sectorName == "") sectorName = "none"
        doc[tkr].sector = sectorName;
        console.log(tkr, sectorName);
        c++;
        fs.writeFileSync('./public/data/tickers.json', JSON.stringify(doc));
      }
    }
  }

  console.log('done');

  res.json(doc);
});

export default handler;