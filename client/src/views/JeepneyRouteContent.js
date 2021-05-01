import React, { Suspense } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { JeepneyRoute } from "../components/JeepneyRoute";
function JeepneyRouteContent() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <JeepneyRoute />
      </Suspense>
    </div>
  );
}

export default JeepneyRouteContent;
