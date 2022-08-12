import React from 'react'
import {Container, Row, Col} from "react-bootstrap"
import {useSelector} from  "react-redux"
// needs imports for chart informations 
import { Bar} from 'react-chartjs-2'
import {Chart, ArcElement,  LineElement,  BarElement,  PointElement,  BarController,  BubbleController,  DoughnutController,
    LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale,
    RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip
  } from 'chart.js';
  
  Chart.register(
     ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController,
    PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale,
    TimeScale,TimeSeriesScale, Decimation, Filler, Legend,  Title,  Tooltip
  );

function Graphic() {
    const items=useSelector(state=>state.covid.items)
    let state;

    if(items){
        const infected=items.confirmed.value;
        const recovered=items.recovered.value;
        const deaths=items.deaths.value;
        const active= items.confirmed.value-items.deaths.value    
         state = {
            labels: ["Infected", "Recovered", "Deaths", "Active"],
            datasets:
                [{
                    label:"Covid-19", 
                    backgroundColor: ['#53a9ff', "#81ff9a","#ff6464", "#f8d94e"],
                    borderWidth: "0",
                    data: [infected, recovered, deaths, active]
                }]
        }
    }

  return (
    <Container>
        <Row>
            <Col className='graphic'>
                {
                    items && (
                        <Bar data={state}/>
                    )
                }
            </Col>
        </Row>
         

    </Container>
  )
}

export default Graphic