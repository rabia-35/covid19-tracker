import {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {fetchCovid} from "../redux/covidSlice"
import {Container, Row, Col, Card} from "react-bootstrap"
import Moment from 'react-moment'


function Cards() {
    const items=useSelector(state=>state.covid.items)
    const status=useSelector(state=>state.covid.status)
    const country=useSelector(state=>state.covid.country)

    const dispatch=useDispatch()
    useEffect(()=>{
        if(status==="idle"){ 
            dispatch(fetchCovid())
        }
       
    },[dispatch, status])

    let datas=[]

    if(items){
      
      datas=[
        {
          title:"Infected",
          value:items.confirmed.value,
          updatedText:"Last Updated at:",
          updated:items.lastUpdate,
          src:"Number of active cases of COVİD-19"
        },
        {
          title:"Recovered",
          value:items.recovered.value,
          updatedText:"Last Updated at:",
          updated:items.lastUpdate,
          src:"Number of recoveries from COVİD-19"
        },
        {
          title:"Deaths",
          value:items.deaths.value,
          updatedText:"Last Updated at:",
          updated:items.lastUpdate,
          src:"Number of deaths caused by COVİD-19"
        },
        {
          title:"Active",
          value:items.confirmed.value - items.recovered.value-items.deaths.value,
          updatedText:"Last Updated at:",
          updated:items.lastUpdate,
          src:"Number of Active Cases of COVİD-19"
        }
      ]
    }
    
  return (
    <Container>
        <Row  xs={1} md={2} lg={4}>
          {
            datas && (
              datas.map((data, key)=>(
                <Col key={key} className="my-5">
                  <Card className={data.title} >
                    <Card.Body>
                      <Card.Text className='fs-5 text-decoration-underline'>{data.title}</Card.Text>
                      <Card.Title className='fs-3 my-3'>{Intl.NumberFormat('en-US').format(data.value)}</Card.Title>
                      <span >{data.updatedText}</span>
                      <Card.Text className='text-muted fs-5 my-2 '><Moment format="Do MMM YYYY, hh:mm:ss">{data.updated}</Moment></Card.Text>
                      <Card.Text className='my-4'>{data.src}</Card.Text>
                      <Card.Text className='fs-5'>{country ? country : "worldwide"}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )
          }
        </Row>
    </Container>
  )
}

export default Cards