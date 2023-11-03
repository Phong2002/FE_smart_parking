import {
    Card, CardBody, CardHeader, Carousel, Typography,
    CardFooter,
    Button,
} from "@material-tailwind/react";

import parking1 from "../assets/images/carousel_smart_parking/parking1.jpg";
import parking2 from "../assets/images/carousel_smart_parking/parking2.jpg";

const listReasons = [

    {
        title: "An toàn",
        content: "Bãi đỗ xe thông minh có hệ thống giám sát và an ninh hiện đại giúp đảm bảo an toàn cho phương tiện và người sử dụng",
    }, {
        title: "Tiện lợi",
        content: "Sự tiện lợi trong việc tìm kiếm và sử dụng chỗ đỗ xe, cùng với hệ thống thanh toán dễ dàng, giúp tiết kiệm thời gian và năng lượng của người dùng.",
    }, {
        title: "Bảo vệ môi trường",
        content: "Bãi đỗ xe thông minh thường có các tính năng tiết kiệm năng lượng và giảm thiểu tác động đến môi trường, bao gồm cả việc quản lý thông minh năng lượng và tối ưu hóa lưu lượng giao thông",
    }, {
        title: "Quản lý thông tin",
        content: "Bãi đỗ xe thông minh cung cấp thông tin về tình trạng giao thông và sự sẵn sàng của chỗ đỗ xe, giúp người dùng dễ dàng lập kế hoạch và quyết định",
    }, {
        title: "Phí thanh toán linh hoạt",
        content: "Sự linh hoạt trong việc thanh toán phí đỗ xe bằng nhiều phương thức khác nhau giúp người dùng thoải mái và thuận tiện",
    }, {
        title: "Giảm tắc nghẽn giao thông",
        content: "Bãi đỗ xe thông minh có thể giúp giảm tắc nghẽn giao thông bằng cách tối ưu hóa quản lý chỗ đỗ xe và hướn dẫn xe đến chỗ đỗ thích hợp",
    }

];

export default function Dashboard() {




    document.title = 'Trang chủ'
    return (
        <div className="grid  place-items-center ">
            <Carousel
                className="rounded-xl xl:w-[888px] xl:h-[468px] mt-3 min-[320px]:w-[300px] "
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                    }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                <img
                    src={parking1}
                    alt="image 1"
                    className="h-full w-full object-cover"
                />
                <img
                    src={parking2}
                    alt="image 2"
                    className="h-full w-full object-cover"
                />
                <img
                    src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                    alt="image 3"
                    className="h-full w-full object-cover"
                />
            </Carousel>
            <div className="grid place-items-center my-8 ">
                <Typography className="text-blue-phenikaa text-[35px] font-bold text-center min-[320px]:w-[300px]">
                    Tại sao chọn chúng tôi ?</Typography>
                <Typography className="text-orange-phenikaa text-[18px] text-center xl:w-[888px] min-[320px]:w-[300px]">
                    Bãi đỗ xe thông minh Phenikaa Park mang lại sự tiện lợi cho người dùng bằng cách
                    cung cấp hệ thống quản lý thông minh giúp tìm kiếm chỗ đỗ xe dễ dàng và tiết kiệm
                    thời gian. Các ứng dụng di động và hệ thống thông tin trực quan giúp người dùng biết
                    được tình trạng thực tế của bãi đỗ xe và hướng dẫn họ đến chỗ đỗ xe trống gần nhất.
                    Điều này loại bỏ sự phiền toái và thời gian mất mát khi tìm kiếm chỗ đỗ xe truyền thống.
                </Typography>
            </div>

            <div className="flex flex-wrap mx-20 justify-center">
                {listReasons.map(reason => {
                    return <Card className="m-3 w-96 " key={reason.content}>
                        <CardBody>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {reason.title}
                            </Typography>
                            <Typography>
                                {reason.content}
                            </Typography>
                        </CardBody>
                     
                    </Card>

                })}

            </div>
        </div>
    );
}
