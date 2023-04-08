import React, { useMemo } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useBombStats from '../../../hooks/useBombStats';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import DepositModal from '../../Bank/components/DepositModal';
import CountUp from 'react-countup';
import WithdrawModal from '../../Bank/components/WithdrawModal';
import useBombFinance from '../../../hooks/useBombFinance';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';
import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';
import styles from '../dashboard.module.css'
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';

const Boardroom_news = () => {
    
    const TVL = useTotalValueLocked();
    const stakedBalance = useStakedBalanceOnBoardroom();
    const bombStats = useBombStats();
    const earnings = useEarningsOnBoardroom();
    const boardroomAPR = useFetchBoardroomAPR();
    const canClaimReward = useClaimRewardCheck();
    const totalStaked = useTotalStakedOnBoardroom();
    const tokenPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );
    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
    const { onRedeem } = useRedeemOnBoardroom();
    const canWithdraw = useWithdrawCheck();
    const { onReward } = useHarvestFromBoardroom();
    const bombFinance = useBombFinance();
    const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
    console.log(bombFinance,approve);
    const tokenBalance = useTokenBalance(bombFinance.BSHARE);
    const { onStake } = useStakeToBoardroom();
    const { onWithdraw } = useWithdrawFromBoardroom();
    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
    const tokenPriceInDollars2 = useMemo(
        () =>
            stakedTokenPriceInDollars
                ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
                : null,
        [stakedTokenPriceInDollars, stakedBalance],
    );

    const [onPresentDeposit, onDismissDeposit] = useModal(
        <DepositModal
            max={tokenBalance}
            onConfirm={(value) => {
                onStake(value);
                onDismissDeposit();
            }}
            tokenName={'BShare'}
        />,
    );

    const [onPresentWithdraw, onDismissWithdraw] = useModal(
        <WithdrawModal
            max={stakedBalance}
            onConfirm={(value) => {
                onWithdraw(value);
                onDismissWithdraw();
            }}
            tokenName={'BShare'}
        />,
    );

    return (
        <div className={styles.card2} style={{ display: "flex", flexDirection: "row" }}>
            <div className={styles.card21} style={{ display: "flex", flexDirection: "column" }}>
                <a href="" className={styles.link}>Read Investment Strategy <img style={{ marginLeft: "5px" }} src="/arrow.png" alt="" /></a>
                <button className={styles.investBtn}> <span style={{ color: "white", fontSize: "24px" }}> Invest Now </span></button>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <button onClick={() => { window.open('http://discord.bomb.money/', '_blank'); }} className={styles.btn2}> <img style={{ marginBottom: "-5px" }} src="/discord.png" alt="" /> <span className={styles.heading2} >Chat on Discord</span> </button>
                    <button onClick={() => { window.open('https://docs.bomb.money/welcome-start-here/readme', '_blank'); }} className={styles.btn2}> <img style={{ marginBottom: "-5px" }} src="/docs.png" alt="" /> <span className={styles.heading2}>Read Docs</span>  </button>
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
                                    TVL: <span className={styles.text}><CountUp className={styles.text} end={TVL} separator="," prefix="$" /></span>
                                </div>
                            </div>
                            <hr style={{ width: "100%" }} />
                        </div>
                    </div>

                    <div className={styles.boardRoomDiv2}>
                        <div style={{ paddingLeft: "68%", marginTop: "25px" }}>Total Staked: <img src="/img2.png" alt="" /> {getDisplayBalance(totalStaked)}</div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                                <div>
                                    Daily Returns
                                </div>
                                <div>
                                    {boardroomAPR.toFixed(2)}%
                                </div>
                            </div>
                            <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                                <div>
                                    Your Stake
                                </div>
                                <div>
                                    <img src="/img2.png" alt="" /> {getDisplayBalance(stakedBalance)}
                                </div>
                                <div>
                                    {`≈ $${tokenPriceInDollars2}`}
                                </div>
                            </div>
                            <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                                <div>
                                    Earned:
                                </div>
                                <div>
                                    <img src="/img1.png" alt="" /> {getDisplayBalance(earnings)}
                                </div>
                                <div>
                                    {`≈ $${earnedInDollars}`}
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }} className={styles.div4}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    {approveStatus !== ApprovalState.APPROVED ? (
                                        <button
                                            onClick={approve}
                                            // disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                                            className={styles.p1_btn}>
                                            Approve
                                        </button>
                                    ) : (
                                        <button
                                            onClick={onPresentDeposit}
                                            disabled={approveStatus !== ApprovalState.APPROVED}
                                            className={styles.p1_btn}>
                                            Deposit
                                        </button>
                                    )}
                                    <button
                                        disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                                        onClick={onPresentWithdraw}
                                        className={styles.p1_btn} style={{ marginLeft: "30px" }}>
                                        Withdraw
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={onReward}
                                        disabled={earnings.eq(0) || !canClaimReward}
                                        className={styles.p2_btn}>
                                        Claim Rewards <img src="/img2.png" alt="" />
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
    );
};

export default Boardroom_news;
