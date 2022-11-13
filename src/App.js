import './App.css';
import { Card, CardContent, FormControl, Select , MenuItem} from '@material-ui/core'
import { useState, useEffect } from 'react'
import InfoBox from './compnents/infoBox';
import Map from './compnents/Map';
import Table from "./compnents/Table"
import { sortData, prettyPrintStat } from './util';
// import LineGraph from './compnents/LineGraph';
import 'leaflet/dist/leaflet.css'
import numeral from 'numeral'


function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState([])
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796})
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map( item => (
            {
              name: item.country,
              value: item.country.iso2
            }
          ))
          const sortedData = sortData(data)
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(countries)
        })
    }
    getData()
  }, [])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => setCountryInfo(data))
  }, [])
  
  const onCountryChange = async e => {
    const url = e.target.value === 'worldwide' ? 
    'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${e.target.value}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(e.target.value)
        setCountryInfo(data)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
      })
  }
  

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 tracker</h1>
          <FormControl className="app___dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={numeral(countryInfo.cases).format("0.0a")} />
          <InfoBox title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={numeral(countryInfo.recovered).format("0.0a")} />
          <InfoBox title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={numeral(countryInfo.deaths).format("0.0a")} />
        </div>
        <Map countries ={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
          {/* <LineGraph /> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
