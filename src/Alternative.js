import React, { useState, useEffect } from 'react';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
import Header from './Header'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export default function Alternative() {

    const [people, setPeople] = useState(data)
    const [index, setIndex] = useState(0)

    function prevSlide(){
        setIndex(oldIndex => {
            let index = oldIndex - 1
            if(index < 0){
                index = people.length - 1
            }
            return index
        })
    }
    
    function nextSlide(){
        setIndex(oldIndex => {
            let index = oldIndex + 1
            if(index > people.length - 1){
                index = 0
            }
            return index
        })
    }

    useEffect(() => {
        let slider = setInterval(() => { 
            setIndex(oldIndex => {
                let index = oldIndex + 1
                if(index > people.length - 1){
                    index = 0
                }
                return index
            })
        }, 5000)
        return ()=> {
            clearInterval(slider)
        }
    }
        
    , [index, people])


    return (
        <section className="section">
            <Header />
            <div className="section-center">
                {
                    people.map((person, personIndex)=>{
                        const {id, image, name, title, quote} = person

                        let position = "nextSlide"
                        
                        if(personIndex === index) {
                            position = "activeSlide"
                        }

                        if(personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)){
                            position = "lastSlide"
                        }

                        return ( 
                            <article key={id} className={position} >
                                <img src={image} alt={name} className="person-img" />
                                <h4>{name}</h4>
                                <p className="title">{title}</p>
                                <p className="text">{quote}</p>
                                <FaQuoteRight className="icon"/>
                            </article>
                        )
                    })
                }
                <button className="prev" onClick={prevSlide} ><FiChevronLeft /></button>
                <button className="next" onClick={nextSlide} ><FiChevronRight /></button>
            </div>
        </section>
    )
}
