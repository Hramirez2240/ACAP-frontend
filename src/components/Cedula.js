import SideBar from "./SideBar";
import axiosClient from '../config/axios'
import { useState } from "react";
import InputMask from 'react-input-mask';
import Modal from '@material-ui/core/Modal';

export default function Cedula(){

    const [img, setImg] = useState("");
    const [cedula, setCedula] = useState("");
    const [showImg, setShowImg] = useState("none");
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleInput = event => {
        setCedula(event.target.value);
    }

    const handleClick = async() => {
        const result = await axiosClient.get("Power/Get/" + cedula);
        if(result.data.length === 0){
            setOpen(true);
            setShowImg("none");
        }

        else{
            setShowImg("inline-block");
            console.log(result);
            console.log(result.data[0].path);
            setImg(result.data[0].path);
        }
    }


    return(
        <div className="App">
            <SideBar />

            <div className="titleContainer">
                <h2>TARJETA DE PODER A LA JUNTA DE DIRECTORES</h2>

                <div className="contentContainer">
                    <div className="cedulaContainer">
                        <label>Cédula:</label>
                        <InputMask onChange={handleInput} className="form-control" mask="999-9999999-9" maskChar=" "/>
                        <button onClick={handleClick} className="btn btn-primary">Buscar</button>
                    </div>
                    <div className="contentImg">
                        <div className="imgContainer">
                            <img src={img} alt="img1" style={{display: showImg}}/>
                            <img src={img} alt="img2" style={{display: showImg}}/>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
            onClose={handleClose}
            open={open}
            style={{
            position: 'absolute',
            border: '2px solid #000',
            bottom: "250px",
            left: "250px",
            borderRadius: "15px",
            backgroundColor: '#fff',
            height: "80px",
            width: "500px",
            margin: "auto",
            textAlign: "center",
            color: "#fff"
            }}
            >
                <h2>No se encuentra la cédula ingresada</h2>
            </Modal>
      
        </div>
    );
}