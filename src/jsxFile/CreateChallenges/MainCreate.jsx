import '../../cssFile/CreateChallenges-css/MainCreate.css'
import '../../cssFile/Home-css/AddingOneTask.css'
import Back from '../Help/Back'
export default function mainCreate() {

    return (<>
        <div className="top  isFlex">
            <div className='hometop'>
                <Back setIsAdd={() => window.history.back()} />
                <p style={{ textAlign: 'end' }}>
                    Start a Challenge
                    <br />
                    <span>Because Every Challenge Shapes You.</span>
                </p>
            </div>
        </div>
        <div className='maincreate1'>
            helo
            {/* <div className='outhome isFlex'>
                <InputTemp msg='Title of your Task *' typ={1} value={value} setvalue={setvalue} />
                <InputTemp msg='Time line of your Task' typ={2} value={value} setvalue={setvalue} />
                {more ? (
                    <>
                        <div className='morelessinps' onClick={() => setMore(false)}>
                            Less Changes
                        </div>
                        <InputTemp msg='Priority level of your Task' typ={3} value={value} setvalue={setvalue} />
                        <InputTemp msg='Description of your Task' typ={4} value={value} setvalue={setvalue} />
                        <InputTemp msg='A Voice message to your Task' typ={5} value={value} setvalue={setvalue} />
                        <InputTemp msg='Some Images for your Task' typ={6} value={value} setvalue={setvalue} />
                    </>
                ) : (
                    <div className='morelessinps' onClick={() => setMore(true)}>
                        More Changes
                    </div>
                )}

                <div className='btndivinput'>
                    <Button msg='Create Task' fn={() => taskAdd()} typ={1} />
                </div>
            </div> */}
        </div>
        {/* <Loading msg={wait.loadmsg} show={wait.isload} />
        <QuickMsg msg={wait.quick} error={wait.error} /> */}
    </>
    );
}



