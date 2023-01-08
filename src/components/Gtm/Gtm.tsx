import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-52F9G83',
};

export const Gtm = () => {
  return useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
};
