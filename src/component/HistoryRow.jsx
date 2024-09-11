import { formatDate } from "../utils/CommonFuncs";
const HistoryRow = ({ data, fetchData }) => {
    return (
        <>
            <div className="chat-history-single-row-container" onClick={fetchData}>
                <div className="chat-history-single-row-heading">
                    {data.msg}
                </div>
                <div className="chat-history-single-row-time">
                    {
                        data && formatDate(data.username)
                    }
                </div>
            </div>
        </>
    );
}
export default HistoryRow;