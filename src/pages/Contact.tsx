import { useState } from "react";


const ContactPage = () => {


    const [sent,updatesent] = useState('')
    const [number,updatenumber] = useState(1)

    function submit(){
        updatenumber(number + 1)
        return updatesent(`Thank you for the message you sent it to me ${number} times!`)
    }

    return ( 
        <>
            <div id="contact" className="contact-con">
                <h1 className="contact-head">Contact Us!</h1>
                <div className="sent">{sent}</div>
                <div className="info-contact">
                    <h3 className="label-con">Name</h3>
                    <input type="text" className="contactinput" />
                    <h3 className="label-con">Message</h3>
                    <textarea name="textarea" className="contactinput" cols={30} rows={10}></textarea>
                    <button className="submitcontact" onClick={()=>{submit()}}>Sumbit</button>
                    
                </div>
            </div>
        </>
     );
}
 
export default ContactPage;