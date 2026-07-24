'use client';

import { Card, Row, Col, Statistic } from 'antd';
import { TeamOutlined, FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons';

export default function Dashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>Dashboard</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={1128}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Assessments"
              value={93}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Completed"
              value={68}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
