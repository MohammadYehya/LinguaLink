import React from "react";

function ChatAudio({ audURL }: { audURL: string }) {
  return (
    <div className='w-36 sm:w-44 flex justify-center items-center'>
      <audio controls>
          <source src={audURL} type="audio/mpeg" className='object-contain'></source>
        </audio>
    </div>
  );
}

export default ChatAudio;
