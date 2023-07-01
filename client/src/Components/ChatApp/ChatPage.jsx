import {
    MultiChatWindow,
    MultiChatSocket,
    useMultiChatLogic,
  } from 'react-chat-engine-advanced';
  import { useSelector } from 'react-redux';

  export function ChatPage() {

    const user=useSelector((state)=>state.user);
    const chatProps = useMultiChatLogic(
      '1cf055e0-402c-4b53-8292-5132bd86649c',
        user.firstName,
        user.firstName
    );
    return (
      <>

      <div style={{height:'100vh',backgroundColor:'red'}}>
      <MultiChatWindow {...chatProps} />
        <MultiChatSocket {...chatProps} />
      </div>
        
      </>
    );
  }
  