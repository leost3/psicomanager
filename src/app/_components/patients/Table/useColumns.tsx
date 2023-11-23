import { Popconfirm, Typography } from "@/lib/antd";
import { Key } from "react";
import { Item } from "./Table";

type ColumnsProps = {
  isEditingRecord: (record: Item) => boolean,
  save: (key: Key) => void
  cancelRowEditing: (record: Item) => void,
  editingKey: Key
  edit: (record: Partial<Item> & {
    key: Key;
  }) => void
  onDelete: (key: Key) => void
}

export function useColumns({
  cancelRowEditing,
  editingKey,
  isEditingRecord,
  save,
  edit,
  onDelete
}: ColumnsProps) {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditingRecord(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Typography.Link onClick={() => cancelRowEditing(record)} style={{ marginRight: 8 }}>
              Cancel
            </Typography.Link>
          </span>
        ) : (
          <div className='flex gap-2'>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" disabled={editingKey !== ''} onConfirm={() => onDelete(record.key)}>
              <Typography.Link disabled={editingKey !== ''} >
                Delete
              </Typography.Link>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditingRecord(record),
      }),
    };
  });

  return {
    columns,
    mergedColumns
  }
}