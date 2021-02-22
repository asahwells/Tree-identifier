import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
const Loading = () => {
    return (
        <div align="center" style={{marginTop: "20rem", alignItems: "center", justifyContent: "center", justifyItems: "center", justifySelf: "center", alignContent: "center"}}>
             <Loader
        type="Watch"
        color="#03a27b"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
        </div>
    )
}

export default Loading
