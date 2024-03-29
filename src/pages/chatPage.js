import { useParams } from "react-router-dom";
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import '../styles/chatPage.css';
import NotFoundPage from "./notFoundPage";
import RightMessage from "./components/rightMessage";
import LeftMessage from "./components/leftMessage";
import JoinedBanner from "./components/joinedBanner";

function ChatPage() {
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const { username, roomId } = useParams();
    const [isError, setIsError] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!roomId) {
            setIsError(true);
            return;
        }

        const newSocket = io(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}`);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [roomId]);

    useEffect(() => {
        if (socket && roomId) {
            socket.emit('joinRoom', { roomId, username });
            setMessages(prevMessages => [...prevMessages, <JoinedBanner key={prevMessages.length} message={"You have joined the chat"} />]);
        }
    }, [socket, roomId]);

    useEffect(() => {
        if (socket) {
            socket.on("receiveMessage", (messageContent) => {
                const { username, message, time } = messageContent;
                setMessages(prevMessages => [...prevMessages, <LeftMessage key={prevMessages.length} username={username} message={message} time={time} />]);
            });

            socket.on("joined", (username) => {
                setMessages(prevMessages => [...prevMessages, <JoinedBanner key={prevMessages.length} message={`${username} has joined the chat`} />]);
            })
        }
    }, [socket]);

    const sendMessage = async (event) => {
        event.preventDefault();
        if (!message.trim()) return;
        const date = new Date();
        const messageObject = {
            username,
            message,
            roomId,
            time: `${date.getHours()}:${date.getMinutes()}`
        }
        socket.emit('sendMessage', messageObject);
        setMessages(prevMessages => [...prevMessages, <RightMessage key={prevMessages.length} username={username} message={message} time={messageObject.time} />]);
        setMessage('');
    };

    if (isError) {
        return <NotFoundPage />;
    }

    return (
        <div>
            <div className="chat-main">
                <section className="msger">
                    <header className="msger-header">
                        <div className="msger-header-title">
                            <i className="fas fa-comment-alt" /> Live Chat
                        </div>
                    </header>
                    <main className="msger-chat">
                        {messages}
                    </main>
                    <form className="msger-inputarea" onSubmit={sendMessage}>
                        <input
                            type="text"
                            className="msger-input"
                            placeholder="Enter your message..."
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                        <button type="submit" className="msger-send-btn">
                            Send
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default ChatPage;
