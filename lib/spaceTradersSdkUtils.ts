import { useAppDispatch } from '../store/hooks';
import { initializeSpaceTraders } from '../store/slices/spaceTraders';

export const initializeSpaceTradersSdk = () => {
  const dispatch = useAppDispatch();

  if (process.env.USERNAME && process.env.TOKEN) {
    dispatch(
      initializeSpaceTraders({
        username: process.env.USERNAME,
        token: process.env.TOKEN,
      })
    );
  }
};
