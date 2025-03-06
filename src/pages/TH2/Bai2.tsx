import React, { useState, useEffect } from 'react';

// Định nghĩa interface cho môn học
interface MonHoc {
  maMon: string;
  tenMon: string;
  soTinChi: number;
  id?: string; // ID tùy chọn khi lưu trữ trong cơ sở dữ liệu
}

// Component chính
const QuanLyMonHoc: React.FC = () => {
  // State
  const [danhSachMonHoc, setDanhSachMonHoc] = useState<MonHoc[]>([]);
  const [monHocHienTai, setMonHocHienTai] = useState<MonHoc>({
    maMon: '',
    tenMon: '',
    soTinChi: 0
  });
  const [dangSua, setDangSua] = useState<boolean>(false);
  const [idDangSua, setIdDangSua] = useState<string | undefined>(undefined);
  const [thongBao, setThongBao] = useState<string>('');

  // Load dữ liệu từ localStorage khi khởi động
  useEffect(() => {
    const monHocDaLuu = localStorage.getItem('danhSachMonHoc');
    if (monHocDaLuu) {
      setDanhSachMonHoc(JSON.parse(monHocDaLuu));
    }
  }, []);

  // Lưu dữ liệu vào localStorage khi danhSachMonHoc thay đổi
  useEffect(() => {
    localStorage.setItem('danhSachMonHoc', JSON.stringify(danhSachMonHoc));
  }, [danhSachMonHoc]);

  // Xử lý khi thay đổi giá trị input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMonHocHienTai(prev => ({
      ...prev,
      [name]: name === 'soTinChi' ? parseInt(value) || 0 : value
    }));
  };

  // Thêm hoặc cập nhật môn học
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu nhập vào
    if (!monHocHienTai.maMon || !monHocHienTai.tenMon || monHocHienTai.soTinChi <= 0) {
      setThongBao('Vui lòng điền đầy đủ thông tin và số tín chỉ phải lớn hơn 0');
      return;
    }

    if (dangSua && idDangSua) {
      // Cập nhật môn học
      const danhSachCapNhat = danhSachMonHoc.map(monHoc => 
        monHoc.id === idDangSua ? { ...monHocHienTai, id: idDangSua } : monHoc
      );
      setDanhSachMonHoc(danhSachCapNhat);
      setThongBao('Cập nhật môn học thành công!');
    } else {
      // Kiểm tra mã môn đã tồn tại chưa
      if (danhSachMonHoc.some(monHoc => monHoc.maMon === monHocHienTai.maMon)) {
        setThongBao('Mã môn học đã tồn tại!');
        return;
      }
      
      // Thêm môn học mới
      const monHocMoi: MonHoc = {
        ...monHocHienTai,
        id: Date.now().toString()
      };
      setDanhSachMonHoc([...danhSachMonHoc, monHocMoi]);
      setThongBao('Thêm môn học thành công!');
    }

    // Reset form
    setMonHocHienTai({ maMon: '', tenMon: '', soTinChi: 0 });
    setDangSua(false);
    setIdDangSua(undefined);
  };

  // Xóa môn học
  const handleXoa = (id: string | undefined) => {
    if (!id) return;
    
    if (window.confirm('Bạn có chắc muốn xóa môn học này?')) {
      const danhSachMoi = danhSachMonHoc.filter(monHoc => monHoc.id !== id);
      setDanhSachMonHoc(danhSachMoi);
      setThongBao('Xóa môn học thành công!');
    }
  };

  // Bắt đầu chỉnh sửa môn học
  const handleSua = (monHoc: MonHoc) => {
    setMonHocHienTai(monHoc);
    setDangSua(true);
    setIdDangSua(monHoc.id);
  };

  // Hủy việc chỉnh sửa
  const handleHuy = () => {
    setMonHocHienTai({ maMon: '', tenMon: '', soTinChi: 0 });
    setDangSua(false);
    setIdDangSua(undefined);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý danh sách môn học</h1>
      
      {thongBao && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
          {thongBao}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">
          {dangSua ? 'Cập nhật môn học' : 'Thêm môn học mới'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Mã môn học:</label>
            <input
              type="text"
              name="maMon"
              value={monHocHienTai.maMon}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              readOnly={dangSua} // Không cho phép sửa mã môn
            />
          </div>
          <div>
            <label className="block mb-1">Tên môn học:</label>
            <input
              type="text"
              name="tenMon"
              value={monHocHienTai.tenMon}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Số tín chỉ:</label>
            <input
              type="number"
              name="soTinChi"
              min="1"
              value={monHocHienTai.soTinChi}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {dangSua ? 'Cập nhật' : 'Thêm mới'}
          </button>
          {dangSua && (
            <button
              type="button"
              onClick={handleHuy}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">STT</th>
              <th className="py-2 px-4 border">Mã môn</th>
              <th className="py-2 px-4 border">Tên môn</th>
              <th className="py-2 px-4 border">Số tín chỉ</th>
              <th className="py-2 px-4 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {danhSachMonHoc.length > 0 ? (
              danhSachMonHoc.map((monHoc, index) => (
                <tr key={monHoc.id}>
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border">{monHoc.maMon}</td>
                  <td className="py-2 px-4 border">{monHoc.tenMon}</td>
                  <td className="py-2 px-4 border text-center">{monHoc.soTinChi}</td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => handleSua(monHoc)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleXoa(monHoc.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 px-4 border text-center">
                  Chưa có môn học nào. Vui lòng thêm môn học mới.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuanLyMonHoc;