
import React, { useState } from 'react'

function detail(props) {

    const { uid } = props.params;
    const { number } = props.searchParams;

    

    return (
        <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className='text-9xl'>
                {uid}

                <br/>
                
            </h1>
        </div>
    )
}

export default detail