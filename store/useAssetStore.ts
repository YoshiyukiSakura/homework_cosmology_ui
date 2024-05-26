import create from 'zustand';
import {Asset as AssetType} from '@chain-registry/types';
import {persist} from 'zustand/middleware';

type Asset = AssetType & { chain_name: string }

interface AssetStore {
    selectedChain: string;
    setSelectedChain: (chain: string) => void;
    assets: (Asset & { chain_name: string })[];
    addAsset: (asset: Asset) => void;
}

const useAssetStore = create<AssetStore>()(
    persist(
        (set, get) => ({
            assets: [],
            addAsset: (asset) => set((state) => {
                // Check if asset with the same name already exists
                const assetExists = state.assets.some(existingAsset => existingAsset.name === asset.name);
                if (!assetExists) {
                    return {assets: [...state.assets, asset]};
                } else {
                    return state;
                }
            }),
            selectedChain: "",
            setSelectedChain: (chain) => set((state) => {
                return {...state, selectedChain: chain};
            })
        }),
        {
            name: 'asset-store',
            getStorage: () => localStorage,
        }
    )
);

export default useAssetStore;