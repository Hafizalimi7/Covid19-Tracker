import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './infoBox.css'

const infoBox = ({ title, cases, total }) => {
    return (
      <Card className="infoBox">
        <CardContent>
          <Typography
            className="info_title"
            color="textSecondary">
          {title}</Typography>
          <h2 className="infoBox_cases">{cases}</h2>
          <Typography
              className="infoBox_total"
              color="textSecondary">
                {total} Total</Typography>
        </CardContent>
      </Card>
    )
}

export default infoBox