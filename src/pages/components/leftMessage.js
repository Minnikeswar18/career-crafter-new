

function LeftMessage({ username, time, message }) {
    return (
        <div className="msg left-msg">
            <div
                className="msg-img img-left"
            />
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">{username}</div>
                    <div className="msg-info-time">{time}</div>
                </div>
                <div className="msg-text">
                    {message}
                </div>
            </div>
        </div>

    )
}

export default LeftMessage;