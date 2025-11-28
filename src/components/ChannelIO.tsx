'use client';

import * as ChannelService from '@channel.io/channel-web-sdk-loader';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ChannelIO() {
  const pathname = usePathname();

  useEffect(() => {
    ChannelService.loadScript();
  }, []);

  useEffect(() => {
    if (pathname?.startsWith('/projects')) {
      ChannelService.boot({
        pluginKey: 'ae604a3f-6c07-4c9b-8839-de67f124680c',
      });
    } else {
      ChannelService.shutdown();
    }
  }, [pathname]);

  return null;
}
