import express from 'express';
const app=express();
const port=process.env.PORT || 3000;

const vehicle = [
  {
    id: 101,
    name: "Honda",
    price: 500
  },
  {
    id: 102,
    name: "Yamaha",
    price: 600
  },
  {
    id: 103,
    name: "Suzuki",
    price: 550
  },
  {
    id: 104,
    name: "Kawasaki",
    price: 700
  },
  {
    id: 105,
    name: "Ducati",
    price: 1200
  }
];

app.get('/api',(req,res)=>{
    res.send("hello");
})
app.get('/api/vehicle',(req,res)=>{
  res.send(vehicle);
})
app.listen(port,()=>{
  console.log(port);
})