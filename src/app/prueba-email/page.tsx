"use client"

import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function Home() {
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      console.log("ok");
    } else {
      console.log("not ok");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}
      >
        <Typography variant="h4" component="h1" textAlign="center">
          Enter Your Name
        </Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </main>
  );
}