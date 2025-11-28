import ContentLoader from 'react-content-loader'

export default function () {
    return (
        <div className='loadingAtProfile isFlex'>
            <ContentLoader
                className='ContentLoader'
                width={600}
                height={300}
                viewBox="0 0 600 360"
                backgroundColor="#fcecffff"
                foregroundColor="#e9c4ffff"
            >
                <rect x="100" y="290" rx="3" ry="3" width="400" height="10" />
                <rect x="25" y="310" rx="3" ry="3" width="550" height="10" />
                <rect x="50" y="330" rx="3" ry="3" width="500" height="10" />
                <circle cx="300" cy="160" r="100" />
            </ContentLoader>
            <ContentLoader
                className='ContentLoader'
                width={600}
                height={200}
                viewBox="0 0 600 360"
                backgroundColor="#fcecffff"
                foregroundColor="#e9c4ffff"
            >
                <rect x="145" y="5" rx="3" ry="3" width="90" height="80" />
                <rect x="255" y="5" rx="3" ry="3" width="90" height="80" />
                <rect x="365" y="5" rx="3" ry="3" width="90" height="80" />

            </ContentLoader>
        </div>
    )
}