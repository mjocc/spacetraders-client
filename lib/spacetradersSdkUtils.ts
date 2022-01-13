import { SpaceTraders } from 'spacetraders-sdk';
import type { SpaceTraders as SpaceTradersType } from 'spacetraders-sdk';

export let spaceTraders: SpaceTradersType;

export const initializeSpaceTradersSdk = () => {
  spaceTraders = new SpaceTraders();

  if (process.env.USERNAME && process.env.TOKEN) {
    spaceTraders.init(process.env.USERNAME, process.env.TOKEN);
  }
};
