import Sponsor from './Sponsor';
import Slider from 'react-slick';


const Sponsors = () => {

    const sponsorsArray = [
        {
            sponsor: require('../../assets/images/ikoyi_club.jpeg'),
        },

        {
            sponsor: require('../../assets/images/elcrest.jpeg'),
        },

        {
            sponsor: require('../../assets/images/panasa.png'),
        },

        {
            sponsor: require('../../assets/images/midas.jpeg'),
        },

        {
            sponsor: require('../../assets/images/mgi.png'),
        },

    ];

    const settings = {
        dots: false,
        autoplay: true,
        cssEase: "linear",
        autoplay: true,
        speed:1000,
        autoplaySpeed:5000,
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        className: "center",
        centerMode: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
  


    
   
    return (
        <section className={`py-10 lg:w-[80%] lg:mx-auto`}>
            <div className="w-full flex justify-center items-center flex-col">

                <div className="lg:p-0 p-4 flex justify-center items-center flex-col">
                    <h3 className='text-4xl lg:text-5xl font-bold text-center text-white'>Our Sponsors</h3>
                </div>

                <div className="w-[80%] mx-auto py-4">
                    <Slider {...settings}>
                        {
                            sponsorsArray.map((sponsor, i) => (
                                <Sponsor key={i} {...sponsor}/>
                            ))
                        }
                    </Slider>
                </div>
   


            </div>


        </section>
    )
}

export default Sponsors