import { useEffect } from 'react'
import {Container, Dropdown, } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVirusCovid } from '@fortawesome/free-solid-svg-icons'
import {fetchCountryCovid} from "../redux/covidSlice"
import {useSelector, useDispatch} from "react-redux"

function Header() {
  const countrys=useSelector(state=>state.covid.country)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchCountryCovid())
  },[dispatch])

  return (
    <div className='header'>
        <Container>
        <h1 >C<FontAwesomeIcon  icon={faVirusCovid} className="header-icon" />VID-19</h1>
        <h6>Global and Country Wise Cases of Corona Virus</h6>
        <p>For a Particlar select a Country From below</p>
        <Dropdown >
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant='outline-dark' size='lg'>
              Select Country
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark" className='menu-items' >
                {
                  countrys && (
                    countrys.countries.map((country, key)=>(
                      <Dropdown.Item key={key} href="#/action-1"  >{country.name}</Dropdown.Item>
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