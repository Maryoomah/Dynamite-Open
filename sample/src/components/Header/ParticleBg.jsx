import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBg = () => {
  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };

  return (
    <div className="">
       <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
          background: {
            image: "",
            size: "100% 100%",
            repeat: "no-repeat"
          },
          fullScreen: {
            enable: true,
            zIndex: -1
          },
          particles: {
            background: {
                color: "",
            },
            color: {
            //   value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"],
              value: ["#FFF", "#CDCDCD", "#FFF", "#CDCDCD"],
              animation: {
                enable: true,
                speed: 30
              }
            },
            move: {
              direction: "bottom",
              enable: true,
              outModes: {
                default: "out"
              },
              size: true,
              speed: {
                min: 1,
                max: 3
              }
            },
            number: {
              value: 120,
              density: {
                enable: true,
                area: 800
              }
            },
            opacity: {
              value: 1,
              animation: {
                enable: false,
                startValue: "max",
                destroy: "min",
                speed: 0.3,
                sync: true
              }
            },
            rotate: {
              value: {
                min: 0,
                max: 360
              },
              direction: "random",
              move: true,
              animation: {
                enable: true,
                speed: 60
              }
            },
            tilt: {
              direction: "random",
              enable: true,
              move: true,
              value: {
                min: 0,
                max: 360
              },
              animation: {
                enable: true,
                speed: 60
              }
            },
            shape: {
              type: ["circle", "square", "polygon"],
              options: {
                polygon: [
                  {
                    sides: 5
                  },
                  {
                    sides: 6
                  }
                ]
              }
            },
            size: {
              value: {
                min: 2,
                max: 3
              }
            },
            roll: {
              darken: {
                enable: true,
                value: 30
              },
              enlighten: {
                enable: true,
                value: 30
              },
              enable: true,
              speed: {
                min: 15,
                max: 25
              }
            },
            wobble: {
              distance: 30,
              enable: true,
              move: true,
              speed: {
                min: -15,
                max: 15
              }
            }
          }
        }}
    />
    </div>
  );
}

export default ParticleBg