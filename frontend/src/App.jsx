import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
  const [vehicle, setVehicle] = useState([])
  useEffect(()=>{
    axios.get('/api/vehicle')
    .then((response)=>{
       setVehicle(response.data)  
    })
    .catch((error)=>{
     console.log(err)
    })
  })
 
  return (
    <>
    <h1>Rent Motors</h1>
    <p>Vehicle data</p>
    { vehicle.map((data, index) => (
          <div key={index}>
            <h3>{data.name}</h3>
            <h3>{data.price}</h3>
          </div>
        ))
     }
    </>
  )
}

export default App
