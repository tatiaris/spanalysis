import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Mheader } from "../../components/Mheader";
import { Mnavbar } from "../../components/Mnavbar/";
import { MFooter } from "../../components/MFooter";
import { Col, Row, Button, Card, Form, Table, Container, CardColumns, ListGroup } from "react-bootstrap";

const Ticker = (): React.ReactNode => {
  const router = useRouter()
  const ticker = router.query.ticker;
  const [stockData, setStockData] = useState([]);
  const [stockNews, setStockNews] = useState([]);
  const [spyData, setSpyData] = useState([]);
  const [stockOverview, setStockOverview] = useState({
    Name: "",
    Description: "",
    Sector: "",
    Industry: "",
    Exchange: "",
    PERatio: "",
    DividendYield: "",
    ProfitMargin: "",
    MarketCapitalization: ""
  });

  const loadCourses = async () => {
    const res = await fetch(`/api/ticker?symbol=${ticker}`);
    const stockData = await res.json();
    setSpyData(stockData.spyData.reverse());
    setStockData(stockData.data.reverse())
    setStockNews(stockData.news.articles);
    setStockOverview(stockData.overview);
  };

  useEffect(() => {
    if (ticker) loadCourses();
  }, [ticker]);

  let tkrChangeDataPoints = []
  let spyChangeDataPoints = []

  let tkrVolumeDataPoints = []

  let tkrPriceClosePoints = []
  let tkrPriceOpenPoints = []
  let tkrPriceHighPoints = []
  let tkrPriceLowPoints = []
  let dateToday = new Date(0)
  for (let i = 0; i < stockData.length; i++) {
    const d = stockData[i];
    dateToday = new Date(0)
    dateToday.setUTCSeconds(d.t)

    tkrChangeDataPoints.push({x: dateToday, y: (stockData[0].c - d.c)/d.c})
    spyChangeDataPoints.push({x: dateToday, y: (spyData[0].c - spyData[i].c)/spyData[i].c})

    tkrVolumeDataPoints.push({x: dateToday, y: d.v/1000000})

    tkrPriceClosePoints.push({x: dateToday, y: d.c})
    tkrPriceOpenPoints.push({x: dateToday, y: d.o})
    tkrPriceHighPoints.push({x: dateToday, y: d.h})
    tkrPriceLowPoints.push({x: dateToday, y: d.l})
  }
  const stockDataChangeAreaChart = {
    animationEnabled: true,
    zoomEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: `$${ticker} vs $SPY Relative Strength`,
      fontSize: "20"
    },
    axisY: {
      title: "Change Since Date (%)",
      crosshair: {
        enabled: true,
      },
      valueFormatString: "##.##%"
    },
    axisX: {
      title: "Date",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    toolTip: {
      shared: true,
      suffix: "%"
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: true,
    },
    data: [{
      type: "area",
      name: `$${ticker}`,
      showInLegend: true,
      yValueFormatString: "##.##%",
      dataPoints: tkrChangeDataPoints
    },
    {
      type: "area",
      name: "$SPY",
      showInLegend: true,
      yValueFormatString: "##.##%",
      dataPoints: spyChangeDataPoints
    }]
  }
  const stockVolumeAreaChart = {
    animationEnabled: true,
    zoomEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: `$${ticker} Volume`,
      fontSize: "20"
    },
    axisY: {
      title: "Volume (Millions)",
      crosshair: {
        enabled: true,
      },
      suffix: "M"
    },
    axisX: {
      title: "Date",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    data: [{
      type: "area",
      toolTipContent: "{x}: {y}M",
      dataPoints: tkrVolumeDataPoints
    }]
  }
  const stockDataLineChart = {
    animationEnabled: true,
    zoomEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title:{
      text: `$${ticker} Price`,
      fontSize: "20"
    },
    axisY: {
      title: "Price ($)",
      prefix: "$",
      crosshair: {
        enabled: true,
      }
    },
    axisX: {
      title: "Date",
      valueFormatString: "MMM YYYY",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: true,
    },
    data: [{
      type: "line",
      name: "Open",
      showInLegend: true,
      yValueFormatString: "$#,###",
      dataPoints: tkrPriceOpenPoints
    },
    {
      type: "line",
      name: "Close",
      showInLegend: true,
      yValueFormatString: "$#,###",
      dataPoints: tkrPriceClosePoints
    },
    {
      type: "line",
      name: "High",
      showInLegend: true,
      yValueFormatString: "$#,###",
      dataPoints: tkrPriceHighPoints
    },
    {
      type: "line",
      name: "Low",
      showInLegend: true,
      yValueFormatString: "$#,###",
      dataPoints: tkrPriceLowPoints
    }]
  }

  let price = 0
  if (stockData.length > 0) price = stockData[0].c

  const overview = (
    <Row style={{ margin: "2em" }}>
      <Col sm="6">
        <ListGroup variant="flush">
          <ListGroup.Item>Name: <span style={{ float: "right", fontWeight: "bold" }}>{stockOverview.Name}</span></ListGroup.Item>
          <ListGroup.Item>Price: <span style={{ float: "right", fontWeight: "bold" }}>${price}</span></ListGroup.Item>
          <ListGroup.Item>Sector: <span style={{ float: "right", fontWeight: "bold" }}>{stockOverview.Sector}</span></ListGroup.Item>
          <ListGroup.Item>Industry: <span style={{ float: "right", fontWeight: "bold" }}>{stockOverview.Industry}</span></ListGroup.Item>
          <ListGroup.Item>Exchange: <span style={{ float: "right", fontWeight: "bold" }}>{stockOverview.Exchange}</span></ListGroup.Item>
        </ListGroup>
      </Col>
      <Col sm="6">
        <ListGroup variant="flush">
          <ListGroup.Item>PE Ratio: <span style={{ float: "right", fontWeight: "bold" }}>{stockOverview.PERatio}</span></ListGroup.Item>
          <ListGroup.Item>Dividend Yield: <span style={{ float: "right", fontWeight: "bold" }}>{stockOverview.DividendYield}%</span></ListGroup.Item>
          <ListGroup.Item>Profit Margin: <span style={{ float: "right", fontWeight: "bold" }}>{stockOverview.ProfitMargin}</span></ListGroup.Item>
          <ListGroup.Item>Market Cap: <span style={{ float: "right", fontWeight: "bold" }}>${stockOverview.MarketCapitalization}</span></ListGroup.Item>
          <ListGroup.Item>Relative Strength: <span style={{ float: "right", fontWeight: "bold" }}>{`---`}</span></ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  )

  let charts = (<></>)
  if (typeof window !== 'undefined') {
    let CanvasJSReact = require('../../pages/api/canvasjs.react')
    let CanvasJSChart = CanvasJSReact.default.CanvasJSChart;
    charts = (
      <>
        <Row style={{ margin: "0" }}>
          <Col style={{ margin: "1em" }}>
            <CanvasJSChart options = {stockDataLineChart}/>
          </Col>
        </Row>
        <Row style={{ margin: "0" }}>
          <Col style={{ margin: "1em" }}>
            <CanvasJSChart options = {stockVolumeAreaChart}/>
          </Col>
        </Row>
        <Row style={{ margin: "0" }}>
          <Col style={{ margin: "1em" }}>
            <CanvasJSChart options = {stockDataChangeAreaChart}/>
          </Col>
        </Row>
      </>
    )
  }

  let newsSection = <></>
  if (stockNews && stockNews.length > 0) {
    newsSection = (
        <Row style={{ margin: "2em", display: "flex", overflow: "scroll", flexWrap: "nowrap" }}>
        {stockNews.map((n, i) => {
          const datePublished = new Date(n.publishedAt)
          return <Card key={`news-card-${i}`} style={{ minWidth: "18em" }}>
            <Card.Img variant="top" src={n.urlToImage} />
            <Card.Body>
              <a href={n.url}><Card.Title style={{ color: 'black' }}>{n.title}</Card.Title></a>
              <Card.Subtitle className="mb-2 text-muted">{n.source.name}, {datePublished.toDateString()}</Card.Subtitle>
              <Card.Text>
                {n.description}
              </Card.Text>
            </Card.Body>
          </Card>
        })}
        </Row>
    )
  }

  return (
    <>
      <Mheader title={`$${ticker}`} />
      <Mnavbar theme={"light"} />
      <Container style={{ maxWidth: "100vw" }}>
        <h1 style={{ margin: "1rem 2rem", padding: "1rem 2rem", borderBottom: "1px solid #b5b5b5" }}><a style={{ color: "black" }} target="_blank" href={`https://www.marketwatch.com/investing/stock/${ticker}`}>${ticker}</a></h1>
        {overview}
        {charts}
        {newsSection}
      </Container>
      <MFooter />
    </>
  );
};

export default Ticker;
