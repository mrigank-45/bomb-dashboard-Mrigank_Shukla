import React, { useMemo } from 'react';
import styles from '../dashboard.module.css'
import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';









const Bbond = () => {


    return (
            <div className={styles.card4} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "rowH" }}>
                    <div className={styles.shareImg}>
                        <img src="/BBOND.png" alt="" />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
                        <div className={styles.textt} style={{ width: "200px" }}>
                            Bonds
                        </div>
                        <div>
                            BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1
                        </div>
                    </div>

                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "33px" }}>
                        <div className={styles.textt} style={{ width: "260px" }}>
                            Current Price: (Bomb)^2
                        </div>
                        <div>
                            BBond = 6.2872 BTCB
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "110px" }}>
                        <div className={styles.textt} style={{ width: "200px" }}>
                            Available to redeem:
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <img src="/BBOND.png" alt="" /> <div style={{ marginTop: "15px", fontSize: "20px" }}>456</div>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "198px" }}>

                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ display: "flex", flexDirection: "column", width: "246px" }}>
                                <div>
                                    Purchase BBond
                                </div>
                                <div>
                                    Bomb is over peg
                                </div>
                            </div>

                            <div>
                                <button className={styles.p1_btn} style={{ marginLeft: "30px" }}>
                                    Purchase
                                </button>

                            </div>

                        </div>
                        <hr style={{ width: "100%" }} />

                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "246px" }}>
                                Redeem Bomb
                            </div>

                            <div>
                                <button className={styles.p1_btn} style={{ marginLeft: "30px" }}>
                                    Redeem
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    );
};

export default Bbond;
