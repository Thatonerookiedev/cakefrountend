import { MainProvider } from "../contexts/MainContext";
import React, { useContext } from "react";
import useWindowDimensions from '../hooks/windowsizehook';
import BigBlackimg from '../assets/imgs/new black cake.jpg'
import BigWhiteimg from '../assets/imgs/white-cake-big.png'


type BigOrSmall = {
    big?: boolean
}

const Infohome: React.FC<BigOrSmall> = ({
    big = true
})=>{

    const {skin,Modes,auth,updateAuth,skinFont,updateskinFont} = useContext(MainProvider)

    return(
        <>
            <div className="headdingtextcon"><h1>The Best Things In Life Are</h1><span className="sidehome" style={{WebkitTextStroke:`1px ${skin === Modes.dark ? 'white' : 'black'}`,color : `${skin === Modes.dark ? 'black' : 'rgb(255, 249, 246)'}`}}>SWEET!</span>
            
            <div className="parhome" style={{backgroundColor: `${big === false && skin === Modes.light ? 'rgb(255, 249, 246)' : big === false && skin === Modes.dark ? 'black': '0'}`}} >NCT127 Cakes has been making cakes for a year and is exceptionally skilled at it. Their attention to detail and use of high-quality ingredients ensures visually stunning and delicious cakes.</div>

            </div>
        </>
    )
}



const Small = ()=>{

    const {skin,Modes,auth,updateAuth,skinFont,updateskinFont} = useContext(MainProvider)

    return(
        <>
             <div className={` ${skinFont} imghomesmall`} style={{backgroundImage: `url('${skin === Modes.dark ? BigBlackimg : BigWhiteimg}')` }}>

                <Infohome big={false}/>

            </div>
        </>
    )
}

const Big = ()=>{

    const {skin,Modes,auth,updateAuth,skinFont,updateskinFont} = useContext(MainProvider)

    return(
        <>
            <div className="imghome">
                {
                    skin === Modes.dark ? <img src={BigBlackimg} alt="" className="bigimghome" /> : <img src={BigWhiteimg} alt="" className="bigimghome" />
                }
            </div>
            <div className={` ${skin} bigleft`}>
                <Infohome/>
            </div>
        </>
    )
}


const HomePage = () => {

    const {skin,Modes,auth,updateAuth,skinFont,updateskinFont} = useContext(MainProvider)

    const { height, width } = useWindowDimensions();

    return ( 
        <>
            {
                width > 552 ? <Big/> : <Small/>
            }
        </>
     );
}
 
export default HomePage;


