import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';

function ContactUs() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };
    
  return (
    <Box
        sx={{
            width: '100%',
            px: 28,
            pt: 10,
        }}
    >
        <Typography sx={{ fontSize: 40, fontWeight: 600, mb: 2 }}>
            Contact Us
        </Typography>
        <Box sx={{ width: 'full', display: 'flex', flexDirection: 'row' }}>
            <Box  component="form" onSubmit={handleSubmit} sx={{ p: 3, width: '40%' }}>
                <TextField
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    size='small'
                    margin="normal"
                    required
                />
                <TextField
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    size='small'
                    margin="normal"
                    required
                />
                <TextField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    fullWidth
                    size='small'
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Submit Message
                </Button>
            </Box>
            <Box sx={{ p: 3, width: '60%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'start',
                        padding: 2,
                        borderRadius: 1,
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: 1 }}>
                        <LocationOn fontSize='large' sx={{ color: 'green', marginRight: 1 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 16 }}>
                            162B, Darlington watta, Hapugala, Galle
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: 1 }}>
                        <Phone fontSize='large' sx={{ color: 'green', marginRight: 1 }} />
                        <Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 16 }}>+94 713 32 6622</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 16 }}>+94 763 19 3321</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: 1 }}>
                        <Email fontSize='large' sx={{ color: 'green', marginRight: 1 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 16 }}>medconnect@gmail.com</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: '300px',
                        mt: 2,
                        mx: 4,
                        borderRadius: 1,
                        overflow: 'hidden',
                        boxShadow: 3,
                    }}
                    className="map-container"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15869.517307084683!2d80.19348984999999!3d6.07948105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1714ef3686d51%3A0xefa58ded723f591!2sHapugala!5e0!3m2!1sen!2slk!4v1717171057977!5m2!1sen!2slk"
                        width="100%"
                        height="100%"
                        style={{ border: 0, borderRadius: '10px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps"
                    ></iframe>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default ContactUs
