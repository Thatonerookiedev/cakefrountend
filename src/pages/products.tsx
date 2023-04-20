import Product from "../components/product";
import { MainProvider } from "../contexts/MainContext";
import { useContext } from "react";
import choccake from '../assets/productimgs/choc cake.jpg'
import vancake from '../assets/productimgs/vanilla (1).jpg'
import strawcake from '../assets/productimgs/strawberry.jpg'

const ProductsDiv = () => {

    const {skin,Modes,auth,updateAuth,skinFont,updateskinFont} = useContext(MainProvider)

    return ( 
        <>
            <div className="productsdiv" id='cakes' style={{flexDirection: 'row'}}>
             <Product name="Strawberry" price="15 00" img={strawcake}/>
             <Product name="Chocolate" price="20 00" img={choccake}/>
             <Product name="Vanilla" price="10 00" img={vancake}/>
            </div>
        </>
     );
}
 
export default ProductsDiv;




