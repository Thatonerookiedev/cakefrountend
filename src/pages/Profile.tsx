import { useContext, useEffect, useState } from "react";
import { MainProvider } from "../contexts/MainContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/ceckoutform";



const ProfileDiv = () => {


   const {skin,updateskin,Modes,auth,updateAuth,skinFont,updateskinFont,MakeOptions,cartparsed,updatecartparsed,cart,updatecart,uspdatecart1} = useContext(MainProvider)

    const [price,updateprice] = useState<any>(0)
    const [stripePromise,updatestripePromise] = useState<any>(null)
    const [clientSecret,updateClientSeceret] = useState('')

    useEffect(()=>{
        const getPublishablekey = async ()=>{
            const key = await axios.get('https://backend-cake.onrender.com/config').then((result)=>{updatestripePromise(loadStripe(result.data.publishablekey))
            })
        }

        getPublishablekey()
    },[])


    
    useEffect(()=>{
        const getPublishablekey = async ()=>{
            const key = await axios.post('https://backend-cake.onrender.com/create-payment-intent',{}).then((result)=>{
                updateClientSeceret(result.data.clientSecret)
            })
        }

        getPublishablekey()
    },[])



    useEffect(()=>{
        function one(){
            let total:any = 0;
            for(let i:any = 0; i < cartparsed.length; i++) {
                let priceparsed:any = JSON.parse(cartparsed[i].price)
                let quantity:any = JSON.parse(cartparsed[i].quantity)
                // @ts-ignore
                total += JSON.parse( priceparsed * quantity)
            }
            uspdatecart1()
            updateprice(total)
        }
        setTimeout(()=>{
            one()
        })
    },[cart])


    
        
    return ( 
        <>
            <div className="profile-con" id='profile'>
                {
                    cart === '[]' ? <h1 className="errorheaddingprofile">Nothing there? Try Reloading!</h1> :cartparsed && cartparsed.map((item: any,index: number)=>{
                        return(
                            <>
                                <div className="flexproductprofile">
                                    <span className="index">{index + 1}</span>
                                    <h6 className="productname">{item.label}</h6>
                                    <span className="quantityprofile">Q. {item.quantity}</span>
                                    <span className="priceprofile">$ {item.price}.00</span>
                                </div>
                            </>
                        )
                    })
                }

                <h6 className="priceprofile1">Total: $ {price}.00</h6>
                
                    
                {
                    stripePromise && clientSecret ?
                    <>
                            <Elements stripe={stripePromise} options={{clientSecret}}>
                                <CheckoutForm/>
                            </Elements>
                        
                    </>:<></>
                    
                }

            </div>
        </>
     );
}
 
export default ProfileDiv;

