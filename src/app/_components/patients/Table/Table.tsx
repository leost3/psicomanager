'use client'
import { Table as AntdTable, Button, Form } from 'antd';
import { RouterOutputs } from '~/trpc/shared';
import { EditableCell } from './cellRenderers';
import { useColumns } from './useColumns';
import { useFormActions } from './useFormActions';

export type Appointment = RouterOutputs['appointment']['fetchAll']['appointments'][number] & {
  key: string
}

type TableProps = {
  appointments: Appointment[]
  isLoading: boolean
}

export function Table({ appointments, isLoading }: TableProps) {

  const {
    isEditingRecord,
    cancelEditing,
    isEditing,
    data,
    edit,
    onDelete,
    save,
    cancelRowEditing,
    editingKey,
    form,
    handleAdd
  } = useFormActions(appointments)

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
        loading={isLoading}
      />
    </Form>
  );
};
