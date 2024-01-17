import { useState } from "react";
import ParkingSpot from "./ParkingSpot";
import road from "../../assets/images/road.jpg"
import { Checkbox, Switch } from "@material-tailwind/react";
export default function ParkingSimulation(props) {

  const parkingSpot = []
  for (let i = 0; i <= Math.ceil(props.total / props.rows); i++) {
    let rowParkingSpot = []
    for (let j = 1; j <= props.rows; j++) {
      if ((i * props.rows) + j > props.total) {
        break
      }
      rowParkingSpot.push(<div key={(i * props.rows) + j} 
       className={(j >= 1 && j < props.rows) ? "mr-16 inline" : "inline"}>
        <ParkingSpot findVehicle={props.findVehicle}  demo={props.demo} handleChangeState={props.handleChangeState} 
        edit={props.edit} key={(i * props.rows) + j} index={(i * props.rows) + j} 
        location={props.listLocation?props.listLocation[(i * props.rows) + j - 1]:{}} >
          </ParkingSpot></div>);
    }
    parkingSpot.push(<div key={i} className="flex flex-row">{rowParkingSpot}</div>)
  }
  return (
    <div >
      <div className="px-5">
        <div>
        </div>
        <div className={"flex flex-col pt-[40px] justify-center w-full p-3 border-b-8 border-l-8 border-r-8 border-dashed border-yellow-500 "} style={{ backgroundImage: `url(${road})` }} >
          {parkingSpot}
        </div>
      </div>
    </div>
  )
}
