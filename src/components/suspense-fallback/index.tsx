import { Skeleton } from "antd";

const SuspenseFallback = () => {
    return (
        <div className="p-4">
            <Skeleton active />
        </div>
    );
};

export default SuspenseFallback;
