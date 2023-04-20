import React, { useContext, useEffect, useState } from "react";
import { MainProvider } from "../contexts/MainContext";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";


type label ={
    label: string,
    model: object,
    emailerror?: string,
    usernameerror?: string,
    passworderror?: string,
    email?:any,
    password?: any
    username?:any
}



const Meat:React.FC<label> = ({
    label,
    model,
    emailerror = '',
    usernameerror = '',
    passworderror = '',
    email,
    password,
    username
})=>{

    
  const authlabels = {
    signup : 'Sign Up',
    login : 'Log In'
  }

    const {skin,Modes,auth,updateAuth,skinFont,updateskinFont} = useContext(MainProvider)

    return(
        <>
                    

                   {
                    label === authlabels.signup ?  <><h1 className="labelauth" style={{fontSize:'1.5rem'}}>Email</h1><input type="text" className={` ${skin} formfields`} placeholder="Email" onChange={(e)=>{email(e.target.value)}} /><div className="error">{emailerror}</div></> : <></>
                   }

                    <h1 className="labelauth" style={{fontSize:'1.5rem'}}>Username</h1>

                    <input type="text" className={` ${skin} formfields`} placeholder="Username" onChange={(e)=>{username(e.target.value)}} />

                    <div className="error">{usernameerror}</div>

                    <h1 className="labelauth" style={{fontSize:'1.5rem'}}>Password</h1>

                    <input type="password" className={` ${skin} formfields`} placeholder="Password" onChange={(e)=>{password(e.target.value)}} />

                    <div className="error">{passworderror}</div>

        </>
    )
}

async  function submitSignup(email:any,password:any,username:any,loadingupdate:any,optionsMaker:any,Labels:any,emailerrorupdate:any,passworderrorupdate:any,usernameerrorupdate:any,auth:any,navagate:any){
    
            
    const body:any = {
        email: email,
        password: password,
        username: username
    }

    const options: any = optionsMaker(body)

    await fetch('https://backend-cake.onrender.com/signUp',options).then(response=>{return response.clone()}).then(async (response)=>{
          //console.log(response)// this is response from server, including all ok and error responses 

          if(response.ok){
                loadingupdate(false)
                auth(true)
                const body = await response.json()
                localStorage.setItem('jwt',body.jwt)
                navagate('/')
        }else{
               setTimeout(()=>{
                loadingupdate(false)
               },2000)

            response.json().then((response)=>{
                const message = response
                if(message.cause === Labels.emailAndPassword){
                    emailerrorupdate(message.message)
                    passworderrorupdate(message.message)
                }else if(message.cause === Labels.email){
                    emailerrorupdate(message.message)
                }else if(message.cause === Labels.username){
                    usernameerrorupdate(message.message)
                }else if(message.cause === 'All' || 'all'){
                    emailerrorupdate(message.message)
                    passworderrorupdate(message.message)
                    usernameerrorupdate(message.message)
                }
            }) 

        }
    })

}

async  function submitLogin(email:any,password:any,username:any,loadingupdate:any,optionsMaker:any,Labels:any,emailerrorupdate:any,passworderrorupdate:any,usernameerrorupdate:any,auth:any,navagate:any){
    
            
    const body:any = {
        password: password,
        username: username
    }

    const options: any = optionsMaker(body)

    await fetch('https://backend-cake.onrender.com/login',options).then(async response=>{
        //console.log(response)// this is response from server, including all ok and error responses 
        if(response.ok){
            loadingupdate(false)
            auth(true)
            const body = await response.json()
            localStorage.setItem('jwt',body.jwt)
            navagate('/')
        }else{
               setTimeout(()=>{
                loadingupdate(false)
               },2000)

            response.json().then((response)=>{
                const message = response
                if(message.cause === Labels.emailAndPassword){
                    emailerrorupdate(message.message)
                    passworderrorupdate(message.message)
                }else if(message.cause === Labels.email){
                    emailerrorupdate(message.message)
                }else if(message.cause === Labels.username){
                    usernameerrorupdate(message.message)
                }else if(message.cause === 'All' || 'all'){
                    emailerrorupdate(message.message)
                    passworderrorupdate(message.message)
                    usernameerrorupdate(message.message)
                }
            }) 

        }
    })

}


const Auth: React.FC<label> = ({
    label,
    model
}) => {

   function optionsMaker(body:any){
        return  {
            method: 'POST',
            credentials: "same-origin",
            mode: 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(body)
        }
   }

 

    const {skin,Modes,auth,updateAuth,skinFont,updateskinFont} = useContext(MainProvider)

    const authlabels = {
        signup : 'Sign Up',
        login : 'Log In'
      }

      const navagate = useNavigate()

      const [emailerror,emailerrorupdate] = useState('')
      const [passworderror,passworderrorupdate] = useState('')
      const [usernameerror,usernameerrorupdate] = useState('')

      const [email,emailupdate] = useState('')
      const [password,passwordupdate] = useState('')
      const [username,usernameupdate] = useState('')

      const [loading,loadingupdate] = useState<boolean>(false)

      const Labels = {
        emailAndPassword: 'EmailandPassword',
        username: 'username',
        email:'email',
        all: 'All'
      }

      function clearError(){
        usernameerrorupdate('')
        passworderrorupdate('')
        emailerrorupdate('')
      }

      async function submit(){
        if(label === authlabels.login){
            console.log(`This is password: ${password} \n This is username: ${username}`)

            submitLogin(email,password,username,loadingupdate,optionsMaker,Labels,emailerrorupdate,passworderrorupdate,usernameerrorupdate,updateAuth,navagate)

        }else{
             submitSignup(email,password,username,loadingupdate,optionsMaker,Labels,emailerrorupdate,passworderrorupdate,usernameerrorupdate,updateAuth,navagate)
            
        }
      }

      
      return ( 
        loading === true ? <><div className={` ${skin} bigcontainer`}><h1 className="loading">Loading...</h1></div></> : <>
                <div className={` ${skin} bigcontainer`}>
                    <div className="main-consign">
                        <h1 className="labelauth">{label}</h1>

                    <Meat label={label} model={model} passworderror={passworderror} emailerror={emailerror} usernameerror={usernameerror} username={usernameupdate} password={passwordupdate} email={emailupdate}/>

                        <button className="submitsign" onClick={()=>{loadingupdate(true),submit(),clearError()}}>Submit</button>
                </div>
                <div className="linksign" onClick={()=>{clearError();label === authlabels.login ? navagate('/Signup') : navagate('/Login')}}>{label === authlabels.signup ? 'Aready SignedUP?' : 'No account?'}</div>
                    </div>
            </>
        
    );
}
 
export default Auth;



