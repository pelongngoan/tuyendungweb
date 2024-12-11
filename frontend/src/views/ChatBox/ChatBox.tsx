import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import { Reply, Close } from "@mui/icons-material"; // Import Close icon
import questionApi from "../../api/question";
import { useAuth } from "../../context/useAuth";
import dayjs from "dayjs";

interface Message {
  id: string;
  text: string;
  role?: "USER" | "ADMIN";
  senderId: string;
  senderFirstName?: string;
  senderLastName?: string;
  senderAvatar?: string;
  timestamp?: string;
  replyingToUser?: string;
  replyingToMessage?: string;
}

const ChatBox: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const currentUserId = user?.id;

  // Create a ref to track the original question to scroll to it
  const messageRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  useEffect(() => {
    questionApi.getQuestions((data) => {
      setMessages(data as Message[]);
    });
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: String(Date.now()),
      text: input,
      role: user?.role || "USER", // Fallback to "USER" if role is undefined
      senderId: currentUserId!,
      senderFirstName: user?.firstName,
      senderLastName: user?.lastName,
      senderAvatar: user?.imageUrl || "",
      timestamp: new Date().toISOString(),
      replyingToUser: replyingTo
        ? `${replyingTo.senderFirstName || ""} ${
            replyingTo.senderLastName || ""
          }`.trim()
        : "",
      replyingToMessage: replyingTo?.text || "",
    };

    try {
      await questionApi.addQuestion(newMessage);
      setInput("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };

  const handleCancelReply = () => {
    setReplyingTo(null); // Clear the reply state
  };

  const scrollToMessage = (messageId: string) => {
    const messageElement = messageRefs.current[messageId];
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 2, maxWidth: 1000, margin: "auto", marginTop: 4 }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Đặt câu hỏi với Admin
      </Typography>
      <Divider />
      <Box
        sx={{
          maxHeight: 400,
          overflowY: "auto",
          marginTop: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          padding: 2,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <List>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              ref={(el) => (messageRefs.current[message.id] = el)}
              sx={{
                display: "flex",
                justifyContent:
                  message.senderId === currentUserId
                    ? "flex-end"
                    : "flex-start",
                marginBottom: 2,
              }}
            >
              {message.senderId !== currentUserId && (
                <Avatar
                  src={message.senderAvatar}
                  alt="Sender Avatar"
                  sx={{ marginRight: 1 }}
                />
              )}

              <Box
                sx={{
                  maxWidth: "70%",
                  padding: 2,
                  borderRadius: 2,
                  backgroundColor:
                    message.senderId === currentUserId ? "#d9f2ff" : "#ffffff",
                  boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    color:
                      message.senderId === currentUserId
                        ? "#004085"
                        : "#495057",
                    marginBottom: 0.5,
                  }}
                >
                  {message.senderFirstName} {message.senderLastName}
                </Typography>

                {message.replyingToMessage && (
                  <Box
                    sx={{
                      padding: 1,
                      backgroundColor: "#f0f8ff",
                      borderLeft: "3px solid #007bff",
                      marginBottom: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      Trả lời: {message.replyingToMessage}
                    </Typography>
                  </Box>
                )}

                <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                  {message.text}
                </Typography>

                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{
                    display: "block",
                    textAlign: "right",
                    marginTop: 1,
                    fontSize: "0.75rem",
                  }}
                >
                  {dayjs(message.timestamp).format("HH:mm A")}
                </Typography>

                {message.senderId !== currentUserId && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: -35,
                      transform: "translateY(-50%)",
                      "&:hover": { color: "#007bff" },
                    }}
                    onClick={() => handleReply(message)}
                  >
                    <Reply />
                  </IconButton>
                )}
              </Box>

              {message.senderId === currentUserId && (
                <Avatar
                  src={message.senderAvatar}
                  alt="Your Avatar"
                  sx={{ marginLeft: 1 }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      {replyingTo && (
        <Box sx={{ marginTop: 2, padding: 2 }}>
          {/* Display the original message being replied to */}
          <Box
            sx={{
              marginBottom: 2,
              padding: 1,
              backgroundColor: "#e0e0e0",
              borderRadius: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              color="primary"
              fontWeight="bold"
              sx={{ marginBottom: 1 }}
            >
              Trả lời:{" "}
              <span
                style={{ fontStyle: "italic", cursor: "pointer" }}
                onClick={() => scrollToMessage(replyingTo.id)}
              >
                {replyingTo.text}
              </span>
            </Typography>
            <IconButton onClick={handleCancelReply}>
              <Close />
            </IconButton>
          </Box>

          {/* Text input and send button */}
          {/* <Box
            sx={{
              padding: 2,
              backgroundColor: "#f9f9f9",
              borderRadius: 1,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Nhập tin nhắn của bạn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Box> */}
        </Box>
      )}
      <Box
        display="flex"
        sx={{
          marginTop: 2,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
          padding: 1,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Nhập tin nhắn của bạn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ flex: 1, marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            padding: "8px 20px",
            fontWeight: "bold",
          }}
        >
          Gửi
        </Button>
      </Box>
      <Divider sx={{ marginY: 2 }} />
    </Paper>
  );
};

export default ChatBox;
