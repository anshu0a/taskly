import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import '../../cssFile/Help-css/Loading.css'
export default function loading({msg ,show}) {
    return ( show && 
        <div className='loadinganytime isFlex'>
           <div className='outanminationloading'>
             <DotLottieReact
                src="https://lottie.host/613326e5-f831-4b3b-8f29-6a9b4f74ebfd/3RJvaApG4z.lottie"
                loop
                autoplay
            />
           </div>
           <p className='loadingmsg'>{msg}</p>
        </div>
    );
};
