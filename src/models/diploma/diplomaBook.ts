import { useState, useCallback } from 'react';
import { getDiplomaBooks, createDiplomaBook, updateDiplomaBook, deleteDiplomaBook } from '@/services/diploma/diplomaBook';

export default function useDiplomaBookModel() {
  const [diplomaBooks, setDiplomaBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Lấy danh sách sổ văn bằng
  const fetchDiplomaBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getDiplomaBooks();
      setDiplomaBooks(response || []);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sổ văn bằng:', error);
    }
    setLoading(false);
  }, []);

  // Thêm sổ văn bằng
  const addDiplomaBook = useCallback(async (data: any) => {
    await createDiplomaBook(data);
    fetchDiplomaBooks(); // Refresh danh sách
  }, [fetchDiplomaBooks]);

  // Cập nhật sổ văn bằng
  const editDiplomaBook = useCallback(async (id: string, data: any) => {
    await updateDiplomaBook(id, data);
    fetchDiplomaBooks(); // Refresh danh sách
  }, [fetchDiplomaBooks]);

  // Xóa sổ văn bằng
  const removeDiplomaBook = useCallback(async (id: string) => {
    await deleteDiplomaBook(id);
    fetchDiplomaBooks(); // Refresh danh sách
  }, [fetchDiplomaBooks]);

  return {
    diplomaBooks,
    loading,
    fetchDiplomaBooks,
    addDiplomaBook,
    editDiplomaBook,
    removeDiplomaBook,
  };
}
