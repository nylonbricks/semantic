'use client';

import * as ChannelService from '@channel.io/channel-web-sdk-loader';
import { useEffect } from 'react';

export default function ChannelIO() {
  useEffect(() => {
    ChannelService.loadScript();
    ChannelService.boot({
      pluginKey: 'ae604a3f-6c07-4c9b-8839-de67f124680c',
    });
  }, []);

  return null;
}
