import {createContext,useState} from 'react'

export const MainProvider = createContext<any>({})





const MainProviderContext = ({children}:{children:any}) => {

    const Modes = {
        light : 'Lightmode',
        dark: 'Darkmode',
        darkFont: 'DarkmodeFont',
        lightFont: 'LightmodeFont'
      }
    
      const [skin,updateskin] = useState(Modes.dark)
      const [skinFont,updateskinFont] = useState(Modes.darkFont)
      const [auth,updateAuth] = useState(false)

      const [cart,updatecart]  = useState(localStorage.getItem('cart') )
      let [cartparsed,updatecartparsed] = useState(JSON.parse(cart))

      function uspdatecart1(){
        updatecart(localStorage.getItem('cart'))
        updatecartparsed(JSON.parse(localStorage.getItem('cart')))
      }

      function MakeOptions(method = 'Post',body:any ){
        return {
            Method : method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
          }
      }


    return ( 
        <>
            <MainProvider.Provider value={{skin,updateskin,Modes,auth,updateAuth,skinFont,updateskinFont,MakeOptions,cartparsed,updatecartparsed,cart,updatecart,uspdatecart1}}>

                {children}

            </MainProvider.Provider>
        </>
     );
}
 
export default MainProviderContext;









