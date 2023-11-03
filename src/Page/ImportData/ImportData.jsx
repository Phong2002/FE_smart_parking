import { useState } from "react"
import UserService from "../../infrastructure/UserService";
import { ButtonGroup, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";


export default function ImportData() {
    const [isManage, setManage] = useState(false)
    const [openCarEnteringTheGate, setOpenCarEnteringTheGate] = useState(false);
    const [openCarLeavesTheParkingLot, setOpenCarLeavesTheParkingLot] = useState(false);
    const [openCarIntoParkingPosition, setOpenCarIntoParkingPosition] = useState(false);

    const handleOpenCarEnteringTheGate = () => setOpenCarEnteringTheGate(!openCarEnteringTheGate);
    const handleOpenCarIntoParkingPosition = () => setOpenCarIntoParkingPosition(!openCarIntoParkingPosition);
    const handleOpenCarLeavesTheParkingLot = () => setOpenCarLeavesTheParkingLot(!openCarLeavesTheParkingLot);
    return (
        <div className=" h-[100vh] flex-col flex items-center justify-center">

            <Button onClick={handleOpenCarEnteringTheGate} className="m-5" color="green" variant="gradient">
                Xe vào cổng
            </Button>
            <Button onClick={handleOpenCarIntoParkingPosition} className="m-5" variant="gradient">
                Xe vào vị trí đỗ
            </Button>
            <Button onClick={handleOpenCarLeavesTheParkingLot} className="m-5" color="red" variant="gradient">
                Xe ra cổng
            </Button>


            <Dialog open={openCarEnteringTheGate} handler={handleOpenCarEnteringTheGate}>
                <DialogHeader>Xe vào bãi đỗ </DialogHeader>
                <DialogBody>
                    <div className="relative">
                        <input type="file" id="fileInput" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                        <label for="fileInput" className="relative block h-40 w-40 bg-gray-200 cursor-pointer">
                            <img src="" alt="Selected Image" className="h-full w-full object-cover" id="previewImage" />
                        </label>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpenCarEnteringTheGate}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpenCarEnteringTheGate}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>


            <Dialog open={openCarIntoParkingPosition} handler={handleOpenCarIntoParkingPosition}>
                <DialogHeader>Xe vào vị trí đỗ</DialogHeader>
                <DialogBody>
                    The key to more success is to have a lot of pillows. Put it this way,
                    it took me twenty five years to get these plants, twenty five years of
                    blood sweat and tears, and I&apos;m never giving up, I&apos;m just
                    getting started. I&apos;m up to something. Fan luv.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpenCarIntoParkingPosition}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpenCarIntoParkingPosition}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>


            <Dialog open={openCarLeavesTheParkingLot} handler={handleOpenCarLeavesTheParkingLot}>
                <DialogHeader>Xe ra khỏi bãi đỗ </DialogHeader>
                <DialogBody>
                    The key to more success is to have a lot of pillows. Put it this way,
                    it took me twenty five years to get these plants, twenty five years of
                    blood sweat and tears, and I&apos;m never giving up, I&apos;m just
                    getting started. I&apos;m up to something. Fan luv.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpenCarLeavesTheParkingLot}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpenCarLeavesTheParkingLot}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>

        </div>

    )
}
