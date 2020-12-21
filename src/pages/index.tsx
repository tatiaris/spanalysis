import React, { useState, useEffect } from "react";
import { MFooter } from "../components/MFooter";
import { Mheader } from "../components/Mheader";
import { Mnavbar } from "../components/Mnavbar";
import { Table, Container, Button, Col, Row, Spinner } from "react-bootstrap";
import { ThBtn } from "../components/style"

const Home = (): React.ReactNode => {
  const [stocks, setStocks] = useState([])
  const [priceSortDir, setPriceSortDir] = useState(-1);
  const [percentSortDir, setPercentSortDir] = useState(-1);
  const [weeklyPercentSortDir, setWeeklyPercentSortDir] = useState(-1);
  const [monthlyPercentSortDir, setMonthlyPercentSortDir] = useState(-1);
  const [sixMonthlyPercentSortDir, setSixMonthlyPercentSortDir] = useState(-1);
  const [yearlyPercentSortDir, setYearlyPercentSortDir] = useState(-1);
  const [companySortDir, setCompanySortDir] = useState(-1);
  const stockTable = stocks.map((s, i) => {
    let dailyColor = "#28a745";
    let dailySign = "+";
    let weeklyColor = "#28a745";
    let weeklySign = "+";
    let monthlyColor = "#28a745";
    let monthlySign = "+";
    let sixMonthlyColor = "#28a745";
    let sixMonthlySign = "+";
    let yearlyColor = "#28a745";
    let yearlySign = "+";

    if (s.dailyChange <= 0) {
      dailyColor = "#dc3545";
      dailySign = "";
    };
    if (s.weeklyChange <= 0) {
      weeklyColor = "#dc3545";
      weeklySign = "";
    };
    if (s.monthlyChange <= 0) {
      monthlyColor = "#dc3545";
      monthlySign = "";
    };
    if (s.sixMonthlyChange <= 0) {
      sixMonthlyColor = "#dc3545";
      sixMonthlySign = "";
    };
    if (s.yearlyChange <= 0) {
      yearlyColor = "#dc3545";
      yearlySign = "";
    };
    
    return (
      <tr key={`stock-row-${i}`}>
        <th>{i+1}</th>
        <th><a target="_blank" href={`/stock/${s.ticker}`}>{s.name}</a></th>
        <th>{s.ticker}</th>
        <th>${s.price}</th>
        <th style={{ color: dailyColor }}>{dailySign}{s.dailyChange}%</th>
        <th style={{ color: weeklyColor }}>{weeklySign}{s.weeklyChange}%</th>
        <th style={{ color: monthlyColor }}>{monthlySign}{s.monthlyChange}%</th>
        <th style={{ color: sixMonthlyColor }}>{sixMonthlySign}{s.sixMonthlyChange}%</th>
        <th style={{ color: yearlyColor }}>{yearlySign}{s.yearlyChange}%</th>
      </tr>
  )})

  const loadStocks = async () => {
    const res = await fetch(`/api/stocks`);
    const allCourses = await res.json();
    setStocks(allCourses.rows)
  };

  const valueSort = (dir, setDir, val) => {
    let stocksCopy = stocks.sort((a, b) => {
      return (-1 * dir) * b[val] + (dir) * a[val]
    })
    setStocks(stocksCopy)
    setDir(dir * -1)
  }

  const sortByCompany = () => {
    let stocksCopy = stocks.sort((a, b) => {
      return ((a.name.toLowerCase() < b.name.toLowerCase()) ? (1 * companySortDir) : ((a.name.toLowerCase() > b.name.toLowerCase()) ? (-1 * companySortDir) : 0))
    })
    setStocks(stocksCopy)
    setCompanySortDir(companySortDir * -1)
  }

  let loadingSign = <Container style={{ width: "100%", textAlign: "center" }}><Spinner style={{ margin: "2em" }} animation="border" /></Container> 
  if (stocks.length > 0) loadingSign = <></>

  useEffect(() => {
    loadStocks();
  }, [])

  return (
    <>
        <Mheader title={"Overview"}/>
        <Mnavbar theme="light"/>
        <Col style={{ padding: "0" }}>
          <Table
            striped
            hover
            variant="light"
          >
            <thead style={{ background: "#b1ffe5" }}>
              <tr>
                <th>#</th>
                <ThBtn><Button onClick={sortByCompany} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>Company</Button></ThBtn>
                <th>Ticker</th>
                <ThBtn><Button onClick={e => valueSort(priceSortDir, setPriceSortDir, 'price')} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>Price</Button></ThBtn>
                <ThBtn><Button onClick={e => valueSort(percentSortDir, setPercentSortDir, 'dailyChange')} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>1 Day</Button></ThBtn>
                <ThBtn><Button onClick={e => valueSort(weeklyPercentSortDir, setWeeklyPercentSortDir, 'weeklyChange')} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>1 Week</Button></ThBtn>
                <ThBtn><Button onClick={e => valueSort(monthlyPercentSortDir, setMonthlyPercentSortDir, 'monthlyChange')} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>1 Month</Button></ThBtn>
                <ThBtn><Button onClick={e => valueSort(sixMonthlyPercentSortDir, setSixMonthlyPercentSortDir, 'sixMonthlyChange')} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>6 Months</Button></ThBtn>
                <ThBtn><Button onClick={e => valueSort(yearlyPercentSortDir, setYearlyPercentSortDir, 'yearlyChange')} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>1 Year</Button></ThBtn>
              </tr>
            </thead>
            <tbody>{stockTable}</tbody>
          </Table>
        </Col>
        {loadingSign}
        <MFooter/>
    </>
  );
};

export default Home;
