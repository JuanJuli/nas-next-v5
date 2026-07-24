"use client";

import { useRequirementContext } from "@/context/Requirement";
import { Card } from 'antd';

export default function PartOne() {
  const { requirement } = useRequirementContext();

  return (
    <Card>
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td rowSpan={2} className="border border-gray-300 px-3 py-2 text-center align-middle" style={{ width: '35%' }}>
              Skema Sertifikasi (KKNI/Okupasi/Klaster)
            </td>
            <td className="border border-gray-300 px-3 py-2" style={{ width: '15%' }}>Judul</td>
            <td className="border border-gray-300 px-3 py-2 text-center" style={{ width: '5%' }}>:</td>
            <td className="border border-gray-300 px-3 py-2" style={{ width: '45%' }}>
              {requirement?.schema?.schema_name ?? "-"}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-3 py-2" style={{ width: '15%' }}>Nomor</td>
            <td className="border border-gray-300 px-3 py-2 text-center" style={{ width: '5%' }}>:</td>
            <td className="border border-gray-300 px-3 py-2" style={{ width: '45%' }}>
              {requirement?.schema?.schema_number ?? "-"}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse mt-6">
        <tbody>
          <tr>
            <td className="border border-gray-300 px-3 py-2 align-middle font-bold" style={{ width: '35%' }}>
              Panduan Asesmen Mandiri
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-3 py-2" style={{ width: '15%' }}>
              <strong>Instruksi:</strong>
              {/* List with bullet list */}
              <ul className="list-disc list-inside mt-2">
                <li>Baca setiap pertanyaan di kolom sebelah kiri.</li>
                <li>Beri tanda centang (√) pada kotak jika Anda yakin dapat melakukan tugas yang dijelaskan.</li>
                <li>Isi kolom di sebelah kanan dengan menuliskan bukti yang relevan anda miliki untuk menunjukkan bahwa anda melakukan pekerjaan .</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}
