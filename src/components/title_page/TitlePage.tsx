'use client'

import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { CurveRightIcon } from '../ui/icons'

export interface BreadcrumbItem {
  title: ReactNode
  href?: string
  key?: string
}

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
  breadCrumb?: BreadcrumbItem[];
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
  return (
    <div>
      <div
        className={`flex items-center justify-between px-6 py-5 ${className} min-h-[100px] ${border ? 'rounded-lg' : ''}`}
        style={{
          backgroundColor: border ? 'hsl(var(--card))' : 'transparent',
          borderBottom: border ? '2px solid hsl(var(--border))' : 'none',
          boxShadow: border ? '0 1px 2px 0 rgba(0, 0, 0, 0.03)' : 'none',
        }}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="flex flex-col gap-1">
            {icon && !handleBack && (
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary text-2xl">
                {icon}
              </div>
            )}
            {handleBack && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleBack}
              >
                <ArrowLeft className="size-5" />
              </Button>
            )}
            {breadCrumb && (
              <div className="p-0 mt-[-10px] pl-[5px] mr-[-18px] text-muted-foreground">
                <CurveRightIcon size={42} />
              </div>
            )}
          </div>
          <div className="w-full">
            <h3 className="font-semibold text-xl m-0 text-foreground">
              {title}
            </h3>
            {breadCrumb && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadCrumb.map((item, index) => (
                    <span key={item.key || index} className="inline-flex items-center gap-1">
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-xs text-muted-foreground [&_a]:hover:text-foreground [&_a]:transition-colors">
                          {item.title}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                      {index < breadCrumb.length - 1 && <BreadcrumbSeparator />}
                    </span>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
        </div>

        {actions.length > 0 && (
          <div className="flex items-center gap-2">
            {actions.map((action) => (
              <Button
                key={action.key}
                variant={action.type === 'primary' ? 'default' : 'outline'}
                onClick={action.onClick}
                disabled={action.loading}
                className={action.danger ? 'text-destructive border-destructive hover:bg-destructive/10' : ''}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  )
}
