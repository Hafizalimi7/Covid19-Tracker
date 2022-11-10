import './App.css';
import { Card, CardContent, FormControl, Select , MenuItem} from '@material-ui/core'
import { useState, useEffect } from 'react'
import Infobox from './compnents/infoBox';
import Map from './compnents/Map';

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')

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
          setCountries(countries)
        })
    }
    getData()
  }, [])

  const onCountryChange = e => {
    setCountry(e.target.value)
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
          <Infobox title="Coronavirus Cases" cases={8000} total={3000} />
          <Infobox title="Recovered" cases={7000} total={3000} />
          <Infobox title="Deaths" cases={4000} total={3000} />
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
