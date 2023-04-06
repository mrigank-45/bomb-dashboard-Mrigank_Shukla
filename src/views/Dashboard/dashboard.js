import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import Harvest from '../Boardroom/components/Harvest';
import Stake from '../Boardroom/components/Stake';
import CountUp from 'react-countup';
import styles from './dashboard.module.css'

import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import { getDisplayBalance } from '../../utils/formatBalance';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import useWithdrawCheck from '../../hooks/boardroom/useWithdrawCheck';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';

import HomeImage from '../../assets/img/background.jpg';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const Dashboard = () => {

    const { account } = useWallet();
    const cashPrice = useCashPriceInLastTWAP();
    const { onRedeem } = useRedeemOnBoardroom();
    const stakedBalance = useStakedBalanceOnBoardroom();
    const currentEpoch = useCurrentEpoch();
    const TVL = useTotalValueLocked();
    const cashStat = useCashPriceInEstimatedTWAP();
    const totalStaked = useTotalStakedOnBoardroom();
    const boardroomAPR = useFetchBoardroomAPR();
    const canClaimReward = useClaimRewardCheck();
    const canWithdraw = useWithdrawCheck();
    const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
    const { to } = useTreasuryAllocationTimes();
    const bondScale = (Number(cashPrice) / 100000000000000).toFixed(4);


    return (
        <div>
            <BackgroundImage />
            <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
                Dashboard
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Card  >
                    <CardContent align="center">
                        <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Current Epoch</Typography>
                        <Typography>{Number(currentEpoch)}</Typography>
                    </CardContent>
                </Card>
                <Card  >
                    <CardContent style={{ textAlign: 'center' }}>
                        <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Next Epoch</Typography>
                        <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
                    </CardContent>
                </Card>
                <Card  >
                    <CardContent align="center">
                        <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>
                            Live TWAP
                        </Typography>
                        <Typography>{scalingFactor} BTC</Typography>
                        <Typography>
                            <small>per 10,000 BOMB</small>
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ 'paddingTop': '10px' }}>
                    <CardContent align="center">
                        <h2>TVL</h2>
                        <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
                    </CardContent>
                </Card>
                <Card style={{ 'paddingTop': '10px' }}>
                    <CardContent align="center">
                        <h2>Last Epoch TWAP</h2>
                        {bondScale}
                    </CardContent>
                </Card>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                Home page all stats = bomb finance summary Done

            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                Latest news Done

            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                Boardroom Done in boardroom
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                Bomb farms Done in /farms
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                Bbomb yet to be done, in home page and in farm cards.
            </div>
            <div className={styles.card}>
                Bbomb yet to be done, in home page and in farm cards.
            </div>
        </div>
    );
};

export default Dashboard;
