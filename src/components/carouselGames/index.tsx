import { Splide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
};
const options = {
    desktop: {
        breakpoint: { max: 1400, min: 1024 },
        items: 4,
        slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 767, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    }
};


function CarouselGames({ children }: Props) {
    return (
        <Splide
            options={{
                type: 'slide',
                drag: 'free',
                gap: "10px",
                arrows: false,
                perPage: 4,
                autoScroll: {
                    speed: 2,
                },
                pagination: false,
                autoplay: true,
            }}
        >
            {children}
        </Splide>
    )
};

export default CarouselGames