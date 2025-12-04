import '../../cssFile/ViewChallenges-css/Progress.css'
import { useState, useEffect } from 'react'
export default function ({ allThings }) {
    const [data, setDate] = useState({ prog: 0 })
    useEffect(() => {
        setDate((pre) => ({ ...pre, prog: Math.ceil(100 - ((allThings.dare.days - allThings.streek) * 100 / allThings.dare.days)) }))
    }, [allThings.streek])
    return (
        <div className="progressDare isFlex">
            <div className='mainBoundry isFlex'>
                <p className='blurpp'>In just <span>{allThings.streek}</span> of <span>{allThings.dare.days}</span> days completed, remarkable progress shines, inspiring you to conquer the remaining days with full energy.</p>
                <div style={{ background: `conic-gradient(rgb(0, 123, 255) 0% ${data.prog}%, rgba(255, 255, 255, 0)  ${data.prog}% 100%)` }} className='circleIt isFlex'>
                    <div className='ohcome isFlex'>
                        <p className='ppmm pclas isFlex'>{data.prog}%</p>
                    </div>
                </div>
            </div>
        </div>

    )
}