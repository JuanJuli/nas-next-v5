'use client'

import Link from 'next/link'
import { Button, Result } from 'antd';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary"><Link href="/">Return Home</Link></Button>}
      />
    </div>
  )
}