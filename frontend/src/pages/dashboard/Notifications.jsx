import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';

export default function Notifications() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>Notification</Typography>
      <List>
        {[1,2,3,4,5,6].map((i) => (
          <Box key={i}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={"What is Lorem Ipsum? | Suresh Perera"}
                secondary={"Lorem Ipsum is simply dummy text of the printing and typesetting industry..."}
              />
              <Typography variant="caption" color="text.secondary">2023-12-21 13:56:44</Typography>
            </ListItem>
            <Divider component="li" />
          </Box>
        ))}
      </List>
    </Paper>
  );
}


