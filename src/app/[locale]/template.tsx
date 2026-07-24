"use client"

import { App } from 'antd'
import React from 'react'
import Appc from '@/service/antdStatic';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
  <App notification={{ placement: 'bottomRight' }} className="bg-default">
    <Appc />
    {children}
  </App>
  )
}