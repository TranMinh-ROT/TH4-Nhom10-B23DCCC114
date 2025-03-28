/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Định nghĩa kiểu dữ liệu cho trường thông tin
interface FormField {
  id: string;
  name: string;
  type: 'String' | 'Number' | 'Date';
}

const C3: React.FC = () => {
  // State quản lý danh sách các trường
  const [fields, setFields] = useState<FormField[]>([]);
  
  // State quản lý thông tin trường đang thêm/sửa
  const [currentField, setCurrentField] = useState<Partial<FormField>>({});
  
  // State quản lý chế độ (thêm mới/chỉnh sửa)
  const [editMode, setEditMode] = useState<string | null>(null);

  // Hàm thêm trường mới
  const handleAddField = () => {
    if (currentField.name && currentField.type) {
      const newField: FormField = {
        id: uuidv4(),
        name: currentField.name,
        type: currentField.type
      };
      setFields([...fields, newField]);
      
      // Reset form
      setCurrentField({});
    }
  };

  // Hàm xóa trường
  const handleDeleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  // Hàm bắt đầu chỉnh sửa trường
  const handleEditStart = (field: FormField) => {
    setCurrentField(field);
    setEditMode(field.id);
  };

  // Hàm cập nhật trường
  const handleUpdateField = () => {
    if (currentField.name && currentField.type) {
      setFields(fields.map(field => 
        field.id === editMode 
          ? { 
              id: field.id, 
              name: currentField.name!, 
              type: currentField.type! 
            } 
          : field
      ));
      
      // Reset form
      setCurrentField({});
      setEditMode(null);
    }
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#fff1f0' // Màu nền nhạt đỏ
    }}>
      <h1 style={{ 
        color: '#ff4d4f', 
        textAlign: 'center', 
        borderBottom: '2px solid #ff4d4f',
        paddingBottom: '10px' 
      }}>
        Cấu Hình Biểu Mẫu Phụ Lục Văn Bằng
      </h1>

      {/* Form nhập thông tin trường */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <input 
          type="text" 
          placeholder="Tên trường" 
          value={currentField.name || ''}
          onChange={(e) => setCurrentField({
            ...currentField, 
            name: e.target.value
          })}
          style={{ 
            flex: 1, 
            padding: '8px', 
            border: '1px solid #ff4d4f',
            borderRadius: '4px'
          }}
        />

        <select 
          value={currentField.type || ''}
          onChange={(e) => setCurrentField({
            ...currentField, 
            type: e.target.value as FormField['type']
          })}
          style={{ 
            padding: '8px', 
            border: '1px solid #ff4d4f',
            borderRadius: '4px'
          }}
        >
          <option value="">Chọn kiểu dữ liệu</option>
          <option value="String">Văn bản</option>
          <option value="Number">Số</option>
          <option value="Date">Ngày tháng</option>
        </select>

        {editMode ? (
          <button 
            onClick={handleUpdateField}
            style={{ 
              backgroundColor: '#ff4d4f', 
              color: 'white', 
              border: 'none',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cập nhật
          </button>
        ) : (
          <button 
            onClick={handleAddField}
            style={{ 
              backgroundColor: '#ff4d4f', 
              color: 'white', 
              border: 'none',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Thêm
          </button>
        )}
      </div>

      {/* Danh sách các trường */}
      <div style={{ 
        backgroundColor: '#fff', 
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse' 
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#ff4d4f', 
              color: 'white' 
            }}>
              <th style={tableHeaderStyle}>STT</th>
              <th style={tableHeaderStyle}>Tên Trường</th>
              <th style={tableHeaderStyle}>Kiểu Dữ Liệu</th>
              <th style={tableHeaderStyle}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} style={{ 
                borderBottom: '1px solid #f0f0f0' 
              }}>
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>{field.name}</td>
                <td style={tableCellStyle}>
                  {field.type === 'String' ? 'Văn bản' : 
                   field.type === 'Number' ? 'Số' : 'Ngày tháng'}
                </td>
                <td style={tableCellStyle}>
                  <button 
                    onClick={() => handleEditStart(field)}
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    style={actionButtonStyle}
                  >
                    Sửa
                  </button>
                  <button 
                    onClick={() => handleDeleteField(field.id)}
                    style={{
                      // eslint-disable-next-line @typescript-eslint/no-use-before-define
                      ...actionButtonStyle,
                      backgroundColor: '#ff7875',
                      marginLeft: '5px'
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles cho table header
const tableHeaderStyle: React.CSSProperties = {
  padding: '10px',
  textAlign: 'left',
  borderBottom: '1px solid #ff7875'
};

// Styles cho table cell
const tableCellStyle: React.CSSProperties = {
  padding: '10px',
  textAlign: 'left' as React.CSSProperties['textAlign']
};

// Styles cho nút thao tác
const actionButtonStyle = {
  backgroundColor: '#ff4d4f',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default C3;