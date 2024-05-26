import {
    AssetList, Box, Button, Combobox,
} from "@interchain-ui/react";
import {Layout} from "@/components";
import {useState} from "react";
import useAssetStore from '@/store/useAssetStore';
import VStack from "@/components/common/VStack";
import AddAssetModal, {chainOptions} from "@/components/assets/AddAssetModal";
import DepositModal from "@/components/assets/DepositModal";

export default function Home() {
    const {assets, addAsset, selectedChain, setSelectedChain} = useAssetStore();
    const [isOpenAddAssetModal, setIsOpenAddAssetModal] = useState<boolean>(false);
    const [selectedChainKey, setSelectedChainKey] = useState<React.Key>();
    const handleConfirmChainSelection = () => {
        setSelectedChain(selectedChainKey as string);
    };

    const [isOpenDeposit, setIsOpenDeposit] = useState<boolean>(false);

    return (
        <Layout>
            <VStack spacing={24} align="flex-start">
                <Box width="100%" display="flex" alignItems="end" justifyContent="space-between">
                    <Box display="flex" alignItems="end" gap="$6">
                        <Combobox label="Select Chain" openOnFocus
                                  styleProps={{width: "350px"}}
                                  onSelectionChange={item => {
                                      setSelectedChainKey(item ?? null)
                                  }}>
                            {chainOptions.map(option => <Combobox.Item key={option.value}>
                                {option.label}
                            </Combobox.Item>)}
                        </Combobox>
                        <Button intent="primary" onClick={handleConfirmChainSelection}>Filter By Chain</Button>
                    </Box>
                    <Button intent="primary" onClick={() => setIsOpenAddAssetModal(true)}>Add Asset</Button>
                </Box>
                <AssetList
                    isOtherChains={false}
                    needChainSpace={false}
                    list={assets.filter(selectedChain ? (asset) => asset.chain_name === selectedChain : () => true).map(asset => ({
                        chainName: asset.chain_name,
                        imgSrc: asset?.logo_URIs?.png ?? "",
                        isOtherChains: false,
                        name: asset.name,
                        onDeposit: () => {
                        },
                        onWithdraw: () => {
                        },
                        symbol: asset.symbol,
                        tokenAmount: '0',
                        tokenAmountPrice: '0'
                    }))}
                    titles={['Asset', 'Balance']}
                />
            </VStack>
            <AddAssetModal isOpen={isOpenAddAssetModal} onClose={() => setIsOpenAddAssetModal(false)}/>
            <DepositModal isOpen={isOpenDeposit} onClose={() => setIsOpenDeposit(false)}/>
        </Layout>
    );
}