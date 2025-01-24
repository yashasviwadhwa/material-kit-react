import React, { useEffect, useState } from "react";
import { useFirebase } from "../Context/FirebaseContext"; // Fixed typo in the import path
import { Card, CardContent, Typography, Box } from "@mui/material";

interface User {
    id: string;
    firstName?: string;
    email?: string;
}

const Student: React.FC = () => {
    const { getDataFromFirestore } = useFirebase();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getDataFromFirestore("users");
                setUsers(usersData);
                
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [getDataFromFirestore]);

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Users
            </Typography>
            {loading ? (
                <Typography>Loading users...</Typography>
            ) : users.length > 0 ? (
                users.map((user) => (
                    <Card key={user.id} variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography>
                                <strong>Name:</strong> {user.firstName || "Anonymous User"}
                            </Typography>
                            <Typography>
                                <strong>Email:</strong> {user.email || "No email provided"}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No users found.</Typography>
            )}
        </Box>
    );
};

export default Student;
