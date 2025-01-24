import React from "react";
import { useFirebase } from "src/Context/FirebaseContext";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Logout: React.FC = () => {
    const { logout } = useFirebase();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            alert("You have been logged out successfully.");
            navigate("/sign-in", { replace: true })
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred while logging out. Please try again.");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4, justifyContent: "center", height: "100vh", width: "100%" }}>
            <Typography variant="h3" gutterBottom>
                You Can Logout
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                sx={{ mt: 2 }}
            >
                Logout
            </Button>
        </Box >
    );
};

export default Logout;
