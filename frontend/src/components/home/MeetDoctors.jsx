import { useEffect, useState } from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import { getDoctorList } from '../../services/doctorService';
import { getProfilePicture } from '../../services/mediaService';

const DoctorCard = ({ name, specialty, email, image }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2,
      margin: 1,
      borderRadius: 4,
      boxShadow: 3,
      width: 200, // Fixed width for each card
    }}
  >
    <CardMedia
      component="img"
      image={image}
      alt={name}
      sx={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        border: '2px solid #4CAF50',
        marginBottom: 2,
      }}
    />
    <Typography variant="h6" align="center">
      {name}
    </Typography>
    <Typography variant="body2" align="center" color="text.secondary">
      {email}
    </Typography>
    <Typography variant="subtitle1" align="center" color="text.secondary">
      {specialty}
    </Typography>
  </Card>
);

function MeetDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const filterData = {
          page: 1,
          limit: 10,
          search: '',
          softDelete: false,
        };
        console.log('Filter Data:', filterData);
        const response = await getDoctorList(filterData);
        setDoctors(response.data.doctors);
        console.log('Doctors:', response.data.doctors);

        // Fetch profile pictures for each doctor
        const urls = {};
        for (const doctor of response.data.doctors) {
          if (doctor.profilePicture) {
            const imageResponse = await getProfilePicture(doctor.profilePicture);
            urls[doctor.profilePicture] = URL.createObjectURL(imageResponse.data);
          }
        }
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to fetch doctors. Please try again later.');
      }
    };

    fetchDoctors();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        px: 28,
        pt: 10,
      }}
    >
      <Typography sx={{ fontSize: 40, fontWeight: 600, mb: 2 }}>
        Meet Our Doctors
      </Typography>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          p: 4,
          gap: 2,
          maxWidth: 900, // Adjust this value to fit your layout needs
          margin: 'auto', // Center the container
        }}
      >
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            name={`${doctor.firstName} ${doctor.lastName}`}
            specialty={doctor.specialization}
            email={doctor.email}
            image={imageUrls[doctor.profilePicture] || ''} // Use the fetched image URL
          />
        ))}
      </Box>
    </Box>
  );
}

export default MeetDoctors;