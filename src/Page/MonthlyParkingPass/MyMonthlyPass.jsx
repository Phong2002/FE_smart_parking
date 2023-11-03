import backgroundPhenikaaPark from "../../assets/images/logo_with_name.png"

export default function MyMonthlyPass() {

    return (
        <div className="flex items-center m-20 justify-center">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex">
                <div className="w-[150px] pr-4">
                    <img
                        src={backgroundPhenikaaPark}
                        alt="Hình ảnh"
                        className="w-full h-auto rounded"
                    />
                </div>
                <div className="w-3/4">
                    <h2 className="text-xl font-bold mb-2">Họ Tên</h2>
                    <p className="text-base mb-2">Số Điện Thoại: 123-456-7890</p>
                    <p className="text-base mb-2">Email: example@email.com</p>
                    <p className="text-base">Hạn Sử Dụng: 31/12/2023</p>
                </div>
            </div>
        </div>
    )
}
