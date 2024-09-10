const UserMsg = ({ msg }) => {
    
    return (
       <>
       <chatbot_span
              
              className={`chat_bot_main__mx_msg_item ${"chat_bot_main__mx_msg_item_user" }`}
            >

              {msg}
        </chatbot_span> 
    </> 
   );
   
}
export default UserMsg;