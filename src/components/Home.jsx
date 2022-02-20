import React from 'react'
import Drawing from "./Drawing"

function Home() {
    return (
        <div>
            <title>Skvost-post</title>
            <div className='new'>

                <label htmlFor="">Novej obrázek</label>
                <input type="text" placeholder='Název' />


            </div>
        </div>
    )
}

export default Home