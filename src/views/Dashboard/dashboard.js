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
        <div className={styles.outerDiv}>
            <BackgroundImage />

            <div className={styles.card1}>
                <div className={styles.headingCard1}>
                    Bomb Finance Summary
                </div>
                <hr className={styles.line} />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className={styles.card11}>
                        Table

                    </div>

                    <div className={styles.card12}>
                        <div className={styles.textalign} style={{ fontSize: "18px" }}>
                            <Typography style={{ fontSize: "22px" }}>Current Epoch</Typography>
                            <Typography style={{ fontSize: "26px" }}>{Number(currentEpoch)}</Typography>
                        </div>
                        <hr />
                        <div className={styles.textalign} >
                            <span style={{ fontSize: "26px" }}> <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" /></span>

                            <Typography style={{ fontSize: "22px" }}>Next Epoch in</Typography>

                        </div>
                        <hr />
                        <div className={styles.textalign} >
                            <div style={{ fontSize: "14px", margin: "2px" }}>
                                <span style={{ color: "#FFFFFF" }}>Live TWAP: <span className={styles.text}> {scalingFactor} BTC</span></span>
                            </div>
                            <div style={{ fontSize: "14px", margin: "2px" }}>
                                <span style={{ color: "#FFFFFF" }}>TVL: <span className={styles.text}><CountUp className={styles.text} end={TVL} separator="," prefix="$" /></span> </span>

                            </div>
                            <div style={{ fontSize: "14px", margin: "2px" }}>
                                {/* *******************TO BE DONE************ */}
                                <span style={{ color: "#FFFFFF" }}>Last Epoch TWAP:  </span>  <span className={styles.text} >{scalingFactor} BTC</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className={styles.card2}>
                <div className={styles.card21}>
                    <a href="">Read Investment Strategy</a>
                    <button></button>
                    <div>
                        <button></button>
                        <button></button>
                    </div>


                </div>
                <div className={styles.card}>
                    <span>Latest News</span>

                </div>


            </div>
        </div>

    );
};

export default Dashboard;
