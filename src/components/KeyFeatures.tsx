import React, { ReactHTMLElement, useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Grid from "@mui/material/Grid2";
import OpportunitiesList from './opportunitiesList';
import Calendar from './Calendar';
import OrganizationList from './ListOfOrganization';
import VolunteerList from './ListOfVolunteers';

import { useOpportunities } from '../hooks/useOpportunities';

import { toast } from 'react-toastify';
OpportunitiesList
interface Feature {
  title: string;
  description: string;
  data?:any
}

const KeyFeatures: React.FC = () => {

 const {data:opportunities,isLoading,isSuccess}=useOpportunities();
 const [mappedOpportunities, setMappedOpportunities] = useState<any[]>([]);


  const features: Feature[] = [

    { title: 'Event Calendar', description: 'Stay updated on upcoming community events.',data:isLoading?<CircularProgress/>:<Calendar events={isSuccess?mappedOpportunities:[]}/> },
    { title: 'Organizations', description: 'Volunteer with Our partners.',data:<OrganizationList/> },
    { title: 'Find Opportunities', description: 'Browse and apply for volunteer roles in your area.',data:<OpportunitiesList/> },
    {title:'Meet Skilled Volunteers',description:"",data:<VolunteerList/>}
  
  ];

  useEffect(()=>{
    if(opportunities?.length){
        const mapped = opportunities.map(event => ({
            id: event._id,
            start: event.startDate,
            end: event.endDate,
            title: event.title,
            location:event.location.city +","+event.location.country,
            numberOfVolunteerNeeded:event.numberOfVolunteerNeeded

          }));
          setMappedOpportunities(mapped);
    }
  },[opportunities]);




  return (

    <Box sx={{ my: 4 }}>
     
      <Typography variant="h4" align="center" sx={{color:"primary.main"}} gutterBottom>
        Key Features
      </Typography>
      <Grid container spacing={1}>
        {features.map((feature, index) => (
          <Grid  key={index} size={index%2==0?8:4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{color:"primary.main"}}>
                  {feature.title}
                </Typography>
                {feature.data}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KeyFeatures;