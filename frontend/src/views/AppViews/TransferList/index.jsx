import { Table } from 'antd';

const dummyData = [
  {
    key: '1',
    name: 'John Doe',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'Jane Smith',
    age: 28,
    address: '11 Downing Street',
  },
  {
    key: '3',
    name: 'Mike Johnson',
    age: 45,
    address: '12 Downing Street',
  },
  {
    key: '4',
    name: 'Emily Davis',
    age: 29,
    address: '13 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const TransferList = () => {
  return (
    <div style={{ padding: '20px' }}>
        Transfer List
      <Table dataSource={dummyData} columns={columns} />
    </div>
  );
};

export default TransferList;
