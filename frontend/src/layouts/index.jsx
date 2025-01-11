import { lazy, Suspense, memo } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Views from "../views";

const AppLayout = lazy(() => import("../layouts/AppLayout"));
const AuthLayout = lazy(() => import("../layouts//AuthLayout"));

function Layouts() {
  const token = useSelector((state) => state.auth.token);


  const Layout = token ? AppLayout : AuthLayout;

  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Layout>
        <Views />
      </Layout>
    </Suspense>
  );
}

export default memo(Layouts);
