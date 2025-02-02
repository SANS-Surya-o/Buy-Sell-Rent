import React from 'react';
import { Typography } from '@mui/material';

const Title = (variant,motto) => {
    console.log(variant.variant);
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
    <Typography variant={variant.variant}
     sx={{
        fontFamily: 'Oswald Variable, sans-serif',
    }}>
    150 RUPIYA
    </Typography>
    </div>
  )
};

export default Title;
