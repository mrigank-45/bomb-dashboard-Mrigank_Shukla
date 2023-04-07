import React, { useMemo } from 'react';
import styles from './dashboard.module.css'
import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';
import Bomb_finance from './components/Bomb_finance';
import Boardroom_news from './components/Boardroom_news';
import Bomb_farms from './components/Bomb_farms';
import Bbond from './components/Bbond.tsx';
import HomeImage from '../../assets/img/background.jpg';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
 
const Dashboard = () => {


    return (
        <div className={styles.outerDiv}>
            <BackgroundImage />
            <Bomb_finance />   
            <Boardroom_news />
            <Bomb_farms/>
            <Bbond/>
        </div>
    );
};

export default Dashboard;
