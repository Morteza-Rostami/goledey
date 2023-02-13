import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import COLOR from '../../../COLORS/COLORS';

export default function Steps({
  activeStep
}) {
  const theme = useTheme();
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  return (
    <MobileStepper
      variant="dots"
      steps={2}
      position="static"
      activeStep={activeStep}
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        background: COLOR.bg,
      }}
      // nextButton={
      //   <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
      //     Next
      //     {theme.direction === 'rtl' ? (
      //       <KeyboardArrowLeft />
      //     ) : (
      //       <KeyboardArrowRight />
      //     )}
      //   </Button>
      // }
      // backButton={
      //   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
      //     {theme.direction === 'rtl' ? (
      //       <KeyboardArrowRight />
      //     ) : (
      //       <KeyboardArrowLeft />
      //     )}
      //     Back
      //   </Button>
      // }
    />
  );
}