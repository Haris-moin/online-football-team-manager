import { Button, notification, Space, Tag, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransferListedPlayers,
  toggleTransfer,
  purchasePlayer,
  resetStatus,
} from "../../../../store/slices/transferSlice";
import { useEffect, useState } from "react";
import PlayerTable from "../../../../components/PlayerTable";
import PropTypes from "prop-types";
import { STATUS } from "../../../../constants/constants";


const PlayersList = ({filters}) => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { loading, players, status } = useSelector((state) => state.transfer);
  const [isRemoved, setRemoved] = useState(false)

  const handleBuyPlayer = (playerId) => {
    dispatch(purchasePlayer({ playerId }));
    setRemoved(false)
  };
   
  useEffect(() => {
    dispatch(getTransferListedPlayers(filters));
  }, [filters]);

  useEffect(() => {
    if(status===STATUS.SUCCESS){
      dispatch(getTransferListedPlayers(filters));
      dispatch(resetStatus());
      notification.success({
        message:`Player successfully ${isRemoved ? 'removed from your team' : 'purchased'}`
      })
    }
  }, [status]);

  const handleRemoveTransfer = async (playerId) => {
    dispatch(toggleTransfer({ playerId }));
    setRemoved(true)
  };

  const renderTag = (text, color = "blue") => (
    <Tag className="text-uppercase" color={color}>
      {text}
    </Tag>
  );

  const renderActions = (record) => (
    <Space size="middle">
      {record.isTeamMember ? (
        <Button color="danger" variant="outlined" onClick={() => handleRemoveTransfer(record.key)}>
          Remove
        </Button>
      ) : (
        <Button color="primary" variant="outlined" onClick={() => handleBuyPlayer(record.key)}> Buy</Button>
      )}
    </Space>
  );

  const data =
    players?.map((player) => ({
      key: player._id,
      name: player.name,
      teamName: player.team.teamName,
      position: player.position,
      askingPrice: player.askingPrice,
      isTeamMember: player.isTeamMember,
    })) || [];

  const columns = [
    {
      title: "SR No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
    },
    {
      title: "Position",
      key: "position",
      dataIndex: "position",
      render: (position) => renderTag(position),
    },
    {
      title: "Asking Price",
      dataIndex: "askingPrice",
      key: "askingPrice",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => renderActions(record),
    },
  ];

  return (
    <>
        <div className="p-2">
          <div className="mb-2">
            <Title level={3}>Transfer Market</Title>
          </div>
          <PlayerTable loading={loading} data={data} columns={columns} />
        </div>
    </>
  );
};

PlayersList.propTypes = {
  filters: PropTypes.object.isRequired
};


export default PlayersList;
