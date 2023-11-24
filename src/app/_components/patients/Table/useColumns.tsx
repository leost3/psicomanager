import { Popconfirm, Typography } from "@/lib/antd";
import { Chip } from "@nextui-org/react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { BadgeDollarSign, CalendarDays, Clock3, FileEdit, Save, Timer, Trash2, X, XSquare } from "lucide-react";
import { Key } from "react";
import { Item } from "./Table";
import('dayjs/locale/pt-br') // path must match with `i18n.language`

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
  dayjs.locale('pt-br')
  const columns = [
    {
      title: 'Data',
      dataIndex: 'date',
      width: '13%',
      editable: true,
      render: (_: any, record: Item) => {
        return <div className="flex items-center gap-1">
          <CalendarDays color="blue" size={15} />
          {dayjs(record.date).locale('pt-br').format('dddd, D ')}
        </div>
      },
    },
    {
      title: 'Horário',
      dataIndex: 'time',
      width: '12%',
      editable: true,
      render: (_: any, record: Item) => {
        const { time } = record
        return <div className="flex items-center gap-1">
          <Clock3 color="orange" size={15} />
          {dayjs(time).format('HH:MM')}
        </div>
      },
    },
    {
      title: 'Duração',
      dataIndex: 'duration',
      width: '12%',
      editable: true,
      render: (_: any, record: Item) => {
        return <div className="flex items-center gap-1">
          <Timer color="orange" size={15} />
          {record.duration} mins
        </div>
      }
    },
    {
      title: 'Valor da consulta',
      dataIndex: 'cost',
      width: '12%',
      editable: true,
      render: (_: any, record: Item) => {
        return <div className="flex items-center gap-1">
          <BadgeDollarSign color="green" size={15} />
          {record.cost} R$
        </div>
      }
    },
    {
      title: 'Pagamento',
      dataIndex: 'isPaid',
      editable: true,
      width: '15%',
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
              <X size={15} color="white" />
              <span>Nao Pago</span>
            </div>}
        </Chip>
      },
    },
    {
      title: 'Presença',
      dataIndex: 'isPresent',
      editable: true,
      width: '15%',
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
              <X size={15} color="white" />
              <span>Absente</span>
            </div>}
        </Chip>
      },
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditingRecord(record);
        return editable ? (
          <div className='flex flex-col gap-1'>
            <Typography.Link onClick={() => save(record.key)} className="flex gap-1 items-center" style={{ marginRight: 8 }}>
              <Save size={15} />
              Salvar
            </Typography.Link>
            <Typography.Link onClick={() => cancelRowEditing(record)} className="flex gap-1 items-center" style={{ marginRight: 8 }}>
              <XSquare size={15} />
              Cancelar
            </Typography.Link>
          </div>
        ) : (
          <div className='flex gap-3'>
            <Typography.Link disabled={editingKey !== ''} className="flex gap-1 items-center" onClick={() => edit(record)}>
              <FileEdit size={15} />
              Editar
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" disabled={editingKey !== ''} onConfirm={() => onDelete(record.key)}>
              <Typography.Link disabled={editingKey !== ''} className="flex gap-1 items-center" >
                <Trash2 size={15} /> Apagar
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