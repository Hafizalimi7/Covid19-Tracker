import './App.css';
import { FormControl, Select , MenuItem} from '@material-ui/core'
import { useState, useEffect } from 'react'

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
      <div className="app__header">
        <h1>Covid-19 tracker</h1>
        <FormControl className="app___dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
