import React, { useMemo } from 'react';
import moment from 'moment';
import useBombStats from '../../../hooks/useBombStats';
import useBombFinance from '../../../hooks/useBombFinance';
import CountUp from 'react-countup';
import { roundAndFormatNumber } from '../../../0x';
import styles from '../dashboard.module.css'
import { Box, Button, Typography, Grid } from '@material-ui/core';
import useBondStats from '../../../hooks/useBondStats';
import usebShareStats from '../../../hooks/usebShareStats';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';


const Bomb_finance = () => {

    const currentEpoch = useCurrentEpoch();
    const TVL = useTotalValueLocked();
    const cashStat = useCashPriceInEstimatedTWAP();
    const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
    const { to } = useTreasuryAllocationTimes();
    const bShareStats = usebShareStats();
    const tBondStats = useBondStats();
    const bombFinance = useBombFinance();
    const bombStats = useBombStats();
    const cashPrice = useCashPriceInLastTWAP();
    const bondScale = (Number(cashPrice) / 100000000000000).toFixed(4); 

    const bombPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );
    const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
    const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

    const bSharePriceInDollars = useMemo(
        () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
        [bShareStats],
    );

    const bShareCirculatingSupply = useMemo(
        () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
        [bShareStats],
    );
    const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

    const tBondPriceInDollars = useMemo(
        () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
        [tBondStats],
    );

    const tBondCirculatingSupply = useMemo(
        () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
        [tBondStats],
    );
    const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
    const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
    const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
    const bSharePriceInBNB = useMemo(
        () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
        [bShareStats],
      );
    return (

        <div className={styles.card1}>
            <div className={styles.headingCard1}>
                Bomb Finance Summary
            </div>
            <hr className={styles.line} />
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div className={styles.card11}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div className={styles.lightText} style={{ marginLeft: "104px" }}>Current Supply</div>
                        <div className={styles.lightText} style={{ marginLeft: "20px" }}>Total Supply</div>
                        <div className={styles.lightText} style={{ marginLeft: "23px" }}> Price</div>
                    </div>
                    <hr style={{ width: "75%", marginLeft: "25%" }} />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div><img src="/img1.png" alt="" /></div>
                        <div className={styles.lightText} style={{ marginLeft: "20px" }}>$BOMB</div>
                        <div className={styles.lightText}> {roundAndFormatNumber(bombCirculatingSupply, 2)}</div>
                        <div className={styles.lightText}> {roundAndFormatNumber(bombTotalSupply, 2)}</div>
                        <div className={styles.lightText} style={{ marginLeft: "26px" }}>${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'} <br /> {bombPriceInBNB ? bombPriceInBNB : '-.----'} BTC</div>
                        <div className={styles.lightText}> <Button
                            onClick={() => {
                                bombFinance.watchAssetInMetamask('BOMB');
                            }}
                        ><img src="/metamask.png" alt="" /></Button> </div>

                    </div>
                    <hr style={{ width: "90%", marginLeft: "10%", marginTop: "-5px" }} />

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div > <img src="/img2.png" alt="" /></div>
                        <div className={styles.lightText} style={{ marginLeft: "23px" }}>$BSHARE</div>
                        <div className={styles.lightText} style={{ marginLeft: "39px" }}> {roundAndFormatNumber(bShareCirculatingSupply, 2)}</div>
                        <div className={styles.lightText} style={{ marginLeft: "39px" }}> {roundAndFormatNumber(bShareTotalSupply, 2)}</div>
                        <div className={styles.lightText} style={{ marginLeft: "39px" }}>${bSharePriceInDollars ? bSharePriceInDollars : '-.--'} <br />{bSharePriceInBNB ? bSharePriceInBNB : '-.----'} BNB </div>
                        <div className={styles.lightText} style={{ marginLeft: "39px" }}> <Button onClick={() => {
                            bombFinance.watchAssetInMetamask('BSHARE');
                        }} ><img src="/metamask.png" alt="" /></Button> </div>

                    </div>
                    <hr style={{ width: "90%", marginLeft: "10%", marginTop: "-5px" }} />

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div > <img style={{ height: "19px", height: "19px" }} src="/BBOND.png" alt="" /></div>
                        <div className={styles.lightText} style={{ marginLeft: "20px" }}>$BBOND</div>
                        <div className={styles.lightText}> {roundAndFormatNumber(tBondCirculatingSupply, 2)}</div>
                        <div className={styles.lightText}> {roundAndFormatNumber(tBondTotalSupply, 2)}</div>
                        <div className={styles.lightText}> ${tBondPriceInDollars ? tBondPriceInDollars : '-.--'} <br /> {tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BTC </div>
                        <div className={styles.lightText}> <Button onClick={() => {
                            bombFinance.watchAssetInMetamask('BBOND');
                        }} ><img src="/metamask.png" alt="" /></Button> </div>

                    </div>
                    <hr style={{ width: "90%", marginLeft: "10%", marginTop: "-5px" }} />

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
                            <span style={{ color: "#FFFFFF" }}>Last Epoch TWAP:  </span>  <span className={styles.text} >{bondScale || '-'} BTC</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Bomb_finance;
