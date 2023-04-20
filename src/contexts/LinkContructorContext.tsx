
import {createContext,useState} from 'react'

export const LinkContext = createContext<any>({})



const ContextWrapperLinks = ({children}:{children:any}) => {

    class Link {
        label: any
        linkTo: any
        constructor(label:any,linkTo: any){
            this.label = label
            this.linkTo = linkTo
        }
    }

    const TempLinkArray = [new Link('FAQ','#faq'),new Link('CAKES','#cakes'),new Link('CONTACT','#contact'),new Link('PROFILE','#profile')]
    return(
        <>
            <LinkContext.Provider value={{TempLinkArray}}>
                {children}
            </LinkContext.Provider>
        </>
    )
}

export default ContextWrapperLinks ;


