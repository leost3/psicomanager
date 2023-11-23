import { Table as AntdTable, Button, Form } from 'antd';
import { ID } from '~/types';
import { EditableCell } from './cellRenderers';
import { useColumns } from './useColumns';
import { useFormActions } from './useFormActions';

export interface Item {
  id: ID,
  key: string;
  name: string;
  age: number;
  address: string;
}


export function Table() {
  const { isEditingRecord, cancelEditing, isEditing, data, edit, onDelete, save, cancelRowEditing, editingKey, form, handleAdd } = useFormActions()

  const { mergedColumns } = useColumns({
    cancelRowEditing,
    edit,
    editingKey,
    isEditingRecord,
    onDelete,
    save
  })

  const paginationConfig = data.length <= 10 ? false : {
    onChange: cancelEditing
  }

  return (
    <Form form={form} component={false}>
      <Button disabled={isEditing} onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <AntdTable
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={paginationConfig}

      />
    </Form>
  );
};
