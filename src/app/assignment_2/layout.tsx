'use client';

import { ReduxProvider } from '@/redux/store/index';
import React from 'react';

export default function Assignment2Layout({ children }: { children: React.ReactNode }) {
    return <ReduxProvider>{children}</ReduxProvider>;
}
