"use client";

import RequirementList from '@/components/requirement/RequirementList';
import TitlePage from '@/components/title_page/TitlePage'
import { RequirementListContext } from '@/context/RequirementList';
import { useAuthStore } from '@/store/auth';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useRouter, Link } from '@/i18n/navigation';
import { useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';

export default function Submission({
  readOnly = false,
  isFromDetail = true,
  joinStatus,
  schema_id,
  detailJoinReq,
}: {
  readOnly?: boolean;
  isFromDetail?: boolean;
  joinStatus?: string;
  schema_id?: string;
  detailJoinReq?: any;
}) {
  const t = useTranslations('common');
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const roleCode = useAuthStore((s) => s.roleCode);

  const handleBack = () => {
    router.back();
  }

  const applicantID: string = useMemo(() => {
    if (roleCode === 'APL' && user && user.applicant) {
      return user.applicant.applicant_id;
    }

    return '';
  }, [roleCode, user]);

  useEffect(() => {
    console.log("User in Submission component:", user);
  }, [user]);

  const defaultBreadcrumb: BreadcrumbItemType[] = useMemo(() => {
    const breadcrumb = [
      {
        title: <Link href="/scheme-submission">{t('breadcrumb-pengajuan-skema')}</Link>,
      },
      {
        title: <div className="text-color-default">{t('breadcrumb-daftar-skema')}</div>,
      },
      {
        title: <div className="text-color-default">{t('breadcrumb-pengajuan-skema-sertifikasi')}</div>,
      },
    ];
    return breadcrumb;
  }, [t]);


  return (
    <>
      <TitlePage
        title={t('pengajuan-skema')}
        handleBack={handleBack}
        breadCrumb={defaultBreadcrumb}
      />

      <div className="px-6">
        <RequirementListContext.Provider value={{ schemaId: schema_id ?? "", applicantId: applicantID }}>
          <RequirementList />
        </RequirementListContext.Provider>
      </div>
    </>
  )
}
