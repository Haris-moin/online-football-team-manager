import { Space, Tag, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTeam } from "../../../store/slices/teamSlice";
import Loading from "../../../components/Loading";
import PlayerTable from "../../../components/Table";

const MyTeam = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const { team, loading } = useSelector((state) => state.userTeam);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Position",
      key: "position",
      dataIndex: "position",
      render: (_, record) => (
        <Tag className="text-uppercase" color="blue">{record.position}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>{record.name}</a>
          <a>Transfer</a>
        </Space>
      ),
    },
  ];

  const teamInfo = {
    teamName: team?.teamName,
    budget: team?.budget,
  };

  const data =
    team?.players?.map((player) => ({
      key: player._id,
      name: player.name,
      position: player.position,
    })) || [];

  const getTeamDetails = async () => {
    dispatch(getUserTeam());
  };

  useEffect(() => {
    getTeamDetails();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <Loading />
        </div>
      ) : (
        <div style={{ padding: "20px" }}>
          <Space direction="vertical" size="middle" className="d-flex mb-2">
            <Title level={3}>Team Details</Title>
            <Text>
              <strong>Team Name:</strong> {teamInfo?.teamName}
            </Text>
            <Text>
              <strong>Budget:</strong> ${teamInfo?.budget?.toLocaleString()}
            </Text>
          </Space>
          <PlayerTable data={data} columns={columns} />
        </div>
      )}
    </>
  );
};

export default MyTeam;
