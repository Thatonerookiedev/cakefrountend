import {Route,Routes} from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import MainProviderContext, { MainProvider } from '../contexts/MainContext'
import Skinbutton from '../components/Skinbutton'
import HomePage from '../pages/homepage'
import Auth from '../pages/Signup'
import FAQ from '../pages/FAQ'
import Product from '../components/product'
import ProductsDiv from '../pages/products'
import ContactPage from '../pages/Contact'
import ProfileDiv from '../pages/Profile'
import axios from 'axios'

function App() {

  const {skin,updateskin,updateskinFont,auth,updateAuth} = useContext(MainProvider)

  const authlabels = {
    signup : 'Sign Up',
    login : 'Log In'
  }

  useEffect(()=>{
    const skinlocal = localStorage.getItem('skin')
    const skinfontlocal = localStorage.getItem('skinFont')
    if(skinfontlocal && skinlocal){
      updateskinFont(skinfontlocal)
      updateskin(skinlocal)
      console.log(window.location.origin.toString())
    }
  },[])

  useEffect(()=>{

    const jwt = localStorage.getItem('jwt')

    const verifyJWT = async (jwt:string)=>{

      const postjwt = await axios.post('https://backend-cake.onrender.com/jwtverify',{
        jwt
      })

      return postjwt.data.user

    }

    const ifcheck = async ()=>{
      if(!jwt || jwt === ''){
        updateAuth(false)
      }else{
        if(verifyJWT(jwt) !== null){
          updateAuth(true)
          const user = await verifyJWT(jwt)
          localStorage.setItem('user', JSON.stringify(user))
        }
      }
    }

    ifcheck()
    
  },[])

  return (
   <>
        <div className={` ${skin} containermain`}>
          <Routes>

                <Route path='/' element={
                  <>
                     <Navbar/>
                     <HomePage/>
                    <Skinbutton/>
                  </>
                }/>

                <Route path='/Signup' element={
                  <>
                      <Auth label={authlabels.signup} model={authlabels}/>
                  </>
                }/>

                <Route path='/Login' element={
                  <>
                      <Auth label={authlabels.login} model={authlabels}/>

                  </>
                }/>


                <Route path='/main' element={
                  <>
                    <Navbar/>
                    <FAQ/>
                    <ProductsDiv/>
                    <Skinbutton/>
                    <ContactPage/>
                    {
                      auth === true ? <ProfileDiv/> : <></>
                    }
                  </>
                }/>

                <Route path='*' element={
                  <>
                    <h1>not a route bro</h1>
                  </>
                }/>

                <Route path='/test' element={
                  <>

                  </>
                }/>

          </Routes>
        </div>

   </>
  )
}

export default App
