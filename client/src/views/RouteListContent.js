import React, { Suspense } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { RouteList } from "../components/JeepneyRoute";
function RouteListContent() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <RouteList />
      </Suspense>
    </div>
  );
}

export default RouteListContent;
