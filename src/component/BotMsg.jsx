const BotMsg = ({ msg }) => {
  return (
    <>
      <span
        className={`chat_bot_main__mx_msg_item ${"chat_bot_main__mx_msg_item_admin"}`}
      >
        <div className="chat_bot_main__mx_avatar">
          <img
            src="https://w7.pngwing.com/pngs/198/625/png-transparent-call-centre-customer-service-computer-icons-call-centre-miscellaneous-face-telephone-call-thumbnail.png"
            alt="Agent"
          />
        </div>
        {msg}
      </span>
    </>
  );
};

export default BotMsg;
