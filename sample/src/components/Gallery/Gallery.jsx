import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { filteredData } from '../../../pages/api/data';
import GalleryItem from './GalleryItem';
import styles from "./Gallery.module.css";


function Gallery() {

    const settings = {
        dots: false,
        autoplay: true,
        speed: 4000,
        autoplaySpeed:3000,
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                }
            },

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                }
            },

            {
                breakpoint: 300,
                settings: {
                    slideToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    }

    const [filter, setFilter] = useState("Album 1");
    const [data, setData] = useState();

    // Filtering the data

    useEffect(() => {

        if(filter == "Album 1"){
            const SelectedData = filteredData.filter(item => item.category === filter);
            setData(SelectedData);
        }

        if(filter == "Album 2"){
            const SelectedData = filteredData.filter(item => item.category === filter);
            setData(SelectedData);
        }

        if(filter == "Album 3"){
            const SelectedData = filteredData.filter(item => item.category === filter);
            setData(SelectedData);
        }

        if(filter == "Album 4"){
            const SelectedData = filteredData.filter(item => item.category === filter);
            setData(SelectedData);
        }
    }, [filter]);
    

    const active = `!bg-white !text-primary`;
   
    return (
        <section className={`w-full flex md:justify-center items-center flex-col py-10 px-6 ${styles.gallery_bg}`}>

            <div className="my-7 lg:p-0 p-4">
                <h5 className={`text-center text-[1rem] lg:text-lg my-2 text-secondary font-semibold`}>Our memorable moments</h5>
                <h3 className={`text-4xl lg:text-5xl font-extrabold text-white text-center`}>Gallery</h3>
            </div>

            <div className="w-full lg:max-w-[85%] lg:p-6 mx-4 md:mx-auto flex justify-around items-center flex-col">

                {/* News Slider Carousel */}
                    <div className="w-full my-10 lg:w-[85%]">
                        <Slider {...settings}>
                            {
                                data?.map((item, i) => {
                                    return item.images.map((item, i) => (
                                        <GalleryItem key={i} {...item}/>
                                    ))
                                })
                            }
                        </Slider>
                    </div>

                    <div className="w-full lg:w-[85%] lg:mx-auto bg-secondary rounded-b-md flex justify-center lg:justify-around  items-center lg:flex-row flex-col lg:p-6 lg:gap-x-16 gap-5 py-6">
                        <button className={`${filter === "Album 1" ? active : " "}  my-1 gallery_btn`} onClick={() => setFilter("Album 1")}>Album 1</button>
                        <button className={`${filter === "Album 2" ? active : " "}  my-1 gallery_btn`} onClick={() => setFilter("Album 2")}>Album 2</button>
                        <button className={`${filter === "Album 3" ? active : " "}  my-1 gallery_btn`} onClick={() => setFilter("Album 3")}>Album 3</button>
                        <button className={`${filter === "Album 4" ? active : " "}  my-1 gallery_btn`} onClick={() => setFilter("Album 4")}>Album 4</button>
                    </div>

            </div>

        </section>
    )
}

export default Gallery