import {
    AssetList,
} from "@interchain-ui/react";
import {Layout} from "@/components";
import {assets as allAssets} from "chain-registry";

export default function Home() {
    return (
        <Layout>
            <AssetList
                isOtherChains={false}
                needChainSpace={false}
                list={(allAssets).map(asset => ({
                    chainName: asset.chain_name,
                    imgSrc: asset?.logo_URIs?.png ?? "",
                    isOtherChains: false,
                    name: asset.name,
                    onDeposit: () => {
                        setIsOpenDeposit(true);
                    },
                    onWithdraw: () => {
                    },
                    symbol: asset.symbol,
                    tokenAmount: '0',
                    tokenAmountPrice: '0'
                }))}
                titles={['Asset', 'Balance']}
            />
        </Layout>
    );
}