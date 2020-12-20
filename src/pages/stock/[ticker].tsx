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

  const loadCourses = async () => {
    const res = await fetch(`/api/ticker?symbol=${ticker}`);
    const stockData = await res.json();
    setStockData(stockData.data.reverse())
    setStockNews(stockData.news.articles);
  };

  useEffect(() => {
    if (ticker) loadCourses();
  }, [ticker]);

  let tkrChangeDataPoints = []
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

    tkrChangeDataPoints.push({x: dateToday, y: (stockData[0].c - d.c)*100/d.c})
    tkrVolumeDataPoints.push({x: dateToday, y: d.v})

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
      text: `$${ticker} Change since Date`,
      fontSize: "20"
    },
    axisY: {
      title: "Change Since Date",
      crosshair: {
        enabled: true,
      },
      suffix: "%"
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
      toolTipContent: "{x}: {y}%",
      dataPoints: tkrChangeDataPoints
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
      title: "Volume",
      crosshair: {
        enabled: true,
      }
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
      toolTipContent: "{x}: {y}",
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
      title: "Price",
      prefix: "$",
      crosshair: {
        enabled: true,
      },
      scaleBreaks: {
        autoCalculate: true
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

  const overview = (
    <Row style={{ margin: "2em" }}>
      <Col>
        <ListGroup variant="flush">
          <ListGroup.Item>Name:</ListGroup.Item>
          <ListGroup.Item>Sector:</ListGroup.Item>
          <ListGroup.Item>Industry:</ListGroup.Item>
          <ListGroup.Item>Exchange:</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col>
        <ListGroup variant="flush">
          <ListGroup.Item>Price:</ListGroup.Item>
          <ListGroup.Item>PE Ratio:</ListGroup.Item>
          <ListGroup.Item>Dividend Yield:</ListGroup.Item>
          <ListGroup.Item>Profit Margin:</ListGroup.Item>
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
          return <Card key={`news-card-${i}`} style={{ minWidth: "20em" }}>
            <Card.Img variant="top" src={n.urlToImage} />
            <Card.Body>
              <a href={n.url}><Card.Title style={{ color: 'black' }}>{n.title}</Card.Title></a>
              <Card.Subtitle className="mb-2 text-muted">{n.source.name}</Card.Subtitle>
              <Card.Text>
                {n.description}
              </Card.Text>
              <Card.Subtitle className="mb-2 text-muted">{datePublished.toDateString()}</Card.Subtitle>
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
      <Container>
        {overview}
        {charts}
        {newsSection}
      </Container>
      <MFooter />
    </>
  );
};

export default Ticker;
