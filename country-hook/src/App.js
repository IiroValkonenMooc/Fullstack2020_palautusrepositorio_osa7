import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect( () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then( countriesData => {
        console.log('search');
        const foundCountries = countriesData.data.filter(country => country.name.toLowerCase().includes(name.toLowerCase()) )
        const foundCountry = foundCountries.length === 1 
          ? foundCountries[0]
          : null
        setCountry(foundCountry)
      })
    }, [name]
  )

  return country
}

const Country = ({ country }) => {
  console.log('country :>> ', country);
  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }

  // if (!country.found) {
  //   return (
  //     <div>
  //       not found...
  //     </div>
  //   )
  // }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App