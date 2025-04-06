import request from 'umi-request';

// Định nghĩa kiểu dữ liệu cho Sổ Văn Bằng
type DiplomaBook = {
  id: string;
  name: string;
  issueDate: string;
  description?: string;
};

// Lấy danh sách sổ văn bằng
export async function getDiplomaBooks() {
  return request<DiplomaBook[]>('/api/diploma-books', {
    method: 'GET',
  });
}

// Thêm sổ văn bằng
export async function createDiplomaBook(data: DiplomaBook) {
  return request<DiplomaBook>('/api/diploma-books', {
    method: 'POST',
    data,
  });
}

// Cập nhật sổ văn bằng
export async function updateDiplomaBook(id: string, data: Partial<DiplomaBook>) {
  return request<DiplomaBook>(`/api/diploma-books/${id}`, {
    method: 'PUT',
    data,
  });
}

// Xóa sổ văn bằng
export async function deleteDiplomaBook(id: string) {
  return request<{ success: boolean }>(`/api/diploma-books/${id}`, {
    method: 'DELETE',
  });
}
