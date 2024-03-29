import '../../styles/components/joinedBanner.css';

function JoinedBanner({ message }) {
    return (
        <div className="msg center-msg">
            <div className="msg-bubble center-bubble">
                <div className="msg-info center-msg-info">
                    <div className="msg-info-name center-msg-info-name">{message}</div>
                </div>
            </div>
        </div>
    )
}

export default JoinedBanner;