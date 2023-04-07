import React, { useMemo } from 'react';
import styles from '../dashboard.module.css'
import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';
import useStatsForPool from '../../../hooks/useStatsForPool';
import useBanks from '../../../hooks/useBanks';
import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useBombStats from '../../../hooks/useBombStats';
import useShareStats from '../../../hooks/usebShareStats';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdraw from '../../../hooks/useWithdraw';
import DepositModal from '../../Bank/components/DepositModal';
import WithdrawModal from '../../Bank/components/WithdrawModal';


const Bomb_farms = () => {

    const [banks] = useBanks();
    const activeBanks = banks.filter((bank) => !bank.finished);
    const bank1 = activeBanks[2];
    const bank2 = activeBanks[4];
    let statsOnPool1 = useStatsForPool(bank1);
    console.log(statsOnPool1);
    let statsOnPool2 = useStatsForPool(bank2);
    const earnings1 = useEarnings(bank1.contract, bank1.earnTokenName, bank1.poolId);
    const earnings2 = useEarnings(bank2.contract, bank2.earnTokenName, bank2.poolId);
    const onReward1 = useHarvest(bank1).onReward;
    const onReward2 = useHarvest(bank2).onReward;
    const bombStats = useBombStats();
    const tShareStats = useShareStats();
    const tokenStats1 = bank1.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
    const tokenStats2 = bank2.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
    const tokenPriceInDollars1 = useMemo(
        () => (tokenStats1 ? Number(tokenStats1.priceInDollars).toFixed(2) : null),
        [tokenStats1],
    );
    const tokenPriceInDollars2 = useMemo(
        () => (tokenStats2 ? Number(tokenStats2.priceInDollars).toFixed(2) : null),
        [tokenStats2],
    );
    const earnedInDollars1 = (Number(tokenPriceInDollars1) * Number(getDisplayBalance(earnings1))).toFixed(2);
    const earnedInDollars2 = (Number(tokenPriceInDollars2) * Number(getDisplayBalance(earnings2))).toFixed(2);

    // const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

    // const { color: themeColor } = useContext(ThemeContext);
    const tokenBalance1 = useTokenBalance(bank1.depositToken);
    const stakedBalance1 = useStakedBalance(bank1.contract, bank1.poolId);
    const stakedTokenPriceInDollars1 = useStakedTokenPriceInDollars(bank1.depositTokenName, bank1.depositToken);
    const onStake1 = useStake(bank1).onStake;
    const onWithdraw1 = useWithdraw(bank1).onWithdraw;

    const tokenBalance2 = useTokenBalance(bank2.depositToken);
    const stakedBalance2 = useStakedBalance(bank2.contract, bank2.poolId);
    const stakedTokenPriceInDollars2 = useStakedTokenPriceInDollars(bank2.depositTokenName, bank2.depositToken);
    const onStake2 = useStake(bank2).onStake;
    const onWithdraw2 = useWithdraw(bank2).onWithdraw;

    const [onPresentDeposit1, onDismissDeposit1] = useModal(
        <DepositModal
            max={tokenBalance1}
            decimals={bank1.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onStake1(amount);
                onDismissDeposit1();
            }}
            tokenName={bank1.depositTokenName}
        />,
    );

    const [onPresentDeposit2, onDismissDeposit2] = useModal(
        <DepositModal
            max={tokenBalance2}
            decimals={bank2.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onStake2(amount);
                onDismissDeposit2();
            }}
            tokenName={bank2.depositTokenName}
        />,
    );

    const [onPresentWithdraw1, onDismissWithdraw1] = useModal(
        <WithdrawModal
            max={stakedBalance1}
            decimals={bank1.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onWithdraw1(amount);
                onDismissWithdraw1();
            }}
            tokenName={bank1.depositTokenName}
        />,
    );

    const [onPresentWithdraw2, onDismissWithdraw2] = useModal(
        <WithdrawModal
            max={stakedBalance2}
            decimals={bank2.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onWithdraw2(amount);
                onDismissWithdraw2();
            }}
            tokenName={bank2.depositTokenName}
        />,
    );


    return (
        <div className={styles.card3} style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.boardRoom} style={{ display: "flex", flexDirection: "column", width: "90%", paddingTop: "20px", height: "242px" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
                        <div className={styles.textt} style={{ width: "200px" }}>
                            Bomb Farms
                        </div>
                        <div>
                            Stake your LP tokens in our farms to start earning $BSHARE
                        </div>
                    </div>
                    <div>
                        <button className={styles.p1_btn} style={{ marginLeft: "608px" }}>
                            Claim All
                        </button>

                    </div>
                </div>
                <div className={styles.boardRoomDiv1} style={{ display: "flex", flexDirection: "row" }}>
                    <div className={styles.shareImg}>
                        <img src="/BTCB.png" alt="" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className={styles.textt} style={{ width: "150px" }}>BOMB-BTCB </div>
                            <div className={styles.imgDiv}>
                                <img style={{ height: "18px" }} src="/recommend.png" alt="" />
                            </div>
                            <div style={{ marginLeft: " 755px", paddingTop: "20px" }}>
                                {/* TVL: ${statsOnPool1?.TVL} */}
                                TVL: $94.83
                            </div>
                        </div>

                        <hr style={{ width: "100%", marginTop: "15px" }} />
                    </div>
                </div>

                <div className={styles.boardRoomDiv2}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                            <div>
                                Daily Returns
                            </div>
                            <div>
                                {/* {bank1.closedForStaking ? '0.00' : statsOnPool1?.dailyAPR}% */}
                                137.07%
                            </div>
                        </div>
                        <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                            <div>
                                Your Stake
                            </div>
                            <div>
                                {getDisplayBalance(stakedBalance1, bank1.depositToken.decimal)}
                            </div>
                            <div>
                                {`≈ $${earnedInDollars1}`}
                            </div>
                        </div>
                        <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                            <div>
                                Earned:
                            </div>
                            <div>
                                {getDisplayBalance(earnings1)}
                            </div>
                            <div>
                                {`≈ $${earnedInDollars1}`}
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }} className={styles.div4}>
                            <div style={{ display: "flex", flexDirection: "row" }} className={styles.btnDiv}>
                                <button className={styles.p1_btn} onClick={onPresentDeposit1}>
                                    Deposit
                                </button>
                                <button className={styles.p1_btn} style={{ marginLeft: "30px" }} onClick={onPresentWithdraw1}>
                                    Withdraw
                                </button>
                                <button className={styles.p1_btn} style={{ marginLeft: "30px", width: "135px" }} onClick={onReward1}
                                    disabled={earnings1.eq(0)}>
                                    Claim Rewards
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.boardRoom} style={{ display: "flex", flexDirection: "column", width: "90%" }}>
                <div className={styles.boardRoomDiv1} style={{ display: "flex", flexDirection: "row" }}>
                    <div className={styles.shareImg}>
                        <img src="/BNB.png" alt="" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className={styles.textt} style={{ width: "150px" }}>BSHARE-BNB</div>
                            <div className={styles.imgDiv}>
                                <img style={{ height: "18px" }} src="/recommend.png" alt="" />
                            </div>
                            <div style={{ marginLeft: " 755px", paddingTop: "20px" }}>
                                TVL:  ${statsOnPool2 ? statsOnPool2.TVL : 0.00}
                            </div>
                        </div>
                        <hr style={{ width: "100%", marginTop: "15px" }} />
                    </div>
                </div>

                <div className={styles.boardRoomDiv2}>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: "8px" }}>
                        <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                            <div>
                                Daily Returns
                            </div>
                            <div>
                                {bank2.closedForStaking || !statsOnPool2 ? '0.00' : statsOnPool2?.dailyAPR}%
                            </div>
                        </div>
                        <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                            <div>
                                Your Stake
                            </div>
                            <div>
                                {getDisplayBalance(stakedBalance2, bank2.depositToken.decimal)}
                            </div>
                            <div>
                                {`≈ $${earnedInDollars2}`}
                            </div>
                        </div>
                        <div className={styles.smallDiv} style={{ display: "flex", flexDirection: "column" }}>
                            <div>
                                Earned:
                            </div>
                            <div>
                                {getDisplayBalance(earnings2)}
                            </div>
                            <div>
                                {`≈ $${earnedInDollars2}`}
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }} className={styles.div4}>
                            <div style={{ display: "flex", flexDirection: "row" }} className={styles.btnDiv}>
                                <button className={styles.p1_btn} onClick={onPresentDeposit2}>
                                    Deposit
                                </button>
                                <button className={styles.p1_btn} style={{ marginLeft: "30px" }} onClick={onPresentWithdraw2}>
                                    Withdraw
                                </button>
                                <button className={styles.p1_btn} style={{ marginLeft: "30px", width: "135px" }} onClick={onReward2}
                                    disabled={earnings2.eq(0)}>
                                    Claim Rewards
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Bomb_farms;
