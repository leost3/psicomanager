'use client'
import { Table as AntdTable, Button, Form } from 'antd';
import { ID } from '~/types';
import { EditableCell } from './cellRenderers';
import { useColumns } from './useColumns';
import { useFormActions } from './useFormActions';

export type Appointment = {
  id: ID,
  key: string;
  date: Date;
  time: number;
  duration: number;
  isPaid: boolean
  isPresent: boolean
  cost: number
}

type TableProps = {
  patientId: ID
}

export function Table({ patientId }: TableProps) {
  console.log(patientId)
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
      <Button size='large' disabled={isEditing} onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Adicionar consulta
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
