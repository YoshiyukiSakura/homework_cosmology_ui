import {BasicModal, Box, Button, Combobox} from "@interchain-ui/react";
import {useMemo, useState} from "react";
import {assets as allAssets, chains} from "chain-registry";
import useAssetStore from "@/store/useAssetStore";

const chainOptions = chains.map(chain => ({
    iconUrl: chain?.logo_URIs?.png ?? "",
    label: chain.chain_name,
    value: chain.chain_name
}));
export default function AddAssetModal({isOpen, onClose}: { isOpen: boolean, onClose: () => void }): JSX.Element {
    const {addAsset} = useAssetStore();
    const [selectedChainKey, setSelectedChainKey] = useState<React.Key>();
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
                onClose();
            } else {
                alert("Asset not found");
            }
        }
    };

    return <BasicModal isOpen={isOpen} onClose={onClose} title="Add Asset">
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
}

export {chainOptions};