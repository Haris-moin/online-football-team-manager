import { Table } from 'antd';
import PropTypes from 'prop-types';

const PlayerTable = ({ data, columns }) => {
  return (
    <div className="team-table-player-container">
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

PlayerTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,      
  };
  
export default PlayerTable;