import { Fragment } from "react"
//import ParticleBg from "../Header/ParticleBg"


function Layout(props) {
    return <Fragment>
                    <div>
                        {props.children}
                    </div>
                {/* <ParticleBg/> */}
           </Fragment>
}

export default Layout