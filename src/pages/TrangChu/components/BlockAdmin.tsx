import DemoPie from '@/components/Chart/Pie';
import {
  thongKeDonVi,
  thongKeNhanSu,
  thongKeThongBao,
  thongKePhanHoi,
} from '@/services/Dashboard/dashboard';
import { Badge, Card, Col, Statistic } from 'antd';
import { useEffect, useState } from 'react';

type ThongKeDonVi = {
  tenDonVi: string;
  maDonVi: string;
  soLuongNhanVien: number;
  soLuongSinhVien: number;
};

const BlockAdmin = () => {
  const [dataThongKeNhanSu, setDataThongKeNhanSu] = useState<{
    soLuongNhanVien: number;
    soLuongSinhVien: number;
  }>({ soLuongNhanVien: 0, soLuongSinhVien: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [dataThongKeDonVi, setDataThongKeDonVi] = useState<ThongKeDonVi[]>([]);

  const [dataThongKeThongBao, setDataThongKeThongBao] = useState<{
    totalThongBao: number;
    totalThongBaoHeThong: number;
  }>({ totalThongBao: 0, totalThongBaoHeThong: 0 });

  const [dataThongKePhanHoi, setDataThongKePhanHoi] = useState<{
    totalPhanHoi: number;
    daTraLoi: number;
  }>({ totalPhanHoi: 0, daTraLoi: 0 });

  const getThongKeDonVi = async () => {
    setLoading(true);
    const resNhanSu = await thongKeNhanSu();
    setDataThongKeNhanSu(resNhanSu?.data?.data ?? {});
    const resDonVi = await thongKeDonVi();
    setDataThongKeDonVi(resDonVi?.data?.data ?? []);
    let sumGV = 0;
    let sumSV = 0;
    resDonVi?.data?.data.forEach((item: ThongKeDonVi) => {
      sumGV += item.soLuongNhanVien;
      sumSV += item.soLuongSinhVien;
    });

    setDataThongKeDonVi([
      ...(resDonVi?.data?.data ?? []),
      {
        tenDonVi: 'Chưa xác định',
        maDonVi: 'Chưa xác định',
        soLuongNhanVien: resNhanSu?.data?.data?.soLuongNhanVien - sumGV,
        soLuongSinhVien: resNhanSu?.data?.data?.soLuongSinhVien - sumSV,
      },
    ]);
    setLoading(false);
  };

  const getThongKeThongBao = async () => {
    const res = await thongKeThongBao();
    setDataThongKeThongBao(res?.data?.data);
  };

  const getThongKePhanHoi = async () => {
    const res = await thongKePhanHoi();
    setDataThongKePhanHoi(res?.data?.data);
  };

  useEffect(() => {
    getThongKePhanHoi();
    getThongKeThongBao();
    getThongKeDonVi();
  }, []);

  return (
    <>
      <Col xs={24} md={12} xl={8}>
        <Card>
          <Statistic
            title={<div style={{ fontSize: 16 }}>Tổng số tài khoản</div>}
            value={dataThongKeNhanSu?.soLuongNhanVien + dataThongKeNhanSu?.soLuongSinhVien}
          />
          <Badge color="blue" />
          Cán bộ/Giảng viên: {dataThongKeNhanSu?.soLuongNhanVien}
          <br />
          <Badge color="red" />
          Sinh viên: {dataThongKeNhanSu?.soLuongSinhVien}
        </Card>
      </Col>
      <Col xs={24} md={12} xl={8}>
        <Card>
          <Statistic
            title={<div style={{ fontSize: 16 }}>Số lượng thông báo</div>}
            value={dataThongKeThongBao?.totalThongBao ?? 0}
          />
          <Badge color="blue" />
          TB hệ thống: {dataThongKeThongBao?.totalThongBaoHeThong ?? 0}
          <br />
          <Badge color="red" />
          TB từ người dùng:{' '}
          {dataThongKeThongBao?.totalThongBao - dataThongKeThongBao?.totalThongBaoHeThong}
        </Card>
      </Col>
      <Col xs={24} md={12} xl={8}>
        <Card>
          <Statistic
            title={<div style={{ fontSize: 16 }}>Số lượng phản hồi</div>}
            value={dataThongKePhanHoi?.totalPhanHoi ?? 0}
          />
          <Badge color="blue" />
          Đã trả lời: {dataThongKePhanHoi?.daTraLoi ?? 0}
          <br />
          <Badge color="red" />
          Chưa trả lời: {dataThongKePhanHoi?.totalPhanHoi - dataThongKePhanHoi?.daTraLoi}
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card
          loading={loading}
          bodyStyle={{ padding: 0 }}
          title="Thống kê cán bộ/giảng viên theo đơn vị"
        >
          <DemoPie
            height={350}
            hideLegend
            hideLabel
            data={dataThongKeDonVi?.map((item) => ({
              x: item.tenDonVi,
              y: item.soLuongNhanVien,
            }))}
          />
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card loading={loading} bodyStyle={{ padding: 0 }} title="Thống kê sinh viên theo đơn vị">
          <DemoPie
            height={350}
            hideLegend
            hideLabel
            data={dataThongKeDonVi?.map((item) => ({
              x: item.tenDonVi,
              y: item.soLuongSinhVien,
            }))}
          />
        </Card>
      </Col>
    </>
  );
};

export default BlockAdmin;
