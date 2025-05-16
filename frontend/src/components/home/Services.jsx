import { Box, Typography } from '@mui/material';
import EmergencyIMG from '../../assets/emergency-care.png';
import PharmacyIMG from '../../assets/pharmacy.png';
import LaboratoryIMG from '../../assets/laboratory.png';

const features = [
  {
    icon: <img src={EmergencyIMG} alt="Emergency Care" style={{ width: 50, height: 50 }} />,
    title: 'Emergency Care',
    description: 'Our team of experienced medical professionals is dedicated to providing the highest quality care.',
  },
  {
    icon: <img src={PharmacyIMG} alt="Pharmacy" style={{ width: 50, height: 50 }} />,
    title: 'Pharmacy',
    description: 'We are available around the clock to address your medical needs and concerns.',
  },
  {
    icon: <img src={LaboratoryIMG} alt="Laboratory" style={{ width: 50, height: 50 }} />,
    title: 'Laboratory',
    description: 'Our commitment to patient satisfaction is reflected in our high satisfaction rates.',
  },
];

const FeatureBox = ({ icon, title, description }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
      margin: 1,
      bgcolor: 'background.paper',
      borderRadius: 8,
      boxShadow: 3,
      width: 242,
      height: 242,
    }}
  >
    {icon}
    <Typography variant="subtitle1" align="center" sx={{ mt: 2, fontSize: 20, fontWeight: 500 }}>
      {title}
    </Typography>
    <Typography variant="body2" align="center" sx={{ mt: 1, fontSize: 14, color: 'text.secondary' }}>
      {description}
    </Typography>
  </Box>
);

function Services() {
  return (
    <Box
        sx={{
            width: '100%',
            px: 28,
            pt: 10,
        }}
    >
        <Typography sx={{ fontSize: 40, fontWeight: 600, mb: 2 }}>
            Services
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', p: 4, gap: 8 }}>
            {features.map((feature, index) => (
                <FeatureBox key={index} icon={feature.icon} title={feature.title} description={feature.description} />
            ))}
        </Box>
    </Box>
  )
}

export default Services
