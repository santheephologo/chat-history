import { formatDate } from "../utils/CommonFuncs";
const HistoryRow = ({ data }) => {
    return (
        <>
            <div className="chat-history-single-row-container">
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