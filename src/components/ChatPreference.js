
const ChatPreference = ({mobilityChecked}) => {

    return (
        <div id='1' className='col-xl-12 col-lg-12 col-md-12 col-sm-12 isotope-item expense' style={{ position: 'relative', left: '0px', top: '0px' }}>
            <div className="item-body">
                <div className="item-data">
                    <div className="col-xl-9 col-lg-9 col-6 item-name-conainer">
                        <span data-id="1" className="name">Chat with Mobility Portal</span>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-6 item-value-container">
                        <input data-id="1" type="checkbox" className="js-switch" name="selectChatPreference" data-switchery="true" onClick={(e) => mobilityChecked(e)} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ChatPreference;