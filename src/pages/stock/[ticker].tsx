import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Mheader } from "../../components/Mheader";
import { Mnavbar } from "../../components/Mnavbar/";
import { MFooter } from "../../components/MFooter";
import { Col, Row, Button, Modal, Form, Table, Container } from "react-bootstrap";

const Ticker = (): React.ReactNode => {
  const router = useRouter()
  const ticker = router.query.ticker;
  const [stockData, setStockData] = useState([]);

  const loadCourses = async () => {
    const res = await fetch(`/api/ticker?symbol=${ticker}`);
    const stockData = await res.json();
    setStockData(stockData.data)
  };

  useEffect(() => {
    if (ticker) loadCourses();
  }, [ticker]);

  let dateToday = new Date(0)
  const tkrChangeDataPoints = stockData.reverse().map((d, i) => {
    dateToday = new Date(0)
    dateToday.setUTCSeconds(d.t)
    return {x: dateToday, y: (stockData[0].c - d.c)*100/d.c}
  });

  const tkrPriceDataPoints = stockData.reverse().map((d, i) => {
    dateToday = new Date(0)
    dateToday.setUTCSeconds(d.t)
    return {x: dateToday, y: d.c}
  });

  const stockDataChangeAreaChart = {
    animationEnabled: true,
    zoomEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title:{
      text: `$${ticker} Stock Price Change Overtime`
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

  const stockDataLineChart = {
    animationEnabled: true,
    zoomEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title:{
      text: `$${ticker} Stock Price Overtime`
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
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    data: [{
      type: "line",
      toolTipContent: "{x}: ${y}",
      dataPoints: tkrPriceDataPoints
    }]
  }

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
          <CanvasJSChart options = {stockDataChangeAreaChart}/>
        </Col>
      </Row>
      </>
    )
  }

  return (
    <>
      <Mheader title={`$${ticker}`} />
      <Mnavbar theme={"light"} />
      {charts}
      <MFooter />
    </>
  );
};

export default Ticker;
