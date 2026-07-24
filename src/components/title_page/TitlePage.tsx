'use client'

import { Breadcrumb, Button, Flex, Space, theme } from 'antd'
import type { ReactNode } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { CurveRightIcon } from '../ui/icons'

export interface TitleAction {
  key: string
  label: string
  icon?: ReactNode
  onClick: () => void
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
  danger?: boolean
  loading?: boolean
}

export interface TitlePageProps {
  title: string | ReactNode
  icon?: ReactNode
  actions?: TitleAction[]
  className?: string
  children?: ReactNode
  handleBack?: () => void
  breadCrumb?: BreadcrumbItemType[];
  border?: boolean
}

export default function TitlePage({
  title,
  icon,
  actions = [],
  className = '',
  children,
  handleBack,
  breadCrumb,
  border = true,
}: TitlePageProps) {
  const { token } = theme.useToken()

  return (
    <div>
      <div
        className={`flex items-center justify-between px-6 py-5 ${className} min-h-[100px] ${border ? 'rounded-lg' : ''}`}
        style={{
          backgroundColor: border ? token.colorBgContainer : 'transparent',
          borderBottom: border ? `2px solid ${token.colorBorderSecondary}` : 'none',
          boxShadow: border ? '0 1px 2px 0 rgba(0, 0, 0, 0.03)' : 'none',
        }}
      >
        {/* Left Section - Icon & Title */}
        <Flex gap={16} align="center" className="flex-1">
          <Flex vertical gap={4}>
            {icon && !handleBack && (
              <div 
                className="flex items-center justify-center w-12 h-12 rounded-lg"
                style={{
                  backgroundColor: token.colorPrimaryBg,
                  color: token.colorPrimary,
                  fontSize: '24px',
                }}
              >
                {icon}
              </div>
            )}
            {handleBack && (
              <Button 
                shape="circle" 
                size="large" 
                icon={<ArrowLeftOutlined />} 
                onClick={handleBack}
                style={{
                  borderColor: token.colorBorder,
                }}
              />
            )}
            {breadCrumb && (
              <div className="p-0 mt-[-10px] pl-[5px] mr-[-18px]" style={{ color: token.colorTextSecondary }}>
                <CurveRightIcon size={42} />
              </div>
            )}
          </Flex>
          <Space orientation="vertical" className="w-full" size={16}>
            <h3 
              className="font-semibold text-xl m-0"
              style={{ color: token.colorText }}
            >
              {title}
            </h3>
            {breadCrumb && (
              <Breadcrumb 
                items={breadCrumb}
                style={{ 
                  fontSize: token.fontSizeSM,
                  color: token.colorTextSecondary,
                  marginLeft: '-5px',
                  marginTop: '5px'
                }}
              />
            )}
          </Space>
        </Flex>

        {/* Right Section - Actions */}
        {actions.length > 0 && (
          <Space size="small">
            {actions.map((action) => (
              <Button
                key={action.key}
                type={action.type || 'default'}
                danger={action.danger}
                loading={action.loading}
                onClick={action.onClick}
                icon={action.icon}
              >
                {action.label}
              </Button>
            ))}
          </Space>
        )}
      </div>

      {/* Children Content */}
      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  )
}
