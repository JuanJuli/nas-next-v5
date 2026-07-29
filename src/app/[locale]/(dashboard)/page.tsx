'use client';

import { useTranslations } from 'next-intl';
import { Card, Row, Col, Statistic } from 'antd';
import { Users, FileText, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const t = useTranslations('common');
  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>{t('dashboard')}</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={t('total-users')}
              value={1128}
              prefix={<Users />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={t('total-assessments')}
              value={93}
              prefix={<FileText />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={t('completed')}
              value={68}
              prefix={<CheckCircle />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
