import React, { useEffect, useState } from "react";
import { Button, Paper, Typography, TextField } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContext";
import { addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import "../styles/Home.css";

const Home = () => {
    const { user, logOut } = useUserAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { getMessagesDB } = useUserAuth();
    const messagesDB = getMessagesDB();

    useEffect(() => {
        const queryMessages = query(messagesDB, orderBy("timestamp"));

        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newMessage === "") return;

        await addDoc(messagesDB, {
            text: newMessage,
            timestamp: serverTimestamp(),
            sender: user.email
        });

        e.target.reset();
        setNewMessage("");
    }

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <Paper className="messageBox">
                {messages.map((message) => (
                    <div>
                        <Typography>{message.sender}</Typography>
                        {(user.email === message.sender) ? 
                            <Paper elevation={4} className="yourMessage" >
                                <Typography>{message.text}</Typography>
                            </Paper>
                            : <Paper elevation={4} className="message" >
                                <Typography>{message.text}</Typography>
                            </Paper>
                        }
                    </div>
                ))}
            </Paper>

            <form className="submitBox" onSubmit={handleSubmit}>
                <TextField fullWidth onChange={(e) => setNewMessage(e.target.value)} />
                <Button type="submit">Send</Button>
            </form>

            <Button type="submit" variant="contained" fullWidth color="primary" onClick={handleLogOut}>Log Out</Button>
        </div>
    );
};

export default Home;