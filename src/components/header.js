import { useEffect } from 'react'
import {Container, Dropdown, } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVirusCovid } from '@fortawesome/free-solid-svg-icons'
import {fetchCountriesCovid, fetchCovid, selectedCountry} from "../redux/covidSlice"
import {useSelector, useDispatch} from "react-redux"

function Header() {

  const countries=useSelector(state=>state.covid.countries)
  const country=useSelector(state=>state.covid.country)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchCountriesCovid())
  },[dispatch])

 
  return (
    <div className='header'>
        <Container>
        <h1 >C<FontAwesomeIcon  icon={faVirusCovid} className="header-icon" />VID-19</h1>
        <h6>Global and Country Wise Cases of Corona Virus</h6>
        <p>For a Particlar select a Country From below</p>
        <Dropdown >
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant='outline-dark' size='lg'>
              {country ? country : "WorldWide"}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark" className='menu-items' >
                {
                  countries && (
                    countries.countries.map((country, key)=>(
                      <Dropdown.Item key={key}  onClick={()=>{ dispatch(fetchCovid(country.name)); dispatch(selectedCountry(country.name))}} eventKey={country.name} >{country.name}</Dropdown.Item>
                    ))
                  )
                }
            </Dropdown.Menu>
        </Dropdown>
        </Container>
    </div>
  )
}

export default Header