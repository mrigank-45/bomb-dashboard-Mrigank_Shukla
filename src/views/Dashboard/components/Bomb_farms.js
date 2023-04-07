import React, { useMemo } from 'react';
import styles from '../dashboard.module.css'
import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';


const Bomb_farms = () => {

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
                                TVL: $1,008,430
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
                            <div style={{ display: "flex", flexDirection: "row" }} className={styles.btnDiv}>
                                <button className={styles.p1_btn}>
                                    Deposit
                                </button>
                                <button className={styles.p1_btn} style={{ marginLeft: "30px" }}>
                                    Withdraw
                                </button>
                                <button className={styles.p1_btn} style={{ marginLeft: "30px", width: "135px" }}>
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
                                TVL: $1,008,430
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
                            <div style={{ display: "flex", flexDirection: "row" }} className={styles.btnDiv}>
                                <button className={styles.p1_btn}>
                                    Deposit
                                </button>
                                <button className={styles.p1_btn} style={{ marginLeft: "30px" }}>
                                    Withdraw
                                </button>
                                <button className={styles.p1_btn} style={{ marginLeft: "30px", width: "135px" }}>
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
