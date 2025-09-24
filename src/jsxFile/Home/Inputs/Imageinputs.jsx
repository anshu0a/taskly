import React from 'react';
import '../../../cssFile/Home-css/AddingONeTask.css';

export default function ImageInput({ value, setvalue }) {

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 4); // max 4 images

        // keep file objects + preview urls
        const imageFiles = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setvalue((pre) => ({
            ...pre,
            images: [...(pre.images || []), ...imageFiles]
        }));
    };

    function cutImg(ind) {
        setvalue((pre) => ({
            ...pre,
            images: pre.images.filter((_, index) => index !== ind)
        }));
    }

    return (
        <div className="maininps isFlex" style={{ gap: '10px' }}>
            <div className='imgdiv'>
                {value.images?.map((imgObj, index) => (
                    <div key={index} className="onediv">
                        <img src={imgObj.preview} alt="preview" />
                        <svg onClick={() => cutImg(index)} className='cutimg' viewBox="0 0 24 24">
                            <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.71,12.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.42,9.71,15.71a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.58,12,8.29,9.71A1,1,0,0,1,9.71,8.29L12,10.58l2.29-2.29a1,1,0,0,1,1.42,1.42L13.42,12Z"></path>
                        </svg>
                    </div>
                ))}
            </div>

            <input
                id="inpimg"
                hidden
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
            />
            <label htmlFor='inpimg' className='importImg'>
                <svg className='downl' viewBox="0 0 24 24" fill="none">
                    <path d="M20 15V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18L4 15M8 11L12 15M12 15L16 11M12 15V3" stroke="#ffffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p>Import From Device</p>
            </label>
        </div>
    );
}
