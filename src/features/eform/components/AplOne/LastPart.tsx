"use client";

import { useRequirementContext } from "@/context/Requirement";
import { Button, Card, DatePicker, Radio, Space } from "antd";
import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useMemo } from "react";
import { useEformApl1Store } from "@/store/eformApl1";
import dayjs from "dayjs";

export default function LastPart() {
  const { requirement } = useRequirementContext();
  const { lastPart, setRekomendasi, setTanggalPemohon, setCatatan, setTanggalAdminLSP, setTtdPemohon, setTtdAdminLSP } = useEformApl1Store();

  const signatureApl = useMemo(() => {
    if (requirement && requirement.applicant && requirement.applicant.user && requirement.applicant.user.signature) {
      return requirement.applicant.user.signature;
    }
    return null;
  }, [requirement]);

  const currentName = useMemo(() => {
    if (requirement && requirement.applicant && requirement.applicant.user && requirement.applicant.user.full_name) {
      return requirement.applicant.user.full_name;
    }

    return "Pemohon";
  }, [requirement]);

  useEffect(() => {
    console.log("signatureApl:", signatureApl);
  }, [signatureApl]);

  const itemApplicant: DescriptionsProps['items'] = useMemo(() => ([
    {
      label: 'Nama',
      children: currentName,
    },
    {
      label: 'Tanda Tangan / Tanggal',
      children: (
        <Space orientation="vertical" className="w-full">
          {lastPart.ttdPemohon && <img src={lastPart.ttdPemohon} alt="Tanda Tangan Pemohon" style={{ maxWidth: '200px', maxHeight: '100px' }} />}
          {!lastPart.ttdPemohon && (
            <Button onClick={() => setTtdPemohon(signatureApl)} disabled={(!requirement || !requirement.current_role || requirement.current_role !== 'APL') && !signatureApl}>Tanda Tangan</Button>
          )}
          <DatePicker 
            className="w-full" 
            value={lastPart.tanggalPemohon ? dayjs(lastPart.tanggalPemohon) : null}
            onChange={(date) => setTanggalPemohon(date ? date.toISOString() : null)}
          />
        </Space>
      ),
    },
  ]), [currentName, requirement, signatureApl, lastPart]);

  const itemAdminLSP: DescriptionsProps['items'] = useMemo(() => ([
    {
      label: 'Nama',
      children: 'Admin LSP',
    },
    {
      label: 'Tanda Tangan / Tanggal',
      children: (
        <Space orientation="vertical" className="w-full">
          <Button disabled={!requirement || !requirement.current_role || requirement.current_role !== 'ADM'}>Tanda Tangan</Button>
          <DatePicker 
            className="w-full"
            disabled={!requirement || !requirement.current_role || requirement.current_role !== 'ADM'}
            value={lastPart.tanggalAdminLSP ? dayjs(lastPart.tanggalAdminLSP) : null}
            onChange={(date) => setTanggalAdminLSP(date ? date.toISOString() : null)}
          />
        </Space>
      ),
    },
  ]), [requirement]);

  const itemLastPart: DescriptionsProps['items'] = [
    {
      label: 'Rekomendasi Diisi oleh LSP',
      children: (
      <div>
        <p>Berdasarkan ketentuan persyaratan dasar, maka pemohon:</p>
        <Radio.Group value={lastPart.rekomendasi} onChange={(e) => setRekomendasi(e.target.value)}>
          <Radio value={true}>Diterima</Radio>
          <Radio value={false}>Tidak Diterima *)</Radio>
        </Radio.Group>
        <p>Sebagai peserta sertifikasi</p>
        <p>*Pilih yang sesuai</p>
      </div>
      ),
    },
    {
      label: 'Pemohon/ Kandidat',
      children: <Descriptions items={itemApplicant} colon={false} column={1} className="w-full" styles={{ label: { width: '30%' } }} />,
    },
    {
      label: 'Catatan',
      children: <TextArea className="w-[80%]!" placeholder="Masukkan catatan untuk pemohon/kandidat" rows={3} value={lastPart.catatan} onChange={(e) => setCatatan(e.target.value)} />,
    },
    {
      label: 'Admin LSP',
      children: <Descriptions items={itemAdminLSP} colon={false} column={1} className="w-full" styles={{ label: { width: '30%' } }} />,
    }
  ]


  return (
    <Card>
      <Descriptions layout="vertical" items={itemLastPart} colon={true} column={2} className="w-full" styles={{ label: { width: '30%' } }} />
    </Card>
  );
}
