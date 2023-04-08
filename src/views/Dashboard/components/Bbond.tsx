import React, { useCallback, useMemo } from 'react';
import styles from '../dashboard.module.css'
import useBondStats from '../../../hooks/useBondStats';
import ExchangeModal from '../../Bond/components/ExchangeModal';
//import useBombStats from '../../hooks/useBombStats';
import useBombFinance from '../../../hooks/useBombFinance';
import useModal from '../../../hooks/useModal';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useBondsPurchasable from '../../../hooks/useBondsPurchasable';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../../bomb-finance/constants';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';

const Bbond = () => {

    const bombFinance = useBombFinance();
    const catchError = useCatchError();
    const addTransaction = useTransactionAdder();
    const bondStat = useBondStats();
    const cashPrice = useCashPriceInLastTWAP();
    const bondsPurchasable = useBondsPurchasable();
    const bondBalance = useTokenBalance(bombFinance?.BBOND);

    const handleBuyBonds = useCallback(
        async (amount: string) => {
            const tx = await bombFinance.buyBonds(amount);
            addTransaction(tx, {
                summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
            });
        },
        [bombFinance, addTransaction],
    );

    const handleRedeemBonds = useCallback(
        async (amount: string) => {
            const tx = await bombFinance.redeemBonds(amount);
            addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
        },
        [bombFinance, addTransaction],
    );
    const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
    const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
    const balance = useTokenBalance(bombFinance.BOMB);
    const {
        contracts: { Treasury },
    } = useBombFinance();
    const [approveStatus, approve] = useApprove(bombFinance.BOMB, Treasury.address);

    const [onPresent1, onDismiss1] = useModal(
        <ExchangeModal
            title="Purchase"
            description={
                !isBondPurchasable
                    ? 'BOMB is over peg'
                    : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
            }
            max={balance}
            onConfirm={(value) => {
                handleBuyBonds(value);
                onDismiss1();
            }}
            action="Purchase"
            tokenName="BOMB"
        />,
    );

    const [onPresent2, onDismiss2] = useModal(
        <ExchangeModal
            title="Redeem"
            description={`${getDisplayBalance(bondBalance)} BBOND Available in wallet`}
            max={balance}
            onConfirm={(value) => {
                handleRedeemBonds(value);
                onDismiss2();
            }}
            action="Redeem"
            tokenName="BBOND"
        />,
    );


    return (
        <div className={styles.card4} style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
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
                        BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", marginLeft: "110px" }}>
                    <div className={styles.textt} style={{ width: "200px" }}>
                        Available to redeem:
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <img src="/BBOND.png" alt="" /> <div style={{ marginTop: "15px", fontSize: "20px" }}>{`${getDisplayBalance(bondBalance)}`}</div>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", marginLeft: "198px" }}>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ display: "flex", flexDirection: "column", width: "246px" }}>
                            <div>
                                Purchase BBond
                            </div>
                            <div>
                                {!isBondPurchasable
                                    ? 'BOMB is over peg'
                                    : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'}
                            </div>
                        </div>

                        <div>
                            {approveStatus !== ApprovalState.APPROVED ? (
                                <button onClick={() => catchError(approve(), `Unable to approve`)} className={styles.p1_btn} style={{ marginLeft: "30px" }} disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN}>
                                    Approve
                                </button>
                            ) : (
                                <button onClick={onPresent1} className={styles.p1_btn} style={{ marginLeft: "30px" }} disabled={!bondStat || isBondRedeemable || !isBondPurchasable}>
                                    Purchase
                                </button>
                            )}

                        </div>

                    </div>
                    <hr style={{ width: "100%" }} />

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ width: "246px" }}>
                            Redeem Bomb
                        </div>

                        <div>
                            <button onClick={onPresent2} className={styles.p1_btn} style={{ marginLeft: "30px" }} disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}>
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
