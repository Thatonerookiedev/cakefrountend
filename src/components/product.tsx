import React, { useEffect } from "react";
import { MainProvider } from "../contexts/MainContext";
import { useContext } from "react";
import { error } from "console";



type product = {
    name:string,
    price: string,
    img:string
}


const Product: React.FC<product> = ({name = 'cake',price = '10 00',img}) => {

    const {uspdatecart1} = useContext(MainProvider)

    const {skin,Modes,auth,updateAuth,skinFont,updateskinFont} = useContext(MainProvider)

    const cart = localStorage.getItem('cart')

    const Label = {
        strw: 'Strawberry',
        choc: 'Chocolate',
        van: 'Vanilla'
    }

    useEffect(()=>{
        if(!cart){
            localStorage.setItem('cart',JSON.stringify([]))
        }
    },[])

    function Addtocart(name:string,price:string){
        const newcart = localStorage.getItem('cart')
        const cartarry = JSON.parse(newcart)
        // @ts-ignore
        const name1 = cartarry.find((element:object)=> element.label === name)


        if(name1 === undefined){
            const template = {
                label: name,
                quantity: 1,
                price:price.slice(0,2)
            }

            cartarry.push(template)
            console.log('it pushed')
            localStorage.setItem('cart',JSON.stringify(cartarry))
            return uspdatecart1()
        }

        if(name === Label.strw && name1 != undefined || null){
            const objectindex = cartarry.findIndex((object:any)=>{return object === name1})
            cartarry[objectindex].quantity = name1.quantity + 1
            localStorage.setItem('cart' ,JSON.stringify(cartarry))
            return uspdatecart1()
        }else if(name === Label.choc && name1 != undefined || null){
            const objectindex = cartarry.findIndex((object:any)=>{return object === name1})
            cartarry[objectindex].quantity = name1.quantity + 1
            localStorage.setItem('cart' ,JSON.stringify(cartarry))
            return uspdatecart1()
        }else if(name === Label.van && name1 != undefined || null){
            const objectindex = cartarry.findIndex((object:any)=>{return object === name1})
            cartarry[objectindex].quantity = name1.quantity + 1
            localStorage.setItem('cart' ,JSON.stringify(cartarry))
            return uspdatecart1()
        }else{
            return console.log('already in')
        }
    }


    return ( 
        <>
            <div className="product-con">
                <div className="pictureconproduct">
                    <img src={img} alt="" className="imgproduct" />
                </div>
                <h1 className={`productname ${skin}`}>{name}</h1>
                <div className={`bottomproduct ${skin}`}>
                    <button className={`addproduct ${skin}`} onClick={()=>{Addtocart(name,price)}}>+</button>
                    <h6 className="priceproduct">{price}</h6>
                </div>
            </div>
        </>
     );
}
 
export default Product;



