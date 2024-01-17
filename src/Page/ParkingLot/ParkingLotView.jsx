import {useEffect, useState} from "react"
import {Select, Option, Typography, Button} from "@material-tailwind/react";
import requester from "../../infrastructure/requester";
import ParkingSimulation from "../Component/ParkingSimulation.jsx";
import {io} from "socket.io-client";

export default function ParkingLotView() {

    const [currentFloor, setCurrentFloor] = useState(1)
    const [listParkingLot, setListParkingLot] = useState([])
    const [currentParkingLotID, setCurrentParkingLotID] = useState()
    const [currentListLocation, setCurentListLocation] = useState([])
    const [listFloor, setListFloor] = useState([])
    const [currentIndexFloor, setCurrentIndexFloor] = useState(0)

    const handleGetAllParkingLot = () => {
        const endpoint = "api/v1/parkinglot/all/1/100"
        const getAllParkingLot = (response) => {
            setListParkingLot([...response.Data]);
        }
        requester.get(endpoint, getAllParkingLot)
    }

    const getTheParkingDensityInTheFloor = async (floorID) => {
        try {
            const endpoint = "api/v1/parking-location/all/" + floorID;
            const response = await requester.get(endpoint);

            if (response.data.statusCode === 200) {
                const data = response.data.data;
                const total = data.filter((value) => {
                    return value.state !== "BLOCKED" && value.state !== "ROAD";
                }).length;
                const hasVehicle = data.filter((value) => {
                    return value.state === "HAS_VEHICLE";
                }).length;

                return {total, hasVehicle};
            } else {
                throw new Error("Failed to get parking density data.");
            }
        } catch (error) {
            console.error("Error while fetching parking density data:", error);
            return {total: 0, hasVehicle: 0};
        }
    };

    const handeGetListLocation = () => {
        const endpoint = "api/v1/parking-location/all/" + currentFloor.id;
        requester.get(endpoint)
            .then(async (response) => {
                if (response.data.statusCode === 200) {
                    setCurentListLocation([...response.data.data])
                } else {
                    console.error("Failed to get location data.");
                }
            })
            .catch((error) => {
                console.error("Error while fetching floor data:", error);
            });
    }

    const handleGetAllFloor = (isSocket) => {
        const endpoint = "api/v1/floor/" + currentParkingLotID;

        requester.get(endpoint)
            .then(async (response) => {
                if (response.data.statusCode === 200) {
                    const floors = response.data.data;
                    for (const floor of floors) {
                        const density = await getTheParkingDensityInTheFloor(floor.id);
                        floor.total = density.total;
                        floor.hasVehicle = density.hasVehicle;
                    }
                    setListFloor([...floors])
                    if (floors.length) {
                        if (isSocket) {
                            console.log("================id",currentIndexFloor)
                            setCurrentFloor(floors[currentIndexFloor])
                            console.log("socket----------------------------")
                            console.log("floors----------------------------",floors[currentIndexFloor])

                        } else {
                            setCurrentFloor(floors[0])
                            setCurrentIndexFloor(0)
                            console.log("normal----------------------------")

                        }
                    } else {
                        setCurrentFloor([])
                    }
                } else {
                    console.error("Failed to get floor data.");
                }
            })
            .catch((error) => {
                console.error("Error while fetching floor data:", error);
            });
    };

    const skeletons = () => {
        return <div role="status"
                    className="p-4 border-8 border-gray-200 border-dashed rounded shadow animate-pulse md:p-6 dark:border-gray-800">
            {Array.from({length: 6}, (_, i) => (
                <div className="flex flex-row my-2" key={i}>
                    {Array.from({length: 8}, (_, j) => (
                        <div className="bg-gray-300 rounded-sm w-[80px] h-[50px] mx-[20px] dark:bg-gray-800"
                             key={j}></div>
                    ))}
                </div>
            ))}

        </div>
    }

    useEffect(handleGetAllParkingLot, [])
    useEffect(handleGetAllFloor, [currentParkingLotID])
    useEffect(handeGetListLocation, [currentFloor])

    useEffect(() => {
        // Tạo kết nối đến máy chủ WebSocket
        const socket = io(`ws://${import.meta.env.VITE_SERVER_HOST}:8000`); // Thay thế URL bằng địa chỉ máy chủ WebSocket của bạn

        // Xử lý sự kiện khi kết nối thành công
        socket.on('connect', () => {
            console.log('Kết nối thành công');
        });

        // Xử lý sự kiện khi nhận dữ liệu từ máy chủ WebSocket
        socket.on('onParked', (data) => {
            console.log(currentParkingLotID)
            if (data.parkingLotId == currentParkingLotID) {
                handleGetAllFloor(true)
                // handeGetListLocation()
            }
            console.log('Dữ liệu từ máy chủ:', data);
        });
        return () => {
            socket.disconnect();
        };
    }, [currentParkingLotID,currentFloor]);

    return (
        <div className="max-w-[800px]:flex flex-col">
            <div className="w-72">
            </div>
            <div className=" mt-5  flex flex-col pl-2 lg:mx-52">
                <div className="w-72 max-w-[800px]:flex flex-col">
                    <Select label="Chọn bãi đỗ xe" onChange={e => {
                        setCurrentParkingLotID(e)
                        console.log("====================id", e)
                    }}>
                        {listParkingLot.map(parkinglot => {
                                return <Option key={parkinglot.id}
                                               value={parkinglot.id.toString()}>{parkinglot.name ?? ''}</Option>
                            }
                        )}
                    </Select>
                </div>
                <div className="flex flex-col xl:flex-row ">
                    <div className="flex h-full flex-col">
                        <Typography className=" font-bold">Chú thích</Typography>
                        <div className="flex flex-row h-[30px] items-center w-[150px]">
                            <div className="w-[20px] h-[20px] bg-red-600 rounded-1 rounded-md"/>
                            <Typography className="px-3 font">Đang có xe đỗ</Typography>
                        </div>
                        <div className="flex flex-row h-[30px] items-center w-[150px]">
                            <div className="w-[20px] h-[20px] bg-green-600 rounded-md"/>
                            <Typography className="px-3 font">Chưa có xe đỗ</Typography>
                        </div>
                    </div>
                    <div className="flex flex-row w-full items-center overflow-auto">
                        {listFloor.map((floor, index) => {
                            const percent = (floor.hasVehicle / floor.total) * 100;
                            const color = `hsl(${(90 - percent) * 1.2}, 100%, 50%)`;
                            return <div key={index}
                                        style={{backgroundColor: color}}
                                        className={" p-[10px] select-none cursor-pointer rounded-[10px] place-items-center min-w-[160px] h-[68px] m-[10px] color-by-percent " + ((currentFloor.id == floor.id) ? "min-w-[168px] h-[76px] border shadow-xl border-deep-purple-600" : "")}
                                        onClick={() => {setCurrentFloor(floor);setCurrentIndexFloor(index)}}
                            >
                                <Typography className="font-bold block text-center min-w-[140px]">{floor.name}</Typography>
                                <Typography
                                    className="block min-w-[140px] text-center ">{floor.hasVehicle} / {floor.total}</Typography>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mb-10">
                <div
                    className="w-full xl:px-[10px] xl:w-[1280px] grid py-5 place-items-center overflow-auto shadow-2xl">
                    {currentListLocation.length ?
                        <ParkingSimulation demo={false} rows={currentFloor.row} listLocation={currentListLocation}
                                           total={currentListLocation.length}/>
                        :
                        <div className="flex justify-center flex-col">
                            <Typography className="font-bold block text-center text-[20px] p-3 text-gray-800">Vui lòng
                                chọn bãi đỗ xe và khu vực đỗ xe</Typography>
                            {skeletons()}
                        </div>
                    }
                </div>

            </div>

        </div>

    )
}
