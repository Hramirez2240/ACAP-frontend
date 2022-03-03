import SideBar from "./SideBar";
import axiosClient from "../config/axios";
import { useEffect, useState } from "react";

export default function Aleatoria(){

    const [img, setImg] = useState([]);
    const [count, setCount] = useState(0);
    const [source, setSource] = useState("");
    const [isDisabledStart, setIsDisabledStart] = useState(false);
    const [isDisabledNext, setIsDisabledNext] = useState(true);
    const [isDisabledBack, setIsDisabledBack] = useState(true);
    const [isDisabledFinish, setIsDisabledFinish] = useState(true);
    const [showImg, setShowImg] = useState("none");

    const handleClickStart = async() => {
        const result = await axiosClient.get("Power");
        console.log(result);
        console.log(result.data);
        img.push(...result.data);
        setSource(img[count].path);
        console.log(img);
        console.log(count);
        setIsDisabledStart(!isDisabledStart);
        setIsDisabledNext(!isDisabledNext);
        setIsDisabledFinish(!isDisabledFinish);
        setShowImg("inline-block");
    }

    const handleClickNext = async() => {
        if(count >= (img.length - 2)){
            setIsDisabledNext(!isDisabledNext);
        }

        setIsDisabledBack(false);
        setCount(count + 1); 
        setSource(img[count].path);
        console.log(count);
        console.log(source);
    }

    useEffect(() => {
        if(count > 0){
            setSource(img[count].path);
        }
    },[count, img]);

    const handleClickBack = async() => {
        if(count === 0 ){
            setIsDisabledBack(!isDisabledBack);
            
        }

        setIsDisabledNext(false);
        setCount(count - 1);
        setSource(img[count].path);
        console.log(count);
        console.log(source);
    }

    const handleClickFinish = () => {
        setIsDisabledNext(true);
        setIsDisabledBack(true);
        setIsDisabledFinish(true);
        setIsDisabledStart(false);

        setSource("");
        setShowImg("none");
        setCount(0);
        setImg([]);
    }

    return(

        <div className="App">
            <SideBar />

            <div className="titleContainer">
                <h2>TARJETA DE PODER A LA JUNTA DE DIRECTORES</h2>

                <div className="contentContainer">
                    <div className="aleatoriaContainer">
                        <button onClick={handleClickStart} className="btn btn-primary" disabled={isDisabledStart}>Iniciar búsqueda</button>
                        <button onClick={handleClickNext} className="btn btn-primary" disabled={isDisabledNext}>Próximo</button>
                        <button onClick={handleClickBack} className="btn btn-primary" disabled={isDisabledBack}>Anterior</button>
                        <button onClick={handleClickFinish} className="btn btn-primary" disabled={isDisabledFinish}>Finalizar</button>
                    </div>
                    <div className="contentImg">
                        <div className="imgContainer">
                            <img src={source} alt="img1" style={{display: showImg}}/>
                            <img src={source} alt="img2" style={{display: showImg}}/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}