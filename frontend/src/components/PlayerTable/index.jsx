import { Table } from 'antd';
import PropTypes from 'prop-types';

const PlayerTable = ({ data, columns, loading }) => {
  return (
    <div className="team-table-player-container">
      <Table loading={loading} dataSource={data} columns={columns} />
    </div>
  );
};

PlayerTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired, 
    loading: PropTypes.bool     
  };
  
export default PlayerTable;