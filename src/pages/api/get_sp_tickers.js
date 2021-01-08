import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import cheerio from "cheerio";
import fs from "fs"

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  let doc = {
    "AAPL": { "name": "Apple Inc.", "sector": "Technology" },
    "MSFT": { "name": "Microsoft Corporation", "sector": "Technology" },
    "AMZN": { "name": "Amazon.com Inc.", "sector": "Consumer Cyclical" },
    "FB": { "name": "Facebook Inc. Class A", "sector": "Communication Services" },
    "TSLA": { "name": "Tesla Inc", "sector": "Consumer Cyclical" },
    "GOOGL": {
      "name": "Alphabet Inc. Class A",
      "sector": "Communication Services"
    },
    "GOOG": {
      "name": "Alphabet Inc. Class C",
      "sector": "Communication Services"
    },
    "BRK.B": { "name": "Berkshire Hathaway Inc. Class B", "sector": "Unique" },
    "JNJ": { "name": "Johnson & Johnson", "sector": "Healthcare" },
    "JPM": { "name": "JPMorgan Chase & Co.", "sector": "Financial Services" },
    "V": { "name": "Visa Inc. Class A", "sector": "Financial Services" },
    "UNH": { "name": "UnitedHealth Group Incorporated", "sector": "Healthcare" },
    "PG": { "name": "Procter & Gamble Company", "sector": "Consumer Defensive" },
    "NVDA": { "name": "NVIDIA Corporation", "sector": "Technology" },
    "DIS": { "name": "Walt Disney Company", "sector": "Communication Services" },
    "MA": {
      "name": "Mastercard Incorporated Class A",
      "sector": "Financial Services"
    },
    "HD": { "name": "Home Depot Inc.", "sector": "Consumer Cyclical" },
    "PYPL": { "name": "PayPal Holdings Inc", "sector": "Financial Services" },
    "BAC": { "name": "Bank of America Corp", "sector": "Financial Services" },
    "VZ": {
      "name": "Verizon Communications Inc.",
      "sector": "Communication Services"
    },
    "CMCSA": {
      "name": "Comcast Corporation Class A",
      "sector": "Communication Services"
    },
    "ADBE": { "name": "Adobe Inc.", "sector": "Technology" },
    "NFLX": { "name": "Netflix Inc.", "sector": "Communication Services" },
    "INTC": { "name": "Intel Corporation", "sector": "Technology" },
    "T": { "name": "AT&T Inc.", "sector": "Communication Services" },
    "MRK": { "name": "Merck & Co. Inc.", "sector": "Healthcare" },
    "PFE": { "name": "Pfizer Inc.", "sector": "Healthcare" },
    "WMT": { "name": "Walmart Inc.", "sector": "Consumer Defensive" },
    "CRM": { "name": "salesforce.com inc.", "sector": "Technology" },
    "TMO": { "name": "Thermo Fisher Scientific Inc.", "sector": "Healthcare" },
    "ABT": { "name": "Abbott Laboratories", "sector": "Healthcare" },
    "PEP": { "name": "PepsiCo Inc.", "sector": "Consumer Defensive" },
    "KO": { "name": "Coca-Cola Company", "sector": "Consumer Defensive" },
    "XOM": { "name": "Exxon Mobil Corporation", "sector": "Energy" },
    "CSCO": { "name": "Cisco Systems Inc.", "sector": "Technology" },
    "ABBV": { "name": "AbbVie Inc.", "sector": "Healthcare" },
    "NKE": { "name": "NIKE Inc. Class B", "sector": "Consumer Cyclical" },
    "AVGO": { "name": "Broadcom Inc.", "sector": "Technology" },
    "QCOM": { "name": "Qualcomm Inc", "sector": "Technology" },
    "CVX": { "name": "Chevron Corporation", "sector": "Energy" },
    "ACN": { "name": "Accenture Plc Class A", "sector": "Technology" },
    "COST": {
      "name": "Costco Wholesale Corporation",
      "sector": "Consumer Defensive"
    },
    "MDT": { "name": "Medtronic Plc", "sector": "Healthcare" },
    "MCD": { "name": "McDonald's Corporation", "sector": "Consumer Cyclical" },
    "NEE": { "name": "NextEra Energy Inc.", "sector": "Utilities" },
    "TXN": { "name": "Texas Instruments Incorporated", "sector": "Technology" },
    "DHR": { "name": "Danaher Corporation", "sector": "Healthcare" },
    "HON": { "name": "Honeywell International Inc.", "sector": "Industrials" },
    "UNP": { "name": "Union Pacific Corporation", "sector": "Industrials" },
    "LIN": { "name": "Linde plc", "sector": "Basic Materials" },
    "BMY": { "name": "Bristol-Myers Squibb Company", "sector": "Healthcare" },
    "WFC": { "name": "Wells Fargo & Company", "sector": "Financial Services" },
    "C": { "name": "Citigroup Inc.", "sector": "Financial Services" },
    "AMGN": { "name": "Amgen Inc.", "sector": "Healthcare" },
    "LLY": { "name": "Eli Lilly and Company", "sector": "Healthcare" },
    "PM": {
      "name": "Philip Morris International Inc.",
      "sector": "Consumer Defensive"
    },
    "SBUX": { "name": "Starbucks Corporation", "sector": "Consumer Cyclical" },
    "LOW": { "name": "Lowe's Companies Inc.", "sector": "Consumer Cyclical" },
    "ORCL": { "name": "Oracle Corporation", "sector": "Technology" },
    "IBM": {
      "name": "International Business Machines Corporation",
      "sector": "Technology"
    },
    "AMD": { "name": "Advanced Micro Devices Inc.", "sector": "Technology" },
    "UPS": {
      "name": "United Parcel Service Inc. Class B",
      "sector": "Industrials"
    },
    "BA": { "name": "Boeing Company", "sector": "Industrials" },
    "MS": { "name": "Morgan Stanley", "sector": "Financial Services" },
    "BLK": { "name": "BlackRock Inc.", "sector": "Financial Services" },
    "RTX": {
      "name": "Raytheon Technologies Corporation",
      "sector": "Industrials"
    },
    "CAT": { "name": "Caterpillar Inc.", "sector": "Industrials" },
    "GS": { "name": "Goldman Sachs Group Inc.", "sector": "Financial Services" },
    "NOW": { "name": "ServiceNow Inc.", "sector": "Technology" },
    "GE": { "name": "General Electric Company", "sector": "Industrials" },
    "MMM": { "name": "3M Company", "sector": "Industrials" },
    "INTU": { "name": "Intuit Inc.", "sector": "Technology" },
    "CVS": { "name": "CVS Health Corporation", "sector": "Healthcare" },
    "AMT": { "name": "American Tower Corporation", "sector": "Real Estate" },
    "TGT": { "name": "Target Corporation", "sector": "Consumer Defensive" },
    "ISRG": { "name": "Intuitive Surgical Inc.", "sector": "Healthcare" },
    "DE": { "name": "Deere & Company", "sector": "Industrials" },
    "CHTR": {
      "name": "Charter Communications Inc. Class A",
      "sector": "Communication Services"
    },
    "BKNG": { "name": "Booking Holdings Inc.", "sector": "Consumer Cyclical" },
    "SCHW": {
      "name": "Charles Schwab Corporation",
      "sector": "Financial Services"
    },
    "MU": { "name": "Micron Technology Inc.", "sector": "Technology" },
    "AMAT": { "name": "Applied Materials Inc.", "sector": "Technology" },
    "LMT": { "name": "Lockheed Martin Corporation", "sector": "Industrials" },
    "FIS": {
      "name": "Fidelity National Information Services Inc.",
      "sector": "Technology"
    },
    "TJX": { "name": "TJX Companies Inc", "sector": "Consumer Cyclical" },
    "ANTM": { "name": "Anthem Inc.", "sector": "Healthcare" },
    "MDLZ": {
      "name": "Mondelez International Inc. Class A",
      "sector": "Consumer Defensive"
    },
    "SYK": { "name": "Stryker Corporation", "sector": "Healthcare" },
    "CI": { "name": "Cigna Corporation", "sector": "Healthcare" },
    "ZTS": { "name": "Zoetis Inc. Class A", "sector": "Healthcare" },
    "AXP": { "name": "American Express Company", "sector": "Financial Services" },
    "SPGI": { "name": "S&P Global Inc.", "sector": "Financial Services" },
    "GILD": { "name": "Gilead Sciences Inc.", "sector": "Healthcare" },
    "TMUS": { "name": "T-Mobile US Inc.", "sector": "Communication Services" },
    "MO": { "name": "Altria Group Inc", "sector": "Consumer Defensive" },
    "LRCX": { "name": "Lam Research Corporation", "sector": "Technology" },
    "BDX": { "name": "Becton Dickinson and Company", "sector": "Healthcare" },
    "ADP": { "name": "Automatic Data Processing Inc.", "sector": "Industrials" },
    "CSX": { "name": "CSX Corporation", "sector": "Industrials" },
    "CME": { "name": "CME Group Inc. Class A", "sector": "Financial Services" },
    "PLD": { "name": "Prologis Inc.", "sector": "Real Estate" },
    "CB": { "name": "Chubb Limited", "sector": "Financial Services" },
    "CL": { "name": "Colgate-Palmolive Company", "sector": "Consumer Defensive" },
    "TFC": {
      "name": "Truist Financial Corporation",
      "sector": "Financial Services"
    },
    "ADSK": { "name": "Autodesk Inc.", "sector": "Technology" },
    "ATVI": {
      "name": "Activision Blizzard Inc.",
      "sector": "Communication Services"
    },
    "USB": { "name": "U.S. Bancorp", "sector": "Financial Services" },
    "PNC": {
      "name": "PNC Financial Services Group Inc.",
      "sector": "Financial Services"
    },
    "DUK": { "name": "Duke Energy Corporation", "sector": "Utilities" },
    "FISV": { "name": "Fiserv Inc.", "sector": "Technology" },
    "CCI": { "name": "Crown Castle International Corp", "sector": "Real Estate" },
    "ICE": {
      "name": "Intercontinental Exchange Inc.",
      "sector": "Financial Services"
    },
    "SO": { "name": "Southern Company", "sector": "Utilities" },
    "NSC": { "name": "Norfolk Southern Corporation", "sector": "Industrials" },
    "APD": {
      "name": "Air Products and Chemicals Inc.",
      "sector": "Basic Materials"
    },
    "GPN": { "name": "Global Payments Inc.", "sector": "Industrials" },
    "VRTX": {
      "name": "Vertex Pharmaceuticals Incorporated",
      "sector": "Healthcare"
    },
    "EQIX": { "name": "Equinix Inc.", "sector": "Real Estate" },
    "ITW": { "name": "Illinois Tool Works Inc.", "sector": "Industrials" },
    "SHW": { "name": "Sherwin-Williams Company", "sector": "Basic Materials" },
    "D": { "name": "Dominion Energy Inc", "sector": "Utilities" },
    "FDX": { "name": "FedEx Corporation", "sector": "Industrials" },
    "DD": { "name": "DuPont de Nemours Inc.", "sector": "Basic Materials" },
    "HUM": { "name": "Humana Inc.", "sector": "Healthcare" },
    "EL": {
      "name": "Estee Lauder Companies Inc. Class A",
      "sector": "Consumer Defensive"
    },
    "ADI": { "name": "Analog Devices Inc.", "sector": "Technology" },
    "MMC": {
      "name": "Marsh & McLennan Companies Inc.",
      "sector": "Financial Services"
    },
    "ECL": { "name": "Ecolab Inc.", "sector": "Basic Materials" },
    "ILMN": { "name": "Illumina Inc.", "sector": "Healthcare" },
    "EW": { "name": "Edwards Lifesciences Corporation", "sector": "Healthcare" },
    "PGR": { "name": "Progressive Corporation", "sector": "Financial Services" },
    "GM": { "name": "General Motors Company", "sector": "Consumer Cyclical" },
    "DG": {
      "name": "Dollar General Corporation",
      "sector": "Consumer Defensive"
    },
    "BSX": { "name": "Boston Scientific Corporation", "sector": "Unique" },
    "NEM": { "name": "Newmont Corporation", "sector": "Basic Materials" },
    "ETN": { "name": "Eaton Corp. Plc", "sector": "Industrials" },
    "COF": {
      "name": "Capital One Financial Corporation",
      "sector": "Financial Services"
    },
    "REGN": { "name": "Regeneron Pharmaceuticals Inc.", "sector": "Healthcare" },
    "EMR": { "name": "Emerson Electric Co.", "sector": "Industrials" },
    "COP": { "name": "ConocoPhillips", "sector": "Energy" },
    "AON": { "name": "Aon Plc Class A", "sector": "Financial Services" },
    "WM": { "name": "Waste Management Inc.", "sector": "Industrials" },
    "HCA": { "name": "HCA Healthcare Inc", "sector": "Healthcare" },
    "MCO": { "name": "Moody's Corporation", "sector": "Financial Services" },
    "NOC": { "name": "Northrop Grumman Corporation", "sector": "Industrials" },
    "FCX": { "name": "Freeport-McMoRan Inc.", "sector": "Basic Materials" },
    "ROP": { "name": "Roper Technologies Inc.", "sector": "Industrials" },
    "KMB": {
      "name": "Kimberly-Clark Corporation",
      "sector": "Consumer Defensive"
    },
    "ROST": { "name": "Ross Stores Inc.", "sector": "Consumer Cyclical" },
    "DOW": { "name": "Dow Inc.", "sector": "Basic Materials" },
    "CTSH": {
      "name": "Cognizant Technology Solutions Corporation Class A",
      "sector": "Technology"
    },
    "KLAC": { "name": "KLA Corporation", "sector": "Technology" },
    "TEL": { "name": "TE Connectivity Ltd.", "sector": "Technology" },
    "IDXX": { "name": "IDEXX Laboratories Inc.", "sector": "Healthcare" },
    "BAX": { "name": "Baxter International Inc.", "sector": "Healthcare" },
    "TWTR": { "name": "Twitter Inc.", "sector": "Communication Services" },
    "EXC": { "name": "Exelon Corporation", "sector": "Utilities" },
    "EA": { "name": "Electronic Arts Inc.", "sector": "Communication Services" },
    "APH": { "name": "Amphenol Corporation Class A", "sector": "Technology" },
    "CNC": { "name": "Centene Corporation", "sector": "Healthcare" },
    "ALGN": { "name": "Align Technology Inc.", "sector": "Healthcare" },
    "AEP": {
      "name": "American Electric Power Company Inc.",
      "sector": "Utilities"
    },
    "SNPS": { "name": "Synopsys Inc.", "sector": "Technology" },
    "APTV": { "name": "Aptiv PLC", "sector": "Consumer Cyclical" },
    "STZ": {
      "name": "Constellation Brands Inc. Class A",
      "sector": "Consumer Defensive"
    },
    "MCHP": {
      "name": "Microchip Technology Incorporated",
      "sector": "Technology"
    },
    "A": { "name": "Agilent Technologies Inc.", "sector": "Healthcare" },
    "BIIB": { "name": "Biogen Inc.", "sector": "Healthcare" },
    "SYY": { "name": "Sysco Corporation", "sector": "Consumer Defensive" },
    "CMG": {
      "name": "Chipotle Mexican Grill Inc.",
      "sector": "Consumer Cyclical"
    },
    "CDNS": { "name": "Cadence Design Systems Inc.", "sector": "Technology" },
    "LHX": { "name": "L3Harris Technologies Inc", "sector": "Industrials" },
    "MET": { "name": "MetLife Inc.", "sector": "Financial Services" },
    "DLR": { "name": "Digital Realty Trust Inc.", "sector": "Real Estate" },
    "DXCM": { "name": "DexCom Inc.", "sector": "Healthcare" },
    "JCI": {
      "name": "Johnson Controls International plc",
      "sector": "Industrials"
    },
    "TT": { "name": "Trane Technologies plc", "sector": "Industrials" },
    "BK": {
      "name": "Bank of New York Mellon Corporation",
      "sector": "Financial Services"
    },
    "MSCI": { "name": "MSCI Inc. Class A", "sector": "Financial Services" },
    "XLNX": { "name": "Xilinx Inc.", "sector": "Technology" },
    "PH": { "name": "Parker-Hannifin Corporation", "sector": "Industrials" },
    "IQV": { "name": "IQVIA Holdings Inc", "sector": "Healthcare" },
    "PPG": { "name": "PPG Industries Inc.", "sector": "Basic Materials" },
    "GIS": { "name": "General Mills Inc.", "sector": "Consumer Defensive" },
    "CMI": { "name": "Cummins Inc.", "sector": "Industrials" },
    "F": { "name": "Ford Motor Company", "sector": "Consumer Cyclical" },
    "HPQ": { "name": "HP Inc.", "sector": "Technology" },
    "GD": { "name": "General Dynamics Corporation", "sector": "Unique" },
    "TRV": { "name": "Travelers Companies Inc.", "sector": "Financial Services" },
    "AIG": {
      "name": "American International Group Inc.",
      "sector": "Financial Services"
    },
    "TROW": { "name": "T. Rowe Price Group", "sector": "Financial Services" },
    "EBAY": { "name": "eBay Inc.", "sector": "Consumer Cyclical" },
    "MAR": {
      "name": "Marriott International Inc. Class A",
      "sector": "Consumer Cyclical"
    },
    "SLB": { "name": "Schlumberger NV", "sector": "Energy" },
    "SRE": { "name": "Sempra Energy", "sector": "Utilities" },
    "MNST": {
      "name": "Monster Beverage Corporation",
      "sector": "Consumer Defensive"
    },
    "XEL": { "name": "Xcel Energy Inc.", "sector": "Utilities" },
    "EOG": { "name": "EOG Resources Inc.", "sector": "Energy" },
    "ALXN": { "name": "Alexion Pharmaceuticals Inc.", "sector": "Healthcare" },
    "ORLY": { "name": "O'Reilly Automotive Inc.", "sector": "Consumer Cyclical" },
    "INFO": { "name": "IHS Markit Ltd.", "sector": "Industrials" },
    "CARR": { "name": "Carrier Global Corp.", "sector": "Industrials" },
    "ALL": { "name": "Allstate Corporation", "sector": "Financial Services" },
    "PSA": { "name": "Public Storage", "sector": "Real Estate" },
    "ZBH": { "name": "Zimmer Biomet Holdings Inc.", "sector": "Healthcare" },
    "TDG": { "name": "TransDigm Group Incorporated", "sector": "Industrials" },
    "VRSK": { "name": "Verisk Analytics Inc", "sector": "Industrials" },
    "WBA": { "name": "Walgreens Boots Alliance Inc", "sector": "Healthcare" },
    "PRU": {
      "name": "Prudential Financial Inc.",
      "sector": "Financial Services"
    },
    "YUM": { "name": "Yum! Brands Inc.", "sector": "Consumer Cyclical" },
    "HLT": {
      "name": "Hilton Worldwide Holdings Inc",
      "sector": "Consumer Cyclical"
    },
    "PSX": { "name": "Phillips 66", "sector": "Energy" },
    "ANSS": { "name": "ANSYS Inc.", "sector": "Technology" },
    "CTAS": { "name": "Cintas Corporation", "sector": "Industrials" },
    "RMD": { "name": "ResMed Inc.", "sector": "Healthcare" },
    "CTVA": { "name": "Corteva Inc", "sector": "Basic Materials" },
    "PCAR": { "name": "PACCAR Inc", "sector": "Industrials" },
    "ES": { "name": "Eversource Energy", "sector": "Utilities" },
    "ROK": { "name": "Rockwell Automation Inc.", "sector": "Industrials" },
    "DFS": {
      "name": "Discover Financial Services",
      "sector": "Financial Services"
    },
    "BLL": { "name": "Ball Corporation", "sector": "Consumer Cyclical" },
    "SBAC": {
      "name": "SBA Communications Corp. Class A",
      "sector": "Real Estate"
    },
    "MCK": { "name": "McKesson Corporation", "sector": "Healthcare" },
    "PAYX": { "name": "Paychex Inc.", "sector": "Industrials" },
    "AFL": { "name": "Aflac Incorporated", "sector": "Financial Services" },
    "ADM": {
      "name": "Archer-Daniels-Midland Company",
      "sector": "Consumer Defensive"
    },
    "MTD": {
      "name": "Mettler-Toledo International Inc.",
      "sector": "Healthcare"
    },
    "MSI": { "name": "Motorola Solutions Inc.", "sector": "Technology" },
    "AZO": { "name": "AutoZone Inc.", "sector": "Consumer Cyclical" },
    "MPC": { "name": "Marathon Petroleum Corporation", "sector": "Energy" },
    "AME": { "name": "AMETEK Inc.", "sector": "Industrials" },
    "FAST": { "name": "Fastenal Company", "sector": "Industrials" },
    "SWK": { "name": "Stanley Black & Decker Inc.", "sector": "Industrials" },
    "KMI": { "name": "Kinder Morgan Inc Class P", "sector": "Energy" },
    "PEG": {
      "name": "Public Service Enterprise Group Inc",
      "sector": "Utilities"
    },
    "GLW": { "name": "Corning Inc", "sector": "Technology" },
    "VFC": { "name": "V.F. Corporation", "sector": "Consumer Cyclical" },
    "LUV": { "name": "Southwest Airlines Co.", "sector": "Industrials" },
    "SPG": { "name": "Simon Property Group Inc.", "sector": "Real Estate" },
    "FRC": { "name": "First Republic Bank", "sector": "Financial Services" },
    "WEC": { "name": "WEC Energy Group Inc", "sector": "Utilities" },
    "OTIS": { "name": "Otis Worldwide Corporation", "sector": "Industrials" },
    "AWK": { "name": "American Water Works Company Inc.", "sector": "Utilities" },
    "STT": { "name": "State Street Corporation", "sector": "Financial Services" },
    "SWKS": { "name": "Skyworks Solutions Inc.", "sector": "Technology" },
    "DLTR": { "name": "Dollar Tree Inc.", "sector": "Consumer Defensive" },
    "ENPH": { "name": "Enphase Energy Inc.", "sector": "Technology" },
    "WLTW": {
      "name": "Willis Towers Watson Public Limited Company",
      "sector": "Financial Services"
    },
    "WELL": { "name": "Welltower Inc.", "sector": "Real Estate" },
    "WMB": { "name": "Williams Companies Inc.", "sector": "Energy" },
    "KEYS": { "name": "Keysight Technologies Inc", "sector": "Technology" },
    "DAL": { "name": "Delta Air Lines Inc.", "sector": "Industrials" },
    "CPRT": { "name": "Copart Inc.", "sector": "Industrials" },
    "MXIM": { "name": "Maxim Integrated Products Inc.", "sector": "Technology" },
    "WY": { "name": "Weyerhaeuser Company", "sector": "Real Estate" },
    "LYB": {
      "name": "LyondellBasell Industries NV",
      "sector": "Basic Materials"
    },
    "BBY": { "name": "Best Buy Co. Inc.", "sector": "Consumer Cyclical" },
    "CLX": { "name": "Clorox Company", "sector": "Consumer Defensive" },
    "KR": { "name": "Kroger Co.", "sector": "Consumer Defensive" },
    "FTV": { "name": "Fortive Corp.", "sector": "Technology" },
    "CERN": { "name": "Cerner Corporation", "sector": "Healthcare" },
    "VLO": { "name": "Valero Energy Corporation", "sector": "Energy" },
    "TTWO": {
      "name": "Take-Two Interactive Software Inc.",
      "sector": "Communication Services"
    },
    "ED": { "name": "Consolidated Edison Inc.", "sector": "Utilities" },
    "AMP": {
      "name": "Ameriprise Financial Inc.",
      "sector": "Financial Services"
    },
    "MKC": {
      "name": "McCormick & Company Incorporated",
      "sector": "Consumer Defensive"
    },
    "AJG": {
      "name": "Arthur J. Gallagher & Co.",
      "sector": "Financial Services"
    },
    "EIX": { "name": "Edison International", "sector": "Utilities" },
    "FLT": { "name": "FLEETCOR Technologies Inc.", "sector": "Technology" },
    "DTE": { "name": "DTE Energy Company", "sector": "Utilities" },
    "DHI": { "name": "D.R. Horton Inc.", "sector": "Consumer Cyclical" },
    "VIAC": {
      "name": "ViacomCBS Inc. Class B",
      "sector": "Communication Services"
    },
    "WST": {
      "name": "West Pharmaceutical Services Inc.",
      "sector": "Healthcare"
    },
    "FITB": { "name": "Fifth Third Bancorp", "sector": "Financial Services" },
    "VTRS": { "name": "Viatris Inc.", "sector": "Healthcare" },
    "SIVB": { "name": "SVB Financial Group", "sector": "Financial Services" },
    "HSY": { "name": "Hershey Company", "sector": "Consumer Defensive" },
    "EFX": { "name": "Equifax Inc.", "sector": "Industrials" },
    "AVB": { "name": "AvalonBay Communities Inc.", "sector": "Real Estate" },
    "KHC": { "name": "Kraft Heinz Company", "sector": "Consumer Defensive" },
    "ZBRA": {
      "name": "Zebra Technologies Corporation Class A",
      "sector": "Technology"
    },
    "PXD": { "name": "Pioneer Natural Resources Company", "sector": "Energy" },
    "TER": { "name": "Teradyne Inc.", "sector": "Technology" },
    "VMC": { "name": "Vulcan Materials Company", "sector": "Basic Materials" },
    "PPL": { "name": "PPL Corporation", "sector": "Utilities" },
    "LH": {
      "name": "Laboratory Corporation of America Holdings",
      "sector": "Healthcare"
    },
    "PAYC": { "name": "Paycom Software Inc.", "sector": "Technology" },
    "ETSY": { "name": "Etsy Inc.", "sector": "Consumer Cyclical" },
    "CHD": { "name": "Church & Dwight Co. Inc.", "sector": "Consumer Defensive" },
    "MKTX": {
      "name": "MarketAxess Holdings Inc.",
      "sector": "Financial Services"
    },
    "LEN": {
      "name": "Lennar Corporation Class A",
      "sector": "Consumer Cyclical"
    },
    "O": { "name": "Realty Income Corporation", "sector": "Real Estate" },
    "CBRE": { "name": "CBRE Group Inc. Class A", "sector": "Real Estate" },
    "IP": {
      "name": "International Paper Company",
      "sector": "Consumer Cyclical"
    },
    "QRVO": { "name": "Qorvo Inc.", "sector": "Technology" },
    "RSG": { "name": "Republic Services Inc.", "sector": "Industrials" },
    "NTRS": {
      "name": "Northern Trust Corporation",
      "sector": "Financial Services"
    },
    "KSU": { "name": "Kansas City Southern", "sector": "Industrials" },
    "ARE": {
      "name": "Alexandria Real Estate Equities Inc.",
      "sector": "Real Estate"
    },
    "VRSN": { "name": "VeriSign Inc.", "sector": "Unique" },
    "HOLX": { "name": "Hologic Inc.", "sector": "Healthcare" },
    "SYF": { "name": "Synchrony Financial", "sector": "Financial Services" },
    "EQR": { "name": "Equity Residential", "sector": "Real Estate" },
    "ALB": { "name": "Albemarle Corporation", "sector": "Basic Materials" },
    "XYL": { "name": "Xylem Inc.", "sector": "Industrials" },
    "ODFL": { "name": "Old Dominion Freight Line Inc.", "sector": "Industrials" },
    "EXPE": { "name": "Expedia Group Inc.", "sector": "Consumer Cyclical" },
    "FTNT": { "name": "Fortinet Inc.", "sector": "Technology" },
    "MLM": {
      "name": "Martin Marietta Materials Inc.",
      "sector": "Basic Materials"
    },
    "URI": { "name": "United Rentals Inc.", "sector": "Industrials" },
    "LVS": { "name": "Las Vegas Sands Corp.", "sector": "Consumer Cyclical" },
    "TSN": { "name": "Tyson Foods Inc. Class A", "sector": "Consumer Defensive" },
    "ETR": { "name": "Entergy Corporation", "sector": "Utilities" },
    "MTB": { "name": "M&T Bank Corporation", "sector": "Financial Services" },
    "CDW": { "name": "CDW Corp.", "sector": "Technology" },
    "TFX": { "name": "Teleflex Incorporated", "sector": "Healthcare" },
    "DOV": { "name": "Dover Corporation", "sector": "Industrials" },
    "AEE": { "name": "Ameren Corporation", "sector": "Utilities" },
    "AMCR": { "name": "Amcor PLC", "sector": "Consumer Cyclical" },
    "GRMN": { "name": "Garmin Ltd.", "sector": "Technology" },
    "OKE": { "name": "ONEOK Inc.", "sector": "Energy" },
    "HIG": {
      "name": "Hartford Financial Services Group Inc.",
      "sector": "Financial Services"
    },
    "KEY": { "name": "KeyCorp", "sector": "Financial Services" },
    "GWW": { "name": "W.W. Grainger Inc.", "sector": "Industrials" },
    "BR": {
      "name": "Broadridge Financial Solutions Inc.",
      "sector": "Technology"
    },
    "HAL": { "name": "Halliburton Company", "sector": "Energy" },
    "PKI": { "name": "PerkinElmer Inc.", "sector": "Healthcare" },
    "COO": { "name": "Cooper Companies Inc.", "sector": "Healthcare" },
    "CTLT": { "name": "Catalent Inc", "sector": "Healthcare" },
    "VTR": { "name": "Ventas Inc.", "sector": "Real Estate" },
    "TYL": { "name": "Tyler Technologies Inc.", "sector": "Technology" },
    "IR": { "name": "Ingersoll Rand Inc.", "sector": "Industrials" },
    "OXY": { "name": "Occidental Petroleum Corporation", "sector": "Energy" },
    "CFG": {
      "name": "Citizens Financial Group Inc.",
      "sector": "Financial Services"
    },
    "TSCO": { "name": "Tractor Supply Company", "sector": "Consumer Cyclical" },
    "STE": { "name": "STERIS Plc", "sector": "Healthcare" },
    "NUE": { "name": "Nucor Corporation", "sector": "Basic Materials" },
    "RF": {
      "name": "Regions Financial Corporation",
      "sector": "Financial Services"
    },
    "INCY": { "name": "Incyte Corporation", "sector": "Healthcare" },
    "AKAM": { "name": "Akamai Technologies Inc.", "sector": "Technology" },
    "HES": { "name": "Hess Corporation", "sector": "Energy" },
    "DGX": { "name": "Quest Diagnostics Incorporated", "sector": "Healthcare" },
    "WDC": { "name": "Western Digital Corporation", "sector": "Technology" },
    "CMS": { "name": "CMS Energy Corporation", "sector": "Utilities" },
    "CAH": { "name": "Cardinal Health Inc.", "sector": "Healthcare" },
    "CAG": { "name": "Conagra Brands Inc.", "sector": "Consumer Defensive" },
    "ULTA": { "name": "Ulta Beauty Inc", "sector": "Consumer Cyclical" },
    "KMX": { "name": "CarMax Inc.", "sector": "Consumer Cyclical" },
    "AES": { "name": "AES Corporation", "sector": "Utilities" },
    "CE": { "name": "Celanese Corporation", "sector": "Basic Materials" },
    "ABC": { "name": "AmerisourceBergen Corporation", "sector": "Healthcare" },
    "WAT": { "name": "Waters Corporation", "sector": "Healthcare" },
    "DRI": { "name": "Darden Restaurants Inc.", "sector": "Consumer Cyclical" },
    "ANET": { "name": "Arista Networks Inc.", "sector": "Technology" },
    "FE": { "name": "FirstEnergy Corp.", "sector": "Utilities" },
    "VAR": { "name": "Varian Medical Systems Inc.", "sector": "Healthcare" },
    "EXPD": {
      "name": "Expeditors International of Washington Inc.",
      "sector": "Industrials"
    },
    "CTXS": { "name": "Citrix Systems Inc.", "sector": "Technology" },
    "FMC": { "name": "FMC Corporation", "sector": "Basic Materials" },
    "IEX": { "name": "IDEX Corporation", "sector": "Industrials" },
    "NDAQ": { "name": "Nasdaq Inc.", "sector": "Financial Services" },
    "POOL": { "name": "Pool Corporation", "sector": "Consumer Cyclical" },
    "K": { "name": "Kellogg Company", "sector": "Consumer Defensive" },
    "CCL": { "name": "Carnival Corporation", "sector": "Consumer Cyclical" },
    "HPE": { "name": "Hewlett Packard Enterprise Co.", "sector": "Technology" },
    "PEAK": { "name": "Healthpeak Properties Inc.", "sector": "Real Estate" },
    "BKR": { "name": "Baker Hughes Company Class A", "sector": "Energy" },
    "DPZ": { "name": "Domino's Pizza Inc.", "sector": "Consumer Cyclical" },
    "ESS": { "name": "Essex Property Trust Inc.", "sector": "Real Estate" },
    "GPC": { "name": "Genuine Parts Company", "sector": "Consumer Cyclical" },
    "J": { "name": "Jacobs Engineering Group Inc.", "sector": "Industrials" },
    "IT": { "name": "Gartner Inc.", "sector": "Technology" },
    "HBAN": {
      "name": "Huntington Bancshares Incorporated",
      "sector": "Financial Services"
    },
    "WAB": {
      "name": "Westinghouse Air Brake Technologies Corporation",
      "sector": "Industrials"
    },
    "ABMD": { "name": "ABIOMED Inc.", "sector": "Healthcare" },
    "EMN": { "name": "Eastman Chemical Company", "sector": "Basic Materials" },
    "NTAP": { "name": "NetApp Inc.", "sector": "Technology" },
    "MAS": { "name": "Masco Corporation", "sector": "Industrials" },
    "DRE": { "name": "Duke Realty Corporation", "sector": "Real Estate" },
    "MAA": {
      "name": "Mid-America Apartment Communities Inc.",
      "sector": "Real Estate"
    },
    "BF.B": { "name": "Brown-Forman Corporation Class B", "sector": "Unique" },
    "EXR": { "name": "Extra Space Storage Inc.", "sector": "Real Estate" },
    "NVR": { "name": "NVR Inc.", "sector": "Consumer Cyclical" },
    "LDOS": { "name": "Leidos Holdings Inc.", "sector": "Technology" },
    "OMC": { "name": "Omnicom Group Inc", "sector": "Communication Services" },
    "PKG": {
      "name": "Packaging Corporation of America",
      "sector": "Consumer Cyclical"
    },
    "RCL": { "name": "Royal Caribbean Group", "sector": "Consumer Cyclical" },
    "AVY": { "name": "Avery Dennison Corporation", "sector": "Industrials" },
    "BIO": {
      "name": "Bio-Rad Laboratories Inc. Class A",
      "sector": "Healthcare"
    },
    "STX": { "name": "Seagate Technology PLC", "sector": "Technology" },
    "SJM": { "name": "J.M. Smucker Company", "sector": "Consumer Defensive" },
    "PFG": {
      "name": "Principal Financial Group Inc.",
      "sector": "Financial Services"
    },
    "TDY": {
      "name": "Teledyne Technologies Incorporated",
      "sector": "Technology"
    },
    "CINF": {
      "name": "Cincinnati Financial Corporation",
      "sector": "Financial Services"
    },
    "CHRW": { "name": "C.H. Robinson Worldwide Inc.", "sector": "Industrials" },
    "HRL": { "name": "Hormel Foods Corporation", "sector": "Consumer Defensive" },
    "CXO": { "name": "Concho Resources Inc.", "sector": "Energy" },
    "BXP": { "name": "Boston Properties Inc.", "sector": "Real Estate" },
    "UAL": { "name": "United Airlines Holdings Inc.", "sector": "Industrials" },
    "IFF": {
      "name": "International Flavors & Fragrances Inc.",
      "sector": "Basic Materials"
    },
    "XRAY": { "name": "DENTSPLY SIRONA Inc.", "sector": "Healthcare" },
    "JKHY": { "name": "Jack Henry & Associates Inc.", "sector": "Technology" },
    "MGM": { "name": "MGM Resorts International", "sector": "Consumer Cyclical" },
    "NLOK": { "name": "NortonLifeLock Inc.", "sector": "Technology" },
    "JBHT": {
      "name": "J.B. Hunt Transport Services Inc.",
      "sector": "Industrials"
    },
    "RJF": {
      "name": "Raymond James Financial Inc.",
      "sector": "Financial Services"
    },
    "FBHS": {
      "name": "Fortune Brands Home & Security Inc.",
      "sector": "Consumer Cyclical"
    },
    "LNT": { "name": "Alliant Energy Corp", "sector": "Utilities" },
    "HAS": { "name": "Hasbro Inc.", "sector": "Consumer Cyclical" },
    "EVRG": { "name": "Evergy Inc.", "sector": "Utilities" },
    "WRK": { "name": "WestRock Company", "sector": "Consumer Cyclical" },
    "WHR": { "name": "Whirlpool Corporation", "sector": "Consumer Cyclical" },
    "PHM": { "name": "PulteGroup Inc.", "sector": "Consumer Cyclical" },
    "AAP": { "name": "Advance Auto Parts Inc.", "sector": "Consumer Cyclical" },
    "CNP": { "name": "CenterPoint Energy Inc.", "sector": "Utilities" },
    "ATO": { "name": "Atmos Energy Corporation", "sector": "Utilities" },
    "TXT": { "name": "Textron Inc.", "sector": "Industrials" },
    "FFIV": { "name": "F5 Networks Inc.", "sector": "Technology" },
    "LW": { "name": "Lamb Weston Holdings Inc.", "sector": "Consumer Defensive" },
    "ALLE": { "name": "Allegion PLC", "sector": "Industrials" },
    "UHS": {
      "name": "Universal Health Services Inc. Class B",
      "sector": "Healthcare"
    },
    "UDR": { "name": "UDR Inc.", "sector": "Real Estate" },
    "DVN": { "name": "Devon Energy Corporation", "sector": "Energy" },
    "L": { "name": "Loews Corporation", "sector": "Financial Services" },
    "HWM": { "name": "Howmet Aerospace Inc.", "sector": "Industrials" },
    "LB": { "name": "L Brands Inc.", "sector": "Consumer Cyclical" },
    "LKQ": { "name": "LKQ Corporation", "sector": "Consumer Cyclical" },
    "WYNN": { "name": "Wynn Resorts Limited", "sector": "Consumer Cyclical" },
    "PWR": { "name": "Quanta Services Inc.", "sector": "Industrials" },
    "CBOE": { "name": "Cboe Global Markets Inc", "sector": "Financial Services" },
    "FOXA": {
      "name": "Fox Corporation Class A",
      "sector": "Communication Services"
    },
    "LYV": {
      "name": "Live Nation Entertainment Inc.",
      "sector": "Communication Services"
    },
    "LUMN": {
      "name": "Lumen Technologies Inc.",
      "sector": "Communication Services"
    },
    "HST": { "name": "Host Hotels & Resorts Inc.", "sector": "Real Estate" },
    "BWA": { "name": "BorgWarner Inc.", "sector": "Consumer Cyclical" },
    "HSIC": { "name": "Henry Schein Inc.", "sector": "Healthcare" },
    "TPR": { "name": "Tapestry Inc.", "sector": "Consumer Cyclical" },
    "RE": { "name": "Everest Re Group Ltd.", "sector": "Financial Services" },
    "CPB": { "name": "Campbell Soup Company", "sector": "Consumer Defensive" },
    "LNC": {
      "name": "Lincoln National Corporation",
      "sector": "Financial Services"
    },
    "IPG": {
      "name": "Interpublic Group of Companies Inc.",
      "sector": "Communication Services"
    },
    "SNA": { "name": "Snap-on Incorporated", "sector": "Industrials" },
    "WU": { "name": "Western Union Company", "sector": "Financial Services" },
    "AAL": { "name": "American Airlines Group Inc.", "sector": "Industrials" },
    "GL": { "name": "Globe Life Inc.", "sector": "Financial Services" },
    "WRB": {
      "name": "W. R. Berkley Corporation",
      "sector": "Financial Services"
    },
    "MOS": { "name": "Mosaic Company", "sector": "Basic Materials" },
    "TAP": {
      "name": "Molson Coors Beverage Company Class B",
      "sector": "Consumer Defensive"
    },
    "PNR": { "name": "Pentair plc", "sector": "Industrials" },
    "CF": { "name": "CF Industries Holdings Inc.", "sector": "Basic Materials" },
    "NRG": { "name": "NRG Energy Inc.", "sector": "Utilities" },
    "DVA": { "name": "DaVita Inc.", "sector": "Healthcare" },
    "FANG": { "name": "Diamondback Energy Inc.", "sector": "Energy" },
    "ROL": { "name": "Rollins Inc.", "sector": "Consumer Cyclical" },
    "DISCK": {
      "name": "Discovery Inc. Class C",
      "sector": "Communication Services"
    },
    "PNW": { "name": "Pinnacle West Capital Corporation", "sector": "Utilities" },
    "CMA": { "name": "Comerica Incorporated", "sector": "Financial Services" },
    "MHK": { "name": "Mohawk Industries Inc.", "sector": "Consumer Cyclical" },
    "NWL": { "name": "Newell Brands Inc", "sector": "Consumer Defensive" },
    "NI": { "name": "NiSource Inc", "sector": "Utilities" },
    "IPGP": { "name": "IPG Photonics Corporation", "sector": "Technology" },
    "AIZ": { "name": "Assurant Inc.", "sector": "Financial Services" },
    "IRM": { "name": "Iron Mountain Inc.", "sector": "Real Estate" },
    "ZION": {
      "name": "Zions Bancorporation N.A.",
      "sector": "Financial Services"
    },
    "DISH": {
      "name": "DISH Network Corporation Class A",
      "sector": "Communication Services"
    },
    "JNPR": { "name": "Juniper Networks Inc.", "sector": "Technology" },
    "NCLH": {
      "name": "Norwegian Cruise Line Holdings Ltd.",
      "sector": "Consumer Cyclical"
    },
    "AOS": { "name": "A. O. Smith Corporation", "sector": "Industrials" },
    "PVH": { "name": "PVH Corp.", "sector": "Consumer Cyclical" },
    "NLSN": { "name": "Nielsen Holdings Plc", "sector": "Industrials" },
    "RHI": { "name": "Robert Half International Inc.", "sector": "Industrials" },
    "DXC": { "name": "DXC Technology Co.", "sector": "Technology" },
    "SEE": { "name": "Sealed Air Corporation", "sector": "Consumer Cyclical" },
    "NWSA": {
      "name": "News Corporation Class A",
      "sector": "Communication Services"
    },
    "REG": { "name": "Regency Centers Corporation", "sector": "Real Estate" },
    "COG": { "name": "Cabot Oil & Gas Corporation", "sector": "Energy" },
    "BEN": { "name": "Franklin Resources Inc.", "sector": "Financial Services" },
    "IVZ": { "name": "Invesco Ltd.", "sector": "Financial Services" },
    "HII": {
      "name": "Huntington Ingalls Industries Inc.",
      "sector": "Industrials"
    },
    "FLIR": { "name": "FLIR Systems Inc.", "sector": "Technology" },
    "KIM": { "name": "Kimco Realty Corporation", "sector": "Real Estate" },
    "APA": { "name": "Apache Corporation", "sector": "Energy" },
    "ALK": { "name": "Alaska Air Group Inc.", "sector": "Industrials" },
    "PRGO": { "name": "Perrigo Co. Plc", "sector": "Healthcare" },
    "MRO": { "name": "Marathon Oil Corporation", "sector": "Energy" },
    "PBCT": {
      "name": "People's United Financial Inc.",
      "sector": "Financial Services"
    },
    "LEG": {
      "name": "Leggett & Platt Incorporated",
      "sector": "Consumer Cyclical"
    },
    "NOV": { "name": "NOV Inc.", "sector": "Energy" },
    "FRT": { "name": "Federal Realty Investment Trust", "sector": "Real Estate" },
    "VNO": { "name": "Vornado Realty Trust", "sector": "Real Estate" },
    "DISCA": {
      "name": "Discovery Inc. Class A",
      "sector": "Communication Services"
    },
    "RL": {
      "name": "Ralph Lauren Corporation Class A",
      "sector": "Consumer Cyclical"
    },
    "HBI": { "name": "Hanesbrands Inc.", "sector": "Consumer Cyclical" },
    "FLS": { "name": "Flowserve Corporation", "sector": "Industrials" },
    "FTI": { "name": "TechnipFMC Plc", "sector": "Energy" },
    "UNM": { "name": "Unum Group", "sector": "Financial Services" },
    "FOX": {
      "name": "Fox Corporation Class B",
      "sector": "Communication Services"
    },
    "VNT": { "name": "Vontier Corp", "sector": "Technology" },
    "GPS": { "name": "Gap Inc.", "sector": "Consumer Cyclical" },
    "SLG": { "name": "SL Green Realty Corp.", "sector": "Real Estate" },
    "XRX": { "name": "Xerox Holdings Corporation", "sector": "Technology" },
    "HFC": { "name": "HollyFrontier Corporation", "sector": "Energy" },
    "UAA": { "name": "Under Armour Inc. Class A", "sector": "Consumer Cyclical" },
    "UA": { "name": "Under Armour Inc. Class C", "sector": "Consumer Cyclical" },
    "NWS": {
      "name": "News Corporation Class B",
      "sector": "Communication Services"
    }
  }
  
  res.json(doc);
});

handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  let doc = await req.db.collection("courses").insertOne(data);
  console.log("inserted data", data);
  res.json({
    message: "success",
    data: data
  });
});

export default handler;