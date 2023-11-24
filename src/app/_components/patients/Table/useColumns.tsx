import { Popconfirm, Typography } from "@/lib/antd";
import { Chip } from "@nextui-org/react";
import { ArrowBottomRightIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
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
      title: 'date',
      dataIndex: 'date',
      width: '25%',
      editable: true,
      render: (_: any, record: Item) => {
        return `${dayjs(record.date).format('dddd, MMMM D')}`
      },
    },
    {
      title: 'time',
      dataIndex: 'time',
      width: '20%',
      editable: true,
      render: (_: any, record: Item) => {
        const { time } = record
        return `${dayjs(time).format('HH:MM')}`
      },
    },
    {
      title: 'duration',
      dataIndex: 'duration',
      width: '10%',
      editable: true,

    },
    {
      title: 'cost',
      dataIndex: 'cost',
      width: '10%',
      editable: true,
    },
    {
      title: 'paid',
      dataIndex: 'isPaid',
      editable: true,
      width: '10%',
      render: (_: any, record: Item) => {
        return <Chip
          size="sm"
          color={record.isPaid ? "success" : "danger"} className="p-2"
        >
          {record.isPaid ?
            <div className="flex justify-between items-center gap-1">
              <CheckCircledIcon color="white" />
              <span className="text-white">Pago</span>
            </div> :
            <div className="flex justify-between items-center gap-1" >
              <ArrowBottomRightIcon color="white" />
              <span>Nao Pago</span>
            </div>}
        </Chip>
      },
    },
    {
      title: 'present',
      dataIndex: 'isPresent',
      editable: true,
      width: '10%',
      render: (_: any, record: Item) => {
        return <Chip
          size="sm"
          color={record.isPresent ? "success" : "danger"} className="p-2"
        >
          {record.isPresent ?
            <div className="flex justify-between items-center gap-1">
              <CheckCircledIcon color="white" />
              <span className="text-white">Presente</span>
            </div> :
            <div className="flex justify-between items-center gap-1" >
              <ArrowBottomRightIcon color="white" />
              <span>Absente</span>
            </div>}
        </Chip>
      },
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


  const mergedColumns = columns.map((column) => {
    const { editable, dataIndex, title } = column
    if (!editable) {
      return column;
    }
    return {
      ...column,
      onCell: (record: Item) => ({
        record,
        dataIndex: dataIndex,
        title: title,
        editing: isEditingRecord(record),
      }),
    };
  });

  return {
    columns,
    mergedColumns
  }
}