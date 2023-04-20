import React, { FC, useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import MainProviderContext, { MainProvider } from '../contexts/MainContext'
import logolight from '../assets/imgs/logo-lightmode.png'
import logoDark from '../assets/imgs/logo-darkmode.png'
import { LinkContext } from '../contexts/LinkContructorContext'
import useWindowDimensions from '../hooks/windowsizehook';
import Blacksmallmenu from '../assets/icons/menusmall-black.png'
import Whitesmallmenu from '../assets/icons/menusmall-white.png'
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


type ChildrenProp = {
    children: any;
  };

const Links = ()=>{

    const {skin,updateskin,Modes,auth,updateAuth,skinFont,updateskinFont} = useContext(MainProvider)
    const {TempLinkArray} = useContext(LinkContext)

    return(
        <>
            {
                TempLinkArray.map((element:any)=>{
                    if(auth === true || element.label !== 'PROFILE'){
                        return(
                            <>
                                <h3 className={` ${skinFont} link`} key={element.label}><a href={`${window.location.origin.toString()}/main` + element.linkTo}>{element.label}</a></h3>
                            </>
                        )
                    }
                })
            }
        </>
    )
}

type SidePannel = {
    open: boolean,
    setopen: any,
    states:any
}

const HamBar: React.FC<SidePannel> = ({open,setopen,states})=>{

    const {skin,updateskin,Modes,auth,updateAuth,skinFont,updateskinFont} = useContext(MainProvider)
    const {TempLinkArray} = useContext(LinkContext)

    return(
        <>
           <div className={`${open === true ? 'content show' : 'content'} ${skin} containerham`}>
            {
                    TempLinkArray.map((element:any)=>{
                        if(auth === true || element.label !== 'PROFILE'){
                            return(
                                <>
                                    <h3 className={` ${skinFont} linkham`} key={element.label}><Link to={'http://127.0.0.1:5173/main' + element.linkTo}>{element.label}</Link></h3>
                                </>
                            )
                        }
                    })
                }
              <h3 className={` ${skinFont} linkham`} key={'logout'}><Link to={auth === true ? '/' : '/Signup'}>{auth === true ? 'LOG OUT?' : 'SIGN IN?' }</Link></h3>
           </div>
        </>
    )
}

const Navbar: React.FC = () => {

    const {skin,updateskin,Modes,auth,updateAuth,skinFont,updateskinFont} = useContext(MainProvider)

    const { height, width } = useWindowDimensions();
    const [open,setopen] = useState(false)
    const navigate = useNavigate();


    const States = {
        blank:'',
        slideout:'slideOutUp',
        slidein: 'slideInDown'
    }

    const [stateham,updatestateham] = useState(States.blank)

    function changeauth(){
        if(auth === true){
            updateAuth(false)
            localStorage.removeItem('jwt')
            window.location.reload()
        }else{
            navigate('/Signup')
        }
    }

    function updateStateHam(){
        if(stateham === States.blank){
            updatestateham(States.slidein)
        }else if(stateham === States.slidein){
            updatestateham(States.slideout)
        }else{
            updatestateham(States.slidein)
        }
    }
 
    if(width > 552){
        return ( 
            <>
                <div className={` ${skin} navbarcontainer`}>
                    <div className="logodiv">
                        {
                            skin === Modes.light ? <img src={logolight} alt="" className="logo" />:
                            <img src={logoDark} alt="" className="logo" />
                        }
                    </div>
                    <div className="linkdivnav">
                        <Links/>
                    </div>
                    <button className={` ${skin} loginoroutbutt`} onClick={()=>{changeauth()}}>{
                        auth === true ? 'Log Out?' : 'Sign In?'
                    }</button>
                </div>
            </>
         );
    }else{
        return(
            <>
                <div className={` ${skin} navbarcontainer`} style={{borderBottom: open === true ? 0 : '1px solid grey'}}>
                    <div className="logodiv">
                        {
                            skin === Modes.light ? <img src={logolight} alt="" className="logo" />:
                            <img src={logoDark} alt="" className="logo" />
                        }
                    </div>
                    <div className="smallmenu" onClick={()=>{setopen(!open); updateStateHam()}}>
                        {
                             skin === Modes.light ? <img src={Blacksmallmenu} alt="" className="smallmenu" />:
                             <img src={Whitesmallmenu} alt="" className="smallmenu" />
                        }
                    </div>
                </div>
              <HamBar open={open} setopen={setopen} states={stateham}/>
            </>
        )
    }
}
 
export default Navbar;







