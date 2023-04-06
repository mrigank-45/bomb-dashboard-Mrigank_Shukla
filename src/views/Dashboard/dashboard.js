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
            <div className={styles.card2} style={{ display: "flex", flexDirection: "row" }}>
                <div className={styles.card21} style={{ display: "flex", flexDirection: "column" }}>
                    <a href="" className={styles.link}>Read Investment Strategy <img style={{ marginLeft: "5px" }} src="/arrow.png" alt="" /></a>
                    <button className={styles.investBtn}> <span style={{ color: "white", fontSize: "24px" }}> Invest Now </span></button>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <button className={styles.btn2}> <img style={{ marginBottom: "-5px" }} src="/discord.png" alt="" /> <span className={styles.heading2} >Chat on Discord</span> </button>
                        <button className={styles.btn2}> <img style={{ marginBottom: "-5px" }} src="/docs.png" alt="" /> <span className={styles.heading2}>Read Docs</span>  </button>
                    </div>
                    <div className={styles.boardRoom} style={{ display: "flex", flexDirection: "column" }}>
                        <div className={styles.boardRoomDiv1} style={{ display: "flex", flexDirection: "row" }}>
                            <div className={styles.shareImg}>
                                <img src="/bshares.png" alt="" />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div className={styles.textt}>BoardRoom</div>
                                    <div className={styles.imgDiv}>
                                        <img style={{ height: "18px" }} src="/recommend.png" alt="" />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div className={styles.ttext}>
                                        Stake BSHARE and earn BOMB every epoch
                                    </div>
                                    <div style={{ marginLeft: "194px" }}>
                                        TVL: $1,008,430
                                    </div>
                                </div>
                                <hr style={{ width: "100%" }} />
                            </div>
                        </div>

                        <div className={styles.boardRoomDiv2}>
                            <div style={{ paddingLeft: "79%", marginTop: "25px" }}>Total Staked:7232</div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                                    <div>
                                        Daily Returns
                                    </div>
                                    <div>
                                        2 %
                                    </div>
                                </div>
                                <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                                    <div>
                                        Your Stake
                                    </div>
                                    <div>
                                        6.0000
                                    </div>
                                    <div>
                                        ≈ $1171.62
                                    </div>
                                </div>
                                <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                                    <div>
                                        Earned:
                                    </div>
                                    <div>
                                        6.0000
                                    </div>
                                    <div>
                                        ≈ $1171.62
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }} className={styles.div4}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <button className={styles.p1_btn}>
                                            Deposit
                                        </button>
                                        <button className={styles.p1_btn} style={{ marginLeft: "30px" }}>
                                            Withdraw
                                        </button>
                                    </div>
                                    <div>
                                        <button className={styles.p2_btn}>
                                            Claim Rewards
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cardNews}>
                    <div className={styles.news} > Latest News </div>
                </div>
            </div>
            <div className={styles.card3} style={{ display: "flex", flexDirection: "column" }}>

                <div className={styles.boardRoom} style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                        Bomb Farms
                    </div>
                    <div className={styles.boardRoomDiv1} style={{ display: "flex", flexDirection: "row" }}>
                        <div className={styles.shareImg}>
                            <img src="/bshares.png" alt="" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className={styles.textt}>BoardRoom</div>
                                <div className={styles.imgDiv}>
                                    <img style={{ height: "18px" }} src="/recommend.png" alt="" />
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className={styles.ttext}>
                                    Stake BSHARE and earn BOMB every epoch
                                </div>
                                <div style={{ marginLeft: "194px" }}>
                                    TVL: $1,008,430
                                </div>
                            </div>
                            <hr style={{ width: "100%" }} />
                        </div>
                    </div>

                    <div className={styles.boardRoomDiv2}>
                        <div style={{ paddingLeft: "79%", marginTop: "25px" }}>Total Staked:7232</div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                                <div>
                                    Daily Returns
                                </div>
                                <div>
                                    2 %
                                </div>
                            </div>
                            <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                                <div>
                                    Your Stake
                                </div>
                                <div>
                                    6.0000
                                </div>
                                <div>
                                    ≈ $1171.62
                                </div>
                            </div>
                            <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                                <div>
                                    Earned:
                                </div>
                                <div>
                                    6.0000
                                </div>
                                <div>
                                    ≈ $1171.62
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }} className={styles.div4}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <button className={styles.p1_btn}>
                                        Deposit
                                    </button>
                                    <button className={styles.p1_btn} style={{ marginLeft: "30px" }}>
                                        Withdraw
                                    </button>
                                </div>
                                <div>
                                    <button className={styles.p2_btn}>
                                        Claim Rewards
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.boardRoom} style={{ display: "flex", flexDirection: "column" }}>
                    <div className={styles.boardRoomDiv1} style={{ display: "flex", flexDirection: "row" }}>
                        <div className={styles.shareImg}>
                            <img src="/bshares.png" alt="" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className={styles.textt}>BoardRoom</div>
                                <div className={styles.imgDiv}>
                                    <img style={{ height: "18px" }} src="/recommend.png" alt="" />
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className={styles.ttext}>
                                    Stake BSHARE and earn BOMB every epoch
                                </div>
                                <div style={{ marginLeft: "194px" }}>
                                    TVL: $1,008,430
                                </div>
                            </div>
                            <hr style={{ width: "100%" }} />
                        </div>
                    </div>

                    <div className={styles.boardRoomDiv2}>
                        <div style={{ paddingLeft: "79%", marginTop: "25px" }}>Total Staked:7232</div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                                <div>
                                    Daily Returns
                                </div>
                                <div>
                                    2 %
                                </div>
                            </div>
                            <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                                <div>
                                    Your Stake
                                </div>
                                <div>
                                    6.0000
                                </div>
                                <div>
                                    ≈ $1171.62
                                </div>
                            </div>
                            <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                                <div>
                                    Earned:
                                </div>
                                <div>
                                    6.0000
                                </div>
                                <div>
                                    ≈ $1171.62
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }} className={styles.div4}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <button className={styles.p1_btn}>
                                        Deposit
                                    </button>
                                    <button className={styles.p1_btn} style={{ marginLeft: "30px" }}>
                                        Withdraw
                                    </button>
                                </div>
                                <div>
                                    <button className={styles.p2_btn}>
                                        Claim Rewards
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
