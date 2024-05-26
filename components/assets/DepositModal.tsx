import {AssetWithdrawTokens, BasicModal} from "@interchain-ui/react";

export default function DepositModal({isOpen, onClose}: { isOpen: boolean, onClose: () => void }): JSX.Element {
    return <BasicModal
        isOpen={isOpen}
        onClose={onClose}
        renderTrigger={function () {
        }}
        title="Deposit"
    >
        <AssetWithdrawTokens
            amount=""
            available={25.89}
            fromAddress="umee1lqsq...pv4axdaxk"
            fromImgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.svg"
            fromName="Umee"
            fromSymbol="UMEE"
            onAddressChange={function Va() {
            }}
            onAddressConfirm={function Va() {
            }}
            onCancel={function Va() {
            }}
            onChange={function Va() {
            }}
            onTransfer={function Va() {
            }}
            priceDisplayAmount={0.5}
            timeEstimateLabel="20 seconds"
            toAddress="osmo1lqsq...pv48trj5k"
            toImgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
            toName="Osmosis"
        />
    </BasicModal>
}