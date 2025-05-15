import { Box, Typography } from '@mui/material';
import teamIMG from '../../assets/team.png';
import twentyFourIMG from '../../assets/time-twenty-four.png';
import feedbackIMG from '../../assets/feedback.png';
import medicalIMG from '../../assets/medical.png';

const features = [
  {
    icon: <img src={teamIMG} alt="Professional Medical Team" style={{ width: 60, height: 60 }} />,
    title: 'Professional Medical Team',
  },
  {
    icon: <img src={twentyFourIMG} alt="24/7 Medical Support" style={{ width: 60, height: 60 }} />,
    title: '24/7 Medical Support',
  },
  {
    icon: <img src={feedbackIMG} alt="99% Patient Satisfaction Rate" style={{ width: 60, height: 60 }} />,
    title: '99% Patient Satisfaction Rate',
  },
  {
    icon: <img src={medicalIMG} alt="Patient Centered Care" style={{ width: 60, height: 60 }} />,
    title: 'Patient Centered Care',
  },
];

const FeatureBox = ({ icon, title }) => (
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
  </Box>
);

function AboutUs() {
  return (
    <Box
      sx={{
        width: '100%',
        px: 28,
        pt: 10,
      }}
    >
      <Typography sx={{ fontSize: 40, fontWeight: 600, mb: 2 }}>
        Why Choose Us
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', p: 4, gap: 4 }}>
        {features.map((feature, index) => (
          <FeatureBox key={index} icon={feature.icon} title={feature.title} />
        ))}
      </Box>
      <Typography sx={{ fontSize: 40, fontWeight: 600, mb: 2, mt: 4 }}>
        Who We Are
      </Typography>
      <Typography sx={{ fontSize: 20, fontWeight: 400, }} align="justify">
        Dr. P. P. Wijesekara Medical Center, located at 162B, Darlinton Watta, Hapugala, Galle, Sri Lanka, is your trusted partner for comprehensive treatment services addressing 
        everyday ailments. Our experienced team is committed to delivering personalized care and fostering health, and vitality. Choose us for a dedicated approach to your medical 
        needs, as we strive to impact your journey to wellness positively.
      </Typography>
    </Box>
  );
}

export default AboutUs;
