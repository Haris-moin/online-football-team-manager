import { Card } from "antd";
import LoginForm from "./LoginForm";

const backgroundStyle = {
  backgroundImage: "url(/img/img-17.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

function Authentication() {
  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100">
        <Card className="width-400 m-auto">
          <div className="my-4">
            <LoginForm />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Authentication;
