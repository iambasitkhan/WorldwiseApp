import styles from "../pages/AppLayout.module.css";

import AppNav from "../components/AppNav";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import User from "../components/User";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
