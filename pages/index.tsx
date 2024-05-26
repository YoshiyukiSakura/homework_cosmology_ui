import {
    AssetList, BasicModal, Box, Button, Combobox,
} from "@interchain-ui/react";
import {Layout} from "@/components";
import {assets as allAssets, chains} from "chain-registry";
import {useMemo, useState} from "react";
import useAssetStore from '@/store/useAssetStore';
import VStack from "@/components/common/VStack";

export default function Home() {
    const {assets, addAsset, selectedChain, setSelectedChain} = useAssetStore();
    const [isOpenAddAssetModal, setIsOpenAddAssetModal] = useState<boolean>(false);
    const onAddAssetModalClose = () => setIsOpenAddAssetModal(false);

    const [selectedChainKey, setSelectedChainKey] = useState<React.Key>();
    const chainOptions = useMemo(() => chains.map(chain => ({
        iconUrl: chain?.logo_URIs?.png ?? "",
        label: chain.chain_name,
        value: chain.chain_name
    })), []);
    const [selectedAssetKey, setSelectedAssetKey] = useState<React.Key>();
    const assetOptions = useMemo(() => (allAssets.find(asset => asset.chain_name === selectedChainKey) ?? {assets: []}).assets.map(asset => ({
        label: asset.name,
        value: asset.name,
        base: asset.base,
        chain_name: selectedChainKey as string,
        logo_URIs: asset.logo_URIs,
        coingecko_id: asset.coingecko_id,
        denom_units: asset.denom_units,
        description: asset.description,
        display: asset.display,
        images: asset.images,
        name: asset.name,
        symbol: asset.symbol,
    })), [selectedChainKey]);

    const handleAddAsset = () => {
        if (selectedAssetKey) {
            const asset = assetOptions.find(asset => asset.value === selectedAssetKey);
            if (asset) {
                addAsset(asset);
                setIsOpenAddAssetModal(false);
            } else {
                alert("Asset not found");
            }
        }
    };

    const handleConfirmChainSelection = () => {
        setSelectedChain(selectedChainKey as string);
    };

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
            <BasicModal isOpen={isOpenAddAssetModal} onClose={onAddAssetModalClose} title="Add Asset">
                <Box display="flex" flexDirection="column" alignItems="flex-end" gap="$8" px="$4">
                    {/*TODO: try to figure what this `inputAddonStart` is for*/}
                    <Combobox label="Chain" openOnFocus
                              styleProps={{
                                  width: "350px"
                              }}
                              onSelectionChange={item => {
                                  setSelectedChainKey(item ?? null);
                              }}
                    >
                        {chainOptions.map(option => <Combobox.Item key={option.value}>
                            {/*fixme: <ChainOption> referred in the doc couldn't be found, meanwhile, try to better display this option would cause issues*/}
                            {option.label}
                        </Combobox.Item>)}
                    </Combobox>
                    <Combobox label="Asset" openOnFocus
                              styleProps={{
                                  width: "350px"
                              }}
                              onSelectionChange={item => {
                                  setSelectedAssetKey(item ?? null);
                              }}
                    >
                        {assetOptions.map(option => <Combobox.Item key={option.value}>
                            {option.label}
                        </Combobox.Item>)}
                    </Combobox>
                    <Button intent="primary" onClick={handleAddAsset}>Add Asset</Button>
                </Box>
            </BasicModal>
        </Layout>
    );
}