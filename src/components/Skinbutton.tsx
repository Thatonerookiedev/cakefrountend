import { useContext } from "react";
import { MainProvider } from "../contexts/MainContext";


const Skinbutton = () => {
    const {skin,updateskin,Modes,skinFont,updateskinFont} = useContext(MainProvider)
    
    function changeskin(){
        if(skin === Modes.light){
            updateskin(Modes.dark)
            updateskinFont(Modes.darkFont)
            localStorage.setItem('skin',Modes.dark)
            localStorage.setItem('skinFont',Modes.darkFont)
        }else{
            updateskin(Modes.light)
            updateskinFont(Modes.lightFont)
            localStorage.setItem('skin',Modes.light)
            localStorage.setItem('skinFont',Modes.lightFont)
        }
    }


    return ( 
        <>
            <button className={`skin1 ${skin}`} onClick={()=>{changeskin()}}>
                <h1>{skin === Modes.light ? Modes.light : Modes.dark}</h1>
            </button>
        </>
     );
}
 
export default Skinbutton;




