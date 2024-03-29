
function RightMessage({ message, time, username }) {
    return (
        <div className="msg right-msg">
            <div
                className="msg-img img-right"
                style={{
                    backgroundImage:
                        "url(https://image.flaticon.com/icons/svg/145/145867.svg)"
                }}
            />
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">{username}</div>
                    <div className="msg-info-time">{time}</div>
                </div>
                <div className="msg-text">{message}</div>
            </div>
        </div>

    );
}

export default RightMessage;