import { useState } from "react";



const Questions = [
    {
        id: 1,
        question: 'How much are your cakes',
        answer: 'The answer varies. They are on average $20!'
    },
    {
        id: 2,
        question: 'How long have you been in business',
        answer: 'We have been in bussiness 1 year!'
    },
    {
        id: 3,
        question: 'Why should i signup',
        answer: 'You should signup so that we may give you exclusive deals!'
    }
]




const FAQ = () => {

    const [togglequestion,questionupdate] = useState<any>(null)

    function button(i:number){

        if(i === togglequestion){
           return questionupdate(null)
        }

        if(i){
           questionupdate(null)
        }

        return questionupdate(i)
    }

    return ( 
        <>
            <div id="faq" className="faq-con">
                <h1 className="faq-headder">You’ve got questions we’ve got answers</h1>
                {
                    Questions.map((item,index)=>{
                        return <>
                            <div className="con-quest" key={index}>
                                <span className="buttonfaq" onClick={()=>{button(index)}}>{
                                    togglequestion === index ? '-' : '+'
                                }</span>
                                <h4 className="question">{item.question + '?'}</h4>
                            </div>
                            <div key={index + 10} className={ togglequestion === index ? 'content show' : 'content'}>{item.answer}</div>
                        </>
                    })
                }
            </div>
        </>
     );
}
 
export default FAQ;



