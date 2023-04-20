import {useStripe,useElements} from '@stripe/react-stripe-js'
import {PaymentElement} from '@stripe/react-stripe-js'
import {useState} from 'react'


const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [paymentconfermed,updatepaymentconfermed]= useState('')

    function handlesubmit(){
        updatepaymentconfermed('loading.....')
        setTimeout(()=>{
            updatepaymentconfermed('This is only a portfolio so no money will be taken :)')
        },3000)
    }


    return ( 
        <>
        <div className="confermpayment">{paymentconfermed}</div>
            <div className="paymentmethod">
                <PaymentElement/>
            </div>
            <button className="pay" onClick={()=>{handlesubmit()}}>Pay</button>
        </>
     );
}
 
export default CheckoutForm;






