import { useEffect, useState } from "react"
import { Select, Option, Typography } from "@material-tailwind/react";
import requester from "../../infrastructure/requester";
export default function ParkingLotView() {

    const [currentFloor, setCurrentFloor] = useState(1)
    const [listParkingLot, setListParkingLot] = useState([])
    const [currentParkingLotID, setCurrentParkingLotID] = useState()
    const listFloor = [
        {
            name: "Căng tin 1234 df",
            total: 120,
            occ: 12
        },
        {
            name: "Tầng 2",
            total: 120,
            occ: 120
        },
        {
            name: "Tầng 3",
            total: 120,
            occ: 86
        },
        {
            name: "Tầng 4",
            total: 120,
            occ: 34
        },
        {
            name: "Tầng 5",
            total: 120,
            occ: 97
        },
    ]

    const handleGetAllParkingLot = () => {
        const endpoint = "api/v1/parkinglot/all/1/100"
        const getAllParkingLot = (response) => {
            setListParkingLot(response.Data);
        }
        requester.get(endpoint, getAllParkingLot)
    }

    useEffect(handleGetAllParkingLot, [])

    return (
        <div className="">
            <div className="w-72">
            </div>
            <div className="mx-56 mt-5">
                <div className="w-72">
                    <Select label="Chọn bãi đỗ xe" onChange={e => { setCurrentParkingLotID(e) }}  >
                        {listParkingLot.map(parkinglot => {
                            return <Option key={parkinglot.id} value={parkinglot.id.toString()}>{parkinglot.name ?? ''}</Option>
                        }
                        )}
                    </Select>
                </div>
                <div className="flex flex-row ">
                    <div className="flex h-full flex-col">
                        <Typography className=" font-bold">Chú thích</Typography>
                        <div className="flex flex-row h-[30px] items-center w-[150px]">
                            <div className="w-[20px] h-[20px] bg-red-600 rounded-1 rounded-md" />
                            <Typography className="px-3 font">Đang có xe đỗ</Typography>
                        </div>
                        <div className="flex flex-row h-[30px] items-center w-[150px]">
                            <div className="w-[20px] h-[20px] bg-green-600 rounded-md" />
                            <Typography className="px-3 font">Chưa có xe đỗ</Typography>
                        </div>
                    </div>
                    <div className="flex flex-row w-full items-center overflow-auto">
                        {listFloor.map((floor, index) => {
                            const percent = (floor.occ / floor.total) * 100;
                            const color = `hsl(${(90 - percent) * 1.2}, 100%, 50%)`;
                            return <div key={index}

                                style={{ backgroundColor: color }}
                                className={" p-[10px] select-none cursor-pointer rounded-[10px] place-items-center w-[160px] h-[68px] m-[10px] color-by-percent " + ((currentFloor == index + 1) ? "w-[168px] h-[76px] border border-deep-purple-600" : "")}
                                onClick={() => setCurrentFloor(index + 1)}
                            >
                                <Typography className="font-bold block text-center w-[140px]">{floor.name}</Typography>
                                <Typography className="block w-[140px] text-center ">{floor.occ} / {floor.total}</Typography>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}
